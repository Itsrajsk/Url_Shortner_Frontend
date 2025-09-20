// src/components/ShortenUrlPage.jsx

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
      // Use replace() for a cleaner redirect
      window.location.replace(backendUrl);
    }
  }, [url]);

  // Render a simple loading message while redirecting
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default ShortenUrlPage;