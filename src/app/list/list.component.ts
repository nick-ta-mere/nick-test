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

  checkIfRoundIsOver() {
    let roundOver = true;
    this.characters.forEach((character: Character) => {
      if (!character.turnTaken) {
        roundOver = false;
      }
    });
    if (roundOver) {
      this.messageService.add("Round over: starting from top!");
      this.resetCharacters();
    }
  }

  resetCharacters() {
    this.characters.forEach((character: Character) => {
      character.resetTurnTaken(false);
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
