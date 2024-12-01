import { defineStore } from "pinia";

export const useUtilStore = defineStore("util", {
  state: () => ({
    overlay_state: true,
  }),
  getters: {
    getOverlayState: (store) => {
      return store.overlay_state
    },
  },
  actions: {
    setOverlayState(newState) {
      this.overlay_state = newState
    }
  },
  persist: true,
});