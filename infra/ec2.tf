data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

locals {
  user_data = templatefile("${path.module}/templates/user_data.sh.tpl", {
    repo_url    = var.github_repo_url
    repo_branch = var.github_repo_branch
    domain_name = var.domain_name
  })
}

resource "aws_instance" "web" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.web.id]
  key_name                    = var.key_name
  associate_public_ip_address = true
  user_data                   = local.user_data
  # Changing the user-data script alone won't re-run it on an already-booted
  # instance; use /opt/app/deploy.sh over SSH for routine updates instead.

  root_block_device {
    volume_size = 12
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-web-server"
  }
}
