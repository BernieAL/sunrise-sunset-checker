window.onload = function() {
    


/* Animation of sunPeek*/

//document.querySelector('#sunPeek').css


 /* On click of 'search' -> get text input from user 
        Then use Fetch to hit API with location they entered
            Once response from API is recieved, destructure JSON object to extract the times
                Call the helper methods and pass in the corresponding times
                    Done   
 */   



    document.querySelector('#searchButton').addEventListener('click',(e)=>{
        e.preventDefault();
        var locationEntered = document.querySelector('#autocomplete-input').value
        console.log(locationEntered)
        
        const urlIn = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+locationEntered+".json?access_token=pk.eyJ1IjoiYmh1cm5hbCIsImEiOiJjazgwdHk2bDAwMzd0M21udGRrczhyejVqIn0.rt0SsWU6VcEm_3-FVhN82w"
        
       

      fetch (urlIn)
        .then(response => response.json())
        .then(data =>{
              
            let latLong = {
                query: data.query[0],
                lat: data.features[0].geometry.coordinates[0],
                long: data.features[0].geometry.coordinates[1],
            }
            return latLong
        }).then(function(latLong){

            lat = latLong.lat
            long = latLong.long

           let sunURL = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+long
            fetch(sunURL)
                .then(response => response.json())
                .then(data=>{
                    const times = {
                        sunrise : (data.results.sunrise ), 
                        sunset :(data.results.sunset )
                    }

                    
                    updateSunrise(times.sunrise)
                    updateSunset(times.sunset)
                })
        })


    })  
    
 
//=====================================================
/* Helper methods - these render updated content to the sunrise and sunset cards  */
    //fill sunrise
    const updateSunrise = function(time){
        const p = document.createElement('p')
        p.textContent = time
        document.querySelector('#sunrise-card').appendChild(p)
    }

    //fill sunset
    const updateSunset = function(time){
        const p = document.createElement('p')
        p.textContent = time
        document.querySelector('#sunset-card').appendChild(p)
    }





//================================================
//END SCRIPT
}
