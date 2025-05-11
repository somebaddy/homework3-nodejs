import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw Error("User not found");
    }
    if (user.password !== userData.password) {
      throw Error("Wrong password");
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
