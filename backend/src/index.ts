import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoClient from "./db/connect";
dotenv.config();
import { UserModel } from "./models/User";

const uri = process.env.MONGO_URI!;

const client = mongoClient(uri);



const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/api/daily_tokens', async (req: Request, res: Response) => {
    try {
        await client.connect();

        const database = client.db("terra_tokens"); 
        const collection = database.collection("daily_tokens"); 

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching daily tokens");
    } finally {
        await client.close();
    }
});

app.get('/api/land_tokens', async (req: Request, res: Response) => {
    try {
        await client.connect();

        const database = client.db("terra_tokens");
        const collection = database.collection("land_tokens");

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching land tokens");
    } finally {
        await client.close();
    }
});


app.get('/api/tokens_for_sale', async (req: Request, res: Response) => {
    try {
        await client.connect();

        const database = client.db("terra_tokens");
        const collection = database.collection("tokens_for_sale");

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching tokens for sale");
    } finally {
        await client.close();
    }
});




app.get('/api/tokens_purchased', async (req: Request, res: Response) => {
    try {
        await client.connect();

        const database = client.db("terra_tokens"); 
        const collection = database.collection("tokens_purchased");

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching tokens purchased");
    } finally {
        await client.close();
    }
});

app.get('/api/users', async (req: Request, res: Response) => {
    try {
        await client.connect();

        const database = client.db("terra_tokens");
        const collection = database.collection("user");

        const data = await collection.find({}).toArray();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    } finally {
        await client.close();
    }
});

app.post('/api/check-user', async (req: Request, res: Response) => {
   
    const { username } = req.body; 

    try {
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});