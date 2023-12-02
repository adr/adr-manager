import axios from "axios"
const BASE_URL_USER = "https://api.github.com/user"
const BASE_URL_REPO = "https://api.github.com/repos"
const getHeaders = () => {
    return {
        Authorization: `Bearer ${localStorage?.getItem("authId")}`
    }
}
const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = getHeaders().Authorization;
}
export { BASE_URL_REPO, BASE_URL_USER, setHeaders }
