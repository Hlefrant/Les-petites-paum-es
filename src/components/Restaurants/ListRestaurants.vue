<template>
    <div class="list--restaurants">
        <Restaurant v-for="restaurant in restaurants"
                    :key="restaurant.id"
                    :id="restaurant.id"
                    :name="restaurant.name"
                    :address="restaurant.address"
                    :type="restaurant.type"
                    :note="restaurant.note"
                    :price="restaurant.price"
                    :image="restaurant.image"/>
    </div>
</template>

<script>
    import { db } from "@/main";
    import RestaurantModel from "@/components/Models/RestaurantModel";
    import Restaurant from "@/components/Restaurants/Restaurant";
    export default {
        name: "ListRestaurants",
        components:{
            Restaurant
        },
        data: function () {
            return{
                restaurants: []
            }
        },
        created() {
            this.getRestaurants()
        },
        methods:{
            getRestaurants: function () {
                let self = this
                db.collection("restaurants")
                    .onSnapshot(function(restaurants) {
                        restaurants.docs.forEach(restaurant =>{
                            let id = restaurant.id
                            let name = restaurant.get('name')
                            let type = restaurant.get('type')
                            let note = restaurant.get('note')
                            let price = restaurant.get('price')
                            let image = restaurant.get('image')
                            let address = restaurant.get('address')

                            self.restaurants.push(new RestaurantModel(id,name,image,address,type,note,price))
                        })
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .list--restaurants{
        width: 50%;
        margin: 0 8px;
    }
</style>