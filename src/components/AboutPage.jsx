// AboutPage.jsx
import React from "react";
import { FaChartLine, FaEdit, FaLink, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLink className="text-white text-2xl" />,
    title: "Simplifies URL Shortening",
    desc: "Create short, memorable URLs in a few clicks with our intuitive and hassle-free interface.",
  },
  {
    icon: <FaChartLine className="text-white text-2xl" />,
    title: "Powerful Analytics",
    desc: "Track clicks, geography, and referrals with our detailed dashboard to optimize your strategy.",
  },
  {
    icon: <FaEdit className="text-white text-2xl" />,
    title: "Enhanced Security",
    desc: "All shortened URLs are protected with advanced security, keeping your data safe and private.",
  },
  {
    icon: <FaShareAlt className="text-white text-2xl" />,
    title: "Fast and Reliable",
    desc: "Enjoy lightning-fast redirects with high uptime, ensuring your links are always accessible.",
  },
];

const AboutPage = () => {
  // Animation variants for the header section
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation variants for the feature cards
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardItemVariants = {
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
    <div className="min-h-screen bg-white text-gray-800 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl lg:text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-base font-semibold leading-7 text-gray-600"
            variants={headerItemVariants}
          >
            About Our Mission
          </motion.p>
          <motion.h1
            className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            variants={headerItemVariants}
          >
            Linklytics makes URL shortening effortless
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={headerItemVariants}
          >
            Linklytics is designed to streamline your link management, providing
            you with a simple, powerful, and secure platform to shorten, manage,
            and track your links with ease.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((item) => (
              <motion.div
                key={item.title}
                variants={cardItemVariants}
                className="flex flex-col gap-y-8 bg-gray-50 p-8 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.03]"
              >
                <div className="flex items-center gap-x-4">
                  <div className="rounded-full bg-gray-900 p-2 text-white">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h2>
                </div>
                <p className="text-base leading-7 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
