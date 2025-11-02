# Portfolio Application with MongoDB Integration

This is a full-stack portfolio application built with React, Node.js/Express, and MongoDB.

## Project Overview

The application consists of:
- **Frontend**: React with Vite, Tailwind CSS, and ShadCN UI components
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose ODM

## Features

✅ Complete CRUD operations for:
- Projects
- Skills
- Achievements
- Internships
- Coding Platforms
- Social Links
- Profile Information

✅ Image Storage
- All images stored as Base64 strings in MongoDB
- Automatic conversion on upload
- Support for multiple image formats

✅ Hybrid Data Persistence
- Primary storage: MongoDB
- Fallback storage: Browser localStorage
- Automatic synchronization

✅ Admin Dashboard
- User authentication
- Content management interface
- Real-time data updates

## Project Structure

```
myportfolio/
├── server.js                 # Express server entry point
├── package.json             # Root package.json for backend dependencies
├── .env                     # Environment variables
├── server/
│   ├── models/             # Mongoose schemas
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Achievement.js
│   │   ├── Internship.js
│   │   ├── CodingPlatform.js
│   │   ├── SocialLink.js
│   │   └── Profile.js
│   └── routes/             # API endpoint handlers
│       ├── projects.js
│       ├── skills.js
│       ├── achievements.js
│       ├── internships.js
│       ├── platforms.js
│       ├── socialLinks.js
│       └── profile.js
├── Palani-Portfolio/        # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Context API (DataContext, AuthContext, ThemeContext)
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
├── test-api.js             # API testing script
└── MONGODB_SETUP.md        # MongoDB setup guide
```

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd myportfolio
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd Palani-Portfolio
npm install
cd ..
```

4. **Configure environment**
```bash
# Create .env file in root directory
echo "MONGODB_URI=mongodb://localhost:27017/portfolio" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env
```

5. **Ensure MongoDB is running**
```bash
# For local MongoDB
mongod

# Or use MongoDB Compass to connect to local instance
```

### Running the Application

**Option 1: Separate Terminals**

Terminal 1 - Start Backend:
```bash
npm run dev
```

Terminal 2 - Start Frontend:
```bash
cd Palani-Portfolio
npm run dev
```

**Option 2: Using the startup script (Windows)**
```bash
start-dev.bat
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

### Testing the API

Run the included test script:
```bash
node test-api.js
```

This will:
- Create test data in MongoDB
- Test CRUD operations
- Verify all endpoints are working

## API Documentation

All API endpoints expect JSON data with `Content-Type: application/json` header.

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get single achievement
- `POST /api/achievements` - Create achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

### Internships
- `GET /api/internships` - Get all internships
- `POST /api/internships` - Create internship
- `PUT /api/internships/:id` - Update internship
- `DELETE /api/internships/:id` - Delete internship

### Coding Platforms
- `GET /api/platforms` - Get all platforms
- `POST /api/platforms` - Create platform
- `PUT /api/platforms/:id` - Update platform
- `DELETE /api/platforms/:id` - Delete platform

### Social Links
- `GET /api/social-links` - Get all social links
- `POST /api/social-links` - Create social link
- `PUT /api/social-links/:id` - Update social link
- `DELETE /api/social-links/:id` - Delete social link

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create/Update profile

## Image Upload

All images are automatically converted to Base64 format for storage in MongoDB.

**Example Request:**
```json
POST /api/projects
Content-Type: application/json

{
  "title": "Project Name",
  "description": "Description",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSU...",
  "technologies": ["React", "MongoDB"],
  "links": {
    "github": "https://github.com/...",
    "live": "https://example.com"
  }
}
```

## MongoDB Compass

To visually manage your MongoDB data:

1. Download MongoDB Compass from https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to the `portfolio` database
4. View collections:
   - `projects`
   - `skills`
   - `achievements`
   - `internships`
   - `codingplatforms`
   - `sociallinks`
   - `profiles`

## Environment Configuration

### Development (.env)
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

### Production (.env.production)
Update these variables for production deployment:
```
MONGODB_URI=<your-mongodb-atlas-uri>
PORT=5000
NODE_ENV=production
VITE_API_URL=<your-api-domain>/api
```

## Frontend Context (DataContext)

The `DataContext` provides:
- State management for all data entities
- Async CRUD functions with MongoDB integration
- Automatic image Base64 conversion
- localStorage fallback if MongoDB is unavailable

**Usage in components:**
```jsx
import { useData } from '@/contexts/DataContext';

const MyComponent = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  
  // Use data and functions
};
```

## Authentication

The application includes basic authentication:
- `AuthContext.jsx` - Manages user login/logout
- `Login.jsx` - Login interface
- `Admin.jsx` - Protected admin dashboard

## Deployment

### Firebase Hosting

1. **Build the frontend**
```bash
cd Palani-Portfolio
npm run build
```

2. **Configure Firebase**
```bash
firebase init
# Select Hosting
# Set public directory to: dist
```

3. **Deploy**
```bash
firebase deploy
```

### Backend Deployment

Deploy the backend to services like:
- Heroku
- Railway
- Firebase Cloud Functions
- AWS Lambda
- DigitalOcean

Update `VITE_API_URL` in environment variables to point to your deployed API.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify firewall settings (port 27017)
- For Atlas: whitelist your IP address

### API Connection Errors
- Ensure backend server is running on port 5000
- Check CORS configuration
- Verify API URL in frontend environment variables

### Image Upload Problems
- Check maximum upload size (50MB by default)
- Verify image format is supported
- Check browser console for errors

## Scripts

### Root Directory
- `npm run dev` - Start backend server
- `npm start` - Start backend server (production)

### Frontend Directory (Palani-Portfolio)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- ShadCN UI Components
- React Router
- Axios/Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Contributing

1. Create a feature branch
2. Make your changes
3. Test with `test-api.js`
4. Commit with clear messages
5. Push to GitHub
6. Create a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please:
1. Check the MONGODB_SETUP.md guide
2. Review API test results
3. Check MongoDB Compass for data
4. Review browser console for frontend errors
5. Check server logs for backend errors
