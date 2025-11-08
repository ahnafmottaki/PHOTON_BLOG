import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";
import connectDB from "./database/db";
import morgan from "morgan";
import errorMiddleware from "./middleware/error-middleware";
import notFound from "./middleware/not-found";
import cookieParser from "cookie-parser";
import cloudinarySignatureRouter from "./routes/cloudinary.route";

// Load environment variables

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api", cloudinarySignatureRouter);
// Default route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Express + TypeScript Server" });
});

app.use(notFound);

app.use(errorMiddleware);

// Start server
app.listen(port, async () => {
  await connectDB();
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
