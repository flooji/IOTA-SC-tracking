/* eslint-disable no-console */

const CryptoJS = require('crypto-js')
const fs = require('fs')
const {verifyJWT} = require('./signature')

//Require Mam package from iota.js
const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')

//MAM setup 
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'

// Initialise MAM State object
Mam.init(provider)

//Check signature is valid
//only continue if signature is valid
let checkIdentity = token => {
    //Load RSA256 public Key
const publicKey = fs.readFileSync('publicKey.pem')

const isValid = verifyJWT(token, publicKey)

if(isValid) {
  
  //Hash decoded claim
  const hashDecoded = CryptoJS.SHA256(JSON.stringify(isValid))
    .toString(CryptoJS.enc.Hex)
  console.log('Hashed claim: ',hashDecoded)

  //Make sure to use the correct root/channelID for the fetch
  const channelID = 'UHKZQXUIXPNGFQAQFPQDVI9RLUHPQMTXTMOURUCBGJADMVR9PPFTVFBKDYSPFJNMCQV9IKKA9JF9QYMNQ'

  let verifyClaim = async (root, hashFromRaspi) => {

  //Fetch one claim from tangle as promise and resolve
  await Mam.fetchSingle(root, mode, null).then(data => {

    var jsonObj = JSON.parse(trytesToAscii(data.payload))
    var hashFromTangle = jsonObj.message
    
    console.log('Decoded message: ', hashFromTangle)

    //Check hashed Claim provided by raspberry pi
    if(hashFromRaspi == hashFromTangle) {
      console.log('Hashes do match: Provided claim is valid.\n')

    } else console.log('Wrong claim provided\n\n')

    }).catch(err => {
      console.log(err)
    })
  }

  verifyClaim(channelID,hashDecoded)

} else {
  console.log('Invalid JSON Web token')
}
}

export {checkIdentity}

