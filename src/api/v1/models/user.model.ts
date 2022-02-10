import mongoose from "mongoose";
import { userSchema } from "../schema/user.schema";

export const userModel = mongoose.model("User", userSchema);
