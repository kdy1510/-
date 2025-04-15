import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: 'easeOut'
      }
    }
  };

  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const subheadingVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        delay: 0.75,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-4xl font-bold mb-2"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Korean Learning App
      </motion.h1>
      <motion.p
        className="text-lg italic"
        variants={subheadingVariants}
        initial="hidden"
        animate="visible"
      >
        Learn Korean in a fun and interactive way!
      </motion.p>
    </motion.div>
  );
};

export default IntroPage;
