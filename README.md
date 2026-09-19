# website_portfolio

Shahmeer Malik's personal site. Self-hosted on a single AWS EC2 instance (not GitHub Pages).

## Layout

```
frontend/   React + TypeScript + Tailwind v4 + shadcn/ui site (light/dark theme, single-column layout)
infra/      Terraform: VPC, security group, EC2 instance, Elastic IP, boot script, S3 content bucket
scripts/    content.sh — publish/pull the editable site content to/from S3
icons/      Old raw assets kept for reference (Resume.pdf is stale — not linked from the site)
```

## Editing content (no redeploy)

All page content — profile, experience, projects, skills, education — lives in one file, `frontend/src/data/resume.json`. The live site fetches a copy of it from S3 on every page load, so content changes never need a commit, push, or server rebuild:

```bash
# edit frontend/src/data/resume.json, then:
scripts/content.sh publish     # uploads it; refresh the site to see it
scripts/content.sh pull        # (optional) sync the local file from what's live in S3
scripts/content.sh pdf ~/Resume.pdf   # upload a resume PDF; set profile.resumeUrl to show a Resume button
```

Delete a bullet, project, or whole section from the JSON and it disappears from the page. An entry missing its required field (`company`+`title`, `title`, `category`, `school`, `organization`) is skipped, and if S3 is unreachable or the file is unusable the site falls back to the copy bundled at build time. Keep the repo copy committed occasionally so that fallback stays current; every S3 upload also keeps 90 days of version history.

One-time setup: `terraform apply` creates the bucket, then put `terraform output content_url` into `frontend/.env.production` as `VITE_CONTENT_URL` (see `frontend/.env.example`) and deploy once. See `infra/README.md`.

## Running locally

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

See `infra/README.md` for how to test the Terraform plan and the EC2 boot script locally before deploying, and how to actually provision and point a domain at the instance.

## Deploying

Needs `aws` (with working credentials), `terraform`, `git`, and `curl` installed.

```bash
git push                 # the server builds whatever is on origin/main
scripts/setup.sh         # first time only: key pair, tfvars, terraform apply (asks before creating anything)
```

`setup.sh` prints the site's IP; give it 3–5 minutes for first boot (logs: `sudo tail -f /var/log/portfolio-setup.log` on the instance). It restricts SSH to your current public IP, so if your IP changes, update `ssh_ingress_cidr` in `infra/terraform.tfvars` and re-run `terraform apply`.

After that, shipping a change is:

```bash
git push
scripts/deploy.sh        # SSHes in and runs /opt/app/deploy.sh (pull, build, reload Caddy)
```

To put it on a domain, point an A record at the Elastic IP and see "Pointing a domain at it" in `infra/README.md`.
