<template>
    <router-link :to="{ name: 'restaurant', params: { id: this.id } }" class="restaurant">
        <img class="image" :src="this.image" alt="">
        <div class="restaurant__content">
            <div class="informations">
                <p class="type">{{ this.type }} | {{ displayPrice() }}</p>
            </div>
            <div class="content">
                <h2>{{ this.name }}</h2>
                <p>{{ this.address }}</p>
            </div>

            <div class="stars">
                <img class="star-rating__star" src="~@/assets/star.svg" v-for="star in note" :key="star.id"/>
            </div>
        </div>

    </router-link>
</template>

<script>


    export default {
        name: "Restaurant",
        props:{
            id: String,
            name: String,
            address: String,
            type: String,
            note: Number,
            price: Number,
            image: String
        },
        methods:{
            displayPrice: function () {
                switch (this.price) {
                    case 0:
                        return "€"
                    case 0.5:
                        return '€-€€'
                    case 1 :
                        return '€€'
                    case 1.5 :
                        return '€€-€€€'
                    default:
                        return '€€€'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .restaurant{
        margin-bottom: 20px;
        padding: 20px 10px;
        width: 98%;
        border-top:1px solid rgb(221, 221, 221) ;
        border-bottom:1px solid rgb(221, 221, 221) ;
        display: flex;
        align-items: center;
        position: relative;
        .image{
            width: 300px;
            height: 200px;
            border-radius: 16px;
            object-fit: cover;
        }

        .restaurant__content{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 150px;
            margin-left: 15px;
            .informations{
                background-color: #05ed90;
                padding: 5px 10px;
                border-radius: 21px;
                color: white;
                position: absolute;
                top: 15px;
                right: 25px;
                .type{
                    font-family: 'Montserrat';
                    font-size: 14px;
                    text-transform: uppercase;
                }
            }
            h2{
                margin-bottom: 15px;
            }

            .stars{
                img{
                    width: 15px;
                    margin-right: 3px;
                }
            }
        }
    }
</style>