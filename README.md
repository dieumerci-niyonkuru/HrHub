# 🤝 HR-Hub - Professional Recruitment Management System

[![Django](https://img.shields.io/badge/Django-5.1-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> A complete, production-ready Recruitment Management System with AI-powered chatbot, role-based access control, and comprehensive audit logging.

## 🚀 Live Demo

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin

## ✨ Features

### 🎯 Core Features
- **3-Tier Role-Based Access**: SUPER_HR, HR_ASSISTANT, INTERVIEWER with granular permissions
- **Candidate Management**: Full CRUD operations with status tracking
- **Interview Scheduling**: Schedule, track, and score interviews
- **Real-time Dashboard**: Interactive statistics and analytics
- **Audit Logging**: 100% accountability with immutable audit trails
- **Email Verification**: Secure user registration with email confirmation

### 🤖 Advanced Features
- **AI Chatbot Assistant**: Intelligent chatbot that answers user questions about the system
- **Dynamic Navbar**: Changes appearance on scroll with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Glass morphism effects, gradients, and micro-interactions
- **Smooth Scroll Animations**: Elements fade in as you scroll
- **Professional Branding**: Custom logo and company information

### 🔒 Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: Passwords are hashed and salted
- **Role-Based Access Control**: Fine-grained permissions
- **Audit Trail**: Complete history of all system actions
- **IP Tracking**: Records IP addresses for security

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Tech Stack

### Backend
- **Framework**: Django 5.1
- **REST API**: Django REST Framework
- **Authentication**: JWT (SimpleJWT)
- **Database**: SQLite (can switch to PostgreSQL)
- **Email**: Console backend for development

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Styling**: Custom CSS with modern design

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/dieumerci-niyonkuru/HrHub.git
cd HrHub
Step 2: Backend Setup
bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend server
python manage.py runserver
Step 3: Frontend Setup (New Terminal)
bash
cd frontend
npm install
npm run dev
Step 4: Access the Application
Frontend: http://localhost:5173

Backend API: http://localhost:8000/api/

Admin Panel: http://localhost:8000/admin

🚀 Quick Start
Default Admin Login
Email: admin@hrhub.com

Password: admin123

Create Your First Candidate
Login as HR or Admin

Navigate to "Candidates"

Click "Add Candidate"

Fill in candidate details

Click "Save"

Schedule an Interview
Go to "Interviews"

Click "Schedule Interview"

Select candidate and interviewer

Choose date and time

Add location or meeting link

Click "Schedule"

👥 User Roles
Role	Permissions
SUPER_HR	Full system access, audit logs, permanent deletions
HR_ASSISTANT	Manage candidates, interviews, interviewers
INTERVIEWER	View assigned interviews, submit feedback and scores
🔌 API Endpoints
Authentication
Endpoint	Method	Description
/api/token/	POST	Login - Get JWT tokens
/api/token/refresh/	POST	Refresh access token
/api/token/blacklist/	POST	Logout - Blacklist token
/api/register/	POST	Register new user
/api/verify-email/<token>/	GET	Verify email
Users
Endpoint	Method	Description
/api/me/	GET	Get current user profile
/api/users/	GET	List all users (SUPER_HR only)
/api/interviewers/	GET/POST	List/create interviewers
Recruitment
Endpoint	Method	Description
/api/recruitment/candidates/	GET/POST	List/create candidates
/api/recruitment/candidates/<id>/	GET/PUT/DELETE	Get/update/delete candidate
/api/recruitment/interviews/	GET/POST	List/create interviews
/api/recruitment/interviews/<id>/	GET/PUT/DELETE	Get/update/delete interview
/api/recruitment/my-interviews/	GET	Get interviewer's interviews
📁 Project Structure
text
HrHub/
├── core/                   # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── views.py
├── users/                  # User management app
│   ├── models.py          # Custom User model
│   ├── views.py           # Authentication views
│   ├── serializers.py
│   └── urls.py
├── recruitment/            # Recruitment app
│   ├── models.py          # Candidate & Interview models
│   ├── views.py           # CRUD operations
│   ├── serializers.py
│   └── urls.py
├── audit/                  # Audit logging app
│   └── models.py          # AuditLog model
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # Auth context
│   │   └── App.jsx        # Main app
│   └── package.json
└── requirements.txt        # Python dependencies
🚢 Deployment
Deploy to Render
Push code to GitHub

Create new Web Service on Render

Connect your GitHub repository

Set build command: pip install -r requirements.txt

Set start command: gunicorn core.wsgi:application

Deploy to Railway
bash
npm install -g @railway/cli
railway login
railway init
railway up
Environment Variables
Create .env file:

env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://...
🤖 AI Chatbot Commands
The built-in AI assistant can answer questions about:

How to register and login

Adding candidates and scheduling interviews

User roles and permissions

Audit trail features

System capabilities

Support and contact information

📊 Database Schema
Users Table
email (unique), first_name, last_name, role

phone, department, position

is_verified, is_available

created_at, updated_at

Candidates Table
first_name, last_name, email, phone

position, department, status

skills, experience, expected_salary

created_by, created_at

Interviews Table
candidate, interviewer

interview_type, scheduled_at

location, status, score

feedback, created_at

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Authors
Dieu Merci Niyonkuru - LinkedIn

Christian Tematio NGAPGUE WANDJI - LinkedIn

🙏 Acknowledgments
Django REST Framework for powerful API tools

React community for amazing frontend libraries

All contributors and users of HR-Hub

📞 Contact & Support
Email: support@hr-hub.com

Phone: +250 793 516 483

GitHub Issues: Create Issue

