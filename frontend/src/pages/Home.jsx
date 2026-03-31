import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

function AnimatedSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroContent}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={styles.logoWrapper}
          >
            <img src="/hr-hub-logo.svg" alt="HR-Hub" style={styles.logo} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={styles.heroTitle}
          >
            Welcome to <span style={styles.gradient}>HR-Hub</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={styles.heroSubtitle}
          >
            The Ultimate Recruitment Management System
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={styles.heroDescription}
          >
            Streamline your hiring process with AI-powered candidate matching, 
            automated interview scheduling, and real-time analytics.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={styles.heroButtons}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" style={styles.primaryBtn}>✨ Join HR-Hub Now</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection("features")} style={styles.secondaryBtn}>
                Explore Features ↓
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section id="features" style={styles.features}>
        <AnimatedSection>
          <h2 style={styles.sectionTitle}>Why Choose <span style={styles.gradient}>HR-Hub</span>?</h2>
        </AnimatedSection>
        
        <div style={styles.featuresGrid}>
          {[
            { icon: "🎯", title: "Smart Recruitment", desc: "AI-powered candidate matching and intelligent interview scheduling that saves you 40% of hiring time", color: "#f97316" },
            { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security with role-based access control. Your data is encrypted and protected", color: "#3b82f6" },
            { icon: "📊", title: "Real-time Analytics", desc: "Track recruitment metrics, get actionable insights, and make data-driven hiring decisions", color: "#10b981" },
            { icon: "🤝", title: "Collaborative", desc: "Seamless communication between HR teams and interviewers with automated feedback collection", color: "#8b5cf6" },
            { icon: "📧", title: "Automated Communication", desc: "Send automated emails, schedule reminders, and keep candidates informed", color: "#ec489a" },
            { icon: "📝", title: "Audit Trail", desc: "100% accountability with immutable audit logs tracking every action", color: "#f59e0b" },
          ].map((feature, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ ...styles.featureCard, borderTop: `4px solid ${feature.color}` }}
              >
                <div style={{ ...styles.featureIcon, backgroundColor: `${feature.color}20` }}>{feature.icon}</div>
                <h3 style={{ color: feature.color }}>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section style={styles.howItWorks}>
        <AnimatedSection>
          <h2 style={styles.sectionTitle}>How <span style={styles.gradient}>HR-Hub</span> Works</h2>
        </AnimatedSection>
        
        <div style={styles.stepsGrid}>
          {[
            { number: "01", title: "Create Account", desc: "Sign up as HR or Interviewer and set up your profile", icon: "📝" },
            { number: "02", title: "Add Candidates", desc: "Import candidates, review resumes, and track their progress", icon: "👥" },
            { number: "03", title: "Schedule Interviews", desc: "Assign interviewers, set dates, and send automated invites", icon: "📅" },
            { number: "04", title: "Evaluate & Hire", desc: "Collect feedback, score candidates, and make offers", icon: "🎉" },
          ].map((step, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={styles.stepCard}
              >
                <div style={styles.stepNumber}>{step.number}</div>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsGrid}>
          {[
            { number: "1000+", label: "Candidates Placed" },
            { number: "500+", label: "Companies Trust Us" },
            { number: "50+", label: "Expert Interviewers" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "40%", label: "Time Saved" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.05}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={styles.statCard}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section style={styles.testimonials}>
        <AnimatedSection>
          <h2 style={styles.sectionTitle}>What Our <span style={styles.gradient}>Clients Say</span></h2>
        </AnimatedSection>
        
        <div style={styles.testimonialsGrid}>
          {[
            { text: "HR-Hub transformed our recruitment process. We reduced hiring time by 40% and found amazing talent!", name: "Sarah Johnson", title: "HR Director, TechCorp", rating: 5 },
            { text: "The audit trail feature gives us complete transparency. Every action is tracked and accountable.", name: "Michael Chen", title: "Operations Manager, InnovateLabs", rating: 5 },
            { text: "As an interviewer, I love how easy it is to submit feedback and track my interviews.", name: "David Kim", title: "Senior Interviewer, GlobalTech", rating: 5 },
          ].map((testimonial, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                style={styles.testimonialCard}
              >
                <div style={styles.testimonialRating}>{"⭐".repeat(testimonial.rating)}</div>
                <p style={styles.testimonialText}>"{testimonial.text}"</p>
                <div style={styles.testimonialAuthor}>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={styles.cta}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.ctaContent}
        >
          <h2 style={styles.ctaTitle}>Ready to Transform Your Recruitment?</h2>
          <p style={styles.ctaDescription}>
            Join thousands of companies using HR-Hub to find the best talent faster and more efficiently.
            Start your free trial today - no credit card required!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" style={styles.ctaBtn}>Start Free Trial →</Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
  },
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "6rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  logoWrapper: {
    marginBottom: "2rem",
  },
  logo: {
    width: "100px",
    height: "100px",
  },
  heroTitle: {
    fontSize: "3.5rem",
    marginBottom: "1rem",
    color: "#f1f5f9",
  },
  gradient: {
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    color: "#cbd5e1",
    marginBottom: "1rem",
  },
  heroDescription: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#f97316",
    color: "white",
    padding: "0.75rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
  },
  secondaryBtn: {
    backgroundColor: "#334155",
    color: "white",
    padding: "0.75rem 2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  features: {
    padding: "5rem 2rem",
    backgroundColor: "#0f172a",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#f1f5f9",
    marginBottom: "3rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    transition: "all 0.3s",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
    display: "inline-block",
    padding: "1rem",
    borderRadius: "50%",
  },
  howItWorks: {
    padding: "5rem 2rem",
    backgroundColor: "#0f172a",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  stepCard: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    position: "relative",
  },
  stepNumber: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    backgroundColor: "#f97316",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "bold",
  },
  stepIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  stats: {
    padding: "5rem 2rem",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  statCard: {
    padding: "2rem",
    cursor: "pointer",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: "0.5rem",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: "1rem",
  },
  testimonials: {
    padding: "5rem 2rem",
    backgroundColor: "#0f172a",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  testimonialCard: {
    backgroundColor: "#1e293b",
    padding: "2rem",
    borderRadius: "12px",
  },
  testimonialRating: {
    marginBottom: "1rem",
  },
  testimonialText: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#cbd5e1",
    marginBottom: "1rem",
    fontStyle: "italic",
  },
  testimonialAuthor: {
    borderTop: "1px solid #334155",
    paddingTop: "1rem",
    marginTop: "1rem",
  },
  cta: {
    padding: "5rem 2rem",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    color: "white",
    marginBottom: "1rem",
  },
  ctaDescription: {
    fontSize: "1.1rem",
    color: "white",
    marginBottom: "2rem",
  },
  ctaBtn: {
    backgroundColor: "white",
    color: "#f97316",
    padding: "0.75rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
  },
};
