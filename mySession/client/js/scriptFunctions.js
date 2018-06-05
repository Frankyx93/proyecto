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

    // GET/Usuarios/{idUsuarioAutenticado}/sesiones
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/sesiones?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
            var grupoId;
            $.each(data, function(idx, obj) {
                grupoId = data[idx].grupoId
                $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");
                // $.get(urlApp + "Grupos/"+grupoId+"?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
                //     $("#listaTabHome").append(data.nombre+"</a></li>");
                // }).fail(function(error) {
                //     console.log(error);
                // });
                

                //AJAX PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: urlApp + "Grupos/"+grupoId+"?access_token="+getAllUrlParams(window.location.href).access_token,
                    success: function(data) {
                         //callback
                         $("#listaTabHome").append("<li class='tabs ui-btn'>Grupo: "+data.nombre+"</li>");
                    }
               });
                              
                
            });           
        }).fail(function(error) {
            console.log(error);
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

    $("#botonTabInicio").click(function () {
        $.get(urlApp + "Usuarios/"+getAllUrlParams(window.location.href).userid+"/sesiones?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
            var grupoId;
            $.each(data, function(idx, obj) {
                grupoId = data[idx].grupoId              
                console.log(obj.nombre);
                $.get(urlApp + "Grupos/"+grupoId+"?access_token="+getAllUrlParams(window.location.href).access_token, function (data, status) {
                    console.log("Nombre Grupo: " + data.nombre); //esto es para controlar la salida
                }).fail(function(error) {
                    console.log(error);
                });
            });           
        }).fail(function(error) {
            console.log(error);
        });
    });

    $("#botonTabGrupos").click(function () {
        // GET/Usuarios/{idUsuarioAutenticado}/grupos
    });

    $("#botonTabSesiones").click(function () {
        // GET/Usuarios/{idUsuarioAutenticado}/sesiones
    });

    $("#botonTabEjercicios").click(function () {
        // GET/Categoria
    });
});