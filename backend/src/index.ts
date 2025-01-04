import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
import mongoClient from "./db/connect";
dotenv.config();
import { UserModel } from "./models/User";

const uri = process.env.MONGO_URI!;

const client = mongoClient(uri);

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/api/daily_tokens", async (req: Request, res: Response) => {
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("daily_tokens");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching daily tokens");
  }
});

app.get("/api/land_tokens", async (req: Request, res: Response) => {
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("land_tokens");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching land tokens");
  }
});

app.get("/api/tokens_for_sale", async (req: Request, res: Response) => {
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("tokens_for_sale");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens for sale");
  }
});

app.get("/api/tokens_purchased", async (req: Request, res: Response) => {
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("tokens_purchased");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens purchased");
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("user");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

app.post("/api/check-user", async (req: any, res: any) => {
  const { user_public_key } = req.body;

  if (!user_public_key) {
    return res.status(400).json({ message: "User public key is required" });
  }
  try {
    await client.connect();

    const database = client.db("terra_tokens");
    const collection = database.collection("user");

    const user = await collection.findOne({ user_public_key });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Error fetching users");
  }
});

app.get("/api/top-lands", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const result = await client
      .db("terra_tokens")
      .collection("daily_tokens")
      .aggregate([
        {
          $sort: { date: -1 },
        },
        {
          $group: {
            _id: null,
            mostRecentDate: { $first: "$date" },
          },
        },
        {
          $lookup: {
            from: "daily_tokens",
            let: { recentDate: "$mostRecentDate" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$date", "$$recentDate"] },
                },
              },
              {
                $sort: { price: -1 },
              },
              {
                $limit: 10,
              },
            ],
            as: "topTokens",
          },
        },
        {
          $lookup: {
            from: "land_tokens",
            localField: "topTokens.token",
            foreignField: "token",
            as: "landDetails",
          },
        },
        {
          $unwind: "$landDetails",
        },
        {
          $project: {
            _id: 0,
            token: "$topTokens.token",
            price: { $arrayElemAt: ["$topTokens.price", 0] },
            landDetail: "$landDetails.land_detail",
          },
        },
      ])
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching top lands:", error);
    res.status(500).json({ message: "Error fetching top lands" });
  }
});

app.get("/api/recent-lands", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const result = await client
      .db("terra_tokens")
      .collection("land_tokens")
      .find()
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching recent lands:", error);
    res.status(500).json({ message: "Error fetching recent lands" });
  }
});

app.get("/api/land_tokens/:token", async (req: Request, res: any) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Land token is required" });
  }

  try {
    await client.connect();
    const landDetail = await client
      .db("terra_tokens")
      .collection("land_tokens")
      .findOne({ token });

    if (landDetail) {
      return res.status(200).json(landDetail.land_detail);
    } else {
      return res.status(404).json({ message: "Land not found" });
    }
  } catch (error) {
    console.error("Error fetching land details:", error);
    return res.status(500).json({ message: "Error fetching land details" });
  }
});

app.get("/api/land_tokens/:token/prices", async (req: Request, res: any) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Land token is required" });
  }
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  try {
    await client.connect();
    const prices = await client
      .db("terra_tokens")
      .collection("daily_tokens")
      .find({
        token,
        date: { $gte: last7Days.toISOString().split("T")[0] },
      })
      .sort({ date: -1 })
      .toArray();

    if (prices.length > 0) {
      return res.status(200).json(prices);
    } else {
      return res
        .status(404)
        .json({ message: "No price data found for the last 7 days" });
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    return res.status(500).json({ message: "Error fetching price data" });
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
