import {
    today,
    postData, 
    getProjectData
} from "./js/app"

import "./styles/style.scss"

/* Event Listener for generate button */
document.querySelector("#generate").addEventListener("click", (e) => {
    e.preventDefault();
    // Get City Input 
    const city = document.querySelector("#city").value.trim().toLowerCase();

    // Days to Trip
    const tripDate = document.querySelector("#date").value;
    const daysLeft = daysToTrip (today.split("-"), tripDate.split("-"))
  
    try{
        if(!city){
            throw new Error("Please Enter City")
        }

        if (!tripDate){
            throw new Error("Please Enter Your Trip Date")
        }

        if (daysLeft <= 0){
            throw new Error("Your Trip Date must be after Today Date")
        }
        
        postData("/search", { city, today, tripDate, daysLeft })
        .then(data => {
            getProjectData("/all");
        })
        
    } catch (e){
        alert(e)
    }
    
});

const daysToTrip = (today, tripDate) => {
    const start = new Date (today)
    const end = new Date (tripDate)
    const result = (end.valueOf() - start.valueOf())/(1000*60*60*24)
    return result
}