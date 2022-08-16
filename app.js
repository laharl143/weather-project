const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){ //catching the data in our post
    const query = req.body.cityName  //dynamic data base on what the user will input
    const apiKey = "e354898dddb8f14089e4162280f99989";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit  //this is the url to openweathermap
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)  // JSON.parse to get a javascript object format
            const temp = weatherData.main.temp  // this is used to get the specific data we need like "temp"
            const weatherDescription = weatherData.weather[0].description   //weather[0] because it is an array
            const icon = weatherData.weather[0].icon // this is to fetch the current icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"  //reference: https://openweathermap.org/weather-conditions
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celsius.</h1>"); //you can write an html tag inside the "res.send"
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })
})

    

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})