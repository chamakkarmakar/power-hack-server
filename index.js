const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Root API
app.get('/', (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log("power hack port", port);
})
