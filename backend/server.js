const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Sambung ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Berjaya Disambungkan ke Cluster0!'))
.catch(err => console.log('Ralat Sambungan MongoDB:', err));

// Schema Pengguna
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Aina' }
});
const User = mongoose.model('User', UserSchema);

// Laluan API Pendaftaran (Register)
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Semak sama ada e-mel sudah wujud
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'E-mel ini telah didaftarkan.' });
        }

        // Cipta pengguna baharu
        const newUser = new User({ email, password, name: name || 'Aina' });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Pendaftaran berjaya!', user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Laluan API Log Masuk (Login) - (DIBETULKAN Kepada req, res)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(400).json({ success: false, message: 'E-mel atau kata laluan salah.' });
        }
        
        res.status(200).json({ success: true, message: 'Log masuk berjaya!', user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server backend berjalan di port ${PORT}`));
