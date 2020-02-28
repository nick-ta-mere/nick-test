import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {
  newCharacterForm;

  constructor(private formBuilder: FormBuilder) {
    this.newCharacterForm = this.formBuilder.group({
      name: "",
      baseInitiative: ""
    });
  }

  ngOnInit() {
  }

  onSubmit(characterData) {
    this.newCharacterForm.reset();

    console.warn('Your order has been submitted', characterData);
  }
}