export class Character {
  id: number;
  name: string;
  baseInitiative: number;
  currentInitiative: number;
  stunDamage: number;
  physicalDamage: number;
  turnTaken = false;
  private actionPointsUsed: number;

  constructor(id, name, baseInitiative, stunDamage, physicalDamage) {
    this.id = id;
    this.name = name;
    this.baseInitiative = baseInitiative;
    this.stunDamage = stunDamage || 0;
    this.physicalDamage = physicalDamage || 0;
    this.actionPointsUsed = 0;
  }
  public getCurrentInitiative() {
    return (
      this.baseInitiative -
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
      object.physicalDamage
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
