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

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
              <Route path="/" element={<AppLayout><Home /></AppLayout>} />
              <Route path="/about" element={<AppLayout><About /></AppLayout>} />
              <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
              <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
              <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
              <Route path="/forgot-password" element={<AppLayout><ForgotPassword /></AppLayout>} />
              <Route path="/reset-password/:token" element={<AppLayout><ResetPassword /></AppLayout>} />
              <Route path="/dashboard" element={<PrivateRoute><AppLayout><Dashboard /></AppLayout></PrivateRoute>} />
              <Route path="/candidates" element={<PrivateRoute><AppLayout><Candidates /></AppLayout></PrivateRoute>} />
              <Route path="/interviews" element={<PrivateRoute><AppLayout><Interviews /></AppLayout></PrivateRoute>} />
              <Route path="/interviewers" element={<PrivateRoute><AppLayout><Interviewers /></AppLayout></PrivateRoute>} />
              <Route path="/my-interviews" element={<PrivateRoute><AppLayout><MyInterviews /></AppLayout></PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
