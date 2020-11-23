/* This file contains any calls to the backend. */

import axios from 'axios'

// API-URLs
const reposPath = 'http://localhost:5000/repos'

// API-Calls (functions return promises)

/**
 * Returns a Promise with the list of all repositories accessible by the user.
 * 
 * An example of the returned JSON structure can be found at 'https://api.github.com/users/adr/repos'
 */
function loadRepositories() {
  return axios.post(reposPath)
}


export {
  loadRepositories
}