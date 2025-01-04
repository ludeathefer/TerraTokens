// app.ts
import express from "express";
import { dbConnectionMiddleware } from "./middleware/middleware";
import routes from "./routes/routes";

const app = express();

app.use(express.json());

app.use(dbConnectionMiddleware);

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
