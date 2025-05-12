import { Error404 } from "../helpers/errors.js";
import { fighterService } from "../services/fighterService.js";
import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  getFights() {
    return fightRepository.getAll();
  }

  getFight(id) {
    return fightRepository.getOne({ id });
  }

  createFight(fight) {
    const fighter1 = fighterService.getFighter(fight.fighter1);
    const fighter2 = fighterService.getFighter(fight.fighter2);

    if (!fighter1 || !fighter2) {
      throw new Error404("Fighter not found");
    }

    if (fight.log === undefined) {
      fight.log = [];
    }

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

const fightersService = new FightersService();

export { fightersService };
