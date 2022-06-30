const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zkum8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const billingCollection = client.db('dbBilling_info').collection('biling');
        console.log('Billing database connected');
    }
    finally {

    }
}
run().catch(console.dir);



// Root API
app.get('/', (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log("power hack port", port);
})
