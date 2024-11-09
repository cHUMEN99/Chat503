const express = require('express');
const admin = require('firebase-admin');
const app = express();
const cors=require('cors')
const PORT = 3001; // або 3001, але не забудьте змінити і в клієнті

// Ініціалізація Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json());


app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials:true
    }))

// Маршрут реєстрації користувача
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Створення користувача в Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password
        });

        // Збереження інформації користувача у Firestore
        await db.collection('userss').doc(userRecord.uid).set({
            useremail: email
        });

        res.status(200).send({ message: 'Користувач зареєстрований успішно' });
    } catch (error) {
        console.error('Помилка під час реєстрації користувача:', error);
        res.status(500).send({ message: 'Реєстрація не вдалася', error });
    }
});

// Запуск сервера на заданому порту
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
