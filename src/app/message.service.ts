import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  addDiceRollMessage(characterName: string, roll) {
    let m = characterName + " rolled: ";
    roll.forEach(result => {
      m += this.getDieIcon(result);
    });
    this.add(m);
  }

  private getDieIcon(result: number) {
    return '<i class="die-' + result + '">1</i> ';
  }
}
