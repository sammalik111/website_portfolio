#!/usr/bin/env bash
# Publish or pull the site's editable content (resume.json) to/from the S3 content bucket.
# The live site fetches this file at runtime, so `publish` updates the page with no redeploy.
#
#   scripts/content.sh publish        upload frontend/src/data/resume.json
#   scripts/content.sh pull           overwrite the local file with what's live in S3
#   scripts/content.sh pdf <file>     upload a resume PDF as resume.pdf
#
# The bucket comes from $CONTENT_BUCKET, or `terraform output content_bucket` in infra/.
set -euo pipefail

cd "$(dirname "$0")/.."
FILE="frontend/src/data/resume.json"
BUCKET="${CONTENT_BUCKET:-$(terraform -chdir=infra output -raw content_bucket)}"

case "${1:-}" in
  publish)
    # Refuse to upload a file that isn't valid JSON — the site would fall back to its bundled copy.
    python3 -m json.tool "$FILE" > /dev/null
    aws s3 cp "$FILE" "s3://$BUCKET/resume.json" \
      --content-type application/json --cache-control no-cache
    echo "Published. Refresh the site to see it."
    ;;
  pull)
    aws s3 cp "s3://$BUCKET/resume.json" "$FILE"
    ;;
  pdf)
    [ -f "${2:-}" ] || { echo "usage: $0 pdf <file.pdf>" >&2; exit 1; }
    aws s3 cp "$2" "s3://$BUCKET/resume.pdf" --content-type application/pdf --cache-control no-cache
    echo "Uploaded. Set profile.resumeUrl in resume.json to:"
    echo "  https://$BUCKET.s3.amazonaws.com/resume.pdf   (or the regional URL from your bucket)"
    ;;
  *)
    echo "usage: $0 publish | pull | pdf <file.pdf>" >&2
    exit 1
    ;;
esac
