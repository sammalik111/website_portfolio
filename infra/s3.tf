# Content bucket: the site fetches resume.json from here at runtime, so page content
# can be edited with `scripts/content.sh publish` — no rebuild or redeploy of the site.
# Only the keys in local.content_public_keys are publicly readable; everything else
# in the bucket stays private. Nothing here is secret: it's all shown on the public site.

data "aws_caller_identity" "current" {}

locals {
  # Bucket names are global across AWS, so default to a name suffixed with the account ID.
  content_bucket_name = coalesce(var.content_bucket_name, "${var.project_name}-content-${data.aws_caller_identity.current.account_id}")
  content_public_keys = ["resume.json", "resume.pdf"]
}

resource "aws_s3_bucket" "content" {
  bucket = local.content_bucket_name

  tags = {
    Name = "${var.project_name}-content"
  }
}

# Keeps every previous version of resume.json, so a bad edit is one `aws s3api` call from undone.
resource "aws_s3_bucket_versioning" "content" {
  bucket = aws_s3_bucket.content.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Old versions cost storage forever otherwise; 90 days of undo is plenty.
resource "aws_s3_bucket_lifecycle_configuration" "content" {
  bucket = aws_s3_bucket.content.id

  # Versioning must be on before lifecycle rules referencing noncurrent versions apply.
  depends_on = [aws_s3_bucket_versioning.content]

  rule {
    id     = "expire-old-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}

# ACLs stay blocked; only a bucket *policy* may grant public reads (scoped to the keys below).
resource "aws_s3_bucket_public_access_block" "content" {
  bucket = aws_s3_bucket.content.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "content_public_read" {
  statement {
    sid       = "PublicReadSiteContent"
    actions   = ["s3:GetObject"]
    resources = [for key in local.content_public_keys : "${aws_s3_bucket.content.arn}/${key}"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "content" {
  bucket = aws_s3_bucket.content.id
  policy = data.aws_iam_policy_document.content_public_read.json

  # The policy is rejected while block_public_policy is still on.
  depends_on = [aws_s3_bucket_public_access_block.content]
}

# The browser fetches resume.json cross-origin, so S3 has to send CORS headers.
resource "aws_s3_bucket_cors_configuration" "content" {
  bucket = aws_s3_bucket.content.id

  cors_rule {
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = var.content_cors_origins
    allowed_headers = ["*"]
    max_age_seconds = 3600
  }
}
