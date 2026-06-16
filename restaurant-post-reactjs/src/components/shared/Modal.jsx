import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-bg-secondary rounded-lg shadow-xl w-full max-w-lg mx-4"
      >
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl text-text-primary font-bold tracking-wide">{title}</h2>
          <button
            className="text-text-secondary text-2xl hover:text-text-primary transition-colors cursor-pointer select-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
