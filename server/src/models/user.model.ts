import { ObjectId } from "mongodb";
import BlogModel from "./blog.model";
import { userCollection } from "../database/db";
import bcrypt from "bcrypt";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError";

class UserModel {
  private _id?: ObjectId;
  constructor(
    private username: string,
    private email: string,
    private password: string,
    private bio: string = "",
    private blogs: ObjectId[] = [],
    private totalPosts: number = 0,
    private role: "admin" | "user" = "user"
  ) {}
  toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      blogs: this.blogs.map((blog) => blog.toString()),
      posts: this.totalPosts,
      role: this.role,
    };
  }

  toJwtPayload() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    };
  }

  toResponse() {
    if (!this._id) {
      throw new Error("User ID is not defined");
    }
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
      bio: this.bio,
      posts: this.totalPosts,
      role: this.role,
    };
  }

  static async isExist(query: Record<string, string>) {
    const orCondition = Object.keys(query).map((key) => ({
      [key]: query[key],
    }));
    const foundUser = await userCollection.findOne({
      $or: orCondition,
    });
    if (foundUser) {
      throw new AppError(StatusCodes.CONFLICT, "user already exists");
    }
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  static async comparePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }

  static async create(user: UserModel) {
    await UserModel.isExist({ username: user.username, email: user.email });
    user.password = await user.hashPassword(user.password);
    const result = await userCollection.insertOne(user.toJSON(), {
      writeConcern: { w: "majority", j: true, wtimeout: 3000 },
    });
    user._id = result.insertedId;
  }
}

export default UserModel;
