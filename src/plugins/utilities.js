/* eslint-disable */
/* This file is a gathering place for all functions used in the MockUp. */

import axios from 'axios'

/**
 * Converts an string in snake case into an natural-language-like string.
 * 
 * Example: '0001-add-status-field' is converted to '0001 Add Status Field'
 * 
 * @param {string} snake 
 */
function snakeCase2naturalCase(snake) {
  return snake.replace(
      /([-_][a-z])/g,
      (group) => group.toUpperCase()
          .replace('-', ' ')
          .replace('_', ' ')
  )
}

/**
* Converts an string in natural case into an snake case string.
* 
* Can be used to generate a file name from the title of an ADR.
* 
* Example: 'Add status Field' is converted to 'add-status-field'
* 
* @param {string} snake 
*/
function naturalCase2snakeCase(natural) {
  return natural.toLowerCase().split(' ').join('-');
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
  snakeCase2naturalCase, naturalCase2snakeCase,
  loadFileTreeOfRepository, loadRawFile
}