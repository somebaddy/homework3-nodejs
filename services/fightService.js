import { Error404 } from "../helpers/errors.js";
import { fightRepository } from "../repositories/fightRepository.js";

class FightsService {
  // OPTIONAL TODO: Implement methods to work with fights
  getFights() {
    return fightRepository.getAll();
  }

  getFight(id) {
    return fightRepository.getOne({ id });
  }

  createFight(fight) {
    return fightRepository.create(fight);
  }

  deleteFight(id) {
    const deletedFight = fightRepository.delete(id);
    if (!deletedFight || deletedFight.length === 0) {
      throw new Error404("Fight not found");
    }
    return deletedFight;
  }
}

const fightsService = new FightsService();

export { fightsService };
