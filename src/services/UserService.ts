import { httpServer } from "../clients/server";
import { TSignIn } from "../models/types/req/TSignIn";

export default class UserService {
  static usersController = "/users";

  static login(signInForm: TSignIn) {

    return httpServer.post(`${this.usersController}/login`, signInForm);
  }

}