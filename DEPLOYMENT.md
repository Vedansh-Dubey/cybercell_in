# Deployment

## Stack
- **Hosting**: Vercel
- **Repo**: Private GitHub repository
- **Domain**: cybercell.in
- **Auto-deploy**: Push to `main` branch → Vercel builds and deploys

## Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```
The `rewrites` rule is critical — without it, direct navigation to `/blog/my-post` returns 404.

## Environment Variables (Vercel Dashboard)
Set these in Vercel project settings → Environment Variables:
```
VITE_NEWSAPI_KEY=<your newsapi key>
VITE_SUPABASE_URL=<https://your-project.supabase.co>
VITE_SUPABASE_ANON_KEY=<your anon key>
```

## Supabase Secrets (for Edge Functions)
Set via Supabase CLI or dashboard:
```bash
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set CONTACT_EMAIL=hello@cybercell.in
```

## Custom Domain
1. In Vercel: Project → Settings → Domains → Add `cybercell.in`
2. In domain registrar: Add CNAME record pointing to `cname.vercel-dns.com`
   (or Vercel's A records for root domain)
3. Vercel auto-provisions SSL via Let's Encrypt

## Build Command
```
npm run build
```
Output directory: `dist/`

## Local Development
```bash
npm install
cp .env.example .env.local   # add your keys
npm run dev
```
Dev server: `http://localhost:5173`

## Supabase Edge Function Deployment
```bash
supabase functions deploy send-contact
```
The function endpoint is called client-side via:
`${VITE_SUPABASE_URL}/functions/v1/send-contact`
