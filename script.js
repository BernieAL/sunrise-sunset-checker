window.onload = function() {
    


/* Animation of sunPeek*/

//document.querySelector('#sunPeek').css


 /* On click of 'search' -> get text input from user
        Then use Fetch to hit API with location they entered
            Once response from API is recieved, destructure JSON object to extract the times
                Call the helper methods and pass in the corresponding times
                    Done
 */

    var cityName;

    document.querySelector('#searchButton').addEventListener('click',(e)=>{
        e.preventDefault();

        //attempting to clear previous entry
        renderResultRow(' ')
        updateSunrise(' ')
        updateSunrise(' ')


        var locationEntered = document.querySelector('#autocomplete-input').value
        //console.log(locationEntered)

        const urlIn = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+locationEntered+".json?access_token=pk.eyJ1IjoiYmh1cm5hbCIsImEiOiJjazgwdHk2bDAwMzd0M21udGRrczhyejVqIn0.rt0SsWU6VcEm_3-FVhN82w"

        const results = fetch (urlIn)
             .then(response => response.json())
             .then(data =>{
                let latLong = {
                    locationName: data.query[0],
                    lat: data.features[0].geometry.coordinates[0],
                    long: data.features[0].geometry.coordinates[1],
                    }
                    return latLong
             })
             .then(latLong =>{
                /* UNCOMMENT TO SEE RAW JSON RESPONSE FOR LAT LONG*/
                //console.log("Coordinates for location: " + latLong.locationName + "----" + JSON.stringify(latLong))
                let sunURL = "https://api.sunrise-sunset.org/json?lat="+latLong.lat+"&lng="+latLong.long
                fetch(sunURL)
                .then(response => response.json())
                .then(data=>{
                    const times = {
                        sunrise : (data.results.sunrise),
                        sunset :(data.results.sunset)
                    }
                /* UNCOMMENT TO SEE RAW JSON RESPONSE FOR SUN TIMES*/
                //console.log("Times for " + latLong.locationName + "----" + "Sunrise: " + times.sunrise + "," + "Sunset: " + times.sunset)
                renderResultRow(latLong.locationName)
                updateSunrise((times.sunrise))
                updateSunset((times.sunset))
            })
            .catch(error=>{
                 renderResultRow("Error getting LatLong for Query Please Refresh and Try Again")
            })
        })

    })

//=====================================================
/* Helper methods - these render updated content to the sunrise and sunset cards  */
    //fill sunrise

    const renderResultRow = function(cityName){
        const ResultRow = document.querySelector('#locationDisplayHeader')
        const cityElement = document.createElement('h2')
        cityElement.textContent = cityName.toUpperCase()
        ResultRow.appendChild(cityElement)
    }
    const updateSunrise = function(time){
        const h3 = document.createElement('h3')
        h3.textContent = time
        document.querySelector('#sunrise-card').appendChild(h3)
    }

    //fill sunset
    const updateSunset = function(time){
        const h3 = document.createElement('h3')
        h3.textContent = time
        document.querySelector('#sunset-card').appendChild(h3)
    }





//================================================
//END SCRIPT
}
