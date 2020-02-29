import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: string[] = [];
  diceRolls = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
    this.diceRolls = [];
  }

  addDiceRollMessage(characterName: string, roll) {
    // let m = characterName + " rolled: ";
    // roll.forEach(result => {
    //   m += this.getDieIcon(result);
    // });
    this.diceRolls.push({
      name: characterName,
      rolls: roll
    });
  }

  private getDieIcon(result: number) {
    return '<i class="die-' + result + '">1</i> ';
  }
}
