<template>
    <button @click="spotify.getAccessToken()">Click Me</button>
    <h4>Profile</h4>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/spotify";
import { onMounted } from "vue";
const authStore = useAuthStore();

onMounted(() => {
    // Ask for new Authentication on page
    addEventListener("beforeunload", () => {
        authStore.authorizeSpotify(sessionStorage.getItem("spotify-verifier"));
    });

    authStore.getSpotifyUser();
});
</script>

<style scoped></style>
