const axios = require("axios")

/* Function to GET Web API Data*/

const getPixaAPI =  async (city) => {
    const response = await axios(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city}&image_type=photo`)
    try {
        return response.data.hits[0]
    } catch (e){
        console.log("Error", e)
    }
}

module.exports = getPixaAPI