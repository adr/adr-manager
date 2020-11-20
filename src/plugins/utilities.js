/* eslint-disable */
/* This file is a gathering place for all functions used in the MockUp. */

import parser from 'md-2-json'
import axios from 'axios'

// MADR-Type Definition
class ArchitecturalDecisionRecord {
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
    this.consideredOptions = consideredOptions || [];
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
  addOption({ title, description, pros, cons } = {}) {
    this.consideredOptions.push({
      title: title || '',
      description: description || '',
      pros: pros || [],
      cons: cons || []
    })
  }
  getOptionByTitle(title) {
    return this.consideredOptions.find((el) => {
      return el.title.startsWith(title)
    })
  }
}

// General Utilities
function hasOwnPropertyCaseInsensitive(obj, property) {
  var props = [];
  for (var i in obj) if (obj.hasOwnProperty(i)) props.push(i);
  var prop;
  while (prop = props.pop()) if (prop.toLowerCase() === property.toLowerCase()) return prop;
  return false;
}

// Parser
function md2json(md) {
  let json = parser.parse(md);
  function removeTrailingLinebreaks(json) {
    for (var entry in json) {
      if (entry === 'raw') {
        while (json.raw.endsWith('\n')) {
          json.raw = json.raw.substring(0, json.raw.length - 1) // Remove line breaks
        }
        if (json.raw.startsWith('- ')) {
          json.raw = '*' + json.raw.substring(1);
        }
        json.raw = json.raw.replace(/\n- /g, '\n* ')
      } else {
        removeTrailingLinebreaks(json[entry])
      }
    }
  }
  removeTrailingLinebreaks(json)
  return json
}

function json2md(json) {
  function appendLinebreaks(json) {
    for (var entry in json) {
      if (entry === 'raw') {
        while (!json.raw.endsWith('\n\n')) {
          json[entry] = json[entry].concat('\n') // Add line breaks, so the following heading is in new line
        }
        if (json.raw.startsWith('- ')) {
          json.raw = '*' + json.raw.substring(1);
        }
        json.raw = json.raw.replace(/\n- /g, '\n* ')
      } else {
        appendLinebreaks(json[entry])
      }
    }
  }
  appendLinebreaks(json)
  return parser.toMd(json);
}

function mdListToArray(md) {
  let arr = md.split('\n* ')
  if (arr[0].startsWith('* ')) {
    arr[0] = arr[0].slice(2)
  }
  return arr.map((el) => (el.trim()))
}

function removeOptionalAnnotationsFromJsonHeaders(json) {
  if (typeof json === 'string') {
    return json.replace('<!-- optional -->', '').trim()
  }
  let res = {}
  for (let key in json) {
    let newKey = key.replace('<!-- optional -->', '').trim()
    res[newKey] = removeOptionalAnnotationsFromJsonHeaders(json[key])
  }
  return res
}

