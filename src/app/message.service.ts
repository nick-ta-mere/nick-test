import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: string[] = [];
  diceRolls = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }

  remove(id) {
    if (id > -1) {
      this.diceRolls.splice(id, 1);
    }
  }

  clear() {
    this.messages = [];
    this.diceRolls = [];
  }

  addDiceRollMessage(characterName: string, roll) {
    this.diceRolls.push({
      name: characterName,
      rolls: roll
    });
    setTimeout(() => this.remove(this.diceRolls.length -1), 3000);
  }
}
