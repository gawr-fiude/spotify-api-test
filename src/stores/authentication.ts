import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authentication", {
    state: () => ({
        clientId: "4ffed0da2f8e489792487d9643886b66",
        accessToken: "",
    }),
    actions: {
        async authorizeSpotify(verifier: string | null) {
            const challenge = await generateCodeChallenge(verifier);

            const params = new URLSearchParams();
            params.append("client_id", this.clientId);
            params.append("response_type", "code");
            params.append("redirect_uri", "http://localhost:5173/profile");
            params.append("scope", "user-read-private user-read-email");
            params.append("code_challenge_method", "S256");
            params.append("code_challenge", challenge);

            window.location.replace(
                `https://accounts.spotify.com/authorize?${params.toString()}`,
            );
        },
        async authenticate() {
            const verifier = generateCodeVerifier(128);
            sessionStorage.setItem("spotify-verifier", verifier);

            this.authorizeSpotify(verifier);
        },
        async getAccessToken() {
            return axios.post(
                "https://accounts.spotify.com/api/token",
                {
                    client_id: this.clientId,
                    grant_type: "authorization_code",
                    code: this.code,
                    redirect_uri: "http://localhost:5173/profile",
                    code_verifier: sessionStorage.getItem("spotify-verifier"),
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );
        },
        async getSpotifyUser() {
            this.getAccessToken().then((response) => {
                console.log(response.data.access_token);

                axios.get("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: "Bearer " + response.data.access_token,
                    },
                });
            });
        },
    },
    getters: {
        verifier: (_) => sessionStorage.getItem("spotify-verifier"),
        code: (_) => {
            const params = new URLSearchParams(window.location.search);
            return params.get("code");
        },
    },
});

function generateCodeVerifier(length: number) {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string | null) {
    if (codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        return btoa(
            String.fromCharCode.apply(null, [...new Uint8Array(digest)]),
        )
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }
    return "";
}
