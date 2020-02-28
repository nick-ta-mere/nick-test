import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CharacterService } from "../character.service";

import { Character } from "../character";

@Component({
  selector: "app-character-detail",
  templateUrl: "./character-detail.component.html",
  styleUrls: ["./character-detail.component.css"]
})
export class CharacterDetailComponent implements OnInit {
  @Input() character: Character;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {}

  goBack(): void {
    // this.location.back();
  }

  showAddCharacterForm() {
    this.character = {};
  }

  add(name: string, baseInitiative: number): void {
    this.characterService
      .addCharacter({ name, baseInitiative } as Character)
      .subscribe(character => {
        this.characters.push(character);
      });
    this.showAddCharacterForm = false;
  }

  save(): void {
    if (this.character.id) {
      this.characterService
        .updateCharacter(this.character)
        .subscribe(() => this.goBack());
    } else {
      this.characterService
        .addCharacter(this.character as Character)
        .subscribe(character => {
          this.characters.push(this.character);
        });
    }
  }
}
