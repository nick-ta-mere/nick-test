import { Injectable } from "@angular/core";

import { MessageService } from "./message.service";
import { ListComponent } from "./list/list.component";

@Injectable()
export class Character {
  id: number;
  name: string;
  baseInitiative: number;
  stunDamage: number = 0;
  physicalDamage: number = 0;
  turnTaken: boolean = false;
  initiativeDice: number = 0;
  diceResult: number;

  private actionPointsUsed: number = 0;

  constructor(
    private list: ListComponent,
    private messageService: MessageService
  ) {}

  /* rolls with the set number of dice and displays the results */
  private rollDice() {
    let i: number = 0;
    let diceRolls = [];
    this.diceResult = 0;
    while (i < this.initiativeDice) {
      i++;
      let diceRoll = Math.floor(Math.random() * 6) + 1;
      diceRolls.push(diceRoll);
      this.diceResult += diceRoll;
    }
    this.messageService.addDiceRollMessage(this.name, diceRolls);
  }

  /* calculates the current initiative from all relevant factors */
  public get currentInitiative(): number {
    return (
      Number(this.baseInitiative) +
      Number(this.diceResult) -
      Math.floor(this.stunDamage / 3) -
      Math.floor(this.physicalDamage / 3) -
      this.actionPointsUsed
    );
  }

  /* alternative for constructor, since we can't use that because of dependency injection */
  static createFromObject(
    listComponent: ListComponent,
    messageService: MessageService,
    object
  ) {
    let character = new Character(listComponent, messageService);
    character.initialize(
      object.id,
      object.name,
      object.baseInitiative,
      object.stunDamage,
      object.physicalDamage,
      object.initiativeDice
    );
    return character;
  }

  private initialize(
    id?: number,
    name?: string,
    baseInitiative?: number,
    stunDamage: number = 0,
    physicalDamage: number = 0,
    initiativeDice?: number
  ) {
    this.id = id;
    this.name = name;
    this.baseInitiative = baseInitiative;
    this.stunDamage = stunDamage;
    this.physicalDamage = physicalDamage;
    this.initiativeDice = initiativeDice;
    this.rollDice();
  }

  useAction() {
    this.actionPointsUsed += 5;
    if (this.currentInitiative <= 0) {
      this.turnTaken = true;
    }
  }

  takeTurn() {
    if (!this.turnTaken) {
      this.actionPointsUsed += 10;
      this.turnTaken = true;
    }
    this.list.checkIfInitiativeRoundIsOver();
  }

  resetTurnTaken(combatRoundOver: boolean) {
    if (this.currentInitiative > 0 || combatRoundOver) {
      this.turnTaken = false;
    }
    if (combatRoundOver) {
      this.actionPointsUsed = 0;
      this.rollDice();
    }
  }
}
