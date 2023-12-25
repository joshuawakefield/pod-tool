console.log("Backend server is spinning up...");

const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

const printifyApiKey = process.env.PRINTIFY_API_KEY;

app.use(express.json());

// Test route for Printify API connection
app.get('/test-printify', async (req, res) => {
    try {
        const response = await axios.get('https://api.printify.com/v1/shops.json', {
            headers: { Authorization: `Bearer ${printifyApiKey}` }
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error connecting to Printify:', error);
        res.status(500).send('Failed to connect to Printify');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});