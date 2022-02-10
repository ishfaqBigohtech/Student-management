import { Router } from "express";
import { UserRouter } from "./routers/user.router";

export const v1 = () => {
  const router = Router();

  router.use("/users", new UserRouter().routes);

  return router;
};
