const jwt = require('jsonwebtoken')

//verify a JSON web token with public Key provided
exports.verifyJWT = (jsonWebToken, key) => {
    try {
        const decoded = jwt.verify(jsonWebToken,key,{algorithms: ['RS256']})
        return decoded
      } catch(err) {
        // err = {
        //     name: 'JsonWebTokenError',
        //     message: 'jwt malformed'
        //   }
        return false
        //console.log(`Invalid signature.\nError name: ${err.name}\nError message: ${err.message}`)
      }
}