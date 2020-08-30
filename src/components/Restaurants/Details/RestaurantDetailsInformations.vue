<template>
    <div class="informations">
        <h2>Détails et note</h2>
        <div class="field">
            <p>Prix : {{ this.displayPrice() }}</p>
        </div>
        <div class="field">
            <div class="note" v-if="this.note.value > 0 && this.note.totals > 0">
                <div class="stars">
                    <img src="~@/assets/star.svg" v-for="star in Math.round(this.note.value)" :key="star.id"/>
                </div>
                <p>{{this.note.totals}} votes</p>
            </div>
            <div v-else>
                <p>Pas de encore de vote :)</p>
            </div>
        </div>
        <div class="address">
            <div class="content">
                <img src="~@/assets/pin.svg" alt="">
                <p>{{ this.address }}</p>
            </div>

            <div id="map"></div>
        </div>
    </div>
</template>

<script>
    import 'mapbox-gl/dist/mapbox-gl.css';

    export default {
        name: "RestaurantDetailsInformations",
        props:{
            address: String,
            note: Object,
            price: Number,
            coord: {
                type: Object,
                required: false,
                default: function () {
                    return {}
                }
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                this.setMapRestaurant()
            });

        },
        methods:{
            setMapRestaurant: function () {
                const mapboxgl = require('mapbox-gl');
                let self = this
                mapboxgl.accessToken = 'pk.eyJ1Ijoib3NtaWlvcyIsImEiOiJja2UxajAzMGQ0NXFzMnh0djNmbm9iOHh5In0.JgkdHnVb3rMvM9wvhTlgDA';
                const map = new mapboxgl.Map({
                    container: 'map',
                    center: [self.coord.longitude, self.coord.latitude],
                    zoom: 16,
                    style: 'mapbox://styles/osmiios/cke2p4kco0qd219m5emdieywg'
                })

                var el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                    .setLngLat([self.coord.longitude, self.coord.latitude])
                    .addTo(map);
            },
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
    .informations{
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        background: #fff;
        width: 500px;
        margin: 12px;
        padding: 16px 24px 24px 24px;
        h2{
            border-bottom: 1px solid #ccc;
            padding-bottom: 12px;
            font-size: 1.25em;
            color: #4a4a4a;
            margin-bottom: 25px;
        }

        .field{
            margin-bottom: 10px;

            .note{
                display: flex;
                .stars{
                    margin-right: 8px;
                    img{
                        width: 15px;
                        margin-right: 3px;
                    }
                }
            }

        }
        .address{
            .content{
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                img{
                    width: 20px;
                    margin-right: 10px;
                }
            }

            #map{
                height: 350px;
                width: 500px;
            }
        }
    }
</style>