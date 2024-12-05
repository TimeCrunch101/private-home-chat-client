<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const input = ref(null)
const contacts = ref([
    {
        username: "someuser",
        uuid: "12345",
        friendToken: "123"
    },
    {
        username: "user1",
        uuid: "123456",
        friendToken: "1234"
    },
    {
        username: "user2",
        uuid: "123457",
        friendToken: "1235"
    },

])

const openChat = (username) => {
    router.push(`/chat/${username}`)
}

</script>
<template>
    <div class="add-contact-container">
        <input type="text" name="add-contact" id="add-contact" placeholder="Contact GUID..." v-model="input">
        <button class="btn">Search</button>
    </div>

    <h2>List: </h2>

    <ul>
        <li v-for="contact in contacts">{{ contact.username }} <span @click="openChat(contact.username)" class="msg-user">[ msg ]</span></li>
    </ul>
</template>

<style scoped>
.add-contact-container {
    display: flex;
    margin-top: 1em;
    margin-right: 1em;
    margin-bottom: 1em;
}
#add-contact {
    width: 100%;
    font-size: x-large;
    background-color: black;
    border: 0px;
    color: white;
}
.msg-user {
    color: red;
}
.msg-user:hover {
    cursor: pointer;
    color: turquoise;
}
</style>