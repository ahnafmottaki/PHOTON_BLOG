import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript Server" });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
