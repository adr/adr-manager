
// MADR-Type Definition
export class ArchitecturalDecisionRecord {
  constructor({ id, title, status, deciders,
    date, technicalStory, contextAndProblemStatement,
    decisionDrivers, consideredOptions,
    decisionOutcome,
    links
  } = {}) {
    this.id = id || 'Unknown ID'
    this.title = title || 'Default Title';
    this.status = status || '';
    this.deciders = deciders || [];
    this.date = date || '';//new Date().toISOString().substr(0, 10);
    this.technicalStory = technicalStory || '';
    this.contextAndProblemStatement = contextAndProblemStatement || '';
    this.decisionDrivers = decisionDrivers || [];
    this.consideredOptions = []
    if (consideredOptions && consideredOptions.length > 0) {
      consideredOptions.forEach(function (opt) { this.addOption(opt) })
    }
    this.decisionOutcome = decisionOutcome || {
      chosenOption: '',
      explanation: '',
      positiveConsequences: [],
      negativeConsequences: []
    };
    this.links = links || [];

    // Assure invariants for decisionOutcome attribute
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'chosenOption')) {
      this.decisionOutcome.positiveConsequences = ''
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'explanation')) {
      this.decisionOutcome.explanation = ''
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'positiveConsequences')) {
      this.decisionOutcome.positiveConsequences = []
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'negativeConsequences')) {
      this.decisionOutcome.negativeConsequences = []
    }
  }
  /**
   * Creates, adds and returns a new option.
   * 
   * @param {{title: string, description: string, pros: string[], cons: string[]}} 
   *  optionData - an object with optional attributes title, description, pros, cons  
   */
  addOption({ title, description, pros, cons } = {}) {
    let id = this.consideredOptions.length
    let newOpt = {
      title: title || '',
      description: description || '',
      pros: pros || [],
      cons: cons || [],
      id: id // needed as key/id (for referencing an option or as key in v-for or drag'n'drop)
    }
    this.consideredOptions.push(newOpt)
    return newOpt
  }
  getOptionByTitle(title) {
    return this.consideredOptions.find((el) => {
      return el.title.startsWith(title)
    })
  }
}