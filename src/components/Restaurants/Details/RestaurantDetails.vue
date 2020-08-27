<template>
    <div class="restaurant__details">
        <div class="banner">
            <div class="banner__content">
                <h1>{{this.name}}</h1>
                <span class="line"></span>
                <p>{{ this.type}}</p>
            </div>

            <img :src="this.image" alt="">
        </div>

        <div class="content">
            <RestaurantDetailsInformations v-if="coord.longitude != null" :address="this.address" :note="this.note" :price="this.price" :coord="this.coord" />
            <RestaurantDetailsComments :id="this.id" :note="this.note"/>
        </div>
    </div>
</template>

<script>
    import { db } from "@/main";
    import RestaurantDetailsInformations from "@/components/Restaurants/Details/RestaurantDetailsInformations";
    import RestaurantDetailsComments from "@/components/Restaurants/Details/RestaurantDetailsComments";
    export default {
        name: "RestaurantDetails",
        components:{
          RestaurantDetailsInformations,
            RestaurantDetailsComments
        },
        data: function () {
            return{
                id: this.$route.params.id,
                name: null,
                address: null,
                type: null,
                note: null,
                price: null,
                image: null,
                coord: {longitude: null, latitude: null}
            }
        },
        created(){
            this.getData()

        },
        methods:{
            getData: function () {
                let self = this
                db.collection("restaurants").doc(this.id).onSnapshot(function (restaurant) {
                    self.name = restaurant.get('name')
                    self.type = restaurant.get('type')
                    self.note = restaurant.get('note')
                    self.price = restaurant.get('price')
                    self.image = restaurant.get('image')
                    self.address = restaurant.get('address')
                    self.coord.longitude = restaurant.get('coord').longitude
                    self.coord.latitude = restaurant.get('coord').latitude
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.restaurant__details{
    .banner{
        height: 500px;
        object-fit: cover;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .banner__content{
            position: relative;
            z-index: 2;
            color: white;
            text-align: center;

            .line{
                width: 60px;
                height: 1px;
                background-color: white;
                display: block;
                margin: 10px auto;
            }
        }
        img{
            height: 100%;
            object-fit: cover;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }
        &:before{
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background-color: #1a1a1a;
            opacity: 0.4;
        }
    }
    .content{
        display: flex;
    }
}
</style>