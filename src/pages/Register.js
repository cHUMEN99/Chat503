import React, { useState } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import '../styles/Register.css';
import { addDoc, collection } from 'firebase/firestore';


const Register = ({ setLogined }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

        const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Реєструємо користувача через Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);

            // Додаємо користувача в колекцію Firestore
            await addDoc(collection(db, 'userss'), {
                useremail: email,
                password: password // Не рекомендовано зберігати пароль як plain text
            });

            // Очищуємо поля введення
            setEmail('');
            setPassword('');
            setLogined(true);
            navigate('/');
        } catch (error) {
            console.error("Помилка під час реєстрації:", error);
        }
    };




    return (
        <div className="register-container">
            <form className="register-form">
                <h1>Реєстрація</h1>
                <input 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                    type="email" 
                    placeholder="Введіть email" 
                />
                <input 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    type="password" 
                    placeholder="Введіть пароль" 
                />
                <button onClick={handleSubmit}>Надіслати</button>
            </form>
            <Link to="/" className="back-link">
                Назад
            </Link>
        </div>
    );
};

export default Register;
