<script setup>
import { ref } from "vue";
import ChatInput from "./ChatInput.vue"

const chats = ref([
    {
        msg: 'iTFwAWS5DQttoj1y4fmLVFIGvc/KIf0Lj7exOcrDlPHCUKzoTsmA44qO8+IfFGwfuScSToiRiKjkmPEXrjnobLTBIWVRDzSxvrCN/L2Hpws59cgrbcYyL4t1G8VWA7mZubRmubRB2SvdeTMmRPfdLHsSJEgVgXRmFIML1T3TvA4=',
        user: 'self',
        date: "Fri Nov 29 2024 17:14:06 GMT-0500 (Eastern Standard Time)"
    },
    {
        msg: 'iTFwAWS5DQttoj1y4fmLVFIGvc/KIf0Lj7exOcrDlPHCUKzoTsmA44qO8+IfFGwfuScSToiRiKjkmPEXrjnobLTBIWVRDzSxvrCN/L2Hpws59cgrbcYyL4t1G8VWA7mZubRmubRB2SvdeTMmRPfdLHsSJEgVgXRmFIML1T3TvA4=',
        user: 'other',
        date: "Fri Nov 29 2024 17:16:00 GMT-0500 (Eastern Standard Time)"
    },
])

const pushMsg = (e) => {
    chats.value.push({ 
        msg: e.msg, 
        user: e.user, 
        date: e.date})
}



</script>

<template>
    <h2>TimeCrunch101</h2>
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