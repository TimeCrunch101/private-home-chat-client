<script setup>
import { ref } from "vue";

const chats = ref([{
    msg: 'iTFwAWS5DQttoj1y4fmLVFIGvc/KIf0Lj7exOcrDlPHCUKzoTsmA44qO8+IfFGwfuScSToiRiKjkmPEXrjnobLTBIWVRDzSxvrCN/L2Hpws59cgrbcYyL4t1G8VWA7mZubRmubRB2SvdeTMmRPfdLHsSJEgVgXRmFIML1T3TvA4=',
    user: 'self'
}])
const message = ref("")

const sendMessage = async () => {
    const encrypted = await window.versions.encrypt(message.value)
    if (message.value.trim() === "") return; // Prevent empty messages
    chats.value.push({ user: "self", msg: encrypted });
    message.value = "";
}

</script>

<template>

<div class="container">
    <div class="nav-bar">
        <p>This is a Menu</p>
    </div>
    <div class="chat-window">

        <div v-for="msg in chats" class="chat-message-wrapper">
            <div class="chat-message" :class="{ 'self': msg.user === 'self' }">
                <p>{{ msg.msg }}</p>
            </div>
        </div>
    </div>

</div>
<div class="chat-input-container">
    <form @submit.prevent="sendMessage()">
        <input type="text" name="user-input" id="user-input" v-model="message">
    </form>
</div>

</template>

<style scoped>

/* 113911 */

#user-input {
    display: flex;
    justify-self: center;
    font-size: large;
    height: 2em;
    width: 400px;
    border: 2px solid rgb(6, 122, 113);
    background-color: #191f19;
    color: white;
}

.chat-input-container {
    margin-top: 1em;
}

.container {
    display: grid;
    grid-template-columns: 25% 1fr;
    /* outline: 1px solid red; */
}
.nav-bar {
    /* outline: 2px solid orange; */
    height: calc(100vh - 5em);
}


.chat-window {
    display: flex;
    flex-direction: column;
    border-left: 2px solid rgb(65, 97, 17);
    border-bottom: 2px solid rgb(4, 34, 6);
    padding-left: 5px;
    max-height: calc(100vh - 5em);
    overflow-y: scroll;
}

.chat-message-wrapper {
    font-size: 1.2em;
    color: #4ee94e;
    /* border: 1px solid purple; */
}

.chat-message {
    display: flex;
    width: max-content;
    max-width: 325px;
    overflow: auto;
    border: 1px solid rgb(0, 255, 191);
    /* border-radius: .5em; */
    margin-bottom: 1.5em;
    padding: 6px;

}

.self {
    justify-self: end;
}

</style>