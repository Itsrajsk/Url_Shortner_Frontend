import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import ShortenUrlPage from "./components/ShortenUrlPage";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Toaster />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                    path="/register"
                    element={
                        <PrivateRoute publicPage={true}>
                            <RegisterPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/:url" element={<ShortenUrlPage />} />
                <Route
                    path="/login"
                    element={
                        <PrivateRoute publicPage={true}>
                            <LoginPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute publicPage={false}>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/error"
                    element={
                        <ErrorPage message="We can't seem to find the page you're looking for" />
                    }
                />
                <Route
                    path="*"
                    element={
                        <ErrorPage message="We can't seem to find the page you're looking for" />
                    }
                />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    );
};
