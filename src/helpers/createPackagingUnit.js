/*eslint-disable*/

const uuidv4 = require('uuid/v4')
const fs = require('fs')
const Mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const CryptoJS = require('crypto-js')

const {registerIdentity,createClaim,hashClaim} = require('./helpers')

//  let commodityGroup = 'Cameras'
//  let seriesNumber = '1510791'
//  let numberOfItems = '10'
//  let valueOfItem = '399'
//  let currencyOfPrice = 'CHF'
//  let owner = 'Sony Corporation'
//  let trackingChannel = 'KUVQAPFVUZ9FUVLGWHVHVIPVOHLGLZRYWHNEWHPYSNFSXOYPEIKDDGMCEOKZISVOSWCZ9JJMNQLFBWOQY'
//  let deliveryDate = '01/01/2020'

exports.createPackagingUnit = async (data,trackingRoot) => {
    try {
        let claim = createClaim(data,trackingRoot)
        // console.log(claim)
        
        let hashedClaim = hashClaim(claim)

        let result = null
        await registerIdentity(hashedClaim).then(root => {
            //Send root and sideKey to transports---------------------------TBD
            result = {
                'claim': claim,
                'root': root
            }
            // console.log('Result before returning',result)
        })
        return result
    } catch(err) {
        console.log(err)
        return null
    }
}