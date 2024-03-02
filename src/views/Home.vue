<template>
    <h2>Disclaimer</h2>
    <button @click="spotify.authenticate()">Log in to Spotify</button>
</template>

<script setup lang="ts">
import { useSpotifyStore } from "@/stores/spotify";
const spotify = useSpotifyStore();
</script>

<style scoped></style>
