# 🐛 MERN Bug Tracker - Capstone Project

A full-stack bug tracking application with user authentication, CRUD operations, and real-time updates.

## 🚀 Live Application

| Component | URL |
|-----------|-----|
| **Frontend** | https://mern-final-project-mawunyof-mary-git-main-mawunyo-project.vercel.app |
| **Backend API** | https://bug-tracker-backend-1xle.onrender.com |
| **API Health** | https://bug-tracker-backend-1xle.onrender.com/api/health |

## 🔐 Demo Credentials

- **Email**: demo@test.com
- **Password**: password123

Or create a new account with Register button!

## ✨ Features

✅ **User Authentication** - Secure login and registration
✅ **Bug Management** - Create, read, update, delete bugs
✅ **Dashboard** - View all bugs in real-time
✅ **Responsive Design** - Works on all devices
✅ **Professional UI** - Modern, clean interface
✅ **Error Handling** - Comprehensive error messages
✅ **MongoDB Backend** - Scalable database
✅ **Express API** - RESTful API design

## 🛠️ Tech Stack

### Frontend
- React 18
- CSS3 with responsive design
- Axios for API calls

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- Authentication middleware
- Error handling

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📁 Project Structure
```
mern-final-project/
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/   # Login, Register, Dashboard
│   │   ├── components/ # BugCard, BugList, BugForm
│   │   └── App.js
│   └── package.json
│
├── server/          # Express backend
│   ├── src/
│   │   ├── routes/  # Auth, Bugs
│   │   ├── models/  # Bug model
│   │   ├── controllers/
│   │   └── app.js
│   └── package.json
│
└── README.md
```

## 🎓 Learning Outcomes

This capstone project demonstrates:

### Backend Skills
- ✅ RESTful API design
- ✅ User authentication
- ✅ MongoDB integration
- ✅ Error handling & validation
- ✅ Middleware implementation

### Frontend Skills
- ✅ React hooks & state management
- ✅ Form handling & validation
- ✅ API integration
- ✅ Responsive design
- ✅ Professional UI/UX

### DevOps Skills
- ✅ Git & GitHub
- ✅ Deployment (Vercel & Render)
- ✅ Environment management
- ✅ CI/CD ready

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation
```bash
# Install dependencies
npm run install-all

# Start development servers
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Environment Variables

**server/.env**
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=development
PORT=5000
```

**client/.env**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📊 Capstone Requirements

### ✅ Task 1: Project Planning & Design
- Wireframes created
- Database schema designed
- API architecture documented
- User stories defined

### ✅ Task 2: Backend Development
- Express.js REST API
- Authentication system
- Bug CRUD operations
- MongoDB integration
- Error handling

### ✅ Task 3: Frontend Development
- React UI with components
- Login/Register pages
- Dashboard with bug list
- Real-time API calls
- Responsive design

### ✅ Task 4: Testing & Quality
- Jest configuration
- Unit tests
- Component tests
- Error handling tests

### ✅ Task 5: Deployment & Documentation
- Deployed to production
- Vercel frontend
- Render backend
- Comprehensive README
- Environment configuration

## 🎯 Future Enhancements

- [ ] User roles (admin, developer)
- [ ] Bug priorities and categories
- [ ] Comments on bugs
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Analytics dashboard

## 📞 Support

For issues or questions:
1. Check the README
2. Review error messages
3. Check browser console (F12)
4. Check backend logs

## 👤 Author

Mawunyo Fevlo Mary

## 📅 Project Timeline

- **Started**: October 2025
- **Completed**: November 2025
- **Deployed**: November 2025

## 📜 License

This is an educational project for the PLP MERN Stack Development Course.

---

**Status**: ✅ Production Ready
**Last Updated**: November 2025