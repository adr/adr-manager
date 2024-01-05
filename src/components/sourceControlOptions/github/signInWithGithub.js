import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../../plugins/firebase/client";

export function signInWithGithub() {
    const githubProvider = new GithubAuthProvider()
    githubProvider.addScope("repo read:user gist workflow read:org");

    return signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return { token, user };
        })
        .catch((error) => {
            console.error("SignIn Error", error);
            throw error;
        });

}
