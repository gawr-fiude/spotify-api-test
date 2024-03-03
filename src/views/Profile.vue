<template>
    <h2>Profile</h2>

    <h5>Name: {{ userStore.user?.display_name }}</h5>
    <h5>Country: {{ userStore.user?.country }}</h5>

    <h2>Playlists</h2>

    <h5 v-for="playlist in userStore.playlists">{{ playlist.name }}</h5>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAuthStore } from "@/stores/authentication";
const authStore = useAuthStore();

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

onMounted(() => {
    // Ask for new Authentication on page
    addEventListener("beforeunload", () => {
        authStore.authorizeSpotify(sessionStorage.getItem("spotify-verifier"));
    });

    authStore.getAccessToken().then((response) => {
        const accessToken = response.data.access_token;
        userStore.getSpotifyUser(accessToken);
        userStore.getSpotifyUserPlaylists(accessToken);
    });
});
</script>

<style scoped></style>
