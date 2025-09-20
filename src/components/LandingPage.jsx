// LandingPage.jsx
import React from "react";
import Card from "./Card";
import { motion } from "framer-motion"; // Import motion
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const dashBoardNavigateHandler = () => {};
  // Animation variants for the hero section elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for cards (will use `whileInView`)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-0 sm:pt-0 lg:pt-0">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-10 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-10">
          {/* Text Section */}
          <motion.div
            className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
              variants={itemVariants}
            >
              <span className="text-gray-950">Linklytics</span> Simplifies URL
              Shortening
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={itemVariants}
            >
              Generate concise, easy-to-share URLs in seconds. Simplify your
              sharing experience with our intuitive and powerful platform.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center gap-x-6"
              variants={itemVariants} // Apply to the container of buttons
            >
              <button
                onClick={dashBoardNavigateHandler}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300 transform hover:scale-105"
              >
                Manage Links
              </button>

              <button
                onClick={dashBoardNavigateHandler}
                className="text-gray-900 font-semibold px-8 py-3 transition-colors duration-300 hover:text-gray-600"
              >
                Create Short Link <span aria-hidden="true">→</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow lg:flex-auto lg:max-w-sm mx-10"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src="/images/Links.png"
              alt="Linklytics Dashboard"
              className="w-full object-cover rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative isolate overflow-hidden my-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              className="text-xl font-semibold leading-7 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              Our Features
            </motion.p>
            <motion.h2
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to share and track your links
            </motion.h2>
          </div>
          <motion.div
            className="my-5 mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8"
            variants={containerVariants} // Reusing container for stagger
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the container is in view
          >
            <motion.div variants={cardVariants}>
              <Card
                title="URL Shortening"
                desc="Create short, memorable URLs in a few clicks with our intuitive and hassle-free interface."
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card
                title="Powerful Analytics"
                desc="Track clicks, geography, and referrals with our detailed dashboard to optimize your strategy."
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card
                title="Enhanced Security"
                desc="All shortened URLs are protected with advanced security, keeping your data safe and private."
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <Card
                title="Fast and Reliable"
                desc="Enjoy lightning-fast redirects with high uptime, ensuring your links are always accessible."
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
