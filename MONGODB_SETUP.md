# MongoDB Setup Guide for Portfolio Project

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Community Server or MongoDB Atlas
- MongoDB Compass (optional, for visual database management)

## Installation Steps

### 1. MongoDB Installation

#### Option A: Local MongoDB (MongoDB Community Server)
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the installation steps
3. MongoDB will run as a service on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new project and cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
4. Update the `.env` file with your connection string

### 2. MongoDB Compass Setup (Visual Database Management)
1. Download MongoDB Compass from https://www.mongodb.com/products/compass
2. Install and open Compass
3. Connect to `mongodb://localhost:27017` (for local) or your Atlas connection string
4. You'll see the `portfolio` database and collections (projects, skills, achievements, etc.)

### 3. Environment Configuration

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=development
```

## Starting the Development Servers

### Terminal 1 - Backend Server
```bash
cd c:\Users\PALANI KATHIRVEL\OneDrive\Desktop\myportfolio
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend Server
```bash
cd c:\Users\PALANI KATHIRVEL\OneDrive\Desktop\myportfolio\Palani-Portfolio
npm run dev
```
Frontend runs on: http://localhost:8080

### Or use the batch file (Windows only)
```bash
start-dev.bat
```

## API Endpoints - CRUD Operations

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get single achievement
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get single internship
- `POST /api/internships` - Create new internship
- `PUT /api/internships/:id` - Update internship
- `DELETE /api/internships/:id` - Delete internship

### Coding Platforms
- `GET /api/platforms` - Get all platforms
- `GET /api/platforms/:id` - Get single platform
- `POST /api/platforms` - Create new platform
- `PUT /api/platforms/:id` - Update platform
- `DELETE /api/platforms/:id` - Delete platform

### Social Links
- `GET /api/social-links` - Get all social links
- `GET /api/social-links/:id` - Get single social link
- `POST /api/social-links` - Create new social link
- `PUT /api/social-links/:id` - Update social link
- `DELETE /api/social-links/:id` - Delete social link

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create/Update profile

## Image Storage in Base64 Format

All images are stored in MongoDB as Base64 encoded strings. This includes:
- Project images
- Profile photo
- Achievement badges
- Internship logos
- Skill icons
- Platform icons
- Social link icons

### How to Upload Images

In the Admin Dashboard, when adding/editing items with images:
1. Select an image file from your computer
2. The frontend automatically converts it to Base64 format
3. The Base64 string is sent to the backend and stored in MongoDB
4. When displaying, the Base64 string is used directly as image data

Example Base64 image in MongoDB:
```
"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
```

## Testing CRUD Operations with Postman

1. Open Postman
2. Create a new POST request to `http://localhost:5000/api/projects`
3. Set header: `Content-Type: application/json`
4. Send body:
```json
{
  "title": "My Project",
  "description": "Project description",
  "image": "base64-encoded-image-string",
  "technologies": ["React", "MongoDB", "Node.js"],
  "links": {
    "github": "https://github.com/...",
    "live": "https://example.com",
    "demo": "https://demo.example.com"
  }
}
```

## Viewing Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Navigate to the `portfolio` database
4. Click on each collection to view:
   - `projects`
   - `skills`
   - `achievements`
   - `internships`
   - `codingplatforms`
   - `sociallinks`
   - `profiles`

## Syncing Data

The application has a hybrid approach:
- **Primary Storage**: MongoDB
- **Fallback Storage**: localStorage (browser)

When you add/update/delete data in the Admin Dashboard:
1. Data is sent to MongoDB API
2. If MongoDB is unavailable, data is saved to localStorage
3. On page reload, the app tries to fetch from MongoDB first, then falls back to localStorage

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: check Services (Windows) or Terminal (Mac/Linux)
- Check `.env` file for correct MONGODB_URI
- Verify MongoDB is listening on the correct port

### Image Upload Issues
- Maximum image size: 50MB (configurable in server.js)
- Supported formats: JPG, PNG, GIF, WebP, etc.
- Images are automatically converted to Base64 format

### API Connection Error
- Ensure backend server is running on port 5000
- Check CORS configuration in server.js
- Verify `VITE_API_URL` environment variable

## Production Deployment

For Firebase Hosting deployment:
1. Update MongoDB connection string in `.env.production`
2. Update API URL in environment variables
3. Deploy backend API to a service like Heroku, Railway, or Firebase Cloud Functions
4. Update `VITE_API_URL` to point to your production API
5. Build and deploy frontend to Firebase

```bash
npm run build
firebase deploy
```
