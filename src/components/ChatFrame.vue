<script setup>
import { ref } from "vue";
import ChatInput from "./ChatInput.vue"

const props = defineProps({
    username: String,
})

const chats = ref([])

const pushMsg = (e) => {
    chats.value.push({ 
        msg: e.msg, 
        user: e.user, 
        date: e.date})
}



</script>

<template>
    <h2>{{ props.username }}</h2>
    <div class="chat-window">
        <div v-for="msg in chats" class="chat-message-wrapper">
            <div class="chat-message" :class="{ 'self': msg.user === 'self' }">
                <span id="chat-date">{{ msg.date }}</span>
                <p>{{ msg.msg }}</p>
            </div>
        </div>
    </div>
    <ChatInput @pushOwnMsg="pushMsg" />
</template>