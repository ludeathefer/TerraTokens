import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getClient } from "../db/connect"; // Import your database connection module

const router = express.Router();

// Root route
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

// Get daily tokens
router.get("/api/daily_tokens", async (req: Request, res: Response) => {
  try {
    const database = getClient().db("terra_tokens");
    const collection = database.collection("daily_tokens");

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching daily tokens");
  }
});

// Get land tokens
router.get("/api/land_tokens", async (req: Request, res: Response) => {
  try {
    const database = getClient().db("terra_tokens");
    const collection = database.collection("land_tokens");

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching land tokens");
  }
});

// Get tokens for sale
router.get("/api/tokens_for_sale", async (req: Request, res: Response) => {
  try {
    const database = getClient().db("terra_tokens");
    const collection = database.collection("tokens_for_sale");

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens for sale");
  }
});

// Sell tokens
router.post("/api/sell_tokens", async (req: Request, res: any) => {
  try {
    const { seller, land_hash, price, number_of_tokens } = req.body;

    // Validate input
    if (!seller || !land_hash || !price || !number_of_tokens) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const database = getClient().db("terra_tokens");
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

// Get purchased tokens
router.get("/api/tokens_purchased", async (req: Request, res: Response) => {
  try {
    const database = getClient().db("terra_tokens");
    const collection = database.collection("tokens_purchased");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tokens purchased");
  }
});

// Get users
router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const database = getClient().db("terra_tokens");
    const collection = database.collection("user");

    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

// Check if user exists
router.post("/api/check-user", async (req: any, res: any) => {
  const { user_public_key } = req.body;

  if (!user_public_key) {
    return res.status(400).json({ message: "User public key is required" });
  }

  try {
    const database = getClient().db("terra_tokens");
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
router.post("/api/check-user", async (req: Request, res: any) => {
  const { user_public_key } = req.body;

  if (!user_public_key) {
    return res.status(400).json({ message: "User public key is required" });
  }

  try {
    const database = getClient().db("terra_tokens");
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

// Get top lands based on recent daily token prices
router.get("/api/top-lands", async (req: Request, res: Response) => {
  try {
    const result = await getClient()
      .db("terra_tokens")
      .collection("daily_tokens")
      .aggregate([
        { $sort: { date: -1 } },
        { $group: { _id: null, mostRecentDate: { $first: "$date" } } },
        {
          $lookup: {
            from: "daily_tokens",
            let: { recentDate: "$mostRecentDate" },
            pipeline: [
              { $match: { $expr: { $eq: ["$date", "$$recentDate"] } } },
              { $sort: { price: -1 } },
              { $limit: 10 },
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
        { $unwind: "$landDetails" },
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

// Get recent lands
router.get("/api/recent-lands", async (req: Request, res: Response) => {
  try {
    const result = await getClient()
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

// Get land details by token
router.get("/api/land_tokens/:token", async (req: Request, res: any) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Land token is required" });
  }

  try {
    const landDetail = await getClient()
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

// Get prices for a specific land token over the last week
router.get("/api/land_tokens/:token/prices", async (req: Request, res: any) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Land token is required" });
  }

  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  try {
    const prices = await getClient()
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

// Add a new user
router.post("/api/add-user", async (req: Request, res: any) => {
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
    const result = await getClient()
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

router.post("/api/holding-status", async (req: Request, res: any) => {
  const { user_public_key }: { user_public_key: string } = req.body;

  if (!user_public_key) {
    return res.status(400).json({ message: "User public key is required" });
  }

  try {
    const database = getClient().db("terra_tokens");
    const userCollection = database.collection("user");
    const dailyTokenCollection = database.collection("daily_tokens");

    const user = await userCollection.findOne({ user_public_key });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTokens = user.current_tokens;

    if (!currentTokens || currentTokens.length === 0) {
      return res
        .status(200)
        .json({ message: "No current tokens found for this user" });
    }

    const pricePromises = currentTokens.map(
      async (tokenObj: { hash: string }) => {
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
      }
    );

    const prices = await Promise.all(pricePromises);
    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching holding status:", error);
    res.status(500).json({ message: "Error fetching holding status" });
  }
});

// Buy tokens route
router.post("/api/buy_tokens", async (req: Request, res: any) => {
  try {
    const { buyer, land_hash, price, number_of_tokens, whose } = req.body;

    if (!buyer || !land_hash || !price || !number_of_tokens || !whose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const database = getClient().db("terra_tokens");
    const tokensPurchasedCollection = database.collection("tokens_purchased");
    const tokensForSaleCollection = database.collection("tokens_for_sale");
    const usersCollection = database.collection("user");

    const purchaseRecord = {
      buyer,
      land_hash,
      price,
      number_of_tokens,
    };

    // Insert purchase record
    await tokensPurchasedCollection.insertOne(purchaseRecord);

    // Update tokens for sale
    await tokensForSaleCollection.updateOne(
      { seller: whose, land_hash },
      { $inc: { number_sold: number_of_tokens } }
    );

    // Update user's current tokens
    const userUpdateResult = await usersCollection.updateOne(
      { user_public_key: buyer, "current_tokens.hash": land_hash },
      { $inc: { "current_tokens.$.quantity": number_of_tokens } }
    );

    // If no existing token found, add a new entry
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

export default router;
