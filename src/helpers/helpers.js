/*eslint-disable*/
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const CryptoJS = require('crypto-js')

//Create a claim with some predefined attributes and a variable data attribute
exports.createClaim = (data,tracking) => {
    //Create identity document for packaging unit with first root included
    let claim = {
    "subject": uuidv4(),
    "devicePubKey": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTOdA8wN524+wb5gqaU5uiliT1S5LoNqDIA2SI5P7VgGsYaH6zByB5jA7+muYCFUWHnWupU4DtEB6D59XgGRLfstxuyOIb7lwW1stsHaQW1UmZ5d04OlwQW2bMHvm1CwEEaOkVij+d6hsMhPTuFnbu1C3KQlGbCTEe5OClvN8DPQIDAQAB",
    "issuerAddress": "WWOTSUHSMXGELOPMDAHFSYXUGEHNIMGVUOSUHISVVUZYPQAQMSOXCWTIEKKYBCNVCBNBS9EWE9IVLDNAW",
    "data": data,
    "trackingRoot": tracking
    }
    return claim
}

//Stores a claim 
// exports.storeClaim = claim => {
//     //-------------------------------TBD---------make a PDF
//     fs.writeFile(`claim_${claim.subject}.json`, JSON.stringify(claim), function (err) {
//         if (err) throw err
//         // console.log(`File claim_${claim.subject}.json created successfully.`)
//     })
// }

//Hashes a claim with SHA256
exports.hashClaim = claim => {
    //Hash claim for publishing to tangle
    let hashedClaim = CryptoJS.SHA256(JSON.stringify(claim))
    .toString(CryptoJS.enc.Hex)

    return hashedClaim
}

// //Create MAM GNSS channel
// exports.setupTracking = () => {
//     let mode = 'restricted'
//     //Attention this sideKey is pseudo-random and not unique, for production mode use true random generator hardware or API
//     let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//     let provider = 'https://nodes.devnet.iota.org'
//     let seed = 'CDCXSVFS9YUWWHRJRRREQTVQXSSWYBRYWADGUHXEN9GWCB99FAQHZTVUJYACKKMSBIDFDYVRZFTNWHX9N'

//     //Initialise MAM State
//     let initial = Mam.init(provider,seed)

//     //Set channel mode
//     initial = Mam.changeMode(initial, mode, key)
//     // console.log('Initial state: ',initial)

//     //Store MAM state in case system breaks down
//     fs.writeFileSync('mam_state.json',JSON.stringify(initial))

//     return key
// }

//Publishes Identity-claim to tangle
exports.registerIdentity = async hash => {
    //Mam setup
    let mode = 'restricted'
    let sideKey = 'XuL34ALSe_r' //can change with updates
    let provider = 'https://nodes.devnet.iota.org'
    let mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`
    
    //Replace with your own seed, generated (on Linux terminal) with: cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
    let seed = 'Q9NAKGEEQIAZNJLACPCJWVBBWJSWLIJZZCMHDZLZODNHSVGYQW9JAWP9SXQNP9WCJALZIHCEXLDMKWJAP'

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
    const message = Mam.create(mamState,trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    // console.log('Published', packet, '\n');
    // console.log(`Root: ${message.root}\n`)
    // console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${message.root}\n`)

    //Store MAM state for update later
    //fs.writeFileSync('mam_state.json',JSON.stringify(mamState))
    
    return message.root
}
