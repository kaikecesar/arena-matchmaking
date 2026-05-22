# ─────────────────────────────────────────
# MAIN — proteção máxima
# Apenas develop e hotfix/* podem abrir PR
# ─────────────────────────────────────────
resource "github_branch_protection" "main" {
  repository_id = var.repo_name
  pattern       = "main"

  enforce_admins                  = true
  allows_force_pushes             = false
  allows_deletions                = false
  require_signed_commits          = false # muda pra true se quiser GPG
  require_conversation_resolution = true
  required_linear_history         = true  # sem merge commits, só squash/rebase

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews           = true
    require_last_push_approval      = true  # quem fez o último push não pode aprovar
  }

  # Descomenta quando tiver GitHub Actions configurado
  # required_status_checks {
  #   strict   = true
  #   contexts = [
  #     "ci / tests",
  #     "ci / lint",
  #     "ci / build",
  #   ]
  # }
}

# ─────────────────────────────────────────
# DEVELOP — proteção média
# Recebe feat/*, bugfix/*, shared/*, shared/feat/*
# ─────────────────────────────────────────
resource "github_branch_protection" "develop" {
  repository_id = var.repo_name
  pattern       = "develop"

  enforce_admins                  = true
  allows_force_pushes             = false
  allows_deletions                = false
  require_conversation_resolution = true
  required_linear_history         = true

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews           = true
    require_last_push_approval      = true
  }

  # required_status_checks {
  #   strict   = true
  #   contexts = [
  #     "ci / tests",
  #     "ci / lint",
  #     "ci / build",
  #   ]
  # }
}

# ─────────────────────────────────────────
# HOTFIX/* — pode abrir PR pra main e pra develop
# Proteção leve: PR obrigatório, sem aprovação obrigatória
# (time pequeno, urgência de produção)
# ─────────────────────────────────────────
resource "github_branch_protection" "hotfix" {
  repository_id = var.repo_name
  pattern       = "hotfix/*"

  allows_force_pushes = false
  allows_deletions    = true  # pode deletar após merge

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews           = true
  }

  # required_status_checks {
  #   strict   = true
  #   contexts = [
  #     "ci / tests",
  #     "ci / lint",
  #   ]
  # }
}

# ─────────────────────────────────────────
# FEAT/* — branches de feature
# ─────────────────────────────────────────
resource "github_branch_protection" "feat" {
  repository_id = var.repo_name
  pattern       = "feat/*"

  allows_force_pushes = true  # dev pode reescrever antes do PR
  allows_deletions    = true
}

# ─────────────────────────────────────────
# BUGFIX/* — branches de bugfix
# ─────────────────────────────────────────
resource "github_branch_protection" "bugfix" {
  repository_id = var.repo_name
  pattern       = "bugfix/*"

  allows_force_pushes = true
  allows_deletions    = true
}

# ─────────────────────────────────────────
# SHARED/* e SHARED/FEAT/* — branches compartilhadas
# Mais restritivas pois múltiplos devs podem commitar
# ─────────────────────────────────────────
resource "github_branch_protection" "shared" {
  repository_id = var.repo_name
  pattern       = "shared/*"

  allows_force_pushes = false  # não pode reescrever, outros dependem dela
  allows_deletions    = false

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews           = true
  }
}

resource "github_branch_protection" "shared_feat" {
  repository_id = var.repo_name
  pattern       = "shared/feat/*"

  allows_force_pushes = false
  allows_deletions    = false

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews           = true
  }
}
