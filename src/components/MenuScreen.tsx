import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe2, Car as Cards, Trophy, ChevronRight, GraduationCap, Home, ArrowLeft } from 'lucide-react';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.75,
        delay: 0.2,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300 text-white p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
      >
        Korean Learning App
      </motion.h2>

      <motion.div className="space-y-4 w-full max-w-md">
        <motion.button
          className="flex items-center justify-between w-full bg-white text-indigo-700 py-3 px-5 rounded-full font-semibold shadow-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={() => navigate('/word-game')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Word Game
          <Globe2 className="h-6 w-6 text-indigo-500" />
        </motion.button>

        <motion.button
          className="flex items-center justify-between w-full bg-white text-green-700 py-3 px-5 rounded-full font-semibold shadow-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => navigate('/flashcard-game')} // Navigate to FlashcardScreen
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Flashcards
          <Cards className="h-6 w-6 text-green-500" />
        </motion.button>

        <motion.button
          className="flex items-center justify-between w-full bg-white text-yellow-700 py-3 px-5 rounded-full font-semibold shadow-md hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Achievements
          <Trophy className="h-6 w-6 text-yellow-500" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MenuPage;
