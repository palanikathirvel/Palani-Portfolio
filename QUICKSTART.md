# Quick Start Guide - MongoDB Portfolio App

## 🚀 5-Minute Setup

### 1. Prerequisites
- MongoDB running on `localhost:27017`
- Node.js installed
- Terminal/CMD access

### 2. Start Backend Server

```bash
cd c:\Users\PALANI KATHIRVEL\OneDrive\Desktop\myportfolio
npm run dev
```

**Expected Output:**
```
Server running on port 5000
Connected to MongoDB
```

### 3. Start Frontend (New Terminal)

```bash
cd c:\Users\PALANI KATHIRVEL\OneDrive\Desktop\myportfolio\Palani-Portfolio
npm run dev
```

**Expected Output:**
```
VITE v5.4.19  ready in XXXXms
➜  Local:   http://localhost:8080/
```

### 4. Access Application

- **Frontend**: http://localhost:8080
- **Admin Dashboard**: http://localhost:8080/admin
- **API**: http://localhost:5000/api

## 📝 Test the API

Run the test script to verify everything works:

```bash
node test-api.js
```

Expected output:
```
✅ All API tests passed!
```

## 🗄️ View Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. View the `portfolio` database
4. Collections available:
   - `projects` - Portfolio projects
   - `skills` - Skills and technologies
   - `achievements` - Awards and certifications
   - `internships` - Work experience
   - `codingplatforms` - Platform profiles
   - `sociallinks` - Social media links
   - `profiles` - User profile

## 📱 Using the Admin Dashboard

1. Navigate to http://localhost:8080/login
2. Login (default credentials may be configured)
3. Access admin panel at http://localhost:8080/admin
4. Manage:
   - Projects (with images)
   - Skills
   - Achievements
   - Internships
   - Platforms
   - Social Links
   - Profile & Resume

## 🖼️ Upload Images

When adding projects or profile:
1. Click image upload button
2. Select image file (JPG, PNG, GIF, etc.)
3. Image automatically converts to Base64
4. Stores directly in MongoDB

## 🔍 Verify Data

Check MongoDB Compass:
1. Open any collection
2. Click on a document
3. View `image` field (Base64 string)
4. Data should show in MongoDB immediately

## 📚 API Endpoints Quick Reference

```
GET    /api/projects              - Get all projects
POST   /api/projects              - Create project
PUT    /api/projects/:id          - Update project
DELETE /api/projects/:id          - Delete project

GET    /api/skills                - Get all skills
POST   /api/skills                - Create skill

GET    /api/achievements          - Get all achievements
POST   /api/achievements          - Create achievement

GET    /api/internships           - Get all internships
POST   /api/internships           - Create internship

GET    /api/platforms             - Get all platforms
POST   /api/platforms             - Create platform

GET    /api/social-links          - Get all social links
POST   /api/social-links          - Create social link

GET    /api/profile               - Get profile
POST   /api/profile               - Update profile

GET    /api/health                - Health check
```

## ⚡ Troubleshooting

| Problem | Solution |
|---------|----------|
| **"MongoDB connection error"** | Ensure MongoDB is running: `mongod` |
| **"Port 5000 already in use"** | Kill process: `taskkill /F /IM node.exe` |
| **"API 404 errors"** | Ensure backend server running on 5000 |
| **"Blank admin page"** | Check browser console (F12) for errors |
| **"Image not saving"** | Check MongoDB connection, check file size |

## 📦 Backend Dependencies

```
express       - Web framework
mongoose      - MongoDB ORM
cors          - Cross-origin requests
dotenv        - Environment variables
nodemon       - Auto-restart on changes (dev)
```

## 📦 Frontend Dependencies

```
react         - UI framework
vite          - Build tool
tailwind      - Styling
shadcn-ui     - Components
react-router  - Navigation
axios/fetch   - API calls
```

## 🔐 Environment Variables

**File: `.env`**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

## 📂 Project Files

**Created/Modified:**
- `server.js` - Express backend entry point
- `server/models/*` - MongoDB schemas
- `server/routes/*` - API endpoints
- `Palani-Portfolio/src/contexts/DataContext.jsx` - Frontend API integration
- `.env` - Configuration

**Documentation:**
- `QUICKSTART.md` - This file
- `MONGODB_SETUP.md` - Detailed MongoDB setup
- `README_MONGODB.md` - Complete project guide
- `FIREBASE_DEPLOYMENT.md` - Production deployment
- `COMPLETION_SUMMARY.md` - Project summary

## 🚀 What's Working

✅ Backend API server  
✅ MongoDB connection  
✅ All CRUD operations  
✅ Base64 image storage  
✅ Frontend API integration  
✅ Admin dashboard  
✅ Real-time data sync  
✅ Fallback to localStorage  

## 🎯 Next Steps

1. **Local Testing**: Run all servers and test features
2. **Data Management**: Use MongoDB Compass to view data
3. **Admin Features**: Test adding projects with images
4. **Production Deploy**: See `FIREBASE_DEPLOYMENT.md`

## 📞 Need Help?

1. Check documentation files (MD files in root)
2. Run `test-api.js` to verify API
3. Check browser console (F12) for frontend errors
4. Check terminal for backend errors
5. Check MongoDB Compass for data

## 🎉 You're All Set!

Your portfolio application is ready to use with:
- Full MongoDB integration
- Complete CRUD operations
- Base64 image storage
- Admin dashboard
- Production-ready architecture

Enjoy managing your portfolio! 🚀
