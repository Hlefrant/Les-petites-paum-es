<template>
    <div>
        <h1>Home</h1>
        <router-link to="/add">
            Ajouter restaurants
        </router-link>

        <ListRestaurants/>
    </div>
</template>

<script>
    import ListRestaurants from "@/components/Restaurants/ListRestaurants";
    export default {
        name: "Home",
        components:{
            ListRestaurants
        }
    }
</script>

<style scoped>

</style>