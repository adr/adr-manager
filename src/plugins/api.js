/* This file contains any calls to the backend. */

import Pizzly from "pizzly-js";
import { Repository } from "./classes.js";

// API-Calls (functions return promises)
// A pizzy-object to make request to github
let pizzly = new Pizzly({
  host: "https://adr-manager.herokuapp.com",
  publishableKey: "dpWJ4TU2yCu7ys4Nb6eX5zhv32GV6YcVYYvDJZvS",
});

export async function getUserEmail() {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .get("/user/emails")
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function getUserName(repoOwner) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .get("/users/" + repoOwner)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function getCommitSha(repoOwner, repoName, currentBranch) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .get("/repos/" + repoOwner + "/" + repoName + "/branches/" + currentBranch)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function createBlobs(repoOwner, repoName, file) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .post("/repos/" + repoOwner + "/" + repoName + "/git/blobs", {
      body: JSON.stringify({ content: file, encoding: "utf-8" })
    })
    .then((response) => response.json())
    .then((body) => body)
    .catch((err) => {
      console.log(err);
    });
}

export async function createFileTree(
  repoOwner,
  repoName,
  lastCommitSha,
  folderTree
) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .post("/repos/" + repoOwner + "/" + repoName + "/git/trees", {
      body: JSON.stringify({ base_tree: lastCommitSha, tree: folderTree })
    })
    .then((response) => response.json())
    .then((body) => body)
    .catch((err) => {
      console.log(err);
    });
}

export async function createCommit(
  repoOwner,
  repoName,
  commitMessage,
  authorInfos,
  lastCommitSha,
  treeSha
) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .post("/repos/" + repoOwner + "/" + repoName + "/git/commits", {
      body: JSON.stringify({
        message: commitMessage,
        author: authorInfos,
        parents: [lastCommitSha],
        tree: treeSha
      })
    })
    .then((response) => response.json())
    .then((body) => body)
    .catch((err) => {
      console.log(err);
    });
}

