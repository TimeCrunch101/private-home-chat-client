<script setup>
import { ref } from "vue";
import { useUtilStore } from "../stores/utils.js"

const utils = useUtilStore()
const content = ref([])
const display = ref(utils.getOverlayState);
const showClose = ref(false)

window.versions.onMessage((data) => {
    content.value.push(data)
    if (data.includes("CONNECTED!")) {
        setTimeout(() => {
            showClose.value = true
        }, 1200);
    }
});

const closeModal = () => {
    utils.setOverlayState(false)
    display.value = false
}

</script>

<template>
    <div v-if="display" class="overlay">
        <div id="message" class="inner">
            <button v-if="showClose" @click="closeModal()" class="close">X</button>
            <p v-for="msg in content">{{ msg }}</p>
        </div>
    </div>
</template>

<style scoped>
.close {
    border: 2px solid #4ee94e;
    background-color: black;
    color: #4ee94e;
    margin-top: 5px; 
    margin-left: calc(100% - 30px) ;
}
.close:hover {
    cursor: pointer;
}
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
