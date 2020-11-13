var latitude;
var longitude;
var dcSystemSize;





///////////////////////////// Coordinates /////////////////////////////////////////

function saveCoordinates() {
  
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

///////////////////////////// AJAX /////////////////////////////////////////

function getData(){
  var url = "https://reqres.in/api/users";
  fetch(url).then(response => {
    if(!response.ok){
      throw Error("Error occured while fetching data from "+url);
    }
  
    return response.json();
  })
  .then(data => {
    console.log(data.data);
    const html = data.data.map(user => {
      return `
        <div class="user" onclick="selectProfile('${user.first_name}', '${user.email}', '${user.avatar}')">  
          <p>${user.first_name}</p>
          <p>${user.email}</p>
          <p><img src="${user.avatar}" alt="Foto ${user.first_name}" /></p>
        </div>
      `;
    }).join("");

    document.querySelector("#data_table").insertAdjacentHTML("afterbegin", html);
  })
  .catch(error => {
    console.log(error);
  });


}

let testObject = {
  name: "morpheus",
  job: "leader"
}

function postData(url, object){
  //var url = "https://reqres.in/api/users";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  })
  .then(response => {
    if(!response.ok){
      throw Error("Error occured while posting data to "+url);
    }
  
    return response.json();
  })
  .then(data => {
    console.log("Object succesfully posted.");
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });


}

function calculationsRequest(dc, efficiency){
  url = "localhost:8080/example?";
  if(dc != null && dc != ""){
    url = url + "dc="+ dc + "&";
  }
  if(efficiency != null && efficiency != ""){
    url = url + "efficiency="+ efficiency + "&";
  }
  console.log("Created request: "+url);
  return url;
}



// Select profile
function selectProfile(first_name, email, avatar){
  
  var div =  document.createElement("div");
  div.className = "user";
  div.id = first_name;
  div.onclick = function () {
    removeProfile(first_name);
  };
  
  var paraName = document.createElement("p");   
  paraName.innerHTML = first_name;
  var paraEmail = document.createElement("p");   
  paraEmail.innerHTML = email;
  var paraAvatar = document.createElement("p");   
  var image = document.createElement("img");
  image.src = avatar;
  image.alt = "Foto "+first_name;
  paraAvatar.append(image);
  
  div.append(paraName);
  div.append(paraEmail);
  div.append(paraAvatar);
  document.getElementById("selected_profiles").appendChild(div);
}

function removeProfile(first_name){
  var profile = document.getElementById(first_name);
  document.getElementById("selected_profiles").removeChild(profile);

}  



////////////////// FORM //////////////////////////
function validateUsername() {
  var name = document.getElementById("username").value;
  if (name == "") {
    alert("Userame must be filled out");
    return false;
  }
  if (name.length > 18) {
    alert("Userame must be shorter then 18 characters");
    return false;
  }
  if (name.length < 5) {
    alert("Userame must be longer then 5 characters");
    return false;
  }
  return true;
} 

function validatePassword() {
  var password = document.getElementById("password").value;
  if (password == "") {
    alert("Password must be filled out");
    return false;
  }
  if (password.length > 18) {
    alert("Password must be shorter then 18 characters");
    return false;
  }
  if (password.length < 8) {
    alert("Password must be longer then 8 characters");
    return false;
  }
  return true;
} 

function validateEmail() {
  var email = document.getElementById("email").value;
  if (email == "") {
    alert("Email must be filled out");
    return false;
  }
  if (email.length > 18) {
    alert("Email must be shorter then 18 characters");
    return false;
  }
  if (!email.substring(email.indexOf("@")).includes(".")) {
    alert("Email must include a top level domain");
    return false;
  }
  return true;
} 

function validateform(){  
  if(validateUsername()){
    if(validatePassword()){
      if(validateEmail()){
        sessionStorage.setItem("username", document.getElementById("username").value);
        //window.name = document.getElementById("username").value;
        updateDisplayName();
        alert("Hi "+sessionStorage.getItem("username")+"! The registartion was successful.");
      }
    }
  }
}  

function updateDisplayName(){ 
  document.getElementById("displayName").innerHTML = " "+sessionStorage.getItem("username");
  //document.getElementById("displayName").innerHTML = " "+window.name;
}

function loadDisplayName(){
  if(sessionStorage.getItem("username") != null){
    document.getElementById("displayName").innerHTML = " "+sessionStorage.getItem("username");
    document.getElementById("username").value = sessionStorage.getItem("username");
  }
}


class SystemData {
  constructor(dc, efficiency) {
    this.dc = dc;
    this.efficiency = efficiency;
  }
}


var systemData = new SystemData();
systemData.dc = 25;
systemData.efficiency = 15;
//calculationsRequest(systemData.dc, systemData.efficiency);

getData();
//getData("https://reqres.in/api/users");
//postData("https://reqres.in/api/users", testObject);


