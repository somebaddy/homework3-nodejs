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
}

const fightsService = new FightsService();

export { fightsService };
