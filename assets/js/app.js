$(document).ready(function() {

    for (var f = 0; f < 8; f++) {
        $.ajax({
            url: `https://api.harvardartmuseums.org/object?size=100&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae&page=${f}`, //942
            type: 'GET',
            success: success
        });
    }

    // Loader
    var preload = $('.preload').append(`<figure><div></div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div><div></div></figure>`)

    preload.show();
    splash(6500);
    $('.menu, .results, #profileContainer').hide();
    //funcion pagina splash
    function splash(time) {
        setTimeout(function() {
            $('.preload').fadeOut();
        }, time);
        $('.menu, .results').delay(6500).fadeIn();
    }

    // mostrar contenido perfil de usuario
    $("#logIn").show();
    $("#register").show();
    $("#profile").hide();
    $("#logOut").hide();
    //$("#home").hide();


}); // fin document.ready

// Cuando se cliqueen los botones en registro
$("#register-btn").click(function(e) {
    e.preventDefault();
    var emailReg = $("#inputEmailReg").val();
    var passReg = $("#inputPassReg").val();

    console.log(emailReg);
    console.log("registrado");
    $(".modal-body-register").empty(); 
    $(".modal-body-register").append(`<div class="postRegister">
                                        <h3>Send email verification ... <br> Please check you email</h3>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                      </div>`)
    firebase.auth().createUserWithEmailAndPassword(emailReg, passReg)
        .then(function() {
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
}); // fin funcion click en boton registro

// FIREBASE
$("#log-btn").click(function(e) {
    e.preventDefault();
    var emailLog = $("#inputEmailLog").val();
    var passLog = $("#inputPassLog").val();
    firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorCode);
    });
}); // fin funcion click en boton log in

// ver si hay usuario activo
function observardor() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("usario ingresado")
            $("#logIn").hide();
            $("#register").hide();
            $("#logOut").show();
            $("#profile").show();
            $("#home").show();
            $("#bookmark").show();

            $('#profile').click(function() {
              var user = firebase.auth().currentUser;
/*
user.updateProfile({
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});*/
    $('.results').hide();
    $('#profileContainer').show();
    $('#profileContainer').html(`<div class="container-fluid"><div class="row infoContainer"><div class="col-md-2 col-sm-3 col-xs-8 col-md-offset-1 col-xs-offset-2 perfil">
    <img src="assets/img/rembrandt_drawing.jpg" alt=""><p class="text-center"><a href="#">Editar foto</a></div><div class="col-md-7 col-sm-7 col-xs-10 col-xs-offset-1 userName">
    <h1>Jane Doe</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus porro officia hic fugit 
    nihil, rem dolorum inventore nulla, dignissimos aut. Beatae omnis asperiores incidunt, reprehenderit suscipit eligendi? Voluptas facilis 
    eveniet eius nemo libero, porro inventore molestiae culpa nam veritatis aliquam quos nobis, distinctio soluta natus provident adipisci 
    fugiat nesciunt. Pariatur.</p><p><a href="#">página web del usuario</a></p>
    </div></div><div class="row"><div class="col-md-12 text-center collectionTitle"><h2>My Collection</h2>
    </div></div><div class="container collection"><div class="artwork"></div></div></div>`);
    $('#home').click(function() {
                $('#profileContainer').hide();
                $('.results').show();
            })
            var database = firebase.database();
            var users = database.ref().child('users');
            var currentUser = users.child(firebase.auth().currentUser.uid);
            var bookmark = currentUser.child("bookmark"); //#userName.val() del form de registro
            bookmark.on('value', function(data) {
               data.forEach(function(dataChild) {
                    var childData = dataChild.val();
                    console.log(childData);
                    var titlebm = childData.title;
                    var imagebm = childData.image;
                    var artistbm = childData.artist;
                    var periodbm = childData.period;
                    var datedbm = childData.dated;
                    var techniquebm = childData.technique;
                    var idbm = childData.id;

                    $(".collection").append(`<div class="artwork thumbnail" id="${idbm}" technique-id="${techniquebm}" period-id="${periodbm}" people-id="${artistbm}" title-id="${titlebm}">
                                    <img class="image" src="${imagebm}"><div class="caption"><h3>${artistbm}</h3><p>Date: ${datedbm}</p>
                                    <p>Title: ${titlebm}</p><p>Period: ${periodbm}</p><p>Technique: ${techniquebm}</p><div><p class="card-text">
                                    </p></div></div></div>`);
                })
            }, function(err) {
              console.log(err);
            });

})
            

            // User is signed in.
        } else {
            console.log("no existe usuario activo")
                // User is signed out.
                // ...
        }
    });
}; // fin funcion observador
observardor();

