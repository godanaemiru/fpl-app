const axios = require('axios');

const initializePayment = async (req, res) => {
    try {
        const { email, name, amount } = req.body;

        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            {
                tx_ref: `h-vpm-${Date.now()}`, // Unique transaction ID
                amount: amount, // e.g., 10000 for 10,000 UGX
                currency: 'UGX',
                redirect_url: 'http://localhost:5173/payment-success',
                customer: {
                    email: email,
                    name: name
                },
                customizations: {
                    title: 'FPL Analytics Pro',
                    description: 'Unlock Differential Gems & AI Captaincy'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Payment initialization failed' });
    }
};

module.exports = { initializePayment };