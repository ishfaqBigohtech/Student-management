import { Request, Response } from "express";
import userService from "../services/user.service";
import { validateUser } from "../validators/user.validator";

export class UserController {
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send(error?.details[0].message);

      const user = await userService.createUser(req.body);
      if (!user) return res.status(409).send(`Email already exist`);

      await user.save();
      res.status(201).send(user);
    } catch (errorMessage) {
      console.log(`Something went wrong:  ${errorMessage}`);
    }
  }

  async getUsers(req: Request, res: Response): Promise<any> {
    try {
      const users = await userService.getUsers();
      res.status(200).send(users);
    } catch (errorMessage) {
      console.log(`Something went wrong: ${errorMessage}`);
    }
  }

  async getUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await userService.getUser(req.params.id);
      console.log("user", user);

      if (!user)
        return res.status(404).send(`${req.params.id} does not found!`);

      res.status(200).send(user);
    } catch (errorMessage) {
      console.log(`Something went wrong: ${errorMessage}`);
    }
  }

  async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(404).send(error.details[0].message);

      const user = await userService.updateUser(req);

      if (!user) res.status(404).send(`${req.params.id} does not exist!`);

      await user.save();
      res.status(200).send(user);
    } catch (errorMessage) {
      console.log(`Something went wrong: ${errorMessage}`);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user)
        return res.status(404).send(`${req.params.id} does not exist!`);

      res.status(202).send(`${req.params.id} User deleted sucess!`);

      console.log("userrrrr", user);
    } catch (errorMessage) {
      console.log(`Something went wrong ${errorMessage}`);
    }
  }
}
