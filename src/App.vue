<script setup>
import {useRouter} from "vue-router"
const router = useRouter()

router.push('/')

</script>

<template>
    <p>Version: 0.2.11</p>
    <RouterView />
</template>

<style scoped>
p {
    color: #4ee94e;
}
</style>