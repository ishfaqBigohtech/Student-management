import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.createRoutes();
  }

  createRoutes() {
    this.router.post("", new UserController().createUser);
    this.router.get("", new UserController().getUsers);
    this.router.get("/:id", new UserController().getUser);
  }

  get routes() {
    return this.router;
  }
}
