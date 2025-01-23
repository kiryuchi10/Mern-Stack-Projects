// routes/Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import WelcomePage from "../components/WelcomePage";
import AppIconsPage from "../components/AppIconsPage";

const AppRoutes = ({ authenticated, setAuthenticated }) => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
            <Route path="/signup" element={<SignupForm />} />
            {authenticated ? (
                <>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/icons" element={<AppIconsPage />} />
                </>
            ) : (
                <Route path="*" element={<LoginForm setAuthenticated={setAuthenticated} />} />
            )}
        </Routes>
    );
};

export default AppRoutes;
