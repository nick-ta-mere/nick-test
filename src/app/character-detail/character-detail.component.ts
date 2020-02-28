import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CharacterService } from "../character.service";

import { Character } from "../character";
import { ListComponent } from "../list/list.component";

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
    private location: Location,
    
    private list: ListComponent
  ) {}

  ngOnInit() {}

  goBack(): void {
    // this.location.back();
  }

  showAddCharacterForm() {
    this.character = {
      name: null,
      baseInitiative: null,
      currentInitiative: null,
      stunDamage: null,
      physicalDamage: null
    };
      // this.character = new Character();
  }

  save(): void {
    if (this.character.id) {
      this.characterService
        .updateCharacter(this.character)
        .subscribe(() => this.goBack());
    } else {
      this.characterService
        .addCharacter(this.character as Character)
        .subscribe(character => this.list.addCharacter(character));
    }
  }
}
