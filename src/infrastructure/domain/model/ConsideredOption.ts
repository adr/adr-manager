export class ConsideredOption {
  private _cons: string[]
  private _description: string
  private _pros: string[]
  private _title: string


  constructor(cons: string[], description: string, pros: string[], title: string) {
    this._cons = cons;
    this._description = description;
    this._pros = pros;
    this._title = title;
  }


  get cons(): string[] {
    return this._cons;
  }

  set cons(value: string[]) {
    this._cons = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get pros(): string[] {
    return this._pros;
  }

  set pros(value: string[]) {
    this._pros = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
