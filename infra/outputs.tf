output "public_ip" {
  description = "Elastic IP — point your domain's A record at this."
  value       = aws_eip.web.public_ip
}

output "instance_id" {
  value = aws_instance.web.id
}

output "ssh_command" {
  value = "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_eip.web.public_ip}"
}
