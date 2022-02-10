/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/*
 * ******************* User Management  **************************
 *                                                               *
 * User can create account <!---- ID, Name, Email, Password ---->*
 *                                                               *
 * User can login account <!---- Email, Password ----->          *
 *                                                               *
 * User can edit account <!------ID, Name, Email, Password ----->*
 *                                                               *
 * User can delete account <!------ ID ------->                  *
 *                                                               *
 * Save JWT to save in headers.                                  *
 *                                                               *
 * Validate user using Happy/Joi                                 *
 *                                                               *
 * Validate JWT from login requests                              *
 *                                                               *
 *                                                               *
 * ***************************************************************
 */
import express, { Express } from "express";

import { connectWithMongo } from "./src/db/mongo";
import { api } from "./src/api/index";

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.middleware();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api", api());
  }

  listenServer() {
    try {
      this.app.listen(3000, () => console.log("Listening on port 3000"));
      connectWithMongo();
      app.routes();
    } catch (errorMessage) {
      console.log("Error Details: ", errorMessage);
    }
  }
}

const app = new App();
app.listenServer();
