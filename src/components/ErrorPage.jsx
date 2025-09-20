import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components ---

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 82vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 10rem;
  overflow: hidden;
`;

const HomeButton = styled(motion.a)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  background: #3498db;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #2980b9;
  }
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(4rem, 20vw, 15rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.05em;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: -webkit-linear-gradient(45deg, #ff6b6b, #ffe66d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ErrorMessage = styled(motion.p)`
  font-size: clamp(1rem, 5vw, 2rem);
  font-weight: 300;
  max-width: 600px;
  line-height: 1.5;
  margin-top: 1rem;
`;

// --- The Animated Component ---

const ErrorPage = ({ message = "Looks like you've gone off the beaten path." }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <ErrorContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ErrorCode
                variants={itemVariants}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
            >
                404
            </ErrorCode>
            <ErrorMessage variants={itemVariants}>
                {message}
            </ErrorMessage>
            <HomeButton
                href="/"
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                Go to Homepage
            </HomeButton>
        </ErrorContainer>
    );
};

export default ErrorPage;