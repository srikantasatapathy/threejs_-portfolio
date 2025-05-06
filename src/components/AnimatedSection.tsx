'use client'; // Mark this component as a Client Component

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible, only once
      variants={sectionVariants}
      className={className} // Apply passed class names
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;