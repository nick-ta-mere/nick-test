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

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe(characters => {
      characters.map(function(e, i) {
        characters[i] = Character.createFromObject(e);
      });
      this.characters = characters;
      this.charactersLoaded = Promise.resolve(true);
    });
  }

  public addCharacter(character) {
    this.characters.push(Character.createFromObject(character));
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }

  sortByInitiative() {
    return this.characters.sort(function(a, b) {
      if (a.turnTaken && !b.turnTaken) {
        return 1;
      }
      if (!a.turnTaken && b.turnTaken) {
        return -1;
      }
      if (a.getCurrentInitiative() < b.getCurrentInitiative()) {
        return 1;
      }
      if (a.getCurrentInitiative() > b.getCurrentInitiative()) {
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
