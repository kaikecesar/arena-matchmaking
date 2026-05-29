# Infrastructure as Code — GitHub Configuration

This directory manages the GitHub repository configuration (branch protection rules) via Terraform. State is stored in Terraform Cloud (workspace `kaikecesar/arena-matchmaking-github-infra`).

## What is managed here

- **Branch protection rules** for `main`, `develop`, `hotfix/*`, `feat/*`, `bugfix/*`, `shared/*`, `shared/feat/*` (see [branch_protection.tf](./branch_protection.tf)).
- **Required CI status checks** that gate merges into `main`, `develop`, and `hotfix/*`.

Everything else (workflows, repository settings, secrets) is configured directly in GitHub or in `.github/`.

---

## Prerequisites

1. **Terraform CLI** matching the version pinned in [main.tf](./main.tf) (currently `1.15.4`). Install via [tfenv](https://github.com/tfutils/tfenv) or download from the [Terraform releases](https://developer.hashicorp.com/terraform/install).
2. **Terraform Cloud account** with access to the `kaikecesar` organization and the `arena-matchmaking-github-infra` workspace.
3. **GitHub Personal Access Token** with the following scopes:
   - `repo` (full control of private repositories)
   - `admin:repo_hook` (manage repo hooks — needed for some branch protection settings)
   - For fine-grained tokens: read & write access to "Administration" of the target repository.

---

## First-time setup

### 1. Authenticate with Terraform Cloud

```bash
terraform login
```

This opens a browser to generate an API token, then stores it under `~/.terraform.d/credentials.tfrc.json`.

### 2. Provide the GitHub token

The token is read from the `github_token` variable. **Do not commit it.** Three options, pick one:

- **Recommended — Terraform Cloud variable**: in the workspace settings, add a sensitive variable named `github_token`. Terraform reads it automatically during remote runs.
- **Environment variable** (good for local plans): export `TF_VAR_github_token=...` before running any command.
- **Local `terraform.tfvars`**: create the file with `github_token = "..."`. The `.gitignore` already excludes `*.tfvars`, so it stays out of Git — but the token still lives on disk in plain text. Use only as a last resort.

### 3. Initialize the working directory

```bash
terraform init
```

Downloads provider plugins and connects to the Terraform Cloud workspace.

---

## Day-to-day workflow

### Preview a change

```bash
terraform plan
```

Reads the current state and prints the diff against the `.tf` files. Always inspect the plan before applying — branch protection changes affect everyone immediately.

### Apply a change

```bash
terraform apply
```

Re-prints the plan and asks for confirmation. Type `yes` to execute.

If your workspace is set to **Auto Apply** in Terraform Cloud, pushing a commit that changes `.tf` files can apply automatically. Confirm the workspace setting before relying on this.

### Inspect the current state

```bash
terraform show
```

Or use Terraform Cloud's UI for a richer view.

---

## Common operations

### Add a new branch protection rule

1. Add a new `resource "github_branch_protection" "<name>" { ... }` block to [branch_protection.tf](./branch_protection.tf).
2. Run `terraform plan` to verify the change is purely additive (no `~` or `-` lines on other resources).
3. Run `terraform apply`.

### Change CI status checks required for merge

Status checks live in the `locals.ci_status_checks` list at the top of [branch_protection.tf](./branch_protection.tf). Add or remove job names there — the change propagates to every rule that references `local.ci_status_checks`.

The job names must match exactly what GitHub shows as the commit status — typically the `job_id` from the workflow YAML (e.g., `backend-lint-test` in [.github/workflows/code-quality.yml](../.github/workflows/code-quality.yml)).

### Rotate the GitHub token

1. Revoke the old token at <https://github.com/settings/tokens>.
2. Generate a new one with the same scopes.
3. Update wherever the token is configured (Terraform Cloud variable / env var / local `.tfvars`).
4. Run `terraform plan` to confirm no drift — no resources should change just from rotating the token.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Error: GET https://api.github.com/...: 401 Bad credentials` | Token is missing, expired, or revoked. Re-check step 2 of first-time setup. |
| `Error: ... 403 Resource not accessible by integration` | Token is valid but lacks the required scopes. Add `repo` / `admin:repo_hook`. |
| `terraform plan` shows changes you did not make | Someone changed branch protection through the GitHub UI. Either accept the drift (run apply to restore the `.tf` definitions) or update the `.tf` files to match. |
| Terraform Cloud workspace stuck in queue | Check the runs tab in Terraform Cloud — a previous run may be waiting for confirmation. |

---

## Security notes

- **Never commit `terraform.tfvars`** — `.gitignore` excludes `*.tfvars`, but verify before pushing.
- **Treat the GitHub token as a secret.** Anyone with this token can modify the repository's protection rules (and depending on scopes, much more).
- **Use Terraform Cloud variables** for shared environments — they are encrypted at rest and never written to disk in CI runs.
- **Audit changes** through Terraform Cloud's run history — every apply is recorded with who triggered it.
