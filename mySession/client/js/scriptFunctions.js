$(document).ready(function () {

    var urlApp = "http://localhost:3000/api";

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
        // GET/Usuarios/{idUsuarioAutenticado}/sesiones
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