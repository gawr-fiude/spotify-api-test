<template>
    <h2>Disclaimer</h2>
    <p>
        I'm adding this disclaimer hoping to make sure you're comfortable with
        using your Spotify account for this project.
        <ul>
            <li>
                It only has access to READ your data.
            </li>
            <li>
                The data retrieved isn't stored anywhere, hence it is requested you authorize the Application everytime.
            </li>
        </ul>
    </p>
    <button @click="authStore.authenticate()">Log in to Spotify</button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authentication";
const authStore = useAuthStore();
</script>

<style scoped></style>
