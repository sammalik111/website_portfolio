# website_portfolio

Shahmeer Malik's personal site. Self-hosted on a single AWS EC2 instance (not GitHub Pages).

## Layout

```
frontend/   React + TypeScript + Tailwind v4 + shadcn/ui site (light/dark theme, single-column layout)
infra/      Terraform: VPC, security group, EC2 instance, Elastic IP, boot script
scripts/    setup.sh (first-time deploy) and deploy.sh (push updates to the server)
icons/      Old raw assets kept for reference (Resume.pdf is stale — not linked from the site)
```

## Editing content

All page content — profile, experience, projects, skills, education, volunteering — lives in one file, `frontend/src/data/resume.json`. Edit it, then commit, push, and run `scripts/deploy.sh` (see "Deploying"). Delete a bullet, project, or whole section and it disappears from the page; an entry missing its required field (`company`+`title`, `title`, `category`, `school`, `organization`) is skipped with a console warning. The resume PDF is `frontend/public/resume.pdf`, linked via `profile.resumeUrl`.

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
