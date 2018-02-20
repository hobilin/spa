$(document).ready(function() {
  
})


    // Cuando se cliqueen los botones en registro
      $("#register-btn").click(function(e) {
        e.preventDefault();
        var emailReg = $(".inputEmailReg").val();
        var passReg = $(".inputPassReg").val();

        console.log(emailReg);
        console.log(passReg);
        console.log("registrado");
        firebase.auth().createUserWithEmailAndPassword(emailReg, passReg).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorCode);
        });

              });


  // FIREBASE


  $("#log-btn").click(function ingresar(e) {
    e.preventDefault();
    var emailLog = $(".inputEmailLog").val();
    var passLog = $(".inputPassLog").val();



    firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorCode);
    });
  });



  // ver si hay usuario activo
  function observardor() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $("#logIn").hide();
       $("#register").hide();
       $("#logOut").show();
       var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  console.log("email sent");
}).catch(function(error) {
  console.log("email not sent: " + error);
});
        console.log("usario ingresado")
        // User is signed in.
      } else {
        console.log("no existe usuario activo")
        // User is signed out.
        // ...
      }
    });
  };
   observardor();




   $("#logOut").click(function() {
     firebase.auth().signOut().then(function() {
       $("#logIn").show();
       $("#register").show();
       $("#logOut").css('display', 'none');
     });
     firebase.auth().signOut().catch(function(error) {
   console.log("error");
     })
   });




// VALIDADOR (cierra el modal al validar)
$('.modal').on('shown.bs.modal', function () {
  $(this).find('form').validator('destroy').validator()
})

// email validation
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}



function success(data){
  let records = data.records;
    records.forEach( el => {
      var title = el.title;
      var image = el.primaryimageurl;
      var period = el.period;
      var technique = el.technique;
      var people = el.people[0].displayname;
      var date = el.dated;
      var idPeople = el.people[0].displayname;
      var idTitle = el.title;
      var idPeriod = el.period;
      var idTechnique = el.technique;
      var objectId = el.objectid;

    if(image !== null && image !== undefined){
      $('.artistContainer').append(`<div class="item" id="${objectId}" technique-id="${idTechnique}" period-id="${idPeriod}" people-id="${idPeople}" title-id="${el.title}"><p>${people}<p><p>${date}<p><p>${title}<p><img class="image" src="${image}"><p>${period}<p><p>${technique}<p></div>`);
    }

      $('#inputSearch').keyup(function() {
      var find = $(this).val();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('people-id');
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });

    $('.typeSearch').click(function() {
      $(this).css('background-color', '#000');
      $(this).css('color', '#fff');
      $(this).siblings().css( "background-color", "#fff" );
      $(this).siblings().css( "color", "#000" );

      if($(this).attr('value') === 'title'){
        $('#inputSearch').attr('placeholder', 'Search By Title');
        $('#inputSearch').keyup(function() {
      var find = $(this).val();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('title-id');
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });
    }

    if($(this).attr('value') === 'period'){
      $('#inputSearch').attr('placeholder', 'Search By Period');
      $('#inputSearch').keyup(function() {
      var find = $(this).val();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('period-id');
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });
    }

        if($(this).attr('value') === 'technique'){
      $('#inputSearch').attr('placeholder', 'Search By Technique');
      $('#inputSearch').keyup(function() {
      var find = $(this).val();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('technique-id');
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });
    }
      if($(this).attr('value') === 'artist'){
      $('#inputSearch').attr('placeholder', 'Search By Artist');
      $('#inputSearch').keyup(function() {
      var find = $(this).val();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('people-id');
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });
    }


    })



    })
     
}; 

$('#showMore').click(function(){
  console.log("entrando")
var f = 10;
  for(var f; f < 20; f++){
  $.ajax({
  url : `https://api.harvardartmuseums.org/object?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae&page=${f}`, //942
  type: 'GET',
  success: success
});

}


});


for(var f = 0; f < 10; f++){
  $.ajax({
  url : `https://api.harvardartmuseums.org/object?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae&page=${f}`, //942
  type: 'GET',
  success: success
});
}


/*

//función para guardar cosas, hay que arreglarlo al tema de esto 
$(".js-saveMovie").click(function() {
  $(this).addClass('saveBtn');
  // ahora obtendremos el id de la pelicula a la cual se le dio click
  var idPelicula = $(this).attr("db-id");
  $(".js-contSerieAll").empty();
  $(".js-contSearchvieAll").empty();
  // ahora obtendremos el id de la pelicula a la cual se le dio click
  var idPelicula = $(this).attr("db-id");
  /**
  * funcion para obtener data de la pelicula
  */
/*  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/" + idPelicula + "?language=es-US&api_key=ca7d88c98023c60da7dcd04d4840b222",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(settings).done(function (response) {
    var arrayGender = [];
    console.log(response.genres);
    for (var i in response.genres) {
      console.log(response.genres[i].name);
      arrayGender.push(response.genres[i].name);
    }

    var database = firebase.database();
    var users = database.ref().child('users');
    var currentUser = users.child(firebase.auth().currentUser.uid);
    var saved = currentUser.child("saved"); //#userName.val() del form de registro
    var data = {
      poster: response.poster_path,
      title: response.original_title,
      year: response.release_date,
      genre: response.genres[i].name
    }
    saved.push(data);
    saved.on('value', gotDataSave(), errDataSave());

  });
});*/