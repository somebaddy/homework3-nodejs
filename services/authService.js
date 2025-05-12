import { Error404 } from "../helpers/errors.js";
import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw new Error404("User not found");
    }
    if (user.password !== userData.password) {
      throw new Error404("Wrong password");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
