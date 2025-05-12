import { Error400, Error404 } from "../helpers/errors.js";
import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getUsers() {
    return userRepository.getAll();
  }

  getUser(id) {
    return userRepository.getOne({ id });
  }

  createUser(user) {
    const existingEmail = userRepository.getOne(it => it.email.toLowerCase() === user.email.toLowerCase());
    if (existingEmail) {
      throw new Error400("User with this email already exists");
    }

    const existingPhone = userRepository.getOne({phone: user.phone});
    if (existingPhone) {
      throw new Error400("User phone number already registered")
    }

    return userRepository.create(user); 
  }

  updateUser(id, user) {
    const updatedUser = userRepository.update(id, user);
    if (!updatedUser || !updatedUser.id) {
      throw new Error404("User not found");
    }
    return updatedUser;
  }

  deleteUser(id) {
    const deletedUser = userRepository.delete(id);
    if (!deletedUser || deletedUser.length === 0) {
      throw new Error404("User not found");
    }
    return deletedUser; 
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
