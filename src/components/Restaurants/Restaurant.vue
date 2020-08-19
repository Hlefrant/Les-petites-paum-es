<template>
    <div class="restaurant">
        <img class="image" :src="this.image" alt="">
        <div class="restaurant__content">
            <span class="type">{{ this.type }}</span>
            <h2>{{ this.name }}</h2>
            <p>{{ this.address }}</p>
            <span>{{ this.date }}</span>
            <p>{{ this.price }}</p>
            <p>{{ this.note }}</p>
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
        }
    }
</script>

<style scoped lang="scss">

    .restaurant{
        margin-bottom: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
        border-top:1px solid rgb(221, 221, 221) ;
        border-bottom:1px solid rgb(221, 221, 221) ;
        display: flex;
        align-items: center;
        img{
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
        }
    }
</style>