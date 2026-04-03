import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Interviews from "./pages/Interviews";
import Interviewers from "./pages/Interviewers";
import MyInterviews from "./pages/MyInterviews";

// Redirect logged-in users away from auth pages
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// Require authentication
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Only SUPER_HR and HR_ASSISTANT can access
function HRRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "INTERVIEWER") return <Navigate to="/dashboard" replace />;
  return children;
}

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#0f172a", color: "#f1f5f9" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<AppLayout><Home /></AppLayout>} />
              <Route path="/about" element={<AppLayout><About /></AppLayout>} />
              <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />

              {/* Auth - redirect if already logged in */}
              <Route path="/login" element={<PublicRoute><AppLayout><Login /></AppLayout></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><AppLayout><Register /></AppLayout></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><AppLayout><ForgotPassword /></AppLayout></PublicRoute>} />
              <Route path="/reset-password/:token" element={<AppLayout><ResetPassword /></AppLayout>} />

              {/* Private - all roles */}
              <Route path="/dashboard" element={<PrivateRoute><AppLayout><Dashboard /></AppLayout></PrivateRoute>} />

              {/* HR Only */}
              <Route path="/candidates" element={<HRRoute><AppLayout><Candidates /></AppLayout></HRRoute>} />
              <Route path="/interviews" element={<HRRoute><AppLayout><Interviews /></AppLayout></HRRoute>} />
              <Route path="/interviewers" element={<HRRoute><AppLayout><Interviewers /></AppLayout></HRRoute>} />

              {/* Interviewer */}
              <Route path="/my-interviews" element={<PrivateRoute><AppLayout><MyInterviews /></AppLayout></PrivateRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
