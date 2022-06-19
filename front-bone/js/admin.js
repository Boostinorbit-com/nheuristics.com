

$(document).ready(function () {
    $('#root').load('adminLogin.html');
    console.log("Cookies:  ", document.cookie)

});

function login(){
    var credential = { 
        email : $('#email').val(),
        password : $('#password').val()
    }
    console.log(credential)

    load_dashboard()
    

//   $.post( "/login", credential);
}


function load_dashboard(){
    $(document).ready(function () {
        $('#root').load('dashboard.html').ready(function(){

            $.get("/fetchLocations", function(data){
                arrayData = JSON.parse(data)
                arrayData.reverse().forEach(function(el, index, arrayData){
                    console.log("\n\n :::::::::::::::::::::: ", el)
                    
                    $(`<tr>
                        <th scope='row'>${index + 1}</th>
                        <td>${el.ip}</td> 
                        <td>${el.latitude} , ${el.longitude}</td> 
                        <td>${el.city}</td> 
                        <td>${el.state}</td> 
                        <td>${el.country}</td> 
                        <td>${el.formattedAddress}</td> 
                    </tr>`).appendTo('#tbody')
                    

                });
                
    
            }).fail(function() {
                alert( "error" );
            });

        })


    });

}