// Log out
$("#logOut").click(function() {
    firebase.auth().signOut().then(function() {
        $("#logIn").show();
        $("#register").show();
       // $("#home").hide();
        $("#profile").hide();
        $("#bookmark").hide();
        $("#logOut").css('display', 'none');
    });
    firebase.auth().signOut().catch(function(error) {
        console.log("error");
    })
}); // fin funcion click en boton log out

$('#forgotPass').click(function() {
    var auth = firebase.auth();
    var emailAddress = prompt('Enter your E-mail address');
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
    }).catch(function(error) {
        console.log(error);
    });
}); // fin funcion click en forgot pass

// VALIDADOR (cierra el modal al validar)
$('.modal').on('shown.bs.modal', function() {
    $(this).find('form').validator('destroy').validator()
})

// email validation
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

function success(data) {
    let records = data.records;
    console.log(records)
    records.forEach(el => {
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
        var century = el.century;
        var culture = el.culture;
        var dimensions = el.dimensions;
        var contact = el.contact;
        var classification = el.classification;
        if (image !== null && image !== undefined && people !== null && people !== undefined) {

            $('.artistContainer').append(`<div class="item thumbnail" id="${objectId}" technique-id="${idTechnique}" period-id="${idPeriod}" people-id="${idPeople}" title-id="${el.title}">
                                    <img class="image" src="${image}"><div class="caption"><h3>${people}</h3><p>Date: ${date}</p>
                                    <p>Title: ${title}</p><p>Period: ${period}</p><p>Technique: ${technique}</p><div><p class="card-text">
                                    </p></div><i id="bookmark" idCard="${objectId}" class="glyphicon glyphicon-bookmark"></i></div></div>`);
        }


        $('i').click(function(e) {
                e.stopImmediatePropagation();
                var idThis = $(this).attr('idCard');
                if ($(this).attr('idCard') === $(this).parent().parent().attr('id')) {
                    if ($(this).hasClass('saved')) {
                        $(this).removeClass('saved');
                    } else {
                        $(this).addClass('saved');

                        fetch(`https://api.harvardartmuseums.org/object/${objectId}?&apikey=69c73150-15c6-11e8-a8c0-e776cdb40eae`).then((response) => response.json())
                            .then(data => {
                                console.log(data)
                                var database = firebase.database();
                                var users = database.ref().child('users');
                                var currentUser = users.child(firebase.auth().currentUser.uid);
                                var bookmark = currentUser.child("bookmark"); //#userName.val() del form de registro
                                var data = {
                                    image: data.primaryimageurl,
                                    title: data.title,
                                    artist: data.people[0].displayname,
                                    period: data.period,
                                    dated: data.dated,
                                    technique: data.technique,
                                    id: idThis
                                }
                                bookmark.push(data);


                            })
                    }
                }
            })
            // Inicio Contenido modal individual
        $('.item').click(function(event) {
            event.stopImmediatePropagation();
            $(".modal-body-items").empty();
            $(".modal-footer").empty();
            $('#modal-item').modal('show');
            var catchid = $(this).attr('id');
            if (catchid == objectId) {
                $(".modal-title").html(`${title} // ${date}`);
                $(".modal-footer").append(`<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`);
                $(".modal-body-items").append(`<div class="row cont-img col-xs-11 col-md-12">
            <img id="pictureModal" src="${image}" alt="img-piece">  
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
          </div>`)

            }
        }); // fin funcion click en item

    }); // fin funcion forEach
} // fin funcion success

$('#artist').css('background-color', '#000');
$('#artist').css('color', '#fff');

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
}); // fin funcion inputSearch

$('.typeSearch').click(function() {
        $(this).css('background-color', '#000');
        $(this).css('color', '#fff');
        $(this).siblings().css("background-color", "#fff");
        $(this).siblings().css("color", "#000");

        if ($(this).attr('value') === 'title') {
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
        } // fin if => title

        if ($(this).attr('value') === 'period') {
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
        } // fin if => period

        if ($(this).attr('value') === 'technique') {
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
        } // fin if => technique

        if ($(this).attr('value') === 'artist') {
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
        } // fin if => artist
    }) // fin funcion typeSearch
    //FIN FILTRO BUSQUEDA


/*console.log('got data successful' + data);
var users = firebase.database().ref();
console.log(users);
   var userid = users.firebase.auth().currentUser.uid;
   var titlebm = userid.bookmark.title;
   var imagebm = userid.bookmark.image;
   var artistbm = userid.bookmark.artist;
   var periodbm = userid.bookmark.period;
   var datedbm = userid.bookmark.dated;
   var techniquebm = userid.bookmark.technique;
   var idbm = userid.bookmark.id;
   */




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
    bookmark.on('value', gotDataSave(), errDataSave());

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