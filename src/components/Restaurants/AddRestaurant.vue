<template>
    <div class="form__container">
        <form method="post" @submit.prevent="addRestaurant">
            <h1>Restaurant</h1>
            <div class="field field-1">
                <label for="">Image</label>
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
                <select type="text" v-model="type">
                    <option :value="dataType" v-for="dataType in dataTypes" :key="dataType.id">{{dataType}}</option>
                </select>
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
            <div id="geocoder" class="field field-1">
                <label for="">Adresse</label>
            </div>
            <div class="star-rating field field-1">
                <label for="">Note</label>
                <label class="star-rating__star" :key="rating" v-for="rating in ratings"
                       :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
                       v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">
                    <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                           v-model="value" :disabled="disabled">★</label>
            </div>
            <input class="submit" type="submit" value="Ajouter">
        </form>
    </div>
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
                dataTypes:['Asiatique','Arménien','Italien',
                    'Indien','Mexicain',
                    'Américain','Street food',
                    'Salade','Libanais',
                    'Français','Turc',
                    'Arabe', 'Oriental',
                    'Pâtisserie','Jus et smoothies',
                'Africain', 'Grec',
                'Végétarien','Espagnol',
                'Tex Mex', 'Canadien',
                    'Marocain','Burgers'],
                name: null,
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
                                type: self.type,
                                address: self.address,
                                price: self.price,
                                note:{
                                    value: 0,
                                    totals: 0
                                },
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
    .form__container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 100px);
        form{
            width: 800px;
            background-color: white;
            border-radius: 21px;
            box-shadow: rgba(0, 0, 0, 0.28) 0 8px 28px;
            padding: 15px 10px;
            display: flex;
            flex-wrap: wrap;
            h1{
                display: block;
                width: 100%;
                text-align: center;
            }
            .field{
                margin-bottom: 15px !important;

                input, select{
                    width: 100%;
                    padding: 0;
                    height: 30px;
                }
                select{
                    height: 34px;
                }
                label{
                    display: block;
                    margin-bottom: 5px;
                }

                &.field-1{
                    margin: 0 2%;
                    width: 45%;
                }

                &.field-2{
                    width: 96%;
                    margin: 0 2%;
                }
            }
            .submit{
                margin: 0 2%;
                appearance: none;
                background-color: transparent;
                text-transform: uppercase;
                border: 1px solid;
                border-radius: 6px;
                padding: 10px 15px;
                outline: none;
                transition: all 0.6s;
                &:hover{
                    cursor: pointer;
                    background-color: #222222;
                    color: white;
                    transition: all 0.6s;
                }
            }
        }
    }

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
            display: inline-block !important;
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