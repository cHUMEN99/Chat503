import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setLogined,setUserEmail }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
     const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setEmail('');
                setPassword('');
                setLogined(true);
                setUserEmail(user.user.email)
                navigate('/chat');
                
            })
            .catch((error) => {
                console.error("Помилка при вході:", error.message);
                setError("Невірний email або пароль. Спробуйте ще раз.");
            });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Логін</h2>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Введіть email"
                    className="border m-3  p-2"
                />
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Введіть пароль"
                    className="border m-3  p-2 font-mono"
                />
                <button type="submit" className="submit-button">Зайти</button>
                <Link to="/register" className="register-link">
                    <span>Не зареєстровані?</span>
                </Link>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
