<template>
    <div class="header">
        <router-link to="/">
            <img src="../assets/logo.png" alt="">
        </router-link>
        <div class="header__sign">
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>