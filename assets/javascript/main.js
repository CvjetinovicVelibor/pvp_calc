

var message = "Hello";
var user = "Leon";

var latitude;
var longitude;
var dcSystemSize;


let model = {
  latitude: latitude,
  longitude: longitude,
  dcSystemSize: dcSystemSize
}


function sayHello(){
  console.log(message + " " + user);
}

function saveCoordinates() {
  
  // latitude = document.getElementById("latitude").value;
  // longitude = document.getElementById("longitude").value;
  localStorage.setItem("latitude", document.getElementById("latitude").value);
  localStorage.setItem("longitude", document.getElementById("longitude").value);
  
  latitude = localStorage.getItem("latitude");
  longitude = localStorage.getItem("longitude");
  console.log(latitude);
  console.log(longitude);
                      
}

function loadCoordinates() {
  
  console.log(localStorage.getItem("latitude"));
  console.log(document.getElementById("longitude").value);

  document.getElementById("latitude").value = localStorage.getItem("latitude");
  document.getElementById("longitude").value = localStorage.getItem("longitude");
  
  console.log(document.getElementById("latitude").value);
  console.log(document.getElementById("longitude").value);
                      
}


// function updateMap() {
//  document.getElementById("mapSubmit").value = "newSubmitButtonValue";
// }

//sayHello();
//saveCoordinates();


function renderMap(){
  var map = L.map('map').setView([35.5, -118.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([35.5, -118.09]).addTo(map)
      .bindPopup('35.5, -118.09')
      .openPopup();
}

function test1(){
  var lat = localStorage.getItem("latitude");
  console.log(lat);
}




///////////////////////////// AJAX /////////////////////////////////////////
const url = 'https://dog.ceo/api/breeds/list/all';

fetch(url)
  .then(response => response.json())
  .then(repos => {
    const reposList = repos.map(repo => repo.name);
    console.log(reposList);
  })
.catch(err => console.log(err))


