import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";

class UserService {
  async createUser(user: UserInterface): Promise<any> {
    const emailExist = await userModel.findOne({
      email: user.email,
    });
    if (emailExist) return false;

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    return await new userModel({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });
  }

  async getUsers(): Promise<any> {
    const users = userModel.find();
    return users;
  }

  async getUser(req: any): Promise<any> {
    const user = userModel.findById({ _id: req }).then(
      (result) => {
        return result;
      },
      () => {
        return false;
      }
    );
    return user;
  }
}

export default new UserService();
