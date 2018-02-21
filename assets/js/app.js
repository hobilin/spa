$(document).ready(function() {
  for(var f = 0; f < 10; f++){
  $.ajax({
  url : `https://api.harvardartmuseums.org/object?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae&page=${f}`, //942
  type: 'GET',
  success: success
});
}

  var preload = $('.preload').append(`<figure>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </figure>`)
  preload.show();
  splash(6500);
  $('.menu, .results').hide();
  //funcion pagina splash
  function splash(time){
    setTimeout(function(){
    $('.preload').fadeOut(); 
    }, time);
    $('.menu, .results').delay(6500).fadeIn();
  }
  $("#logIn").show();
  $("#register").show();
  $("#profile").hide();
  $("#logOut").hide();
  $("#home").hide();


$('#profile').click(function() {
  $('.results').hide();
  $('#profileContainer').show();
  $('#profileContainer').html(`<div class="container-fluid"><div class="row"><div class="col-md-2 col-md-offset-1 perfil">
<img src="assets/img/stars.png" alt=""></div><div class="col-md-7 userName">
<h1>Este es el nombre de usuario</h1><p></p><p><a href="#">Este es el link al sitio web del usuario</a></p>
</div></div><div class="row"><div class="col-md-12 text-center collectionTitle"><h2>My Collection</h2>
</div></div><div class="container collection"><div class="artwork"></div></div></div>`);
})

$('#home').click(function() {
  $('#profileContainer').hide();
  $('.results').show();

 })
});
/*

*/
    // Cuando se cliqueen los botones en registro
      $("#register-btn").click(function(e) {
        e.preventDefault();
        var emailReg = $("#inputEmailReg").val();
        var passReg = $("#inputPassReg").val();

        console.log(emailReg);
        console.log(passReg);
        console.log("registrado");
        firebase.auth().createUserWithEmailAndPassword(emailReg, passReg)
        .then( function() {
         var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log('enviando correo');
  }).catch(function(error) {
    console.log(error);
  });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorCode);
        });

              });


  // FIREBASE


  $("#log-btn").click(function(e) {
    e.preventDefault();
    var emailLog = $("#inputEmailLog").val();
    var passLog = $("#inputPassLog").val();
console.log(passLog);
console.log(emailLog);
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
       $("#profile").show();
       $("#home").show();
       $("#bookmark").show();
       $("#heart").show();
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
       $("#home").hide();
       $("#profile").hide();
       $("#bookmark").hide();
       $("#heart").hide();
       $("#logOut").css('display', 'none');
     });
     firebase.auth().signOut().catch(function(error) {
   console.log("error");
     })
   });

$('#forgotPass').click(function() {
var auth = firebase.auth();
var emailAddress = prompt('Enter your E-mail address');
auth.sendPasswordResetEmail(emailAddress).then(function() {
// Email sent.
}).catch(function(error) {
  console.log(error);
});
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
  console.log(records)
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
      var departament = el.departament; 
      var division = el.division; 
      var creditline = el.creditline; 
      var provenance = el.provenance; 
      var century= el.century; 
      var culture = el.culture;
      var dimensions = el.dimensions;
      var contact = el.contact; 

    if(image !== null && image !== undefined){

      $('.artistContainer').append(`<div class="item thumbnail" id="${objectId}" technique-id="${idTechnique}" period-id="${idPeriod}" people-id="${idPeople}" title-id="${el.title}">
                                      <img class="image" src="${image}">
                                        <div class="caption">
                                        <h3>${people}</h3>
                                        <p>Date: ${date}</p>
                                        <p>Title: ${title}</p>
                                        <p>Period: ${period}</p>
                                        <p>Technique: ${technique}</p>
                                          <div>
                                          <p class="card-text"><i id="bookmark" class="glyphicon glyphicon-bookmark"></i><i id="heart" class="glyphicon glyphicon-heart"></i></p>
                                          <button id="moreInfo" data-toggle="modal" data-target="#modal-item">More Information</button>
                                          </div>
                                        </div>
                                      </div>`);
    }
    
    $('#artist').css('background-color', '#000');
    $('#artist').css('color', '#fff');


    // toggleClass iconos
    $( "i" ).click(function() {
  $(this).toggleClass( "saved" );
});

    //FILTRO BUSQUEDA

      $('#inputSearch').keyup(function() {
      var find = $(this).val();
      find.toLowerCase();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('people-id');
        search.toLowerCase();
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
      find.toLowerCase();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('title-id');
        search.toLowerCase();
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
      find.toLowerCase();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('period-id');
        search.toLowerCase();
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
      find.toLowerCase();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('technique-id');
        search.toLowerCase();
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
      find.toLowerCase();
      $('.item').hide();

      $('.item').each(function() {
        var search = $(this).attr('people-id');
        search.toLowerCase();
        console.log(search);
        if (search.indexOf(find) != -1) {
          $(this).show();
        }
      });
    });
    }
    })
