import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import '../styles/Chat.css';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const Chat = ({ useremail }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(true);
    const [search, setSearch] = useState('');

    const closeModal = () => {
        setModal(false);
    };

    const handleSubmit = async () => {
        if (message.trim()) {
            try {
                await addDoc(collection(db, 'messages'), {
                    text: message,
                    user: useremail,
                    timestamp: new Date()
                });
                setMessage('');
            } catch (error) {
                console.error("Помилка при відправці повідомлення:", error);
            }
        }
    };

    const handleSearch = (searchTerm, messageArray) => {
        if (!searchTerm) return messageArray;
        return messageArray.filter(({ text }) =>
            text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            const filteredMessages = handleSearch(search, messages);
            setMessages(filteredMessages);
        }, 300);
        return () => clearTimeout(debounce);
    }, [search, messages]);

    useEffect(() => {
        const fetchMessages = () => {
            const messageRef = collection(db, 'messages');
            const q = query(messageRef, orderBy('timestamp'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messagesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messagesData);
            });

            return () => unsubscribe();
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [message]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className="chat-container">
            <Modal show={modal} closemodal={closeModal}>
                <h2>Вітаємо, ви війшли як {useremail}</h2>
                <Link to={`/user/${useremail}`}>
                    {useremail}
                </Link>
                <p>Ви потрапили в чат кімнати 503</p>
                <button onClick={closeModal}>Закрити</button>
            </Modal>
            <div className="bg-amber-400 p-5 w-11/12 m-4">
                <h1>Чат</h1>
                <Link to='/register'><button className='flex justify-end'>Акаунт</button></Link>
            </div>
            <Link to='/'>
                <button className='bg-green-600 p-2 border-none rounded-lg'>Вийти</button>
            </Link>
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className='bg-white p-3 mt-5 rounded-lg'
                placeholder='Введіть слово для пошуку'
            />
            <div className="message-box">
                <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Введіть повідомлення"
                    className="message-input"
                />
                <button onClick={handleSubmit} className="send-button">Надіслати</button>
            </div>
            <ul className="message-list">
                {messages.map((msg, index) => (
                    <li key={`${msg.id}-${index}`} className="message-item">
                        <strong>{msg.user}</strong>: {msg.text}
                        <br />
                        <small className="message-time">
                            {msg.timestamp ? msg.timestamp.toDate().toLocaleString('uk-UA') : ''}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
