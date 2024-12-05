<script setup>
import {useRouter} from "vue-router"
import NavBar from "./components/NavBar.vue"
import overlay from "./components/Overlay.vue"

const router = useRouter()
router.push('/')

</script>

<template>
    <!-- <overlay /> -->
    <p>Version: 0.2.11</p>
    <div class="container">
        <NavBar />
        <div class="window">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>

</style>