<template>
    <main>
        <RouterView></RouterView>
    </main>
</template>

<script setup lang="ts">
import { useSpotifyStore } from "./stores/spotify";
const spotify = useSpotifyStore();
</script>

<style scoped></style>
