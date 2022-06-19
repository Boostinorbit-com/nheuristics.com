

function switchLink(){
    var el = document.getElementById('id_fresher_world');
    console.log(el)
}

isShow_products = true
isShow_company = true
function showProducts(){
    var el = document.getElementById('products')
    if(isShow_products == false){
        el.setAttribute("class", "collapse show")
        isShow_products = true;
    }else{
        el.setAttribute("class", "collapse")
        isShow_products = false;
    }
    
    console.log(el)
    
}
function showCompany(){
    // var el = document.getElementById('company')
    var el = document.getElementById('products')
    var el = document.getElementById('company')
    if(isShow_company == false){
        el.setAttribute("class", "collapse show")
        isShow_company = true;
    }else{
        el.setAttribute("class", "collapse")
        isShow_company = false;
    }
    console.log(el)
   
}


x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    var jsonLocation;
    navigator.geolocation.getCurrentPosition(showPosition(jsonLocation));
    return jsonLocation
  } else { 
    return { "status" : 401,
            "message": { "msg": "Geolocation is not supported by this browser."}
          }
  }
}

function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude + 
  // "<br>Longitude: " + position.coords.longitude;
  let jsonLocation= { status : 200,
                      ip: "",
                      message: { lat: position.coords.latitude,
                        lon: position.coords.longitude
                      },
                    }

  $.getJSON("https://api.ipify.org/?format=json", function(e) {
    jsonLocation.ip = e.ip
    $.post( "/location", jsonLocation);

  });

  $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
  console.log(JSON.stringify(data, null, 2));
  });


  

}

$("document").ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    jsonLocation= { "status" : 401,
            "message": { "msg": "Geolocation is not supported by this browser."}
          }
    $.post( "/location", jsonLocation);
    
  }

});

