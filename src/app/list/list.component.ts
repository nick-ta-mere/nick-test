import { Component, OnInit } from "@angular/core";
import { CharacterService } from "../character.service";
import { MessageService } from "../message.service";
import { Character } from "../character";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  characters: Character[];
  selectedCharacter: Character;
  charactersLoaded: Promise<boolean>;

  constructor(
    private characterService: CharacterService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe(characters => {
      characters.map((e, i) => {
        characters[i] = Character.createFromObject(
          this,
          this.messageService,
          e
        );
      });
      this.characters = characters;
      this.charactersLoaded = Promise.resolve(true);
    });
  }

  public addCharacter(characterData) {
    this.characters.push(
      Character.createFromObject(this, this.messageService, characterData)
    );
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }

  /* checks if the current inititaive pass is over, because everyone acted once */
  checkIfInitiativeRoundIsOver() {
    let roundOver = true;
    this.characters.forEach((character: Character) => {
      if (!character.turnTaken) {
        roundOver = false;
      }
    });
    if (roundOver) {
      let combatRoundOver = this.checkIfCombatRoundIsOver();
      if (!combatRoundOver) {
        this.messageService.add("Round over: starting from top!");
      }
      this.resetCharacters(combatRoundOver);
    }
  }

  /** checks if the entire combat round is over, because everyone used all their initiative passes */
  checkIfCombatRoundIsOver() {
    let canAnyoneStillAct = false;
    this.characters.forEach((character: Character) => {
      if (character.currentInitiative > 0) {
        canAnyoneStillAct = true;
      }
    });
    if (!canAnyoneStillAct) {
      this.messageService.add("Combat round over! Dices rerolled.");
    }
    return !canAnyoneStillAct;
  }

  resetCharacters(combatRoundOver) {
    this.characters.forEach((character: Character) => {
      character.resetTurnTaken(combatRoundOver);
    });
  }

  sortByInitiative() {
    return this.characters.sort(function(a, b) {
      if (a.turnTaken && !b.turnTaken) {
        return 1;
      }
      if (!a.turnTaken && b.turnTaken) {
        return -1;
      }
      if (a.currentInitiative < b.currentInitiative) {
        return 1;
      }
      if (a.currentInitiative > b.currentInitiative) {
        return -1;
      }

      if (a.baseInitiative < b.baseInitiative) {
        return 1;
      }
      if (a.baseInitiative > b.baseInitiative) {
        return -1;
      }
      return 0;
    });
  }
}
