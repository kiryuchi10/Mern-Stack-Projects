import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            setMessage(response.data); // Optional: Display success message
            setTimeout(() => {
                navigate('/'); // Redirect to login page after a delay
            }, 2000); // Delay of 2 seconds (optional)
        } catch (error) {
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
