import { MongoClient, ServerApiVersion } from "mongodb";

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

const userCollection = client.db("photon").collection("users");
const blogCollection = client.db("photon").collection("blogs");
const commentCollection = client.db("photon").collection("comments");

export default async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export { userCollection, blogCollection, commentCollection };
