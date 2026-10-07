// Production build for golden-wings-robyn-home: SITE_ENV=production (indexable, no X-Robots-Tag).
import { execSync } from 'node:child_process'
execSync('npm run build', { stdio: 'inherit', env: { ...process.env, SITE_ENV: 'production' } })
