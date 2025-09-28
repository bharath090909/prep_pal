import type { Express } from "express";
import express from "express";
import authRouter from "./routes/auth.route.ts";

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
