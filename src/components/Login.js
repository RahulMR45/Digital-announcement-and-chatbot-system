// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Updated import
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth(); // Use the hook to access login
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded credentials
        const validUsername = "admin";
        const validPassword = "password";

        if (username === validUsername && password === validPassword) {
            login(); // Set authentication state in context
            navigate("/admin"); // Redirect to admin page
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Admin Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
