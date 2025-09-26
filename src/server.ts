import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
// * Router imports
import blogRouter from "./router/blog.router";
import authRouter from "./router/auth.router";
import SessionManager from "./class/SessionManager";
import auditLogger from "./middleware/audit-logger";
import checkUserAgent from "./middleware/checkUserAgent";

const app = express();
app.use(auditLogger);
app.use(checkUserAgent);
// rate limiter
const rateLimiter = rateLimit({
  // test
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  // windowMs: 10 * 1000, // 10 seconds
  // limit: 1, // limit each IP to 1 requests per windowMs
});
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);

// running session clear function
SessionManager.clearSessionPeriodically();

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
