const weatherDisplayContainer = document.getElementById('weatherDisplayContainer')
const cityNameDisplay = document.getElementById("cityName")
const temperatureDisplay = document.getElementById("temperature")
const conditionsDisplay = document.getElementById("conditions")
const windspeedDisplay = document.getElementById('windspeed')
weatherDisplayContainer.style.display= "none"
function newData (name,temperature,conditions,windSpeed){
    this.name=name;
    this.temperature=temperature;
    this.conditions = conditions;
    this.windSpeed = windSpeed;
}

var newObjData ={}

//API CALL TO WEATHER DATA
    async function getWeatherData (city) {
       const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a868a5b3ae7e99cfd0f29a734c731f5`)
       const data = await apiCall.json()

      window.newObjData = new newData(`${data.name}`,`${data.main.temp}`, `${data.weather[0].main}`,`${data.wind.speed}`)
        console.log(data)
        console.log(newObjData);
     
    }

    //EVENT CLICK SUBMIT TO ENTER CITY
    const cityInput = document.getElementById('searchTextField');
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click',function (){
        determineCityName()

        getWeatherData(cityName);

        informationDisplay()
        fillDisplay()
       })

    function determineCityName (){
        const inputValue = cityInput.value;
        if(inputValue == ""){
        return alert('fill in a city name')
    }
     else{
         const inputValueArray = inputValue.split("");
        const indexOfComma = inputValueArray.indexOf(',')
         const cityNameArray = inputValueArray.slice(0,indexOfComma)
        window. cityName = cityNameArray.join("");
        return cityName
        }
        
    }

    //GOOGLE AUTOCOMPLETE
    function initialize() {
        var options = {
         types: ['(cities)'],
        };
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
       }
      google.maps.event.addDomListener(window, 'load', initialize);

      //Disable enter form submit
      window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);


      // information Display
       function informationDisplay(){
        const formContainer = document.getElementById("form")
        formContainer.style.display= 'none'
        weatherDisplayContainer.style.display= ""
       }

       function fillDisplay (){
       cityNameDisplay.textContent = `City: ${newObjData["name"]}`
       temperatureDisplay.textContent = `Temperature: ${newObjData["temperature"]}`
       conditionsDisplay.textContent = `Conditions: ${newObjData["conditions"]}`
       windspeedDisplay.textContent = `Wind Speed: ${newObjData["windSpeed"]}`
       console.log(newObjData["name"])
       }

