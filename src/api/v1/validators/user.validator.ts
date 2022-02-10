import Joi from "joi";
import { UserInterface } from "../interfaces/user.interface";

export function validateUser(user: UserInterface) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(220),
    email: Joi.string().email().required().min(5).max(220),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(user);
}
