//Función para reestructurar las fechas
function formatoFecha(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}

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

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

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
    var sesionesUsuarioActual = [];
    var gruposUsuarioActual = [];


    //LLAMADAS DE LA PÁGINA HOME CUANDO SE ABRE LA APLICACIÓN


    // GET/Usuarios/{idUsuarioAutenticado}/sesiones
    $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
        var grupoId;
        $.each(data, function (idx, obj) {
            grupoId = data[idx].grupoId
            sesionesUsuarioActual[idx] = obj.nombre

            // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");


            //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
            $.ajax({
                async: false,
                type: 'GET',
                url: urlApp + "Grupos/" + grupoId + "?access_token=" + getAllUrlParams(window.location.href).access_token,
                success: function (data) {
                    //callback
                    gruposUsuarioActual[idx] = data.nombre
                    //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                }
            });
            $("#listaTabHome").append("<li><button value='"+obj.id+"' class='botonVerEjerciciosSesion tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>" + sesionesUsuarioActual[idx] + " - " + gruposUsuarioActual[idx] + "</button></li>");
        });
    }).fail(function (error) {
        console.log(error);
    });

    //LLAMADAS DE LA INFORMACIÓN DE USUARIO CUANDO SE ABRE LA APLICACIÓN

    //GET /Usuarios/{id}   INFORMACIÓN DEL USUARIO
    $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
        $(".NombreUsuarioAutenticado").text(data.nombre);
        $(".EmailUsuarioAutenticado").text(data.email);


    });


    //LLAMADAS DE LA PÁGINA GRUPOS CUANDO SE ABRE LA APLICACIÓN

    var nombreUsuarioGrupo = $("#NombreUsuarioAutenticado").text();
    // GET/Usuarios/{idUsuarioAutenticado}/grupos
    $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/grupos?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

        $.each(data, function (idx, obj) {
            $("#selectGruposParaNuevaSesion").append("<option value=" + obj.id + ">" + obj.nombre + "</option>")
            $(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                + obj.nombre + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Monitor</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                + nombreUsuarioGrupo + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>" + obj.horario +
                "</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn verSesions'>Ver Sesiones </a></li><button value='" + obj.id + "' style='background-color: #e65d5d ; ' data-rel = 'popup' data-position-to = 'window'data-transition = 'pop' class = 'ui-btn botonEliminarGrupo'>Eliminar Grupo</button></ul>");
        });
    }).fail(function (error) {
        console.log(error);
    });

    //LLAMADAS DE LA PÁGINA SESIONES CUANDO SE ABRE LA APLICACIÓN

    $("#listadoSesiones").html("");

    $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
        var fechaRecortada;
        $.each(data, function (idx, obj) {
            fechaRecortada = obj.fecha.slice(0, 10);
            fechaRecortada = formatoFecha(fechaRecortada);

            //lista funcional fran 
            //$("#listadoSesiones").append("<li class='ui-li-has-alt'><a class='ui-btn' style='background: linear-gradient(lightcyan, beige, gray);' href='#ejerciciosSesion'>"+obj.nombre+" - "+fechaRecortada+"</a><a style='background-color: lightcoral;' href = '#popup_dialog' data-rel = 'popup' data-position-to = 'window' data-transition = 'pop' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right'></a></li>");
            //lista Fatima
            $("#listadoSesiones").append("<li><button value='"+obj.id+"' class='botonVerEjerciciosSesion tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>" + obj.nombre + " - " + fechaRecortada + "</button></li>");

        });
    }).fail(function (error) {
        console.log(error);
    });

    //LLAMADAS DE LA PÁGINA EJERCICIOS CUANDO SE ABRE LA APLICACIÓN

    $.get(urlApp + "Categoria?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

        $.each(data, function (idx, obj) {
            $(".listadoCategorias").append("<li><button value='" + obj.id + "' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 10px' class='botonCategoria ui-btn ui-btn-icon-right ui-icon-carat-r' data-icon=''>" + obj.nombre + "</button></li>");
        });
    }).fail(function (error) {
        console.log(error);
    });

    //LLAMADAS DEL BOTÓN DE CERRAR SESIÓN

    $(".botonLogout").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/grupos

        $.post(urlApp + "Usuarios/logout?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            console.log("data: " + data);
            console.log("status: " + status);
            document.cookie = "access_token=" + getAllUrlParams(window.location.href).access_token + "; expires=Thu, 05 Dec 1970 12:00:00 UTC; path=/";
            location.href = "/";
        });
    });


    //LLAMADAS DEL BOTÓN DE CREAR GRUPO

    $("#botonCrearGrupo").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/grupos

        var nombreGrupoNuevo = $("#nombreGrupoNuevo").val();
        var horarioGrupoNuevo
        if ($('#checkbox-lunes').is(":checked")) {
            horarioGrupoNuevo = "L ";
        }
        if ($('#checkbox-martes').is(":checked")) {
            horarioGrupoNuevo += "M ";
        }
        if ($('#checkbox-miercoles').is(":checked")) {
            horarioGrupoNuevo += "X ";
        }
        if ($('#checkbox-jueves').is(":checked")) {
            horarioGrupoNuevo += "J ";
        }
        if ($('#checkbox-viernes').is(":checked")) {
            horarioGrupoNuevo += "V";
        }

        $.post(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/grupos?access_token=" + getAllUrlParams(window.location.href).access_token, {
            nombre: nombreGrupoNuevo,
            horario: horarioGrupoNuevo
        }).done(function (data) {
            //POPUP GRUPO CREADO
            location.href = "?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token;
            alert("Grupo creado");
        }).fail(function (error) {
            console.log(error);
            console.log("Error");
        })
    });


    //LLAMADAS DEL BOTÓN DE CREAR SESIÓN

    $("#botonCrearNuevaSesion").click(function () {
        // POST/Usuarios/{idUsuarioAutenticado}/sesiones
        var fechaSesionNueva = $("#fechaNuevaSesion").val();
        var nombreSesionNueva = $("#nombreNuevaSesion").val();
        var grupoIdSesionNueva = $("#selectGruposParaNuevaSesion").val();
        console.log(fechaSesionNueva);
        $.post(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, {
            nombre: nombreSesionNueva,
            fecha: fechaSesionNueva,
            grupoId: grupoIdSesionNueva
        }).done(function (data) {
            //POPUP SESIÓN CREADO
            location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#categoriasParaAnyadir";
            alert("Sesión creada");
        }).fail(function (error) {
            console.log(error);
            console.log("Error");
        })
    });

    //LLAMADAS DEL BOTÓN DE AÑADIR EJERCICIOS A UNA SESION

    $("#botonCrearEjerciciosSesion").click(function () {
        // POST/EjerciciosSesions el id de sesion se lo daremos dependiendo de la sesion a la que estemos pinchando
    });

    //LLAMADAS DE LA PÁGINA HOME CUANDO SE PULSA SU TAB

    $(".botonTabInicio").click(function () {

        //MACHACA EL RESULTADO ANTERIOR
        $("#listaTabHome").html(" ");
        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            var grupoId;
            $.each(data, function (idx, obj) {
                grupoId = data[idx].grupoId
                sesionesUsuarioActual[idx] = obj.nombre

                // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");


                //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: urlApp + "Grupos/" + grupoId + "?access_token=" + getAllUrlParams(window.location.href).access_token,
                    success: function (data) {
                        //callback
                        gruposUsuarioActual[idx] = data.nombre
                        //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                    }
                });
                $("#listaTabHome").append("<li><button value='"+obj.id+"' class='botonVerEjerciciosSesion tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>" + sesionesUsuarioActual[idx] + " - " + gruposUsuarioActual[idx] + "</button></li>");
            });
        }).fail(function (error) {
            console.log(error);
        });


    });

    //LLAMADAS DE LA PÁGINA GRUPOS CUANDO SE PULSA SU TAB

    $(".botonTabGrupos").click(function () {

        $(".listadoGrupos").html("");
        var nombreUsuarioGrupo = $("#NombreUsuarioAutenticado").text();
        // GET/Usuarios/{idUsuarioAutenticado}/grupos
        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/grupos?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

            $.each(data, function (idx, obj) {
                //$(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li class='ui-li-static ui-body-inherit'>" + obj.nombre + "</li><li class='listaGrupos ui-li-divider ui-bar-a' data-role='list-divider'>Monitor</li><li class='ui-li-static ui-body-inherit'>" + nombreUsuarioGrupo + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li class='ui-li-static ui-body-inherit'>" + obj.horario + "</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li></ul>");
                $(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                    + obj.nombre + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Monitor</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                    + nombreUsuarioGrupo + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>" + obj.horario +
                    "</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li><button value='" + obj.id + "' style='background-color: #e65d5d ; ' data-rel = 'popup' data-position-to = 'window'data-transition = 'pop' class = 'ui-btn botonEliminarGrupo'>Eliminar Grupo</button></ul>");
                //Fatima , la pregunta de confirmacion esta en el index , su id es "popup_dialog"
            });
        }).fail(function (error) {
            console.log(error);
        });

    });

    //LLAMADAS DE LA PÁGINA SESIONES CUANDO SE PULSA SU TAB

    $(".botonTabSesiones").click(function () {
        // GET/Usuarios/{idUsuarioAutenticado}/sesiones

        $("#listadoSesiones").html("");
        var fechaRecortada;
        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

            $.each(data, function (idx, obj) {
                fechaRecortada = obj.fecha.slice(0, 10);
                fechaRecortada = formatoFecha(fechaRecortada);

                //fatima cambio del boton eleiminar                 
                //$("#listadoSesiones").append("<li class='ui-li-has-alt'><a class='ui-btn' style='background: linear-gradient(lightcyan, beige, gray);' href='#ejerciciosSesion'>"+obj.nombre+" - "+fechaRecortada+"</a><button id='botonEliminarSesion'  value='"+obj.id+"' style='background-color: lightcoral;' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right ui-btn-icon-notext ui-icon-carat-r'></button></li>");
                $("#listadoSesiones").append("<li class='ui-li-has-alt'><button value='"+obj.id+"' class='botonVerEjerciciosSesion ui-btn' style='background: linear-gradient(lightcyan, beige, gray);'>" + obj.nombre + " - " + fechaRecortada + "</button><a style='background-color: lightcoral;' href = '#popup_dialog' data-rel = 'popup' data-position-to = 'window' data-transition = 'pop' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right'></a></li>");
            });
        }).fail(function (error) {
            console.log(error);
        });
    });
    //LLAMADAS DE LA TAB EJERCICIOS CUANDO SE PULSA SOBRE ALGUNA CATEGORIA
    $(document.body).on("click", ".botonCategoria", function () {
        $("#listadoEjerciciosPorCategoria").html("");
        var idCategoriaSeleccionada = $(this).val();
        var nombreCategoriaSeleccionada = $(this).text();
        console.log("id Categoria: "+idCategoriaSeleccionada);
        console.log("nombre Categoria: "+nombreCategoriaSeleccionada);
        $("#nombreCategoriaSeleccionada").text(nombreCategoriaSeleccionada)
        //$("#listadoEjerciciosPorCategoria").append();
        //LLamada para saber el nombre de la categoria
        $.get(urlApp + "Categoria/"+idCategoriaSeleccionada+"/ejercicios?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            
            $.each(data, function (idx, obj) {
                $("#listadoEjerciciosPorCategoria").append("<li><button value='" + obj.id + "' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 10px' class='botonEjercicio ui-btn ui-btn-icon-right ui-icon-carat-r' data-icon=''>" + obj.nombre + "</button></li>");
            });
        }).fail(function (error) {
            console.log(error);
        });

        window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#ejerciciosporcategoria"
    });

    //LLAMADAS DE LA TAB EJERCICIOS CUANDO SE PULSA SOBRE ALGUNA CATEGORIA CUANDO ESTAMOS AÑADIENDO EJERCICIO A ALGUNA SESION
    //EN CONSTRUCCION
    $(document.body).on("click", ".botonCategoriaParaAnyadir", function () {
        $("#listadoEjerciciosPorCategoria").html("");
        var idCategoriaSeleccionada = $(this).val();
        var nombreCategoriaSeleccionada = $(this).text();
        console.log("id Categoria: "+idCategoriaSeleccionada);
        console.log("nombre Categoria: "+nombreCategoriaSeleccionada);
        $("#nombreCategoriaSeleccionada").text(nombreCategoriaSeleccionada)
        //$("#listadoEjerciciosPorCategoria").append();
        //LLamada para saber el nombre de la categoria
        $.get(urlApp + "Categoria/"+idCategoriaSeleccionada+"/ejercicios?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            
            $.each(data, function (idx, obj) {
                $("#listadoEjerciciosPorCategoria").append("<li><button value='" + obj.id + "' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 10px' class='botonEjercicio ui-btn ui-btn-icon-right ui-icon-carat-r' data-icon=''>" + obj.nombre + "</button></li>");
            });
        }).fail(function (error) {
            console.log(error);
        });

        window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#ejerciciosporcategoria"
    });

    //LLAMADA PARA BORRAR UN GRUPO
    $(document.body).on("click", ".botonEliminarGrupo", function () {
        var idGrupoQueVaASerBorrado = $(this).attr("value");
        var urlBorrarGrupo = urlApp + "Grupos/" + idGrupoQueVaASerBorrado + "?access_token=" + getAllUrlParams(window.location.href).access_token;
        var urlBorrarSesionesdelGrupo = urlApp + "Grupos/" + idGrupoQueVaASerBorrado + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token;
    //BORRAMOS PRIMERO TODAS LAS SESIONES QUE ESE GRUPO TENGA ASOCIADAS   
        $.ajax({
            url: urlBorrarSesionesdelGrupo,
            type: 'DELETE',
            success: function (result) {
    //BORRAMOS AHORA EL GRUPO EN CUESTIÓN
                $.ajax({
                    url: urlBorrarGrupo,
                    type: 'DELETE',
                    success: function (result) {

    //AHORA ACTUALIZAMOD TODAS LAS VISTAS DONDE APARECÍA ESTE GRUPO Y SUS SESIONES
                        $(".listadoGrupos").html("");
                        var nombreUsuarioGrupo = $("#NombreUsuarioAutenticado").text();
                        // GET/Usuarios/{idUsuarioAutenticado}/grupos
                        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/grupos?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

                            $.each(data, function (idx, obj) {
                                //$(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li class='ui-li-static ui-body-inherit'>" + obj.nombre + "</li><li class='listaGrupos ui-li-divider ui-bar-a' data-role='list-divider'>Monitor</li><li class='ui-li-static ui-body-inherit'>" + nombreUsuarioGrupo + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li class='ui-li-static ui-body-inherit'>" + obj.horario + "</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li></ul>");
                                $(".listadoGrupos").append("<ul data-role='listview' data-inset='true' data-divider-theme='a' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Nombre Grupo</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                                    + obj.nombre + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Monitor</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>"
                                    + nombreUsuarioGrupo + "</li><li class='listaGrupos ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Horario</li><li style='margin-top:-8px;' class='ui-li-static ui-body-inherit'>" + obj.horario +
                                    "</li><li data-role='list-divider'><a href='#sesiones' class='ui-btn'>Ver Sesiones </a></li><button value='" + obj.id + "' style='background-color: #e65d5d ; ' data-rel = 'popup' data-position-to = 'window'data-transition = 'pop' class = 'ui-btn botonEliminarGrupo'>Eliminar Grupo</button></ul>");
                                //Fatima , la pregunta de confirmacion esta en el index , su id es "popup_dialog"
                            });
                        }).fail(function (error) {
                            console.log(error);
                        });

                        $("#listadoSesiones").html("");
                        var fechaRecortada;
                        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

                            $.each(data, function (idx, obj) {
                                fechaRecortada = obj.fecha.slice(0, 10);
                                fechaRecortada = formatoFecha(fechaRecortada);

                                //fatima cambio del boton eleiminar                 
                                //$("#listadoSesiones").append("<li class='ui-li-has-alt'><a class='ui-btn' style='background: linear-gradient(lightcyan, beige, gray);' href='#ejerciciosSesion'>"+obj.nombre+" - "+fechaRecortada+"</a><button id='botonEliminarSesion'  value='"+obj.id+"' style='background-color: lightcoral;' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right ui-btn-icon-notext ui-icon-carat-r'></button></li>");
                                $("#listadoSesiones").append("<li class='ui-li-has-alt'><button value='"+obj.id+"' class='botonVerEjerciciosSesion ui-btn' style='background: linear-gradient(lightcyan, beige, gray);'>" + obj.nombre + " - " + fechaRecortada + "</button><a style='background-color: lightcoral;' href = '#popup_dialog' data-rel = 'popup' data-position-to = 'window' data-transition = 'pop' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right'></a></li>");
                            });
                        }).fail(function (error) {
                            console.log(error);
                        });


                        $("#listaTabHome").html(" ");
                        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
                            var grupoId;
                            $.each(data, function (idx, obj) {
                                grupoId = data[idx].grupoId
                                sesionesUsuarioActual[idx] = obj.nombre

                                // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");


                                //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                                $.ajax({
                                    async: false,
                                    type: 'GET',
                                    url: urlApp + "Grupos/" + grupoId + "?access_token=" + getAllUrlParams(window.location.href).access_token,
                                    success: function (data) {
                                        //callback
                                        gruposUsuarioActual[idx] = data.nombre
                                        //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                                    }
                                });
                                $("#listaTabHome").append("<li><button class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>" + sesionesUsuarioActual[idx] + " - " + gruposUsuarioActual[idx] + "</button></li>");
                            });
                        }).fail(function (error) {
                            console.log(error);
                        });

                    }
                });
            }
        });

        window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#inicio"


    });

    //LLAMADA PARA BORRAR UNA SESION
    $(document.body).on("click", ".botonEliminarSesion", function () {
        console.log("FUNCIONA");
        var idSesionQueVaASerBorrada = $(this).attr("value");
        var urlBorrarSesion = urlApp + "Sesions/" + idSesionQueVaASerBorrada + "?access_token=" + getAllUrlParams(window.location.href).access_token;
        var urlBorrarEjerciciosSesion = urlApp + "EjerciciosSesions?filter=%7B%22where%22%3A%7B%22idSesion%22%3A"+idSesionSeleccionada+"%7D%7D&access_token=" + getAllUrlParams(window.location.href).access_token;
    //BORRAMOS PRIMERO TODAS LAS SESIONES QUE ESE GRUPO TENGA ASOCIADAS   
        $.ajax({
            url: urlBorrarEjerciciosSesion,
            type: 'DELETE',
            success: function (result) {
    //BORRAMOS AHORA EL GRUPO EN CUESTIÓN
                $.ajax({
                    url: urlBorrarSesion,
                    type: 'DELETE',
                    success: function (result) {

    //AHORA ACTUALIZAMOD TODAS LAS VISTAS DONDE APARECÍA ESTA SESION Y SUS EJERCICIOS
            

                        $("#listadoSesiones").html("");
                        var fechaRecortada;
                        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

                            $.each(data, function (idx, obj) {
                                fechaRecortada = obj.fecha.slice(0, 10);
                                fechaRecortada = formatoFecha(fechaRecortada);

                                //fatima cambio del boton eleiminar                 
                                //$("#listadoSesiones").append("<li class='ui-li-has-alt'><a class='ui-btn' style='background: linear-gradient(lightcyan, beige, gray);' href='#ejerciciosSesion'>"+obj.nombre+" - "+fechaRecortada+"</a><button id='botonEliminarSesion'  value='"+obj.id+"' style='background-color: lightcoral;' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right ui-btn-icon-notext ui-icon-carat-r'></button></li>");
                                $("#listadoSesiones").append("<li class='ui-li-has-alt'><button value='"+obj.id+"' class='botonVerEjerciciosSesion ui-btn' style='background: linear-gradient(lightcyan, beige, gray);'>" + obj.nombre + " - " + fechaRecortada + "</button><a style='background-color: lightcoral;' href = '#popup_dialog' data-rel = 'popup' data-position-to = 'window' data-transition = 'pop' class = 'eliminarSesion ui-btn ui-icon-delete ui-btn-icon-right'></a></li>");
                            });
                        }).fail(function (error) {
                            console.log(error);
                        });


                        $("#listaTabHome").html(" ");
                        $.get(urlApp + "Usuarios/" + getAllUrlParams(window.location.href).userid + "/sesiones?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
                            var grupoId;
                            $.each(data, function (idx, obj) {
                                grupoId = data[idx].grupoId
                                sesionesUsuarioActual[idx] = obj.nombre

                                // $("#listaTabHome").append("<li><a class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'  href='#ejerciciosSesion'>"+obj.nombre+"</a></li>");


                                //AJAX SÍNCRONO PORQUE HASTA QUE NO ME DEVUELVE EL GRUPO NO QUIERO QUE SIGA
                                $.ajax({
                                    async: false,
                                    type: 'GET',
                                    url: urlApp + "Grupos/" + grupoId + "?access_token=" + getAllUrlParams(window.location.href).access_token,
                                    success: function (data) {
                                        //callback
                                        gruposUsuarioActual[idx] = data.nombre
                                        //  $("#listaTabHome").append("<li class='tabs ui-btn' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>Grupo: "+data.nombre+"</li>");
                                    }
                                });
                                $("#listaTabHome").append("<li><button class='tabs ui-btn ui-btn-icon-right ui-icon-carat-r' style='background: linear-gradient(lightcyan, beige, gray);border: 1px solid gray;border-radius: 15px;'>" + sesionesUsuarioActual[idx] + " - " + gruposUsuarioActual[idx] + "</button></li>");
                            });
                        }).fail(function (error) {
                            console.log(error);
                        });

                    }
                });
            }
        });

        window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#inicio"


    });

    //LLAMADAS PARA PINTAR LOS EJERCICIOS QUE PERTENECEN A UNA SESIÓN
    $(document.body).on("click", ".botonVerEjerciciosSesion", function () {
        $("#nombreDeLaSesion").text("");
        $("#listadoEjerciciosSesionCalentamiento").html("");
        $("#listadoEjerciciosSesionPartePrincipal").html("");
        $("#listadoEjerciciosSesionVueltaALaCalma").html("");
        var idSesionSeleccionada = $(this).attr("value");
        var nombreSesionSeleccionada

        //PAra conseguir el nombre de la sesion
        $.get(urlApp + "Sesions/" + idSesionSeleccionada + "?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            nombreSesionSeleccionada = data.nombre 
            $("#botonEliminarSesion").val(data.id);
            
        }).fail(function (error) {
            console.log(error);
        });
        //Para conseguir los ejercicios que pertenecen a la sesion
        $.get(urlApp + "Sesions/" + idSesionSeleccionada + "/ejercicios?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {
            
            $.each(data, function (idx, obj) {
                $("#nombreDeLaSesion").text(nombreSesionSeleccionada);
                //AJAX SÍNCRONO PARA CONSEGUIR LA PARTE DE LA SESION A LA QUE PERTENECE CADA EJERCICIO
                $.ajax({
                    async: false,
                    type: 'GET',
                    url: urlApp + "EjerciciosSesions?filter=%7B%22where%22%3A%7B%22idSesion%22%3A"+idSesionSeleccionada+"%7D%7D&access_token=" + getAllUrlParams(window.location.href).access_token,
                    success: function (datos) {
                        //callback
                        if(datos[idx].parteSesion==0){
                            //Se pintan aquí si forman parte del calentamiento
                            $("#listadoEjerciciosSesionCalentamiento").append("<li><button value='"+obj.id+"' style='background: #FFC991' class = 'ui-btn botonVerDescripcionEjercicio'>"+obj.nombre+"</button>"+
                         "</li>");    
        
                        }else if(datos[idx].parteSesion==1){
                            //Se pintan aquí si forman parte de la parte principal
                            $("#listadoEjerciciosSesionPartePrincipal").append("<li><button value='"+obj.id+"' style='background: #FFC991' class = 'ui-btn botonVerDescripcionEjercicio'>"+obj.nombre+"</button>"+
                         "</li>");
                        }else if(datos[idx].parteSesion==2){
                            //Se pintan aquí si forman parte de la vuelta a la calma
                            $("#listadoEjerciciosSesionVueltaALaCalma").append("<li><button value='"+obj.id+"' style='background: #FFC991' class = 'ui-btn botonVerDescripcionEjercicio'>"+obj.nombre+"</button>"+
                         "</li>");
                        }
                    }
                });

                
                });
        }).fail(function (error) {
            console.log(error);
        });
        window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#ejerciciosSesion";

    });
