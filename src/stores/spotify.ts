import { defineStore } from "pinia";

export const useSpotifyStore = defineStore("spotify", {
    state: () => ({ count: 0, name: "Eduardo" }),
    actions: {
        increment() {
            this.count++;
        },
    },
    getters: {
        doubleCount: (state) => state.count * 2,
    },
});
