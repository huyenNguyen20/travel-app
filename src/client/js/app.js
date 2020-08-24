//Get Today Date
const now = new Date();
//const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const today = now.toISOString().substr(0,10);

/* Function to POST data */
const postData = async (url = "", data = {}) => {
   
    try{
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        ;
        
        return await response.json();

    } catch (e) {
        console.log("Error", e);
    }
}

/* Function to GET Project Data */
const getProjectData = async (url="") => {
 
    try{
        const response = await fetch(url);
        //Getting Project Data
        const data = await response.json();
        updateUI(data[data.length - 1])
        
    } catch (e) {
        console.log("Error", e);
    }
}

/* Function to update UI  */
const updateUI = (data) => {
    const html = 
    `<figure class="city-pic">
        <img src="${data.img}" alt="${data.location.city} Picture">
        <h2>${data.location.city}</h2>
    </figure>  

    <section class="social__media" > 
    <ul class="content-info-social-link">
        <li><a role="button"
            class="twitter-icon"
            href="https://twitter.com/">
            <img src="https://img.icons8.com/fluent/48/000000/twitter.png"/>
        </a>
        </li>
        <li><a role="button"
            class="facebook-icon"
            href="https://facebook.com/">
            <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png"/>
        </a>
        </li>
        <li><a role="button"
                class="instagram-icon"
                href="https://instagram.com/">
                <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/>
            </a>
        </li>
        <li><a role="button"
            href="https://linkedin.com/">
            <img src="https://img.icons8.com/color/48/000000/linkedin.png"/>
            </a>
        </li>
        <li></li>
        <button class="icon-btn" id="like-button">
            <img src="https://img.icons8.com/cotton/64/000000/like--v3.png"/>
        </button>
        </a>
    </li>
    </ul>
    </section>

    <section class="city__summary" id="Summary"> 
        <h3> About ${data.location.city}</h3>
        <p class="result__item-orange"><span>Country</span> ${data.location.country}</p>
        <p class="result__item-gray"><span>Description</span> ${data.location.description}</p>
        <p class="result__item-orange"><span>City Population</span> ${data.location.population}</p>
        <p class="result__item-gray"><span>Weather</span> ${data.weather.temp}. ${data.weather.description}</p>
        <p class="result__item-orange"><span>Covid-19 Cases</span> ${data.covid.cases}</p>
    </section>

    <section class="city__weather" id="Weather">
        <h3> Weather</h3>
        <div class = "weather--date">${formatDate(data.weather.date)}</div>
        <div class = "weather__head">
            <img class = "js-img" src="${data.weather.icon}" alt="">
            <div class = "weather--temp"> 
            ${data.weather.temp}
            </div>
        </div>
        <p class="result__item-orange"><span>Description</span> ${data.weather.description}</p>
        <p class="result__item-gray"><span>Lowest Temperature</span> ${data.weather.lowTemp}</p>
        <p class="result__item-orange"><span>High Temperature</span> ${data.weather.maxTemp}</p>
        <p class="result__item-gray"><span>Cloud</span> ${data.weather.temp}</p>
        <p class="result__item-orange"><span>Precipation</span> ${data.weather.precipation}</p>

    </section>
    <section class="city__country" id="Country">
        <h3> Country</h3>
        <img src=${data.country.flagPic} alt="${data.country.name} Picture">
        <p class="result__item-orange"><span>Country</span> ${data.country.name}</p>
        <p class="result__item-gray"><span>Language</span> ${data.country.language}</p>
        <p class="result__item-orange"><span>Population</span> ${data.country.population}</p>
        <p class="result__item-gray"><span>Currency</span> ${data.country.currency}</p>
    </section>
    <section class="city__covid" id="Covid">
        <h3> Covid-19</h3>
        <p class="result__item-orange"><span>Total Cases</span> ${data.covid.cases}</p>
        <p class="result__item-gray"><span>Total Deaths</span> ${data.covid.deaths}</p>
        <p class="result__item-orange"><span>Total Recoverd</span> ${data.covid.recovered}</p>
    </section>
    `;
    document.querySelector(".main-doc").innerHTML = html;
    document.querySelector(".destination-name").innerHTML = `Your Destination: <span> ${data.location.city} from ${formatDate(data.weather.date)} </span>`
}

function formatDate (dateString){
    let date = new Date(dateString)
    return `${date.toString().substring(0,3)}, ${date.toString().substring(4,15)}`
}

module.exports = {
    today,
    postData,
    getProjectData
}
