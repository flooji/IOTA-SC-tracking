/* eslint-disable no-console */

const CryptoJS = require('crypto-js')
const {verifyJWT} = require('./signature')
//const fs = require('fs')

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
let checkIdentity = async token => {
//Load RSA256 public Key
const publicKey = process.env.VUE_APP_PUBLIC_KEY_DEVICE //alternatively for Nodejs: fs.readFileSync('./publicKey.pem')
const decodedToken = verifyJWT(token, publicKey)

//can only be decoded if valid
if(decodedToken) {
  //Hash decoded claim
  const hashFromRaspi = CryptoJS.SHA256(JSON.stringify(decodedToken))
    .toString(CryptoJS.enc.Hex)
  //console.log('Hashed claim: ',hashFromRaspi)

  //Make sure to use the correct root/channelID for the fetch
  const root = 'UHKZQXUIXPNGFQAQFPQDVI9RLUHPQMTXTMOURUCBGJADMVR9PPFTVFBKDYSPFJNMCQV9IKKA9JF9QYMNQ'

  //Fetch one claim from tangle as promise and resolve
  return await Mam.fetchSingle(root, mode, null).then(data => {

    var jsonObj = JSON.parse(trytesToAscii(data.payload))
    var hashFromTangle = jsonObj.message
    
    //console.log('Decoded message: ', hashFromTangle)

    //Check hashed Claim provided by raspberry pi
    if(hashFromRaspi == hashFromTangle) {
      return decodedToken//console.log('Hashes do match: Provided claim is valid.\n')

    } else {
      console.log('Wrong claim provided\n\n')
      return false
    }
    }).catch(err => {
      console.log(err)
      return false
    })

} else {
  console.log('Invalid JSON Web token')
  return false
}
}

export {checkIdentity}


