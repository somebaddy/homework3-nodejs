import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getFighters() {
    return fighterRepository.getAll();
  }

  getFighter(id) {
    return fighterRepository.getOne({ id });
  }

  createFighter(fighter) {
    return fighterRepository.create(fighter);
  }

  updateFighter(id, fighter) {
    return fighterRepository.update(id, fighter);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
