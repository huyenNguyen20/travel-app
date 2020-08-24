const axios = require("axios")

/* Function to GET Web API Data*/
const getGeoAPI =  async (city) => {
    const request = await axios(`http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.USER_NAME}`)
    try {
        return request.data.geonames[0]
    } catch (e){
        console.log("Error", e)
    }
}

module.exports = getGeoAPI