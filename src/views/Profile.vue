<template>
    <button @click="spotify.getAccessToken()">Click Me</button>
    <h4>Profile</h4>
</template>

<script setup lang="ts">
import { useSpotifyStore } from "@/stores/spotify";
import { onMounted } from "vue";
const spotify = useSpotifyStore();

onMounted(() => {
    // Ask for new Authentication on page
    addEventListener("beforeunload", () => {
        spotify.authorizeSpotify(sessionStorage.getItem("spotify-verifier"));
    });

    spotify.getSpotifyUser();
});
</script>

<style scoped></style>
