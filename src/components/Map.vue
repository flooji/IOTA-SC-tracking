<template>
    <div id='map' style='height:500px;width:500px;float:right;'></div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
// // Creating the map
// var map = tomtom.map('map', {
//     key: 'c4JgmgRrdIpiEN2jbDCrDkHMRV0yfH73',
//     source: 'vector',
//     basePath: '../lib/'
// })
// tomtom.setProductInfo('iotaGPS.com', '0.1')//from official IOTA example, changed to use case
// const TRYTE_ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// const asciiToTrytes = input => {
//   let trytes = ""
//   for (let i = 0; i < input.length; i++) {
//     var dec = input[i].charCodeAt(0)
//     trytes += TRYTE_ALPHABET[dec % 27]
//     trytes += TRYTE_ALPHABET[(dec - (dec % 27)) / 27]
//   }
//   return trytes;
// };
// const trytesToAscii = trytes => {
//   let ascii = ""
//     for (let i = 0; i < trytes.length; i += 2) {
//     ascii += String.fromCharCode(
//       TRYTE_ALPHABET.indexOf(trytes[i]) +
//         TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27
//     )
//   }
//   return ascii
// }

// (async function() {
//   const mode = 'restricted'
//   const sideKey = 'HELLOCANYOUHEARME'
//   const provider = "https://nodes.devnet.iota.org"
//   const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
//   //const outputHtml = document.querySelector("#output")

//   // Initialise MAM State
//   let mamState = Mam.init(provider)

//   // Set channel mode
//   mamState = Mam.changeMode(mamState, mode, sideKey)

//   //Make sure to use the correct root/channelID for the fetch
//   const channelID = "YBGAAW9PMGUIFONOBOFQPGAZFOT9YLEXPJNTZWJQFIQYKXMASYSZCSVCKBZKLPJEIFGODUWYBPWLLTIVV"

//   let markers = tomtom.L.markerClusterGroup()
//   let counter = 0

//   //Callback to get a single coordinate
//   const getCoordinate = data => {

//     let message = trytesToAscii(data)
//     let jsonObj = JSON.parse(message)

//     //Get stored GPS data
//       let time = jsonObj['message']['time']
//       let latitude = jsonObj['message']['lat']
//       let longitude = jsonObj['message']['lon']
//       let altitude = jsonObj['message']['alt']
//       let speed = jsonObj['message']['speed']
      
//       if(latitude && longitude) {
//           let title = time
//           let marker = tomtom.L.marker(new tomtom.L.LatLng(latitude, longitude), {title: title})
//           marker.bindPopup(title)
//           map.removeLayer(markers)
//           markers.addLayer(marker)
//           map.addLayer(markers)

//           counter++

//           if(counter==0) {
//               map.setView([latitude, longitude], 4)
//           }
//       }  
//     }

//   const fetchData = async root => {
//     //outputHtml.innerHTML += 'Fetch data from the tangle. Please be patient...<br/>'
//     await Mam.fetch(root,mode,null,getCoordinate)
//     console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`)
//   }

// fetchData(channelID).catch(err => {console.log(err)}) 
    
// })()
</script>


