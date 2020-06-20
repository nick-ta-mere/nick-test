import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: string[] = [];
  diceRolls = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
    // remove after 10 seconds
    setTimeout(() => this.remove(this.messages.length -1), 10000);
  }

  removeDiceRollMessage(id) {
    if (id > -1) {
      this.diceRolls.splice(id, 1);
    }
  }

  remove(id) {
    if (id > -1) {
      this.messages.splice(id, 1);
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
    // remove after 10 seconds
    setTimeout(() => this.removeDiceRollMessage(this.diceRolls.length -1), 10000);
  }
}
