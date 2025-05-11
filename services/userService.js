import { Error400 } from "../helpers/errors.js";
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
    return userRepository.update(id, user);
  }

  deleteUser(id) {
    return userRepository.delete(id); 
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