//LLAMADAS PARA PINTAR LA DESCRIPCION DEL EJERCICIO SELECCIONADO
    $(document.body).on("click", ".botonVerDescripcionEjercicio", function () {

        var idEjercicioSeleccionado = $(this).attr("value");
        var idCAtegoriaDelEjercicio;

        $.get(urlApp + "Ejercicios/" + idEjercicioSeleccionado + "?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

                $("#nombreDelEjercicio").text(data.nombre);
                $("#imagenEjercicio1").html("<img style='width:100%; height:100%; margin-top: 0px;' alt='' src='"+data.imagen+"' />");
                $("#imagenEjercicio2").html("<img style='width:100%; height:100%; margin-top: 0px;' alt='' src='"+data.imagen2+"' />");
                $("#descripcionDelEjercicio").text(data.descripcion);
                $("#duracionDelEjercicio").text(data.duracion);
                idCAtegoriaDelEjercicio = data.categoriaId;


                //$("#imagenPop").html("<a href="#" data-rel="back" class="ui-btn ui-btn-a ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img alt="" src="../img/4.jpg" style="width:100%; height:200px;" />");
                $.get(urlApp + "Categoria/" + idCAtegoriaDelEjercicio + "?access_token=" + getAllUrlParams(window.location.href).access_token, function (data, status) {

                    $("#categoriaDelEjercicio").text(data.nombre);
                    
                
                //$("#imagenPop").html("<a href="#" data-rel="back" class="ui-btn ui-btn-a ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img alt="" src="../img/4.jpg" style="width:100%; height:200px;" />");
                
                
                });
                
                
                });
                window.location.href = "http://localhost:3000/app/?userid=" + getAllUrlParams(window.location.href).userid + "&access_token=" + getAllUrlParams(window.location.href).access_token + "#ejercicioDescripcion";
        }).fail(function (error) {
            console.log(error);
        });
       


});