import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// * Router imports
import blogRouter from "./router/blog.router";
import authRouter from "./router/auth.router";
import SessionManager from "./class/SessionManager";

const app = express();

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
