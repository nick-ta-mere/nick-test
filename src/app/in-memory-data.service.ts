import { InMemoryDbService } from "angular-in-memory-web-api";
import { Character } from "./character";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      {
        id: 1,
        name: "Snow White",
        baseInitiative: 13,
        currentInitiative: null,
        initiativeDice: 2
      },
      {
        id: 2,
        name: "Roy",
        baseInitiative: -1,
        currentInitiative: null,
        initiativeDice: 2
      },
      {
        id: 3,
        name: "Clutch",
        baseInitiative: 7,
        currentInitiative: null,
        initiativeDice: 3
      },
      {
        id: 4,
        name: "Geier",
        baseInitiative: 8,
        currentInitiative: null,
        initiativeDice: 1
      }
    ];
    return { characters };
  }

  // Overrides the genId method to ensure that a character always has an id.
  // If the characters array is empty,
  // the method below returns the initial number (1).
  // if the characters array is not empty, the method below returns the highest
  // character id + 1.
  genId(characters: Character[]): number {
    return characters.length > 0
      ? Math.max(...characters.map(character => character.id)) + 1
      : 1;
  }
}
