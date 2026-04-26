# Deployment guide

**Project:** AI Help Desk Chatbot  
**Developer:** Ifzaal Yapp  
**Target platform:** Railway (backend) + Vercel or Netlify (frontend)  
**Planned deployment date:** 29 April 2026  
**Last updated:** 26 April 2026

---

## Overview

The application has two parts that need to be deployed separately:

- **Backend** — the FastAPI Python server → deployed to Railway or Render
- **Frontend** — the HTML/CSS/JavaScript files → deployed to Vercel or Netlify

Both platforms offer free tiers that are sufficient for an MVP launch.

---

## Estimated costs

| Service | Cost |
|---------|------|
| Railway (backend) | Free tier available |
| Vercel or Netlify (frontend) | Free tier available |
| Anthropic API | $5 free credit on signup |
| Domain name (optional) | ~£10/year |
| **Total** | **Under £15** |

---

## Part 1 — Deploy the backend to Railway

### Step 1 — Create a Railway account
Go to railway.app and sign up with your GitHub account.

### Step 2 — Create a new project
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Select your `ai-helpdesk` repository
4. Railway will detect it is a Python project automatically

### Step 3 — Configure the start command
In your Railway project settings, set the start command to:
```
uvicorn src.main:app --host 0.0.0.0 --port $PORT
```

### Step 4 — Add environment variables
In Railway, go to your project → **Variables** tab and add:
```
ANTHROPIC_API_KEY=your_real_api_key_here
```

Never put your real API key in any file that gets committed to GitHub.

### Step 5 — Create a Procfile
In the root of your project, create a file called `Procfile` with no file extension:
```
web: uvicorn src.main:app --host 0.0.0.0 --port $PORT
```

Commit and push this to GitHub:
```bash
git add Procfile
git commit -m "Add Procfile for Railway deployment"
git push
```

### Step 6 — Deploy
Railway will automatically deploy when you push to GitHub. Your backend will be live at a URL like:
```
https://ai-helpdesk-production.up.railway.app
```

### Step 7 — Test the live backend
Visit your Railway URL in the browser. You should see:
```json
{"message": "AI Help Desk API is running!"}
```

---

## Part 2 — Deploy the frontend to Vercel

### Step 1 — Create a Vercel account
Go to vercel.com and sign up with your GitHub account.

### Step 2 — Update the API URL in app.js
Before deploying the frontend, update the API URL in `frontend/js/app.js`:

```javascript
// Change this line:
const API_URL = 'http://127.0.0.1:8000/api/chat';

// To your live Railway URL:
const API_URL = 'https://your-app-name.up.railway.app/api/chat';
```

Commit and push this change:
```bash
git add frontend/js/app.js
git commit -m "Update API URL to production backend"
git push
```

### Step 3 — Deploy to Vercel
1. Click **New Project** in Vercel
2. Select your `ai-helpdesk` repository
3. Set the **Root Directory** to `frontend`
4. Click **Deploy**

Your frontend will be live at a URL like:
```
https://ai-helpdesk.vercel.app
```

### Step 4 — Update CORS settings
Once you have your Vercel URL, update the CORS settings in `src/main.py` to only allow requests from your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-helpdesk.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

Commit, push, and Railway will redeploy automatically.

---

## Part 3 — Custom domain (optional)

If you purchase a domain name (e.g. helpdeskAI.co.uk):

### For the frontend (Vercel)
1. Go to your Vercel project → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions Vercel provides

### For the backend (Railway)
1. Go to your Railway project → **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions Railway provides

---

## Post-deployment checklist

- [ ] Backend live URL confirmed working
- [ ] Frontend live URL confirmed working
- [ ] Chat sending and receiving real AI responses
- [ ] All six starter questions tested on live version
- [ ] CORS updated to production domain only
- [ ] API usage limit set in Anthropic console
- [ ] Live URL shared on GitHub repository
- [ ] Live URL added to CV and LinkedIn

---

## Monitoring and maintenance

### Checking API costs
Monitor your Anthropic API usage at console.anthropic.com to avoid unexpected charges. Set a monthly spending limit as a safety net.

### Checking server health
Visit your Railway URL + `/health` at any time to verify the backend is running:
```
https://your-app-name.up.railway.app/health
```

### Updating the application
Any push to your GitHub `master` branch will automatically trigger a redeployment on both Railway and Vercel. No manual steps required.

---

## Rollback procedure

If a deployment breaks the live application:

1. Go to your Railway or Vercel dashboard
2. Click **Deployments**
3. Find the last working deployment
4. Click **Redeploy** to instantly roll back

---

## Alternative platforms

If Railway or Vercel don't suit your needs, alternatives include:

| Platform | Best for | Free tier |
|----------|---------|-----------|
| Render | Backend (Python) | Yes |
| Fly.io | Backend (Python) | Yes |
| Netlify | Frontend | Yes |
| GitHub Pages | Frontend (static only) | Yes |

---

*Document created: 26 April 2026*  
*To be updated after deployment on 29 April 2026*
