const express = require("express");
const { ethers } = require("ethers");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 8989;
const uri = process.env.MONGO_URI;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

// app.set('view engine', 'ejs');
app.get("/", async (req, res) => {
  try {
    const database = client.db("land_registry_data");
    const collection = database.collection("hackathon");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.post("/log-plot-number", async (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
