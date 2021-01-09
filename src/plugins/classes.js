
// MADR-Type Definition
export class ArchitecturalDecisionRecord {
  constructor({ title, status, deciders,
    date, technicalStory, contextAndProblemStatement,
    decisionDrivers, consideredOptions,
    decisionOutcome,
    links
  } = {}) {
    this.title = title || '';
    this.status = status || '';
    this.deciders = deciders || '';
    this.date = date || '';
    this.technicalStory = technicalStory || '';
    this.contextAndProblemStatement = contextAndProblemStatement || '';
    this.decisionDrivers = decisionDrivers || [];
    this.highestOptionId = 0;
    this.consideredOptions = [];
    if (consideredOptions && consideredOptions.length > 0) {
      for (let i = 0; i < consideredOptions.length; i++) {
        this.addOption(consideredOptions[i]);
      }
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
      this.decisionOutcome.decisionOutcome = '';
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'explanation')) {
      this.decisionOutcome.explanation = '';
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'positiveConsequences')) {
      this.decisionOutcome.positiveConsequences = [];
    }
    if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, 'negativeConsequences')) {
      this.decisionOutcome.negativeConsequences = [];
    }

    this.cleanUp();
  }

  /**
   * Creates, adds and returns a new option.
   * 
   * @param {{title: string, description: string, pros: string[], cons: string[]}} 
   *  optionData - an object with optional attributes title, description, pros, cons  
   */
  addOption({ title, description, pros, cons } = {}) {
    let id = this.highestOptionId;
    this.highestOptionId = this.highestOptionId + 1;
    let newOpt = {
      title: title || '',
      description: description || '',
      pros: pros || [],
      cons: cons || [],
      id: id // needed as key/id (for referencing an option or as key in v-for or drag'n'drop)
    };
    this.consideredOptions.push(newOpt);
    return newOpt;
  }
  getOptionByTitle(title) {
    return this.consideredOptions.find((el) => {
      return el.title.startsWith(title);
    });
  }

  /**
   * Cleans up the ADR:
   *  - Asserts that all string attributes contain a string value.
   *  - Trims all strings.
   */
  cleanUp() {
    const stringFieldNames = ['title', 'status', 'date', 'deciders', 'technicalStory', 'contextAndProblemStatement'];
    
    stringFieldNames.forEach((attr) => {
      this[attr] = cleanUpString(this[attr]);
    })
    
    this.decisionDrivers.forEach((el, idx) => {
      this.decisionDrivers[idx] = cleanUpString(el);
    })
    this.decisionDrivers = this.decisionDrivers.filter((el) => (el !== ''));

    this.consideredOptions.forEach((opt) => {
      opt.title = cleanUpString(opt.title);
      opt.description = cleanUpString(opt.description);
      opt.pros.forEach((el, idx) => {
        opt.pros[idx] = cleanUpString(el);
      });
      opt.pros = opt.pros.filter((el) => (el !== ''));
      opt.cons.forEach((el, idx) => {
        opt.cons[idx] = cleanUpString(el);
      });
      opt.cons = opt.cons.filter((el) => (el !== ''));
    })

    this.decisionOutcome.chosenOption = cleanUpString(this.decisionOutcome.chosenOption);
    this.decisionOutcome.explanation = cleanUpString(this.decisionOutcome.explanation);
    this.decisionOutcome.positiveConsequences.forEach((el, idx) => {
      this.decisionOutcome.positiveConsequences[idx] = cleanUpString(el);
    })
    this.decisionOutcome.positiveConsequences.forEach((el, idx) => {
      this.decisionOutcome.positiveConsequences[idx] = cleanUpString(el);
    })

    this.links.forEach((el, idx) => {
      this.links[idx] = cleanUpString(el);
    });
    this.links.filter((el) => (el !== ''));
  }

  /**
   * Creates a new ADR with default values already set.
   */
  static createNewAdr() {
    return new ArchitecturalDecisionRecord({
      status: 'proposed',
      date: new Date().toISOString().substr(0, 10),
      decisionOutcome: {
        explanation: 'comes out best (see below).'
      }
    });
  }
}

/**
 * Helper function for clean up. 
 * If a string is passed, it is trimmed. Otherwise, an empty string is returned.
 * @param {string|undefined|null} string 
 * @returns {string} the trimmed string or an empty string
 */
function cleanUpString(string) {
  if (typeof string === "string") {
    return string.trim();
  } else {
    return "";
  }
}

export class Repository {
  constructor({ fullName, activeBranch, branches, adrs }) {
    this.fullName = fullName || '';
    this.activeBranch = activeBranch || '';
    this.branches = branches || [];
    this.adrs = adrs || [];
    this.addedAdrs = [];
    this.deletedAdrs = [];
  }

  /**
   * Constructs a repositoryy object from a string.
   * Useffull when loading repositories from LocalStorage
   * @param {string} json 
   */
  static constructFromString(json) {
    let repoData = JSON.parse(json);
    let repo = new Repository(repoData);
    repoData.addedAdrs.forEach((adr) => {
      let equalAdr = repoData.adrs.find((el) => el.path === adr.path && el.editedMd === adr.editedMd && el.originalMd === adr.originalMd);
      if (equalAdr) {
        repo.addedAdrs.push(equalAdr);
      } else {
        throw "There was an added adr in the parameter string that didn't match!";
      }
    });
    repoData.deletedAdrs.forEach((adr) => {
      let equalAdr = repoData.adrs.find((el) => el.path === adr.path && el.editedMd === adr.editedMd && el.originalMd === adr.originalMd);
      if (equalAdr) {
        repo.deletedAdrs.push(equalAdr);
      } else {
        throw "There was a deleted adr in the parameter string that didn't match!";
      }
    });
    return repo;
  }

  /**Returns the changed files in the repository. 
   * 
   * @returns {{ added: ADR[], changed: ADR[], deleted: ADR[] }} the changed ADRs 
   */
  getChanges() {
    return {
      added: this.addedAdrs,
      changed: this.adrs.filter(adr => (adr.originalMd !== adr.editedMd && !this.addedAdrs.includes(adr))),
      deleted: this.deletedAdrs
    };
  }

  /**Returns true iff the repository contains changed ADRs. 
   * 
   * @param {string} repoFullName
   * @returns {boolean} true, if the ADRs in the repository changed, else false.
   */
  hasChanges() {
    let changes = this.getChanges();
    return changes.changed.length !== 0 || changes.added.length !== 0 || changes.deleted.length !== 0;
  }

  addAdr(newAdr) {
    this.adrs.push(newAdr);
    this.addedAdrs.push(newAdr);
  }
}