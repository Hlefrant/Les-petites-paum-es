<template>
    <form method="post" @submit="this.addRestaurant">
        <div class="field field-1">
            <label for="">Nom</label>
            <input type="text" v-model="name">
        </div>
        <div class="field field-1">
            <label for="">Type de cuisine</label>
            <input type="text" v-model="type">
        </div>
        <div class="field field-1">
            <label for="">Date</label>
            <input type="text" v-model="date">
        </div>
        <div class="field field-1">
            <label for="">Gamme de prix</label>
            <select type="text" v-model="price">
                <option v-bind:value="0">€</option>
                <option v-bind:value="1">€€</option>
                <option v-bind:value="2">€€€</option>
            </select>
        </div>
        <div class="field field-2">
            <label for="">Adresse</label>
            <input type="text" v-model="address">
        </div>
        <div class="star-rating field field-2">
            <label class="star-rating__star" :key="rating" v-for="rating in ratings"
                   :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
                   v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">
                <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                       v-model="value" :disabled="disabled">★</label>
        </div>
        <input type="submit">
    </form>
</template>

<script>
    import * as firebase from 'firebase/app';

    export default {
        name: "AddRestaurant",
        data: function () {
            return {
                name: null,
                date: null,
                type: null,
                address: null,
                price: null,
                temp_value: null,
                ratings: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            star_over: function (index) {
                this.temp_value = this.value;
                return this.value = index;
            },
            star_out: function () {
                return this.value = this.temp_value;
            },
            set: function (value) {
                this.temp_value = value;
                return this.value = value;
            },
            addRestaurant: function () {
                firebase.firestore().db.collection("restaurants").add({
                    name: this.name,
                    date: this.date,
                    type: this.type,
                    address: this.address,
                    price: this.price,
                    note: this.temp_value
                })
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        this.$router.push('/')
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px; width: 1px;
        margin: -1px; padding: 0; border: 0;
    }

    .star-rating {

        &__star {
            display: inline-block;
            padding: 3px;
            vertical-align: middle;
            line-height: 1;
            font-size: 1.5em;
            color: #ABABAB;
            transition: color .2s ease-out;

            &:hover {
                cursor: pointer;
            }

            &.is-selected {
                color: #FFD700;
            }

            &.is-disabled:hover {
                cursor: default;
            }
        }

        &__checkbox {
            @extend %visually-hidden;
        }
    }

</style>