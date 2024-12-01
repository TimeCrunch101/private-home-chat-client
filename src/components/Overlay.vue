<script setup>
import { ref } from "vue";

const content = ref([])
const display = ref(true);
const showClose = ref(false)

window.versions.onMessage((data) => {
    content.value.push(data)
    if (data.includes("Connected to tor...")) {
        console.info("connected to tor")
        setTimeout(() => {
            showClose.value = true
        }, 1200);
    }
});

const closeModal = () => {
    display.value = false
}

</script>

<template>
    <div v-if="display" class="overlay">
        <div id="message" class="inner">
            <button v-if="showClose" @click="closeModal()" class="close">X</button>

            <p v-for="msg in content">{{ msg }}</p>
            <!-- <p>Dec 01 08:44:47.986 [notice] Tor 0.4.8.13 (git-e153e72c01315f86) running on Linux with Libevent 2.1.12-stable, OpenSSL 3.0.2, Zlib 1.2.11, Liblzma N/A, Libzstd N/A and Glibc 2.35 as libc. Dec 01 08:44:47.986 [notice] Tor can't help you if you use it wrong! Learn how to be safe at https://support.torproject.org/faq/staying-anonymous/ Dec 01 08:44:47.986 [notice] Configuration file "/var/tmp/dist/tor/etc/tor/torrc" not present, using reasonable defaults.</p>
            <p>Dec 01 08:44:47.987 [notice] Opening Socks listener on 127.0.0.1:9050 Dec 01 08:44:47.988 [notice] Opened Socks listener connection (ready) on 127.0.0.1:9050</p>
            <p>Keypair Exists...</p>
            <P>Dec 01 08:44:47.000 [notice] Bootstrapped 0% (starting): Starting</P>
            <P>Dec 01 08:44:48.000 [notice] Starting with guard context "default"</P>
            <P>Dec 01 08:44:49.000 [notice] Bootstrapped 5% (conn): Connecting to a relay</P>
            <P>Dec 01 08:44:49.000 [notice] Bootstrapped 10% (conn_done): Connected to a relay</P>
            <P>Dec 01 08:44:49.000 [notice] Bootstrapped 14% (handshake): Handshaking with a relay</P>
            <P>Dec 01 08:44:50.000 [notice] Bootstrapped 15% (handshake_done): Handshake with a relay done Dec 01 08:44:50.000 [notice] Bootstrapped 75% (enough_dirinfo): Loaded enough directory info to build circuits Dec 01 08:44:50.000 [notice] Bootstrapped 90% (ap_handshake_done): Handshake finished with a relay to build circuits Dec 01 08:44:50.000 [notice] Bootstrapped 95% (circuit_create): Establishing a Tor circuit</P>
            <P>Dec 01 08:44:51.000 [notice] Bootstrapped 100% (done): Done</P>
            <p>Checking connection to tor...</p>
            <p>Connected to tor...</p> -->
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