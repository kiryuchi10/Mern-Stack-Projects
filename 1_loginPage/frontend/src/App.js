// App.js
import React from "react";
import WelcomePage from "./components/WelcomePage";
import AppIconsPage from "./components/AppIconsPage";
import "./App.css";

function App() {
    return (
        <div className="container">
            <h1>Application Dashboard</h1>
            <WelcomePage />
            <AppIconsPage />
        </div>
    );
}

export default App;
