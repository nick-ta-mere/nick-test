import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: "app-add-character2",
  templateUrl: "./add-character2.component.html",
  styleUrls: ["./add-character2.component.css"]
})
export class AddCharacter2Component implements OnInit {
  characterForm = new FormGroup({
    name: new FormControl("", Validators.required),
    baseInitiative: new FormControl("", Validators.required)
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.characterForm.value);
  }
}
