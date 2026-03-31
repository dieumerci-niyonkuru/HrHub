import { motion } from "framer-motion";

export default function Logo({ size = "normal" }) {
  const sizes = {
    small: { width: 32, height: 32, fontSize: 18 },
    normal: { width: 40, height: 40, fontSize: 22 },
    large: { width: 60, height: 60, fontSize: 32 }
  };
  
  const selectedSize = sizes[size] || sizes.normal;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      style={{
        ...styles.container,
        width: selectedSize.width,
        height: selectedSize.height,
      }}
    >
      <svg viewBox="0 0 100 100" style={styles.svg}>
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
        <text x="50" y="68" fontSize="38" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold">HR</text>
        <text x="50" y="85" fontSize="12" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif">HUB</text>
      </svg>
    </motion.div>
  );
}

const styles = {
  container: {
    display: "inline-block",
    cursor: "pointer",
  },
  svg: {
    width: "100%",
    height: "100%",
  }
};
