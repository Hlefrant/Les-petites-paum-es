<template>
    <div>
        <h1>Home</h1>
        <router-link to="/add">
            Ajouter restaurants
        </router-link>

        <div class="container">
            <ListRestaurants/>
            <Map/>
        </div>
    </div>
</template>

<script>
    import ListRestaurants from "@/components/Restaurants/ListRestaurants";
    import Map from "@/components/Map/Map";
    export default {
        name: "Home",
        components:{
            ListRestaurants,
            Map
        }
    }
</script>

<style scoped lang="scss">
    .container{
        display: flex;
    }

</style>