import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const SlidingPanel = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [panelHeight, setPanelHeight] = useState(480);
  const y = useMotionValue(0);
  const height = useTransform(y, [0, 300], [480, 200]);

  useEffect(() => {
    const unsubscribe = height.on("change", (latestHeight) => {
      setPanelHeight(latestHeight);
    });

    return () => unsubscribe();
  }, [height]);

  const handleDragEnd = () => {
    setIsCollapsed(panelHeight < 330);
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        height: panelHeight,
        zIndex: 30,
        backgroundColor: "white",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
      className="m-8"
      animate={{ height: panelHeight }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Drag Handle */}
      <motion.div
        style={{
          width: "100%",
          height: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab",
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(_, info) => {
          y.set(-info.offset.y);
        }}
        onDragEnd={handleDragEnd}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          setPanelHeight(isCollapsed ? 480 : 180);
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            backgroundColor: "#ccc",
            borderRadius: "2px",
          }}
        />
      </motion.div>

      {/* Content Area */}
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
