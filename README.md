# website_portfolio

Shahmeer Malik's personal site. Self-hosted on a single AWS EC2 instance (not GitHub Pages).

## Layout

```
frontend/   React + TypeScript + Tailwind v4 + shadcn/ui site (dark liquid-glass styling)
infra/      Terraform: VPC, security group, EC2 instance, Elastic IP, boot script
icons/      Old raw assets kept for reference (Resume.pdf is stale — not linked from the site)
```

## Running locally

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

See `infra/README.md` for how to test the Terraform plan and the EC2 boot script locally before deploying, and how to actually provision and point a domain at the instance.

## Deploying changes

Push to the branch the EC2 instance tracks, then SSH in and run the redeploy helper (see `infra/README.md`):

```bash
ssh -i shahmeer-portfolio-key.pem ubuntu@<elastic-ip>
sudo /opt/app/deploy.sh
```
