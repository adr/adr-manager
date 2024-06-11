import { DecisionOutcome } from '@/infrastructure/domain/model/DecisionOutcome'

export class ArchitecturalDecisionRecord {
  private _consideredOptions: any[]
  private _contextAndProblemStatement: string
  private _date: string
  private _deciders: string
  private _decisionDrivers: string[]
  private _decisionOutcome: DecisionOutcome
  private _links: string[]
  private _status: string
  private _technicalStory: string
  private _title: string

  constructor(
    consideredOptions: any[] = [],
    contextAndProblemStatement: string = '',
    date: string = '',
    deciders: string = '',
    decisionDrivers: string[] = [],
    decisionOutcome: DecisionOutcome = null,
    links: string[] = [],
    status: string = '',
    technicalStory: string = '',
    title: string = ''
  ) {
    this._consideredOptions = consideredOptions
    this._contextAndProblemStatement = contextAndProblemStatement
    this._date = date
    this._deciders = deciders
    this._decisionDrivers = decisionDrivers
    this._decisionOutcome = decisionOutcome
    this._links = links
    this._status = status
    this._technicalStory = technicalStory
    this._title = title
  }

  get consideredOptions(): any[] {
    return this._consideredOptions
  }

  set consideredOptions(value: any[]) {
    this._consideredOptions = value
  }

  get contextAndProblemStatement(): string {
    return this._contextAndProblemStatement
  }

  set contextAndProblemStatement(value: string) {
    this._contextAndProblemStatement = value
  }

  get date(): string {
    return this._date
  }

  set date(value: string) {
    this._date = value
  }

  get deciders(): string {
    return this._deciders
  }

  set deciders(value: string) {
    this._deciders = value
  }

  get decisionDrivers(): string[] {
    return this._decisionDrivers
  }

  set decisionDrivers(value: string[]) {
    this._decisionDrivers = value
  }

  get decisionOutcome(): DecisionOutcome {
    return this._decisionOutcome
  }

  set decisionOutcome(value: DecisionOutcome) {
    this._decisionOutcome = value
  }

  get links(): string[] {
    return this._links
  }

  set links(value: string[]) {
    this._links = value
  }

  get status(): string {
    return this._status
  }

  set status(value: string) {
    this._status = value
  }

  get technicalStory(): string {
    return this._technicalStory
  }

  set technicalStory(value: string) {
    this._technicalStory = value
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }
}
