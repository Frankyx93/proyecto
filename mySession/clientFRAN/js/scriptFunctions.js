//Función para extraer valores de la url
function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i=0; i<arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // in case params look like: list[]=thing1&list[]=thing2
        var paramNum = undefined;
        var paramName = a[0].replace(/\[\d*\]/, function(v) {
          paramNum = v.slice(1,-1);
          return '';
        });
  
        // set parameter value (use 'true' if empty)
        var paramValue = typeof(a[1])==='undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        paramValue = paramValue.toLowerCase();
  
        // if parameter name already exists
        if (obj[paramName]) {
          // convert value to array (if still string)
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]];
          }
          // if no array index number specified...
          if (typeof paramNum === 'undefined') {
            // put the value on the end of the array
            obj[paramName].push(paramValue);
          }
          // if array index number specified...
          else {
            // put the value at that index number
            obj[paramName][paramNum] = paramValue;
          }
        }
        // if param name doesn't exist yet, set it
        else {
          obj[paramName] = paramValue;
        }
      }
    }
  
    return obj;
  }

$(document).ready(function () {

    var urlApp = "http://localhost:3000/api/";
    var sesionesUsuarioActual=[];
    var gruposUsuarioActual=[];
    // GET/Usuarios/{idUsuarioAutenticado}/sesiones
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/sesiones?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
            var grupoId;
            $.each(data, function(idx, obj) {
                grupoId = data[idx].grupoId
                sesionesUsuarioActual[idx]=obj.nombre
                
                // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");
                

                //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: urlApp + "Grupos/"+grupoId+"?access_token="+getAllUrlParams(window.location.href).access_token,
                    success: function(data) {
                         //callback
                         gruposUsuarioActual[idx] = data.nombre
                        //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                    }
               });              
               $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+sesionesUsuarioActual[idx]+" - "+gruposUsuarioActual[idx]+"</a></li>"); 
            });           
        }).fail(function(error) {
            console.log(error);
        });
        
        //GET /Usuarios/{id}   INFORMACIÓN DEL USUARIO
        $.get(urlApp + "Usuarios/" +getAllUrlParams(window.location.href).userid + "?access_token=" +getAllUrlParams(window.location.href).access_token, function (data, status){
            $(".NombreUsuarioAutenticado").text(data.nombre);
            $(".EmailUsuarioAutenticado").text(data.email);


        })

        var nombreUsuarioGrupo = $("#NombreUsuarioAutenticado").text();
        // GET/Usuarios/{idUsuarioAutenticado}/grupos
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/grupos?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {

            $.each(data, function(idx, obj) {
                $(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li class='ui-li-static ui-body-inherit'>"+obj.nombre+"</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Monitor</li><li class='ui-li-static ui-body-inherit'>"+nombreUsuarioGrupo+"</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li class='ui-li-static ui-body-inherit'>"+obj.horario+"</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li></ul>");
            });           
        }).fail(function(error) {
            console.log(error);
        });


    
    $(".botonLogout").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/grupos

        $.post(urlApp + "Usuarios/logout?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status)
            {
                console.log("data: "+data);
                console.log("status: "+status);
                document.cookie = "access_token=" + getAllUrlParams(window.location.href).access_token+ "; expires=Thu, 05 Dec 1970 12:00:00 UTC; path=/";
                location.href ="http://localhost:3000/";
            });
    });


    $("#botonCrearGrupo").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/grupos

        $.post(urlApp + "Usuarios/{" + idUsuarioAutenticado + "}/grupos",
            {
                nombre: "" + $("#nombreGrupoNuevo").val() + "",
                horario: "" + $("#horarioGrupoNuevo").val() + "" //Todavia no asignado
            },
            function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status); //esto es para controlar la salida
            });
    });

    $("#botonCrearSesion").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/sesiones
        $.post(urlApp + "Usuarios/{" + idUsuarioAutenticado + "}/sesiones",
            {
                nombre: "" + $("#nombreSesionNueva").val() + "",
                fecha: "" + $("#fechaSesionNueva").val() + "",
                grupoId: "" + $("#grupoSesionNueva").val() + "" //Todavia no asignado
            },
            function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });

    $("#botonCrearEjerciciosSesion").click(function () {
        // POST/EjerciciosSesions el id de sesion se lo daremos dependiendo de la sesion a la que estemos pinchando
    });

    $(".botonTabInicio").click(function () {
        //MACHACA EL RESULTADO ANTERIOR
        $("#listaTabHome").html(" "); 
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/sesiones?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
            var grupoId;
            $.each(data, function(idx, obj) {
                grupoId = data[idx].grupoId
                sesionesUsuarioActual[idx]=obj.nombre
                
                // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");
                

                //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: urlApp + "Grupos/"+grupoId+"?access_token="+getAllUrlParams(window.location.href).access_token,
                    success: function(data) {
                         //callback
                         gruposUsuarioActual[idx] = data.nombre
                        //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                    }
               });            
               $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+sesionesUsuarioActual[idx]+" - "+gruposUsuarioActual[idx]+"</a></li>"); 
            });           
        }).fail(function(error) {
            console.log(error);
        });

       
    });

    $(".botonTabGrupos").click(function () {
        $(".listadoGrupos").html("");
        var nombreUsuarioGrupo = $("#NombreUsuarioAutenticado").text();
        // GET/Usuarios/{idUsuarioAutenticado}/grupos
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/grupos?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {

            $.each(data, function(idx, obj) {
                $(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li class='ui-li-static ui-body-inherit'>"+obj.nombre+"</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Monitor</li><li class='ui-li-static ui-body-inherit'>"+nombreUsuarioGrupo+"</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li class='ui-li-static ui-body-inherit'>"+obj.horario+"</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li></ul>");
            });           
        }).fail(function(error) {
            console.log(error);
        });
        
    });

    $("#botonTabSesiones").click(function () {
        // GET/Usuarios/{idUsuarioAutenticado}/sesiones
    });

    $("#botonTabEjercicios").click(function () {
        // GET/Categoria
    });
});