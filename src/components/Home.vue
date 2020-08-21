<template>
    <div>
        <router-link class="add" to="/add">
            Ajouter restaurants
            <img src="../assets/food.svg" alt="">
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

    .add{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: transparent;
        padding: 5px 5px 5px 12px;
        border: 1px solid #DDDDDD ;
        color: #222222 ;
        cursor: pointer ;
        border-radius: 21px;
        width: 170px;
        text-decoration: none;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 50px;
        img{
            width: 20px;
        }

        &:hover{
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
            cursor: pointer;
        }
    }
    .container{
        display: flex;
    }

</style>