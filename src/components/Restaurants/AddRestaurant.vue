<template>
    <form method="post" @submit.prevent="addRestaurant">
        <div class="field field-1">
            <input type="file"
                   name="photo"
                   accept="image/png, image/jpeg"
                   @change="processFile($event)">
        </div>
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
                <option v-bind:value="0.5">€-€€</option>
                <option v-bind:value="1">€€</option>
                <option v-bind:value="1.5">€€-€€€</option>
                <option v-bind:value="2">€€€</option>
            </select>
        </div>
        <div id="geocoder" class="field field-2">
            <label for="">Adresse</label>
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
    import * as firebase from 'firebase';
    import 'firebase/storage';
    import {db} from "@/main";
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

    export default {
        name: "AddRestaurant",
        data: function () {
            return {
                name: null,
                date: null,
                image: '',
                type: null,
                address: null,
                price: null,
                value: null,
                temp_value: null,
                coord: null,
                ratings: [1, 2, 3, 4, 5]
            }
        },
        mounted() {
            this.setGeocoderInput()
        },
        methods: {
            setGeocoderInput: function(){
                mapboxgl.accessToken = 'pk.eyJ1Ijoib3NtaWlvcyIsImEiOiJja2UxajAzMGQ0NXFzMnh0djNmbm9iOHh5In0.JgkdHnVb3rMvM9wvhTlgDA';
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    countries: 'fr',
                });

                geocoder.addTo('#geocoder');
                let self = this
                geocoder.on('result', function(data) {
                    self.coord = new firebase.firestore.GeoPoint(data.result.center[1],data.result.center[0])
                    self.address = data.result.place_name
                })
                geocoder.on('clear', function() {
                    self.coord = null
                    self.address = null
                })
            },
            processFile(event) {
                this.image = event.target.files[0]
            },
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
            addRestaurant: function (e) {
                const storage = firebase.storage();
                let self = this
                storage.ref('restaurants/' + this.image.name).put(this.image)
                    .then(response => {
                        console.log(response)
                        storage.ref().child('restaurants/' + this.image.name).getDownloadURL().then(function (url) {
                            db.collection("restaurants").add({
                                name: self.name,
                                image: url,
                                date: self.date,
                                type: self.type,
                                address: self.address,
                                price: self.price,
                                note: self.temp_value,
                                coord: self.coord
                            })
                                .then(function (docRef) {
                                    console.log("Document written with ID: ", docRef.id);
                                    self.$router.push('/')
                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        }).catch(function (error) {
                            console.log(error)
                        });
                    })
                    .catch(err => console.log(err))
                e.preventDefault()

            }
        }
    }
</script>

<style scoped lang="scss">
    %visually-hidden {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
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