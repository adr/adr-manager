
interface DecisionOutcome {
  chosenOption: string;
  explanation: string;
  positiveConsequences: string[];
  negativeConsequences: string[];
}

class ArchitecturalDecisionRecord{
  private title:string;
  private status: string;
  private deciders: string;
  private date: string;
  private technicalStory:string;
  private contextAndProblemStatement: string;
  private decisionDrivers: string[];
  private consideredOptions: any[];
  private decisionOutcome: DecisionOutcome;
  private links: string[];
  constructor(consideredOptions?:any[],
              contextAndProblemStatement?: string,
              date?:string,
              deciders?:string,
              decisionDrivers?:string[],
              decisionOutcome?:DecisionOutcome,
              links?:string[],
              status?:string,
              technicalStory?: string,
              title?:string,
  ) {
    this.consideredOptions = consideredOptions;
    this.contextAndProblemStatement =contextAndProblemStatement;
    this.date = date;
    this.deciders = deciders;
    this.decisionDrivers = decisionDrivers;
    this.decisionOutcome = decisionOutcome;
    this.links = links;
    this.status = status;
    this.technicalStory = technicalStory;
    this.title = title;

  }
}
