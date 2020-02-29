
import { MessageService } from "./message.service";
export class Character {
  id: number;
  name: string;
  baseInitiative: number;
  currentInitiative: number;
  stunDamage: number = 0;
  physicalDamage: number = 0;
  turnTaken: boolean = false;
  initiativeDice: number = 0;
  diceResult: number;

  private actionPointsUsed: number = 0;

  constructor(
    id?: number,
    name?: string,
    baseInitiative?: number,
    stunDamage: number = 0,
    physicalDamage: number = 0,
    initiativeDice?: number,
  ) {
    this.id = id;
    this.name = name;
    this.baseInitiative = baseInitiative;
    this.stunDamage = stunDamage;
    this.physicalDamage = physicalDamage;
    this.initiativeDice = initiativeDice;
    this.rollDice();
  }

  private rollDice() {
    console.log(this);
    let i: number = 0;
    this.diceResult = 0;
    while (i < this.initiativeDice) {
      i++;
      this.diceResult += Math.floor(Math.random() * 6) + 1;
    }
  }

  public getCurrentInitiative() {
    return (
      this.baseInitiative +
      this.diceResult -
      Math.floor(this.stunDamage / 3) -
      Math.floor(this.physicalDamage / 3) -
      this.actionPointsUsed
    );
  }

  static createFromObject(object) {
    return new Character(
      object.id,
      object.name,
      object.baseInitiative,
      object.stunDamage,
      object.physicalDamage,
      object.initiativeDice
    );
  }

  useAction() {
    this.actionPointsUsed += 5;
  }

  takeTurn() {
    if (!this.turnTaken) {
      this.actionPointsUsed += 10;
      this.turnTaken = true;
    }
  }
}
