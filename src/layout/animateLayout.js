import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimatedComponent = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.6 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "tween",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedComponent;
