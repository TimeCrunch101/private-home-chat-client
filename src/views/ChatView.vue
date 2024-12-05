<script setup>
import ChatFrame from "../components/ChatFrame.vue"
import { useRoute } from "vue-router"
import { ref } from "vue"

const route = useRoute()
const username = ref(route.params.username)


</script>

<template>
    <ChatFrame :username="username" />
</template>