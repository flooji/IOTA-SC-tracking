<template>
    <div>
        <div id='map' class="map" style='height:500px;width:500px;'></div>
        <div id="output"></div>
    </div>
</template>
<script> 
/* eslint-disable */
import tt from '@tomtom-international/web-sdk-maps'
import Mam from '@iota/mam'
import {trytesToAscii, asciiToTrytes} from '@iota/converter'
        
const apiKey = process.env.VUE_APP_TOM_TOM_KEY
export default {
    methods: {
    },
    mounted() {
        this.map = tt.map({
            key: apiKey,
            container: 'map',
            style: 'tomtom://vector/1/basic-main',
            zoom: 7,
            center: [8.30635, 47.05048 ]
            //dragPan: !window.this.isMobileOrTablet()
        })
        this.map.addControl(new tt.FullscreenControl())
        this.map.addControl(new tt.NavigationControl())

        let map = this.map

        //from official IOTA example, changed to use case
        const TRYTE_ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const asciiToTrytes = input => {
        let trytes = ""
        for (let i = 0; i < input.length; i++) {
            var dec = input[i].charCodeAt(0)
            trytes += TRYTE_ALPHABET[dec % 27]
            trytes += TRYTE_ALPHABET[(dec - (dec % 27)) / 27]
        }
        return trytes
        }
        const trytesToAscii = trytes => {
        let ascii = ""
            for (let i = 0; i < trytes.length; i += 2) {
            ascii += String.fromCharCode(
            TRYTE_ALPHABET.indexOf(trytes[i]) +
                TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27
            )
        }
        return ascii
        }

        (async function() {
        const mode = 'restricted'
        const sideKey = 'GPSTRACKERSCCHAIN'
        const provider = "https://nodes.devnet.iota.org"
        const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
        const outputHtml = document.querySelector("#output")

        // Initialise MAM State
        let mamState = Mam.init(provider)

        // Set channel mode
        mamState = Mam.changeMode(mamState, mode, sideKey)

        //Make sure to use the correct root/channelID for the fetch
        const channelID = process.env.VUE_APP_GNSS_SEED

        let counter = 0
        //Callback to get a single coordinate
        const getCoordinate = data => {

            let message = trytesToAscii(data)
            let jsonObj = JSON.parse(message)

            //Get stored GPS data
            let time = jsonObj['message']['time']
            let latitude = jsonObj['message']['lat']
            let longitude = jsonObj['message']['lon']
            let altitude = jsonObj['message']['alt']
            let speed = jsonObj['message']['speed']

            if(latitude && longitude) {
                let marker = new tt.Marker()
                .setLngLat([longitude,latitude])
                .addTo(map)

                ++counter

                if(counter==0) {
                    map.setCenter([longitude,latitude]).setZoom(4)
                }
            }

            outputHtml.innerHTML += `Fetched and parsed message Nr.${counter}:<br/>Time: ${time} Latitude: ${latitude} Longitude: ${longitude} Altitude: ${altitude} Speed: ${speed}<br/>`
            
        }
        
        const fetchData = async root => {
            outputHtml.innerHTML += 'Fetch data from the tangle. Please be patient...<br/>'
            await Mam.fetch(root,mode,sideKey,getCoordinate)
            outputHtml.innerHTML += `Verify with MAM Explorer:<br/><a target="_blank" href="${mamExplorerLink}${root}">${mamExplorerLink}${root}</a>`
        }
        fetchData(channelID).catch(err => {console.log(err)}) 
    })()

    }
}
</script>
