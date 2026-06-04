const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Node Admin Auth API'
    });
});
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.listen(process.env.PORT, () => {
    console.log(`url is http://localhost:${process.env.PORT}`);
})