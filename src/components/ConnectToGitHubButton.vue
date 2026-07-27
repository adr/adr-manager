<template>
    <div>
        <v-btn @click="hasAuthId()">Connect to GitHub</v-btn>
    </div>
</template>

<script>
export default {
    name: "connectGitHub",
    components: {},
    data: () => ({
        // Reference to the OAuth popup window and its message listener, so we can
        // clean them up if the component is torn down mid-flow.
        oauthPopup: null,
        messageHandler: null
    }),
    beforeDestroy() {
        this.removeMessageHandler();
    },
    methods: {
        hasAuthId() {
            if (localStorage.getItem("authId") === null) {
                this.signInWithGithub();
            } else {
                this.$router.push({ name: "Editor" });
            }
        },
        /**
         * Start the GitHub OAuth flow handled by the Static Web Apps `/api` backend.
         *
         * The popup navigates to `/api/login`, which redirects to GitHub. After the
         * user authorizes, `/api/callback` exchanges the code for a token server-side
         * (the client secret never reaches the browser) and posts the result back to
         * this window via `postMessage`.
         */
        signInWithGithub() {
            // Open the popup synchronously inside the click handler so browsers do
            // not treat it as an unsolicited popup and block it.
            const popup = window.open("/api/login", "adr-github-oauth", "popup,width=600,height=720");
            if (!popup) {
                this.$alert(
                    "The sign-in popup was blocked. Please allow popups for this site and try again.",
                    "Popup blocked",
                    "warning"
                );
                return;
            }
            this.oauthPopup = popup;

            this.messageHandler = (event) => {
                // Only trust messages from our own origin and our OAuth popup.
                if (event.origin !== window.location.origin) {
                    return;
                }
                if (!event.data || event.data.source !== "adr-github-oauth") {
                    return;
                }

                this.removeMessageHandler();

                if (event.data.error) {
                    console.error("GitHub sign-in error:", event.data.error);
                    this.$alert(event.data.error, "Sign-in failed", "error");
                    return;
                }

                if (event.data.token) {
                    localStorage.setItem("authId", event.data.token);
                    if (event.data.login) {
                        localStorage.setItem("user", event.data.login);
                    }
                    this.$router.push({ name: "Editor" });
                }
            };

            window.addEventListener("message", this.messageHandler);
        },
        removeMessageHandler() {
            if (this.messageHandler) {
                window.removeEventListener("message", this.messageHandler);
                this.messageHandler = null;
            }
        }
    }
};
</script>
