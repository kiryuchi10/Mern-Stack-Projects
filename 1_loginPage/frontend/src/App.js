// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import WelcomePage from "./components/WelcomePage";
import AppIconsPage from "./components/AppIconsPage";
import "./App.css";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Login Route */}
                    <Route
                        path="/login"
                        element={<LoginForm setAuthenticated={setAuthenticated} />}
                    />

                    {/* Signup Route */}
                    <Route path="/signup" element={<div>Signup Form Coming Soon!</div>} />

                    {/* Protected Dashboard Route */}
                    {authenticated ? (
                        <Route
                            path="/dashboard"
                            element={
                                <div className="container">
                                    <h1>Application Dashboard</h1>
                                    <WelcomePage />
                                    <AppIconsPage />
                                </div>
                            }
                        />
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
