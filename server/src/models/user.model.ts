import { ObjectId } from "mongodb";
import BlogModel from "./blog.model";
import { userCollection } from "../database/db";
import bcrypt from "bcrypt";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";

interface User {
  _id: ObjectId | null;
  username: string;
  email: string;
  password: string;
  bio: string;
  blogs: ObjectId[];
  totalPosts: number;
  role: "admin" | "user";
}

class UserModel implements User {
  public _id: ObjectId | null = null;
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public bio: string = "",
    public blogs: ObjectId[] = [],
    public totalPosts: number = 0,
    public role: "admin" | "user" = "user"
  ) {}
  toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      blogs: this.blogs.map((blog) => blog.toString()),
      totalPosts: this.totalPosts,
      role: this.role,
    };
  }

  static toJwtPayload(user: User) {
    if (!user._id) {
      throw new Error("_id doesn't exits");
    }
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  static toResponse(user: User) {
    return {
      username: user.username,
      email: user.email,
      bio: user.bio,
      totalPosts: user.totalPosts,
      role: user.role,
    };
  }

  static async isExist(query: Record<string, string>): Promise<boolean> {
    const orCondition = Object.keys(query).map((key) => ({
      [key]: query[key],
    }));
    const foundUser = await userCollection.findOne({
      $or: orCondition,
    });
    return Boolean(foundUser);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  static async comparePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }

  static async create(user: UserModel) {
    const doesUserExists = await UserModel.isExist({
      username: user.username,
      email: user.email,
    });
    if (doesUserExists) {
      throw new AppError(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
    }
    user.password = await user.hashPassword(user.password);
    const result = await userCollection.insertOne(user.toJSON(), {
      writeConcern: { w: "majority", j: true, wtimeout: 3000 },
    });
    user._id = result.insertedId;
  }
}
export { User };
export default UserModel;
