# 🐛 Bug Tracker - Full Stack MERN Application

A complete bug tracking application built with MongoDB, Express, React, and Node.js.

## 🎯 Features

- ✅ User authentication (login/register)
- ✅ Create, view, update, and delete bugs
- ✅ Filter bugs by status and priority
- ✅ Responsive UI
- ✅ Secure API with JWT tokens
- ✅ MongoDB database
- ✅ Comprehensive testing

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

**Testing:**
- Jest
- Supertest

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Account (MongoDB Atlas)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-final-project-mawunyof-mary.git
cd mern-final-project-mawunyof-mary
```

### Step 2: Install Dependencies
```bash
npm run install-all
```

### Step 3: Configure Environment

**Create `server/.env`:**
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bug-tracker
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here-minimum-32-characters
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug

**Create `client/.env`:**
REACT_APP_API_URL=http://localhost:5000/api

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

This starts:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

### Login with Demo Account
- **Email:** demo@test.com
- **Password:** password123

## 📚 How to Use

### Create a Bug
1. Login to the application
2. Scroll down to "Create New Bug" section
3. Enter:
   - Title (e.g., "Login button not working")
   - Description (e.g., "Button doesn't respond to clicks")
   - Priority (Low, Medium, High, or Critical)
4. Click "Create Bug"
5. Bug appears in the list below

### View Bugs
- All your bugs display on the dashboard
- Each bug shows:
  - Title and description
  - Priority level (colored badge)
  - Current status (colored badge)

### Update Bug Status
1. Find the bug you want to update
2. Use the dropdown menu on the bug card
3. Select new status: Open, In Progress, or Closed
4. Status updates immediately

### Filter Bugs
1. Go to "Filter Bugs" section
2. Use dropdowns to filter by:
   - **Status:** All, Open, In Progress, or Closed
   - **Priority:** All, Low, Medium, High, or Critical
3. List updates automatically

### Delete a Bug
1. Find the bug to delete
2. Click the red "Delete" button
3. Confirm deletion
4. Bug is removed from list

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Backend Tests Only
```bash
npm run test:backend
```

### Run Tests with Coverage
```bash
npm run test:backend:coverage
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Bugs
- `GET /api/bugs` - Get all bugs
- `POST /api/bugs` - Create new bug
- `PUT /api/bugs/:id` - Update bug
- `DELETE /api/bugs/:id` - Delete bug

**Full API documentation:** See `server/API_DOCUMENTATION.md`

## 🏗️ Project Structure

mern-final-project/
├── server/                 # Backend
│   ├── src/
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   └── tests/     # Test files
│   ├── .env               # Environment variables
│   └── package.json
│
├── client/                # Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom hooks
│   │   ├── App.js         # Main app
│   │   └── index.js       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── README.md              # This file
└── package.json

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Rate limiting
- ✅ MongoDB sanitization
- ✅ Security headers (helmet.js)
- ✅ Input validation
- ✅ Protected routes

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development with MERN
- RESTful API design
- Authentication & authorization
- Database design with MongoDB
- Testing with Jest
- Error handling & validation
- Security best practices
- Responsive UI development

## 📸 Screenshots

### Login Page
Shows user authentication interface with demo credentials

### Dashboard
Displays all bugs with status and priority badges

### Create Bug
Form for adding new bugs to the system

### Bug Management
Update and delete operations on bugs

## 🎬 Demo Video

**[Link to demo video - TBD]**

The video shows:
- User login
- Creating bugs
- Viewing bugs
- Updating status
- Filtering bugs
- Deleting bugs

## 🚀 Deployment

### Backend (Render.com)
1. Push code to GitHub
2. Deploy to Render
3. Set environment variables

### Frontend (Vercel)
1. Import GitHub repository
2. Deploy to Vercel
3. Set API URL environment variable

**Live Application:** [Link - TBD]

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Verify MongoDB connection string in `server/.env`
- Check IP is whitelisted in MongoDB Atlas
- Make sure MongoDB is running if using local

### "Port already in use"
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### "npm install fails"
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📝 Available Scripts
```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Run tests
npm test

# Run backend tests
npm run test:backend

# Build frontend
npm run build

# Start production server
npm start
```

## 📞 Support

For issues:
1. Check the error message in console
2. Review API documentation
3. Check browser developer tools (F12)
4. Look at server logs in terminal

## 👤 Author

**Mawunyo Fevlo Mary**
- Course: PLP MERN Stack Development
- Week 8 Capstone Project

## 📄 License

MIT License - Open Source

## ✅ Checklist for Submission

- [x] Complete source code
- [x] Frontend fully functional
- [x] Backend fully functional
- [x] Database connected
- [x] Tests implemented
- [x] Error handling
- [x] Security features
- [x] Documentation (README)
- [ ] Screenshots
- [ ] Demo video
- [ ] Deployed to production
- [ ] GitHub updated

---

**Status:** ✅ In Development
**Last Updated:** November 2025