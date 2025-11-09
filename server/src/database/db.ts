import { MongoClient, ServerApiVersion } from "mongodb";
import blogValidator from "../schemaValidators/blog.schemaValidators";
import { Blog } from "../models/blog.model";
import { User } from "../models/user.model";

const uri = process.env.DB_URL;
console.log(uri);
if (!uri) {
  throw new Error("DB_URL is not defined");
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const db = client.db("photon");
const userCollection = db.collection<User>("users");
const blogCollection = db.collection<Blog>("blogs");
const commentCollection = db.collection("comments");

export default async function connectDB() {
  try {
    await client.connect();
    const collections = (await db.collections()).map((c) => c.collectionName);
    if (!collections.includes("blogs")) {
      await db.createCollection("blogs", blogValidator);
    }
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export { userCollection, blogCollection, commentCollection };
