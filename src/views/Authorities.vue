<template>
    <div class="container">
        <div class="row">
                <div class="panel">
                        <h1>Welcome!</h1>
                        <h2>Track devices with DLT-secured GNSS-data in real-time</h2>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'authorities'
}
//import Map from '../components/Map.vue'

// export default {
//   name: 'authorities',
//   components: {
//     'tom-map': Map
//   },
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App',
//       map: {},
//       markers: []
//     }
//   },
//   created() {
//     // App Info
//     tomtom.setProductInfo("tomtomTest", "0.1");
//   },
//   mounted() {
//     // Raplaces div#map with TomTom map
//     this.map = new tomtom.L.Map('map', {
//       key: "c4JgmgRrdIpiEN2jbDCrDkHMRV0yfH73",
//       source: 'vector',
//       center: [52.360306, 4.876935],
//       zoom: 5,
//       basePath: "/sdk/"
//     });
//     this.markers.push(tomtom.L.marker([52.360306, 4.876935], {
//       icon: tomtom.L.icon({
//         iconUrl: '/sdk/images/ic_map_poi_126-black.png'
//       })
//     }).addTo(this.map));
//     this.markers.push(tomtom.L.marker([50, 0], {
//       icon: tomtom.L.icon({
//         iconUrl: '/sdk/images/ic_map_poi_125-black.png'
//       })
//     }).addTo(this.map));
//     console.log(this.markers);
//     tomtom.L.popup()
//       .setLatLng([52.360306, 4.876935])
//       .setContent('Yo Bro, Where You At?...')
//       .openOn(this.map);
//     // Since map is inserted into element, need to add event handler to the actual map
//     this.map.on('click', this.displayCoordinates);
//   },
//   methods: {
//     displayCoordinates(e) {
//       tomtom.L.popup()
//         .setLatLng(e.latlng)
//         .setContent(
//           "<h4>Deez Coordinates Are: " + 
//           e.latlng.lat.toFixed(2) + 
//           ", " + 
//           e.latlng.lng.toFixed(2) + 
//           "</h4>"
//         )
//         .openOn(this.map);
//     }
//   }
// }
</script>
<style scoped>
.background {
    text-align: center;
    margin: auto;
}
</style>