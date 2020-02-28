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

  save(): void {
    this.characterService
      .updateCharacter(this.character)
      .subscribe(() => this.goBack());
  }
}
