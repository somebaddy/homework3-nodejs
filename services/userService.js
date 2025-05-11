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
