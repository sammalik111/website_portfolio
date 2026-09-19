output "public_ip" {
  description = "Elastic IP — point your domain's A record at this."
  value       = aws_eip.web.public_ip
}

output "content_bucket" {
  description = "S3 bucket holding the editable site content (used by scripts/content.sh)."
  value       = aws_s3_bucket.content.id
}

output "content_url" {
  description = "Public URL of resume.json — set this as VITE_CONTENT_URL in frontend/.env.production."
  value       = "https://${aws_s3_bucket.content.bucket_regional_domain_name}/resume.json"
}

output "instance_id" {
  value = aws_instance.web.id
}

output "ssh_command" {
  value = "ssh -i /path/to/${var.key_name}.pem ubuntu@${aws_eip.web.public_ip}"
}
