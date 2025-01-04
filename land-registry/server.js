const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        // Connect the client to the server
        await client.connect();

        const database = client.db("land_registry_data"); // Replace with your database name
        const collection = database.collection("hackathon"); // Replace with your collection name

        const data = await collection.find({}).toArray();

        res.render('index', { data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
