terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  # Applied to every resource below automatically, so in a shared AWS account
  # (console, cost explorer, resource groups) everything this config owns is
  # instantly filterable/identifiable and won't be mistaken for your other projects.
  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "terraform"
      Repo      = "sammalik111/website_portfolio"
    }
  }
}
