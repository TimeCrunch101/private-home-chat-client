<script setup>
import { ref } from "vue";

const emit = defineEmits(["pushOwnMsg"])

const message = ref("")


const sendMessage = async () => {
    if (message.value.trim() === "") return;
    const encrypted = await window.versions.encrypt(message.value)
    emit("pushOwnMsg", {
        msg: message.value,
        user: "self",
        date: new Date()
    })
    message.value = "";
}

</script>
<template>
    
    <form @submit.prevent="sendMessage()">
    <div class="group">
            <textarea name="user-input" id="user-input" cols="60" rows="5" v-model="message"></textarea>
            <button id="send-msg" type="submit">Send</button>
        </div>
    </form>

</template>

<style scoped>

</style>