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
      console.log("dtatatatat");

      const user = await userService.getUser(req.params.id);
      console.log("user", user);

      if (!user)
        return res.status(404).send(`${req.params.id} does not found!`);

      res.status(200).send(user);
    } catch (errorMessage) {
      console.log(`Something went wrong: ${errorMessage}`);
    }
  }
}
