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
        const billingCollection = client.db('dbBilling_info').collection('billing');
        console.log('Billing database connected');

         // load all data from database
         app.get('/api/billing-list', async (req, res) => {
            const query = {};
            const cursor = billingCollection.find(query);
            const billings = await cursor.toArray();
            res.send(billings);
        });

        // insert data to the database
        app.post('/api/add-billing', async (req, res) => {
            const newBill = req.body;
            const result = await billingCollection.insertOne(newBill);
            res.send(result);
        });

        // Delete data
        app.delete('/api/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await billingCollection.deleteOne(query);
            res.send(result);
        });
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
