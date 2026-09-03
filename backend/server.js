const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Sambung ke MongoDB menggunakan URI daripada fail .env yang anda baru buat
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Berjaya Disambungkan ke Cluster0!'))
.catch(err => console.log('Ralat Sambungan MongoDB:', err));

// Schema Pengguna Ringkas
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Aina' }
});
const User = mongoose.model('User', UserSchema);

// Laluan API Log Masuk
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server backend berjalan di port ${PORT}`));
