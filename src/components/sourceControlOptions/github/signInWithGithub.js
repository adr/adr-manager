// signInWithGithub.js
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../../plugins/firebase/client";

export function signInWithGithub(githubEnterpriseInstance) {
    debugger;
    const githubProvider = new GithubAuthProvider()
    githubProvider.addScope("repo read:user gist workflow read:org");
    if (githubEnterpriseInstance) {
        githubProvider.setCustomParameters({
            login: githubInstanceUrl,
        });
    }
    return signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return { token, user };
        })
        .catch((error) => {
            // Handle the error as needed
            console.error("SignIn Error", error);
            throw error; // rethrow the error to handle it in the component if needed
        });
}
