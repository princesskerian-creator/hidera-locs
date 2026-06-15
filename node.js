const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Simulation of a local Database store Array
let transactions = [];

// Endpoint destination payload map
app.post('/api/save-transaction', (req, res) => {
    const { reference, email, amount } = req.body;
    transactions.push({ reference, email, amount, date: new Date() });
    console.log("Transaction Log Saved:", reference);
    res.status(200).send({ message: "Transaction recorded safely!" });
});

app.listen(3000, () => console.log('Backend gateway asset active on node port 3000'));