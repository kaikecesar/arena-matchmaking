terraform {
  required_version = "1.15.4"

  cloud {
    organization = "kaikecesar"

    workspaces {
      name = "arena-matchmaking-github-infra"
    }
  }

  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  token = var.github_token
  owner = var.github_owner
}
