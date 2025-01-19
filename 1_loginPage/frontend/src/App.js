import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import WelcomePage from './components/WelcomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/welcome" element={<WelcomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
