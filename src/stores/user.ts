import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const user = ref({} as any);
    const playlists = ref([] as any[]);

    async function getSpotifyUser(accessToken: string) {
        axios
            .get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            })
            .then((response) => {
                console.log(response);

                user.value = response.data;
            });
    }

    async function getSpotifyUserPlaylists(accessToken: string) {
        axios
            .get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            })
            .then((response) => {
                playlists.value = response.data.items;
            });
    }

    return { user, playlists, getSpotifyUser, getSpotifyUserPlaylists };
});
