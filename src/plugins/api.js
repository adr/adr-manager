/* This file contains any calls to the backend. */

import axios from 'axios'

// API-URLs
const reposPath = 'http://localhost:5000/repos'

// API-Calls (functions return promises)
function loadRepositories() {
  return axios.post(reposPath)
}


export {
  loadRepositories
}