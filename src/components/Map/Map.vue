<template>
    <div id="map"></div>
</template>

<script>
    import {db} from "@/main";
   import 'mapbox-gl/dist/mapbox-gl.css';

    export default {
        name: "Map",
        data: function(){
            return{

            }
        },
        mounted() {
            this.setMap()
        },
        methods:{
            setMap: function(){
                const mapboxgl = require('mapbox-gl');

                //pk.eyJ1Ijoib3NtaWlvcyIsImEiOiJja2Uwam1tc2Uzd2NqMnFtcWZybm15eHFnIn0.Zk1m5B7BpTw5QyCesO3YfQ
                mapboxgl.accessToken = 'pk.eyJ1Ijoib3NtaWlvcyIsImEiOiJja2UxajAzMGQ0NXFzMnh0djNmbm9iOHh5In0.JgkdHnVb3rMvM9wvhTlgDA';
                const map = new mapboxgl.Map({
                    container: 'map',
                    center: [4.834277, 45.763420],
                    zoom: 12,
                    style: 'mapbox://styles/osmiios/cke2p4kco0qd219m5emdieywg'
                })

                db.collection("restaurants")
                    .onSnapshot(function(restaurants) {
                        restaurants.docs.forEach(restaurant =>{
                            let coord = restaurant.get('coord')
                            var el = document.createElement('div');
                            el.className = 'marker';
                            new mapboxgl.Marker(el)
                                .setLngLat([coord.longitude, coord.latitude])
                                .addTo(map);
                        })

                    });
                return map
            },
        }
    }
</script>

<style scoped lang="scss">

    #map {
        height: 80vh;
        width: 50%;



        .mapboxgl-ctrl-attrib {
            display: none;
        }

    }
</style>