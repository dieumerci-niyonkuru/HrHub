import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 I'm HR-Hub AI Assistant. Ask me anything about recruitment, hiring, or how to use our platform!", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Comprehensive AI Response System
  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    
    // Greeting responses
    if (msg.match(/hello|hi|hey|greetings|good morning|good afternoon|good evening/)) {
      return "Hello! 👋 Welcome to HR-Hub! I'm here to help you with recruitment management. What would you like to know?";
    }
    
    // How are you
    if (msg.match(/how are you|how's it going|how do you do/)) {
      return "I'm doing great! 🤖 Ready to help you streamline your recruitment process. How can I assist you today?";
    }
    
    // Thank you
    if (msg.match(/thank|thanks|appreciate/)) {
      return "You're welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about HR-Hub?";
    }
    
    // About HR-Hub
    if (msg.match(/what is hr-hub|about hr-hub|tell me about|what do you do|explain hr-hub/)) {
      return "HR-Hub is a comprehensive Recruitment Management System that helps organizations streamline their hiring process. We offer AI-powered candidate matching, automated interview scheduling, real-time analytics, and complete audit trails. Our platform serves HR professionals, recruiters, and interviewers worldwide! 🚀";
    }
    
    // Features
    if (msg.match(/features|what can you do|capabilities|functionality/)) {
      return "HR-Hub's key features include:\n\n🎯 Smart Recruitment - AI-powered candidate matching\n📊 Real-time Analytics - Track hiring metrics\n🔒 Secure Access - Role-based permissions\n📝 Audit Trail - 100% accountability\n🤝 Collaboration Tools - Team coordination\n📧 Automated Communication - Email notifications\n📅 Interview Scheduling - Easy calendar management\n👥 Candidate Management - Complete tracking\n⭐ Feedback System - Score and evaluate candidates";
    }
    
    // Registration
    if (msg.match(/register|sign up|create account|join|how to join/)) {
      return "To join HR-Hub:\n\n1. Click the '✨ Join Us' button in the top right corner\n2. Fill in your details (name, email, password)\n3. Verify your email address\n4. Login to your account\n5. Start managing candidates and interviews!\n\nIt's completely free to start! 🎉";
    }
    
    // Login
    if (msg.match(/login|sign in|log in|access account/)) {
      return "To login:\n\n1. Click the 'Login' button in the top right\n2. Enter your email and password\n3. Click 'Sign In'\n\nIf you forgot your password, contact support@hr-hub.com for assistance. 🔐";
    }
    
    // Add Candidate
    if (msg.match(/add candidate|create candidate|new candidate|how to add/)) {
      return "To add a candidate:\n\n1. Login as HR or Admin\n2. Go to 'Candidates' page\n3. Click 'Add Candidate'\n4. Fill in candidate details (name, email, position, etc.)\n5. Upload resume (optional)\n6. Click 'Save'\n\nThe candidate will appear in your list and can be tracked through the hiring pipeline! 📝";
    }
    
    // Schedule Interview
    if (msg.match(/schedule interview|create interview|interview booking|set up interview/)) {
      return "To schedule an interview:\n\n1. Go to 'Interviews' page\n2. Click 'Schedule Interview'\n3. Select a candidate\n4. Choose an interviewer\n5. Pick date and time\n6. Add location or meeting link\n7. Click 'Save'\n\nThe interviewer will receive a notification and can submit feedback after the interview! 📅";
    }
    
    // Roles and permissions
    if (msg.match(/roles|permissions|access|user types|who can do what/)) {
      return "HR-Hub has 3 user roles:\n\n👑 SUPER_HR - Full system access, can delete records, view audit logs, manage everything\n📋 HR_ASSISTANT - Can manage candidates, schedule interviews, add interviewers\n🎯 INTERVIEWER - Can view assigned interviews and submit feedback/scores\n\nEach role has specific permissions to ensure security and accountability! 🔒";
    }
    
    // Audit trail
    if (msg.match(/audit|logs|tracking|history|accountability/)) {
      return "The Audit Trail feature tracks EVERY action in HR-Hub:\n\n✅ Who created/updated/deleted records\n✅ When changes were made\n✅ What was changed (before/after)\n✅ IP address of the user\n✅ Timestamp of all actions\n\nSUPER_HR users can view the complete audit log for 100% accountability! 📊";
    }
    
    // Dashboard
    if (msg.match(/dashboard|home page|statistics|metrics/)) {
      return "The Dashboard shows:\n\n📊 Total candidates in the system\n📅 Total interviews scheduled\n🎯 Number of active interviewers\n📈 Real-time recruitment metrics\n\nIt gives you a quick overview of your hiring process at a glance! 📊";
    }
    
    // My Interviews (for interviewers)
    if (msg.match(/my interviews|my assigned|interviews for me|upcoming interviews/)) {
      return "Interviewers can view their assigned interviews on the 'My Interviews' page. There you'll see:\n\n👤 Candidate names\n📅 Scheduled dates and times\n📍 Locations or meeting links\n✍️ Options to submit feedback and scores\n\nYou can mark interviews as completed and add detailed feedback! 📝";
    }
    
    // Feedback and scoring
    if (msg.match(/feedback|score|rating|evaluate candidate/)) {
      return "Interviewers can submit feedback with:\n\n⭐ Score (1-5 rating)\n💬 Detailed feedback notes\n📝 Strengths and weaknesses\n💡 Recommendations (Hire/No Hire/Maybe)\n\nThis helps HR teams make informed hiring decisions! 🎯";
    }
    
    // Email verification
    if (msg.match(/verify email|confirmation email|verification link/)) {
      return "After registration, you'll receive a verification email. Click the link to verify your account. If you don't see it, check your spam folder or contact support@hr-hub.com to resend the verification email! 📧";
    }
    
    // Pricing
    if (msg.match(/price|cost|pricing|free|subscription|paid/)) {
      return "HR-Hub offers flexible pricing:\n\n🚀 Free Tier - Basic features for small teams\n💼 Professional - Advanced features for growing companies\n🏢 Enterprise - Custom solutions for large organizations\n\nContact our sales team for a personalized quote! 💰";
    }
    
    // Support
    if (msg.match(/support|help|contact|assistance|problem|issue/)) {
      return "Need help? We're here for you! 🤝\n\n📧 Email: support@hr-hub.com\n📞 Phone: +250 793 516 483\n💬 Live Chat: Click the chat button anytime\n📚 Documentation: Available in the Help Center\n\nOur support team is available 24/7 to assist you!";
    }
    
    // Technology stack
    if (msg.match(/technology|tech stack|built with|framework|database/)) {
      return "HR-Hub is built with modern technology:\n\n⚛️ Frontend: React 18 + Vite\n🐍 Backend: Django 5.1 + Django REST Framework\n🗄️ Database: SQLite (can switch to PostgreSQL)\n🔐 Authentication: JWT with refresh tokens\n🎨 Styling: Custom CSS with animations\n🤖 AI: Smart response system\n\nEnterprise-ready and scalable! 🚀";
    }
    
    // Security
    if (msg.match(/security|safe|protected|encryption|privacy/)) {
      return "Security is our priority! 🔒\n\n✅ JWT tokens for authentication\n✅ Password hashing with bcrypt\n✅ HTTPS encryption\n✅ Role-based access control\n✅ Audit logging for all actions\n✅ Regular security updates\n\nYour data is safe with HR-Hub!";
    }
    
    // Integration
    if (msg.match(/integrate|api|connect|third party|export/)) {
      return "HR-Hub supports integrations:\n\n🔄 REST API for custom integrations\n📤 Export data to CSV/Excel\n🔗 Connect with email services\n📅 Calendar sync (coming soon)\n\nOur API documentation is available for developers! 🔌";
    }
    
    // Default response for unknown questions
    return "Thanks for your question! 🤔 I'm still learning. For specific inquiries, please email support@hr-hub.com or call +250 793 516 483. Our team will get back to you within 24 hours! Meanwhile, check our FAQ section or try asking about:\n\n• Features\n• Registration\n• Scheduling interviews\n• User roles\n• Audit logs\n• Pricing\n• Support";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        style={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={styles.chatIcon}>🤖</span>
        <span style={styles.chatText}>AI Assistant</span>
      </motion.button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            style={styles.chatWindow}
          >
            <div style={styles.chatHeader}>
              <div style={styles.chatHeaderLeft}>
                <span style={styles.chatAvatar}>🤖</span>
                <div>
                  <div style={styles.chatTitle}>HR-Hub AI Assistant</div>
                  <div style={styles.chatStatus}>Online • 24/7 Support</div>
                </div>
              </div>
              <button style={styles.closeButton} onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div style={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div key={idx} style={msg.isUser ? styles.userMessage : styles.botMessage}>
                  <div style={msg.isUser ? styles.userBubble : styles.botBubble}>
                    {msg.text.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={styles.botMessage}>
                  <div style={styles.typingBubble}>
                    <span>●</span><span>●</span><span>●</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div style={styles.chatInput}>
              <input
                type="text"
                placeholder="Ask me about HR-Hub features, registration, interviews, pricing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={styles.input}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.sendButton}
                onClick={handleSend}
              >
                Send
              </motion.button>
            </div>
            
            <div style={styles.suggestions}>
              <div style={styles.suggestionTitle}>Try asking:</div>
              <div style={styles.suggestionChips}>
                <button onClick={() => setInput("How to add candidate?")} style={styles.chip}>Add candidate</button>
                <button onClick={() => setInput("Schedule interview")} style={styles.chip}>Schedule interview</button>
                <button onClick={() => setInput("What are the features?")} style={styles.chip}>Features</button>
                <button onClick={() => setInput("User roles")} style={styles.chip}>Roles</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "12px 24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
    zIndex: 1000,
    fontWeight: "bold",
  },
  chatIcon: {
    fontSize: "20px",
  },
  chatText: {
    fontSize: "14px",
  },
  chatWindow: {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    width: "380px",
    height: "550px",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    overflow: "hidden",
  },
  chatHeader: {
    padding: "15px 20px",
    backgroundColor: "#f97316",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  chatAvatar: {
    fontSize: "28px",
  },
  chatTitle: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  chatStatus: {
    fontSize: "10px",
    opacity: 0.9,
  },
  closeButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    fontSize: "16px",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userMessage: {
    display: "flex",
    justifyContent: "flex-end",
  },
  botMessage: {
    display: "flex",
    justifyContent: "flex-start",
  },
  userBubble: {
    backgroundColor: "#f97316",
    padding: "10px 15px",
    borderRadius: "18px",
    maxWidth: "85%",
    fontSize: "13px",
    lineHeight: "1.5",
  },
  botBubble: {
    backgroundColor: "#334155",
    padding: "10px 15px",
    borderRadius: "18px",
    maxWidth: "85%",
    fontSize: "13px",
    lineHeight: "1.5",
    whiteSpace: "pre-line",
  },
  typingBubble: {
    backgroundColor: "#334155",
    padding: "12px 18px",
    borderRadius: "18px",
    display: "flex",
    gap: "4px",
  },
  chatInput: {
    padding: "15px",
    borderTop: "1px solid #334155",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "white",
    fontSize: "13px",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#f97316",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  suggestions: {
    padding: "10px 15px 15px",
    borderTop: "1px solid #334155",
  },
  suggestionTitle: {
    fontSize: "11px",
    color: "#94a3b8",
    marginBottom: "8px",
  },
  suggestionChips: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#334155",
    border: "none",
    padding: "5px 12px",
    borderRadius: "15px",
    color: "#cbd5e1",
    fontSize: "11px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
