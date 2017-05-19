// defines what properties ingredients must have
// undecided on how to deal with the units
// may make units predefined instead of user defined later - may choose from a dropdown of common units

export class Ingredient {
  name: string;
  amount: number;
  unit: string;

  constructor (name: string, amount: number, unit: string) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}
