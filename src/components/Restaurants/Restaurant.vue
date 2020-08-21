<template>
    <div class="restaurant">
        <img class="image" :src="this.image" alt="">
        <div class="restaurant__content">
            <span class="type">{{ this.type }}</span>
            <h2>{{ this.name }}</h2>
            <p>{{ this.address }}</p>
            <span>{{ this.date }}</span>
            <p>{{ displayPrice() }}</p>
            <div class="stars">
                <img class="star-rating__star" src="~@/assets/star.svg" v-for="star in note" :key="star.id"/>
            </div>
        </div>

    </div>
</template>

<script>


    export default {
        name: "Restaurant",
        props:{
            name: String,
            address: String,
            type: String,
            note: Number,
            price: Number,
            date: String,
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
        width: 100%;
        border-top:1px solid rgb(221, 221, 221) ;
        border-bottom:1px solid rgb(221, 221, 221) ;
        display: flex;
        align-items: center;
        .image{
            width: 300px;
            height: 200px;
            border-radius: 16px;
            object-fit: cover;
        }

        .restaurant__content{
            .type{
                font-family: 'Montserrat';
                color: rgb(113, 113, 113);
                font-size: 14px;
                text-transform: uppercase;
            }
            p, h2{
                margin: 0;
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