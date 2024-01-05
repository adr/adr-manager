import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

export function signInWithGitlab() {

    const auth = getAuth();
    const provider = new OAuthProvider('oidc.test-adr');
    provider.addScope("read_user");
    return signInWithPopup(auth, provider)
        .then((result) => {
            const credential = OAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            debugger;
            const user = result.user;
            return { token, user };
        })
        .catch((error) => {
            console.error("SignIn Error", error);
            throw error;
        });

}