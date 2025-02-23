const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelo de Orden
const Order = require('./models/Order');

// Ruta para guardar pedidos
app.post('/api/save-order', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        
        // Configuración del email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Enviar email al cliente
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.body.customerInfo.email,
            subject: 'Confirmación de Pedido',
            html: `
                <h1>¡Gracias por tu compra!</h1>
                <p>Tu número de pedido es: ${order.id}</p>
                <p>Pronto recibirás información sobre el envío.</p>
            `
        });

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
