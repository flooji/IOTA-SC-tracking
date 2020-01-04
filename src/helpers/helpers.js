/*eslint-disable*/
const uuidv4 = require('uuid/v4')
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const CryptoJS = require('crypto-js')

//Create a claim with some predefined attributes and a variable data attribute
exports.createClaim = (data,tracking) => {
    //Create identity document for packaging unit with first root included
    let claim = {
    "subject": uuidv4(),
    "data": data,
    "trackingRoot": tracking
    }
    return claim
}

//Hashes a claim with SHA256
exports.hashClaim = claim => {
    //Hash claim for publishing to tangle
    let hashedClaim = CryptoJS.SHA256(JSON.stringify(claim))
    .toString(CryptoJS.enc.Hex)
    console.log(hashedClaim)

    return hashedClaim
}


//Publishes Identity-claim to tangle
exports.registerIdentity = async hash => {
    //Mam setup
    let mode = 'restricted'
    let sideKey = process.env.VUE_APP_SIDE_KEY //provide your own side key
    let provider = 'https://nodes.devnet.iota.org'
    let mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${sideKey.padEnd(81, '9')}&root=`

    
    //Replace with your own seed, generated (on Linux terminal) with: cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
    let seed = process.env.VUE_APP_SEED 

    //Initialise MAM state object
    let mamState = Mam.init(provider,seed)
    mamState = Mam.changeMode(mamState, mode, sideKey)

    //Packet to be published
    const packet = {
        message: hash,
        timestamp: (new Date()).toLocaleString()
    }

    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    console.log(trytes)
    const message = Mam.create(mamState,trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    // console.log('Published', packet, '\n');
    console.log(`Root: ${message.root}\n`)
    console.log(`Address: ${message.address}`)
    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${message.root}\n`)
    
    return message.root
}
