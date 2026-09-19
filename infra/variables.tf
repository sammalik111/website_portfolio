variable "aws_region" {
  description = "AWS region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name/tag prefix applied to every resource this config creates. Kept specific (not just 'portfolio' or 'web') so it's unambiguous among other unrelated projects in the same AWS account."
  type        = string
  default     = "shahmeer-portfolio-site"
}

variable "instance_type" {
  description = "EC2 instance size. t3.micro is free-tier eligible and enough for a static Caddy-served site."
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair (create one in the AWS console/CLI first: aws ec2 create-key-pair --key-name shahmeer-portfolio-key). Used for SSH access."
  type        = string
}

variable "ssh_ingress_cidr" {
  description = "CIDR block allowed to SSH into the instance on port 22. Restrict this to your own IP (e.g. 1.2.3.4/32) — do not leave it open to the world."
  type        = string
  default     = "0.0.0.0/0"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.20.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the single public subnet the instance lives in."
  type        = string
  default     = "10.20.1.0/24"
}

variable "github_repo_url" {
  description = "HTTPS URL of the GitHub repo the EC2 instance clones and builds on boot."
  type        = string
  default     = "https://github.com/sammalik111/website_portfolio.git"
}

variable "github_repo_branch" {
  description = "Branch to check out on the EC2 instance."
  type        = string
  default     = "main"
}

variable "domain_name" {
  description = "Optional domain name (e.g. example.com) that will eventually point at the Elastic IP. Leave blank to have Caddy serve plain HTTP only; set it later and re-run deploy.sh once DNS is pointed to get automatic HTTPS."
  type        = string
  default     = ""
}
