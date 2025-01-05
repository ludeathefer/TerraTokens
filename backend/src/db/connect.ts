// db.ts
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient | null = null;

async function connect(): Promise<void> {
  if (!client) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI must be provided");
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("Connected to MongoDB!");
  }
}

function getClient(): MongoClient {
  if (!client) {
    throw new Error("MongoDB client is not connected");
  }
  return client;
}

export { connect, getClient };
