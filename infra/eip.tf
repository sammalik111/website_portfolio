resource "aws_eip" "web" {
  domain   = "vpc"
  instance = aws_instance.web.id

  tags = {
    Name = "${var.project_name}-elastic-ip"
  }

  depends_on = [aws_internet_gateway.main]
}
