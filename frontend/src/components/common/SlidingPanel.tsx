import { motion } from "framer-motion";
import { useState } from "react";

const SlidingPanel = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const height = isCollapsed ? 100 : 500; // Height when collapsed or expanded

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%", // Center horizontally
        transform: "translateX(-50%)", // Center horizontally
        width: "90%", // Adjust width as needed
        // maxWidth: , // Set a maximum width
        height: `${height}px`,
        zIndex: 30,
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
      className="m-8"
      animate={{ height: `${height}px` }} // Animate height
      transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth animation
    >
      {/* Drag Handle */}
      <div
        style={{
          width: "100%",
          height: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab",
        }}
        onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse on click
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#ccc",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Market Cards */}
      <div
        style={{
          padding: "16px",
          overflowY: "auto",
          height: "calc(100% - 24px)",
        }}
        className="mx-8"
      >
        {children}
      </div>
    </motion.div>
  );
};
export default SlidingPanel;