export async function pushToGitHub(repoOwner, repoName, branch, newCommitSha) {
  return pizzly
    .integration("github")
    .auth(localStorage.getItem("authId"))
    .post(
      "/repos/" + repoOwner + "/" + repoName + "/git/refs/heads/" + branch,
      {
        body: JSON.stringify({
          ref: "refs/heads/" + branch,
          sha: newCommitSha
        })
      }
    )
    .then((response) => response.json())
    .then((body) => body)
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Returns a Promise with the list of repositories accessible by the user.
 *
 * An example of the returned JSON structure can be found at 'https://api.github.com/users/adr/repos'
 * @param {number} page 
 * @param {number} user - the number of repoistories per page
 * @returns {Promise<object[]>} the array of repos with attributes 'full_name', 'default_branch', etc.
 */
export async function loadRepositoryList(page = 1, per_page = 5) {
  let user = localStorage.getItem('authId');
  return pizzly
    .integration("github")
    .auth(user)
    .get("/user/repos?sort=updated&page=" + page + "&per_page=" + per_page)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Returns a Promise with the list of repositories that are accessible by the user and which full name contains the search string.
 *
 * An example of the returned JSON structure can be found at 'https://api.github.com/users/adr/repos'
 * @param {string} searchString - the string to search for
 * @param {number} maxResults - the maximum number of repositories
 * @param {number} searchResults - a list of results to append the 
 * @returns {Promise<object[]>} the array of repos with attributes 'full_name', 'default_branch', etc.
 */
export async function searchRepositoryList(searchString, maxResults = 2, searchResults = []) {
  let page = 1;
  let perPage = 100;

  let promise;
  let hasNextPage = true;
  while (searchResults.length < maxResults && hasNextPage) {
    promise = loadRepositoryList(page, perPage)
      .then((repositoryList) => {
        if (repositoryList instanceof Array) {
          repositoryList.filter((repo) => (repo.full_name.includes(searchString)))
            .forEach(repo => { if (searchResults.length < maxResults) { searchResults.push(repo) } });
        } else {
          hasNextPage = false;
        }
        if (repositoryList.length < perPage) {
          hasNextPage = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    await promise;
    page++;
  }
  return searchResults;
}

/**Returns a Promise with the the file tree of the repository.
 * The returned file tree is an array.
 * An example of the returned JSON structure can be found in the attribute 'tree' at 'https://api.github.com/repos/adr/madr/git/trees/master?recursive=1'
 *
 * @param {string} repoFullName - the full name of the repository, e.g. 'adr/madr'
 * @param {string} branch - the name of the branch, e.g. 'master'
 * @param {string} user - the authID of user'
 * @returns {Promise<object>} where the object has a tree attribute containing an array of all files in the repository
 */
export async function loadFileTreeOfRepository(repoFullName, branch) {
  let user = localStorage.getItem('authId')
  return pizzly
    .integration("github")
    .auth(user)
    .get("/repos/" + repoFullName + "/git/trees/" + branch + "?recursive=1")
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
}


/**Returns a list of the names of all branches of the repository.
 * 
 * An example call is 'https://api.github.com/repos/adr/madr/branches'
 * 
 * @param {string} repoName - the name of a repository
 * @param {string} username - the name of the owner of the repository
 * @returns {Promise<{ name : string }[]>} the fetched array of branches
 */
export async function loadBranchesName(repoName, username) {
  let dataAuth = localStorage.getItem('authId');

  return pizzly
    .integration("github")
    .auth(dataAuth)
    .get("/repos/" + username + "/" + repoName + "/branches?per_page=999")
    .then(response => response.json())
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Returns a Promise with the the raw content of the file.
 *
 * The raw content is a string.
 *
 * @param {string} repoFullName  - the full name of the repository, e.g. 'adr/madr'
 * @param {string} branch  - the name of the branch, e.g. 'master'
 * @param {string} filePath  - the name of the branch, e.g. 'docs/adr/0001-some-name.md'
 * @returns {Promise<string>} a promise with the raw content of the specified file
 */
export async function loadRawFile(repoFullName, branch, filePath) {
  let user = localStorage.getItem('authId');
  if (typeof branch !== "string" || typeof branch != "string") {
    console.log(
      "Invalid values for loadContentsForRepository. Given Repository full name: " +
      repoFullName +
      ", Branch:" +
      branch +
      ", file path: " +
      filePath
    );
  } else {
    return pizzly
      .integration("github")
      .auth(user)
      .get("/repos/" + repoFullName + "/contents/" + filePath + "?ref=" + branch)
      .then(response => response.json())
      .then(response => decodeUnicode(response.content))
      .catch((err) => {
        console.log(err);
      });
  }
}

/** Decodes a base64 string to binary.
 * (Helper method when loading raw content)
 *
 * @param {string} str - a string encoded base64
 * @returns {string} the decoded string
 */
function decodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

/** Loads the content of all passed repositories.
 *
 * @param {object[]} repoList - each array entry must have the attributes fullName and branch
 * @returns {Promise<Repository[]>} an array of repositories
 */
export async function loadAllRepositoryContent(repoList) {
  let user = localStorage.getItem('authId');

  let repoPromises = [];
  let repoObjectList = [];
  repoList.forEach((repo) => {
    let promise = loadARepositoryContent(repo.fullName, repo.branch, user)
      .then((repo) => repoObjectList.push(repo));
    repoPromises.push(promise);
  })
  await Promise.all(repoPromises); // Wait until all file trees are loaded.
  return repoObjectList;
}

/** Loads the content of one repository.
 * 
 * @param {string} repoFullName - the full name of the repository, e.g. 'adr/manager'
 * @param {string} branchName - the name of the branch, e.g. 'master'
 * @returns {Promise<Repository>} an array of repositories
 */
export async function loadARepositoryContent(repoFullName, branchName) {
  let user = localStorage.getItem('authId');

  let repoPromises = [];
  let adrPromises = [];
  let repoObject = new Repository({
    fullName: repoFullName,
    activeBranch: branchName,
    adrs: []
  });

  repoPromises.push(loadFileTreeOfRepository(repoFullName, branchName)
    .then((data) => {
      // Find all files in the folder 'docs/adr' or 'doc/adr'
      let adrList = data.tree.filter((file) => {
        return file.path.startsWith('docs/adr/')
      })

      // Load the content of each ADR.
      adrList.forEach((adr) => {
        let id = Number(adr.path.split('/').pop().split('-')[0]);
        if (isNaN(id)) {
          id = -1;
        }
        let adrObject = {
          path: adr.path,
          id: id
        }
        repoObject.adrs.push(adrObject)
        adrPromises.push(
          loadRawFile(repoFullName, branchName, adr.path, user, pizzly)
            .then((rawMd) => {
              adrObject.originalMd = rawMd;
              adrObject.editedMd = rawMd;

            })
        )
      });
      console.log('adrList', repoObject.adrs)
    })
  );
  await Promise.all(repoPromises); // Wait until all file trees are loaded.
  await Promise.all(adrPromises); // Wait until all raw contents are loaded.
  return repoObject;
}
