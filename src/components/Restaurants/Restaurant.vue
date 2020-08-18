<template>
    <div class="restaurant">
        <img class="image" :src="this.image" alt="">
        <h2>{{ this.name }}</h2>
        <p>{{ this.address }}</p>
        <span>{{ this.type }}</span>
        <span>{{ this.date }}</span>
        <p>{{ this.price }}</p>
        <p>{{ this.note }}</p>
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
        width: 100%;
        border-top:1px solid rgb(221, 221, 221) ;
        border-bottom:1px solid rgb(221, 221, 221) ;
    }
</style>