//FIN FILTRO BUSQUEDA

      })   
}; 
    // Inicio Contenido modal individual
    //FALTA INICIAR EVENTO 
    $(".modal-title").html(`${title} // ${date}`)
    $(".modal-body-items").append(`<div class="row cont-img col-xs-11 col-md-12">
          <figure class=> <img id="pictureModal" src="${image}" alt="img-piece"></figure>  
        </div>
        <p class="text-center"> <i class="far fa-copyright"></i> ${creditline}</p>

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <h4 class="internalTitle text-right">Identificacion and Creation</h4>
            <h5 class="internalh5">Departament</h5>
            <p class="text-right">${departament} </p>
            <h5 class="internalh5">Division</h5>
            <p class="text-right">${division}</p>
            <h5 class="internalh5">Classification</h5>
            <p class="text-right">${classification}</p>
            <h5 class="internalh5">Provenance</h5>
            <p class="text-right">${provenance}</p>
            <h5 class="internalh5">Date</h5>
            <p class="text-right">${date}</p>
            <h5 class="internalh5">Century</h5>
            <p class="text-right">${century}</p>
            <h5 class="internalh5">Culture</h5>
            <p class="text-right">${culture}</p>
          </div>
          <div class="col-xs-12 col-md-6">
            <h4 class="internalTitle text-left ">Physical <br> Descriptions</h4>
            <h5 class="internalh5left">Technique: </h5>
            <p class="text-left">${technique}</p>
            <h5 class="internalh5left">Dimensions</h5>
            <p class="text-left">${dimensions}</p>
            <h4 class="internalTitle text-left "> Contact </h4>
            <p class="text-left">${contact}</p>
          </div>
        </div>`);


$('#showMore').click(function(){
  console.log("entrando")
  for(var f = 0; f < countPage; f++){
  $.ajax({
  url : `https://api.harvardartmuseums.org/object?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae&page=${f}`, //942
  type: 'GET',
  success: success
});

}
});






// Loader funcion


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

/*append para perfil de usuario


*/

/*
function gotDataSave(data) {
  console.log("data funciona");
  var users = firebase.database.ref().child();
     var userid = firebase.auth().currentUser.uid;
     var posterSaved = userid.saved.poster;
     var titleSaved = userid.saved.title;
     var yearSaved = userid.saved.year;
     var genreSaved = userid.saved.genre;
     $("#favoritos").append('<div class="js-cardMovie col-xs-6 col-sm-4 col-md-3 b p-0">' +
                                  '<div class="shadow m-1"><div class="js-img-movie">' +
                                  '<img class="img-responsive" src="' + posterSaved + '"></div>' +
                                  '<div class="p-1"><button class="js-saveMovie btn-saveM pull-right">' +
                                  '<span class="glyphicon glyphicon-bookmark"></span></button>' +
                                  '<h4 class="js-titleMovie">' + titleSaved + '</h4><span class="js-year">' + yearSaved + '</span>' +
                                  '<p class="js-gender">' + genreSaved + '</p><div class="js-stars">' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>' +
                                  '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span>' +
                                  '</div></div></div></div>');
   };
*/