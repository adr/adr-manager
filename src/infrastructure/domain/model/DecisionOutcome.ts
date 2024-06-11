export class DecisionOutcome {
  private _chosenOption: string
  private _explanation: string
  private _positiveConsequences: string[]
  private _negativeConsequences: string[]

  constructor(
    chosenOption: string = '',
    explanation: string = '',
    positiveConsequences: string[] = [],
    negativeConsequences: string[] = []
  ) {
    this._chosenOption = chosenOption
    this._explanation = explanation
    this._positiveConsequences = positiveConsequences
    this._negativeConsequences = negativeConsequences
  }

  get chosenOption(): string {
    return this._chosenOption
  }

  set chosenOption(value: string) {
    this._chosenOption = value
  }

  get explanation(): string {
    return this._explanation
  }

  set explanation(value: string) {
    this._explanation = value
  }

  get positiveConsequences(): string[] {
    return this._positiveConsequences
  }

  set positiveConsequences(value: string[]) {
    this._positiveConsequences = value
  }

  get negativeConsequences(): string[] {
    return this._negativeConsequences
  }

  set negativeConsequences(value: string[]) {
    this._negativeConsequences = value
  }
}
