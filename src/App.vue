<script setup>
import {useRouter} from "vue-router"
import NavBar from "./components/NavBar.vue"
const router = useRouter()

router.push('/')

</script>

<template>
    <p>Version: 0.2.11</p>
    <!-- <NavBar /> -->
    <RouterView />
</template>

<style scoped>

</style>