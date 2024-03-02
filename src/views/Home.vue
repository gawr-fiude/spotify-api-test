<template>
    <h2>Disclaimer</h2>
    <button @click="authStore.authenticate()">Log in to Spotify</button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/spotify";
const authStore = useAuthStore();
</script>

<style scoped></style>
