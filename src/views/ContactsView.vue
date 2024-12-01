<script setup>

</script>
<template>
    <div class="add-contact-container">
        <input type="text" name="add-contact" id="add-contact" placeholder="Contact GUID...">
        <button class="btn">Search</button>
    </div>

    <ul>
        <li>testUser</li>
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
</style>