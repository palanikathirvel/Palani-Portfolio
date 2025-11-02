# Backend Deployment Options

Your backend API needs to be deployed separately. Choose one of these options:

## Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from project root**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to Vercel Project Settings → Environment Variables
   - Add `MONGODB_URI=mongodb+srv://kathirvelpalani294_db_user:Palani%402005@realestateproject.w4tm3js.mongodb.net/?appName=Realestateproject`

4. **Update Frontend API URL**
   - Update `Palani-Portfolio/.env.production` with your Vercel URL
   - `VITE_API_URL=https://your-vercel-project.vercel.app/api`

## Option 2: Heroku

1. **Create Heroku Account** at https://www.heroku.com

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Deploy**
   ```bash
   heroku login
   heroku create your-portfolio-api
   heroku config:set MONGODB_URI=mongodb+srv://kathirvelpalani294_db_user:Palani%402005@realestateproject.w4tm3js.mongodb.net/?appName=Realestateproject
   git push heroku main
   ```

4. **Update Frontend API URL**
   - `VITE_API_URL=https://your-portfolio-api.herokuapp.com/api`

## Option 3: Railway

1. **Create Railway Account** at https://railway.app

2. **Connect GitHub** and select your repository

3. **Add Environment Variables**
   - `MONGODB_URI=mongodb+srv://kathirvelpalani294_db_user:Palani%402005@realestateproject.w4tm3js.mongodb.net/?appName=Realestateproject`

4. **Railway auto-deploys** when you push to GitHub

## Option 4: Firebase Cloud Functions

Create a `functions` folder with the backend code and deploy as serverless functions.

## Testing Deployed Backend

After deployment, test with:
```bash
curl https://your-deployed-api.com/api/health
```

Should return: `{"status": "ok"}`

## Current Status

✅ Frontend deployed to: https://palanikathirvel-portfolio.web.app
⏳ Backend needs deployment to one of the above services
🔗 Update `Palani-Portfolio/.env.production` with your deployed API URL
📝 Rebuild frontend: `npm run build` → `firebase deploy`
