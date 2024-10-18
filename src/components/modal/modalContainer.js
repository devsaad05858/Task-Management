import React from "react";
import { motion } from "framer-motion";
import { useUi } from "@/hooks/useUserInterface";

const Modal = ({ children, onClose }) => {
  const { hideModal } = useUi();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 bg-black/30 grid place-items-center z-50 h-screen w-screen overflow-auto"
      onClick={onClose ?? hideModal}
    >
      <div
        className="relative h-screen w-screen"
        onClick={onClose ?? hideModal}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
