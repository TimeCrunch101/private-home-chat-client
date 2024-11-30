<script setup>
import { ref } from "vue";

const content = ref([])
const display = ref(true);

window.versions.onMessage((data) => {
    content.value.push(data)
    if (data.includes("Connected to tor...")) {
        setTimeout(() => {
            display.value = false
        }, 1200);
    }
});

</script>

<template>
    <div v-if="display" class="overlay">
        <div id="message" class="inner">
            <p v-for="msg in content">{{ msg }}</p>
        </div>
    </div>
</template>

<style scoped>

.overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(5, 17, 6, 0.541);
}

.inner {
    width: 60%;
    height: 50%;
    background-color: black;
    border: 3px solid rgb(20, 167, 20);
    overflow-y: auto;
    text-wrap: wrap;
}

</style>