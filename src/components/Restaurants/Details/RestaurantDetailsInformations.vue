<template>
    <div class="informations">
        <p>Prix : {{ this.price }}</p>
        <p>Note : {{ this.note }}</p>

        <div class="address">
            <p>{{ this.address }}</p>
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
            note: Number,
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
            }
        }

    }
</script>

<style scoped lang="scss">
    .informations{
        width: 500px;
        .address{
            #map{
                height: 350px;
                width: 500px;
            }
        }
    }
</style>