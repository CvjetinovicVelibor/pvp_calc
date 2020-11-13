var latitude;
var longitude;
var dcSystemSize;


let model = {
  latitude: latitude,
  longitude: longitude,
  dcSystemSize: dcSystemSize
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

///////////////////////////// AJAX /////////////////////////////////////////

function getData(url){
  //var url = "https://reqres.in/api/users";
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
  console.log("OKkkkkKKKooo")
  var name = document.forms["myForm"]["username"].value;
  if (name == "") {
    alert("Userame must be filled out");
    return false;
  }
  if (name.length > 18) {
    alert("Userame must not be longer then 18 characters");
    return false;
  }
  if (name.length < 5) {
    alert("Userame must not be shorter then 5 characters");
    return false;
  }
} 




getData("https://reqres.in/api/users");
//postData("https://reqres.in/api/users", testObject);