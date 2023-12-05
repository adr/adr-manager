import axios from "axios";
const BASE_URL_USER = "https://api.github.com/user";
const BASE_URL_REPO = "https://api.github.com/repos";
const setHeaders = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage?.getItem("authId")}`;
};
export { BASE_URL_REPO, BASE_URL_USER, setHeaders };
