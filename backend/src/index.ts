import express, { Express, NextFunction, Request, Response } from "express";
const cors = require("cors");
import { client, connect } from "./db/connect"; // Import the connected client
import { UserModel } from "./models/User";
import { DailyTokenModel } from "./models/DailyToken";
import { sign } from "jsonwebtoken";

const uri = process.env.MONGO_URI!;

// const client = mongoClient(uri);

const app: Express = express();
const port = process.env.PORT || 3000;

// console.log(process.env.RPC_URL, process.env.PRIVATE_KEY);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect().catch(console.error);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

// async function run() {
//   try {
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/api/daily_tokens", async (req: Request, res: Response) => {
  try {
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
    const database = client.db("terra_tokens");
    const collection = database.collection("tokens_for_sale");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens for sale");
  }
});

app.post("/api/sell_tokens", async (req: Request, res: any) => {
  try {
    const { seller, land_hash, price, number_of_tokens } = req.body;

    // Validate input
    if (!seller || !land_hash || !price || !number_of_tokens) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const database = client.db("terra_tokens");
    const tokensCollection = database.collection("tokens_for_sale");
    const usersCollection = database.collection("user");

    // Create a new token object
    const newToken = {
      seller,
      land_hash,
      price,
      number_of_tokens,
      numbers_sold: 0, // Default value
    };

    // Insert the new token into tokens_for_sale collection
    const result = await tokensCollection.insertOne(newToken);

    // Update the user's current_tokens array
    const updateResult = await usersCollection.updateOne(
      { user_public_key: seller, "current_tokens.hash": land_hash },
      { $inc: { "current_tokens.$.quantity": -number_of_tokens } }
    );

    // Check if user was found and updated
    if (updateResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "User not found or insufficient tokens" });
    }

    // Respond with the inserted token details
    res.status(201).json({ id: result.insertedId, ...newToken });
  } catch (error) {
    console.error("Error saving token or updating user:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/tokens_purchased", async (req: Request, res: Response) => {
  try {
    const database = client.db("terra_tokens");
    const collection = database.collection("tokens_purchased");

    const data = await collection.find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens purchased");
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
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
    const database = client.db("terra_tokens");
    const collection = database.collection("user");
    const user = await collection.findOne({ user_public_key });

    if (user) {
      // Generate session token
      const sessionToken = sign(
        {
          user_public_key,
          userId: user._id,
          // Add any additional claims you want to include
        },
        process.env.JWT_SECRET || "backupOrAlternative",
        {
          expiresIn: "24h",
        }
      );

      // Return success response with token
      return res.status(200).json({
        exists: true,
        sessionToken,
        expiresIn: "24h",
      });
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

app.post("/api/add-user", async (req: Request, res: any) => {
  const { user_public_key, username, email, phone_number } = req.body;

  if (!user_public_key || !username || !email || !phone_number) {
    return res.status(400).json({
      message:
        "All fields are required: user_public_key, username, email, and phone_number",
    });
  }

  const newUser = {
    user_public_key,
    username,
    email,
    phone_number,
    current_tokens: [],
  };

  try {
    const result = await client
      .db("terra_tokens")
      .collection("user")
      .insertOne(newUser);

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).json({ message: "Error adding new user" });
  }
});

app.post("/api/holding-status", async (req: Request, res: any) => {
  const { user_public_key }: { user_public_key: string } = req.body;

  if (!user_public_key) {
    return res.status(400).json({ message: "User public key is required" });
  }

  try {
    const database = client.db("terra_tokens");
    const userCollection = database.collection("user");
    const dailyTokenCollection = database.collection("daily_tokens");

    const user = await userCollection.findOne({ user_public_key });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTokens = user.current_tokens;

    if (currentTokens.length === 0) {
      return res
        .status(200)
        .json({ message: "No current tokens found for this user" });
    }

    const pricePromises = currentTokens.map(async (tokenObj: any) => {
      const { hash } = tokenObj;

      const latestPriceData = await dailyTokenCollection
        .find({ token: hash })
        .sort({ date: -1 })
        .limit(1)
        .toArray();

      if (latestPriceData.length > 0) {
        return {
          token: hash,
          price: latestPriceData[0].price,
          date: latestPriceData[0].date,
        };
      } else {
        return {
          token: hash,
          price: null,
          date: null,
        };
      }
    });

    const prices = await Promise.all(pricePromises);

    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching holding status:", error);
    res.status(500).json({ message: "Error fetching holding status" });
  } finally {
    await client.close();
  }
});

app.post("/api/buy_tokens", async (req: Request, res: any) => {
  try {
    const { buyer, land_hash, price, number_of_tokens, whose } = req.body;

    if (!buyer || !land_hash || !price || !number_of_tokens || !whose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const database = client.db("terra_tokens");
    const tokensPurchasedCollection = database.collection("tokens_purchased");
    const tokensForSaleCollection = database.collection("tokens_for_sale");
    const usersCollection = database.collection("users");

    const purchaseRecord = {
      buyer,
      land_hash,
      price,
      number_of_tokens,
    };

    await tokensPurchasedCollection.insertOne(purchaseRecord);

    await tokensForSaleCollection.updateOne(
      { seller: whose, land_hash },
      { $inc: { number_sold: number_of_tokens } }
    );

    const userUpdateResult = await usersCollection.updateOne(
      { user_public_key: buyer, "current_tokens.hash": land_hash },
      { $inc: { "current_tokens.$.quantity": number_of_tokens } }
    );

    if (userUpdateResult.modifiedCount === 0) {
      await usersCollection.updateOne(
        { user_public_key: buyer },
        {
          $addToSet: {
            current_tokens: {
              hash: land_hash,
              quantity: number_of_tokens,
            },
          },
        }
      );
    }

    res
      .status(201)
      .json({ message: "Tokens purchased successfully", purchaseRecord });
  } catch (error) {
    console.error("Error processing token purchase:", error);
    res.status(500).send("Internal server error");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
