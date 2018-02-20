  $(document).ready(function() {
    
    //escondiendo botón log out antes de que esté registrado
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
       $("#logOut").hide();

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


fetch(`https://api.harvardartmuseums.org/object?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae`)
.then(response => response.json())
.then(data => {
  console.log(data);
  var records = data.records;
  
  for (var i in records) {
    var title = records[i].title;
    var pieceId = records[i].objectid;
    var image = records[i].images[i].baseimageurl;
    console.log(title);
    $('.artistContainer').append(`<div class="item"><p>${title}<p><img class="image" src="${image}"></div>`);
    // $('.artistContainer').append(`<img src="${data.records[0].images[0].baseimageurl}">`);

    fetch(`https://api.harvardartmuseums.org/object/${pieceId}?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      $('.item').append(`<p>${data.department}<p>`);
    });
  }  
});

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
      poster:  response.poster_path,
      title: response.original_title,
      year: response.release_date,
      genre: response.genres[i].name
    }
    saved.push(data);
    saved.on('value', gotDataSave(), errDataSave());

  });
});*/