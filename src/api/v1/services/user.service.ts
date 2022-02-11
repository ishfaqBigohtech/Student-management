/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";

class UserService {
  /***
   *
   * @method createUser Creates new User.
   * @param user Takes user as param for request body payload.
   * @returns user, that takes userModel and create new entry.
   *
   */
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

  /**
   *
   * @method getUsers Get all users from DB.
   * @returns users.
   *
   */
  async getUsers(): Promise<any> {
    return await userModel.find();
  }

  /**
   *
   * @method getUser Get single user.
   * @param id Takes id from query params.
   * @returns user if id is valid.
   *
   */
  async getUser(id: any): Promise<any> {
    const user = userModel.findById({ _id: id }).then(
      (result) => {
        return result;
      },
      () => {
        return false;
      }
    );
    return await user;
  }

  /***
   *
   * @method updateUser Updates user.
   *@returns updatedUser if any.
   */

  async updateUser(user: any): Promise<any> {
    const update = await userModel
      .findOneAndUpdate(
        { _id: user.params.id },
        {
          name: user.body.name,
          email: user.body.email,
          password: user.body.password,
        },
        {
          upsert: true,
          new: true,
        }
      )
      .then(
        (result) => {
          return result;
        },
        () => {
          return false;
        }
      );

    return await update;
  }

  /**
   *
   * @method deleteUser Deletes user.
   * @return Deleted user.
   *
   */
  async deleteUser(id: string): Promise<any> {
    const user = await userModel.findByIdAndDelete({ _id: id }).then(
      (result) => {
        return result;
      },
      () => {
        return false;
      }
    );

    return await user;
  }
}

export default new UserService();
