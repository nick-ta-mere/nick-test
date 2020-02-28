import { Component, OnInit } from "@angular/core";
import { CharacterService } from "../character.service";
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
  showAddCharacterForm: boolean;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
      this.characters.forEach(function(character) {
        if (!character.currentInitiative) {
          character.currentInitiative = character.baseInitiative;
        }
      });
      this.charactersLoaded = Promise.resolve(true);
    });
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }

  modifyInitiative(characterId, amount) {
    this.characters[Number(characterId)].currentInitiative += amount;
  }
  sortByInitiative() {
    return this.characters.sort(function(a, b) {
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