function json2adr(json, id = 'unknown') {
  json = removeOptionalAnnotationsFromJsonHeaders(json) // To parse template
  let adr = new ArchitecturalDecisionRecord({})
  adr.id = id

  adr.title = Object.keys(json)[0]

  // Parse Status, Deciders, Date and Technical Story
  if (Object.prototype.hasOwnProperty.call(json[adr.title], 'raw')) {
    let list;
    if (json[adr.title].raw.includes('Technical Story:')) {
      let arr = json[adr.title].raw.split('Technical Story:')
      list = arr[0].trim()
      adr.technicalStory = arr[1].trim()
    } else {
      list = json[adr.title].raw
    }
    let arr = mdListToArray(list)
    let line = arr.find((el) => (el.startsWith('Status: ')))
    if (typeof line !== 'undefined') {
        adr.status = line.replace(/^Status: /, '').trim()
    }
    line = arr.find((el) => (el.startsWith('Deciders: ')))
    if (typeof line !== 'undefined') {
        adr.deciders = line.replace(/^Deciders: /, '').split(', ')
    }
    line = arr.find((el) => (el.startsWith('Date: ')))
    if (typeof line !== 'undefined') {
        adr.date = line.replace(/^Date: /, '').trim()
    }
  }

  // Parse Context and Problem Statement
  let prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Context and Problem Statement')
  if (prop) {
    adr.contextAndProblemStatement = json2md(json[adr.title][prop]).trim()
  }

  // Parse Decision Drivers
  prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Decision Drivers')
  if (prop) {
    let decisionDrivers = json2md(json[adr.title][prop]).trim()
    decisionDrivers = mdListToArray(decisionDrivers)
    adr.decisionDrivers = decisionDrivers
  }

  // Parse Considered Options
  prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Considered Options')
  if (prop) {
    let rawOptionList = json2md(json[adr.title][prop]).trim()
    rawOptionList = mdListToArray(rawOptionList)
    adr.consideredOptions = rawOptionList.map((optTitle) => {
      return {
        title: optTitle,
        description: '',
        pros: [],
        cons: []
      }
    })
  }
  
  // Parse Decision Outcome
  prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Decision Outcome')
  if (prop) {
    let decisionOutcomeJson = json[adr.title][prop]
    let rawDecisionOutcome = decisionOutcomeJson.raw

    let chosenOption = ''
    let explanation = rawDecisionOutcome

    if (rawDecisionOutcome.startsWith('Chosen option: ')) {
      rawDecisionOutcome = rawDecisionOutcome.split(', because')
      chosenOption = rawDecisionOutcome[0].substring('Chosen option: '.length).replace(/^[\s"`�']+|[\s+"`�']$/g, '');
      explanation = rawDecisionOutcome.slice(1).join().trim()
    } else {
      console.log('Couldn\'t find chosen option.')
    }
    adr.decisionOutcome.chosenOption = chosenOption
    adr.decisionOutcome.explanation = explanation

    prop = hasOwnPropertyCaseInsensitive(decisionOutcomeJson, 'Positive Consequences')
    if (prop) {
      adr.decisionOutcome.positiveConsequences = mdListToArray(json2md(decisionOutcomeJson[prop]))
    }
    prop = hasOwnPropertyCaseInsensitive(decisionOutcomeJson, 'Negative Consequences')
    if (prop) {
      adr.decisionOutcome.negativeConsequences = mdListToArray(json2md(decisionOutcomeJson[prop]))
    }
  }

  // Parse Pros and Cons of the Options 
  prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Pros and Cons of the Options')
  if (prop) {
    let prosConsJson = json[adr.title][prop]

    for (let optionTitle in prosConsJson) {
      let option = adr.getOptionByTitle(optionTitle)
      if (typeof option !== 'undefined') {
        let optionContents = json2md(prosConsJson[optionTitle])
        option.description = optionContents.split(/[*] Good|[*] Bad/)[0]
        optionContents = mdListToArray(optionContents.substring(option.description.length))
          optionContents.forEach((optLine, index) => {
            if (optLine.startsWith('Good, ')) {
              option.pros.push(optLine.replace(/^Good, because /g, '').trim())
            } else {
              option.cons.push(optLine.replace(/^Bad, because /g, '').trim())
            }
          })
      }
    }
  }

  // Parse Links
  prop = hasOwnPropertyCaseInsensitive(json[adr.title], 'Links')
  if (prop) {
    let links = json2md(json[adr.title][prop]).trim()
    links = mdListToArray(links)
    adr.links = links
  }
  return adr
}

function md2adr(md) {
  return json2adr(md2json(md))
}

function adr2md(adr) {
  var md = '# ' + adr.title + '\n\n'
  if (adr.status !== '' && adr.status !== 'null') {
    md = md.concat('* Status: ' + adr.status + '\n')
  }
  if (adr.deciders.length > 0) {
    md = md.concat('* Deciders: ' + adr.deciders + '\n')
  }
  if (adr.date !== '') {
    md = md.concat('* Date: ' + adr.date + '\n')
  }
  if (adr.technicalStory !== '') {
    md = md.concat('\nTechnical Story: ' + adr.technicalStory + '\n')
  }

  if (adr.contextAndProblemStatement !== '') {
    md = md.concat('\n## Context and Problem Statement\n\n' + adr.contextAndProblemStatement + '\n')
  }

  if (adr.decisionDrivers.length > 0) {
    md = md.concat('\n## Decision Drivers\n\n')
    for (let i in adr.decisionDrivers) {
      md = md.concat('* ' + adr.decisionDrivers[i] + '\n')
    }
  }

  if (adr.consideredOptions.length > 0) {
    md = md.concat('\n## Considered Options\n\n')
    md = adr.consideredOptions.reduce((total, opt) => (total + '* ' + opt.title + '\n'), md)
  }

  md = md.concat('\n## Decision Outcome\n\nChosen option: "' + adr.decisionOutcome.chosenOption
    + '", because ' + adr.decisionOutcome.explanation + '\n')

  if (adr.decisionOutcome.positiveConsequences.length > 0) {
    md = md.concat('\n### Positive Consequences\n\n')
    md = adr.decisionOutcome.positiveConsequences.reduce((total, con) => (total + '* ' + con + '\n'), md)

  }
  if (adr.decisionOutcome.negativeConsequences.length > 0) {
    md = md.concat('\n### Negative Consequences\n\n')
    md = adr.decisionOutcome.negativeConsequences.reduce((total, con) => (total + '* ' + con + '\n'), md)
  }

  if (adr.consideredOptions.some((opt) => (opt.description !== '' || opt.pros.length > 0 || opt.cons.length > 0))) {
    md = md.concat('\n## Pros and Cons of the Options\n')
    md = adr.consideredOptions.reduce((total, opt) => {
      if (opt.description !== '' || opt.pros.length > 0 || opt.cons.length > 0) {
        let res = total.concat('\n### ' + opt.title + '\n\n')
        if (opt.description !== '') {
          res = res.concat(opt.description.replace(/^#|\n#/g, '\n####') + '\n\n')
        }
        res = opt.pros.reduce((total, arg) => (total.concat('* Good, because ' + arg + '\n')), res)
        res = opt.cons.reduce((total, arg) => (total.concat('* Bad, because ' + arg + '\n')), res)
        return res
      } else {
        return total
      }
    }, md)
  }
  if (adr.links.length > 0) {
    md = md.concat('\n## Links \n\n')
    md = adr.links.reduce((total, link) => (total + '* ' + link + '\n'), md)
  }
  return md
}

function snakeCase2naturalCase(snake) {
  return snake.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('-', ' ')
      .replace('_', ' ')
  )
}

function naturalCase2snakeCase(natural) {
  return natural.replace(
    /([ ][a-z])/g,
    (group) => group.toLowerCase()
      .replace(' ', '-')
  )
}

// API-URLs
function getGithubTreeApiUrl(repoFullName, branch) {
  return 'https://api.github.com/repos/' + repoFullName + '/git/trees/' + branch + '?recursive=1'
}

function getGithubReposApiUrl(userName) {
  return 'https://api.github.com/users/' + userName + '/repos'
}
function getGithubRawApiUrl(repoFullName, branch, filePath) {
  return 'https://raw.githubusercontent.com/' + repoFullName + '/' + branch + '/' + filePath
}

// API-Calls (functions return promises)
function loadFileTreeOfRepository(repoFullName, branch) {
  if (typeof branch !== 'string' || typeof branch != 'string') {
    console.log('Invalid values for loadContentsForRepository. Given Repository full name: ' + repoFullName + ', Branch:' + branch)
  } else {
    return axios.get(getGithubTreeApiUrl(repoFullName, branch))
      .then(({ data }) => {
        return data.tree;
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function loadRawFile(repoFullName, branch, filePath) {
  if (typeof branch !== 'string' || typeof branch != 'string') {
    console.log('Invalid values for loadContentsForRepository. Given Repository full name: ' + repoFullName
      + ', Branch:' + branch + ', file path: ' + filePath)
  } else {
    console.log('Load Raw File content from ' + getGithubRawApiUrl(repoFullName, branch, filePath))
    return axios.get(getGithubRawApiUrl(repoFullName, branch, filePath))
      .catch((err) => {
        console.log(err)
      })
  }
}

export {
  ArchitecturalDecisionRecord,
  md2adr, adr2md,
  snakeCase2naturalCase, naturalCase2snakeCase,
  loadFileTreeOfRepository, loadRawFile
}