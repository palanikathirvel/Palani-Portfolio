# Firebase Deployment Guide

This guide will help you deploy your portfolio application to Firebase Hosting with MongoDB backend integration.

## Prerequisites

- Firebase account (https://firebase.google.com)
- Firebase CLI installed (`npm install -g firebase-tools`)
- Backend API deployed to a service (Heroku, Railway, or Firebase Cloud Functions)
- MongoDB instance (local or Atlas)

## Step 1: Prepare for Firebase Deployment

### 1.1 Build the Frontend
```bash
cd Palani-Portfolio
npm run build
```

This creates a `dist` folder with optimized production files.

### 1.2 Update Environment Variables

The `Palani-Portfolio/firebase.json` is already configured to:
- Serve files from the `dist` folder
- Rewrite all routes to `index.html` (for React Router)

## Step 2: Deploy Backend API

Your backend API must be deployed to a public server. Here are recommended options:

### Option A: Deploy to Heroku

1. Create a Heroku account at https://www.heroku.com
2. Install Heroku CLI
3. Create `Procfile` in root directory:
```
web: node server.js
```

4. Create `heroku.yml`:
```yaml
build:
  languages:
    - nodejs
run:
  web: node server.js
```

5. Deploy:
```bash
heroku create your-portfolio-api
heroku config:set MONGODB_URI=<your-mongodb-uri>
git push heroku main
```

### Option B: Deploy to Railway

1. Create account at https://railway.app
2. Connect GitHub repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000

4. Deploy automatically from GitHub

### Option C: Firebase Cloud Functions (Optional)

Create a functions directory and deploy Node.js functions instead of a separate server.

## Step 3: Configure Frontend API URL

Update the API URL for production:

**Palani-Portfolio/.env.production**
```
VITE_API_URL=https://your-deployed-api.com/api
```

Replace `your-deployed-api.com` with your actual API domain.

## Step 4: Firebase Hosting Deployment

### 4.1 Login to Firebase
```bash
firebase login
```

This opens a browser to authenticate with your Google account.

### 4.2 Connect to Your Firebase Project
```bash
firebase use --add
```

Select your Firebase project from the list.

### 4.3 Deploy

From the root directory:
```bash
firebase deploy --only hosting
```

Or from the Palani-Portfolio directory:
```bash
firebase deploy --only hosting -m "MongoDB integration"
```

### 4.4 View Deployment Status

```bash
firebase hosting:channel:list
firebase open hosting:site
```

## Step 5: Complete Deployment Checklist

- [ ] MongoDB instance is running and accessible
- [ ] Backend API is deployed and running
- [ ] Backend API accepts CORS requests from your Firebase domain
- [ ] `.env.production` has correct API URL
- [ ] Frontend built successfully (`dist` folder exists)
- [ ] Firebase project is initialized and authenticated
- [ ] GitHub repository is up to date with all commits

## Step 6: Continuous Deployment (Optional)

### Automatic Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Build Frontend
        working-directory: ./Palani-Portfolio
        run: |
          npm install
          npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: your-firebase-project-id
```

## Post-Deployment

### Verify Everything Works

1. Visit your deployed application at:
```
https://your-project.web.app
```

2. Test admin features:
   - Login to admin dashboard
   - Create a new project with an image
   - Verify image is stored in MongoDB
   - Check MongoDB Compass to see the data

3. Check browser console for any errors

### Monitor Logs

Backend logs:
```bash
# For Heroku
heroku logs --tail

# For Railway
railway logs
```

Firebase hosting logs:
```bash
firebase hosting:log
```

## Troubleshooting

### CORS Errors

If you get CORS errors, update your server.js:
```javascript
app.use(cors({
  origin: ['https://your-project.web.app', 'http://localhost:8080'],
  credentials: true
}));
```

### API 404 Errors

Check that:
1. API URL in `.env.production` is correct
2. Backend server is running
3. Routes are correctly configured

### Image Upload Issues

- Check maximum file size in server.js (currently 50MB)
- Verify base64 conversion is working
- Check MongoDB connection is stable

### White Screen on Deploy

1. Check Firebase console for build errors
2. Verify `dist` folder exists and has files
3. Check browser console for JavaScript errors
4. Verify all dependencies are installed

## Updating Your Application

To deploy updates:

1. Make changes locally
2. Test with `npm run dev`
3. Build: `npm run build`
4. Commit: `git add -A && git commit -m "message"`
5. Push: `git push`
6. Deploy: `firebase deploy --only hosting`

## Custom Domain (Optional)

To use your own domain:

1. Go to Firebase Console → Hosting
2. Click "Connect domain"
3. Follow DNS setup instructions
4. Wait for SSL certificate (can take 24 hours)

## Security Considerations

- [ ] Enable Firebase Authentication if needed
- [ ] Configure MongoDB authentication
- [ ] Set environment variables securely in Firebase
- [ ] Add API rate limiting to backend
- [ ] Enable HTTPS (automatic with Firebase)
- [ ] Configure firewall rules for MongoDB
- [ ] Use environment-specific API keys

## Summary

Your portfolio application is now deployed on Firebase Hosting with MongoDB backend integration!

**Frontend**: https://your-project.web.app  
**Backend API**: https://your-api-domain.com/api  
**Database**: MongoDB (Atlas or Local)

All CRUD operations work with base64 image storage in MongoDB.
