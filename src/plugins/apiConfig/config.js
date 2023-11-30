const BASE_URL_USER = "https://api.github.com/user"
const BASE_URL_REPO = "https://api.github.com/repos"
const HEADERS = {
    Authorization: `Bearer ${localStorage.getItem("authId")
        }`
}


export { BASE_URL_REPO, BASE_URL_USER, HEADERS }
