$(document).ready(function () {

    var token = null;
    

    $("#crearUsuario").click(function () {
        var nombre = $("#nombreUsuarioNuevo").val();
        var email = $("#emailUsuarioNuevo").val();
        var pass = $("#passUsuarioNuevo").val();
        $.post("http://localhost:3000/api/Usuarios",
            {
                nombre: nombre,
                email: email,
                password: pass
            }).done(function (data) {
                alert("Usuario creado con éxito, Ahora puede iniciar sesión");
                location.href ="http://localhost:3000/#iniciar";
            })
            .fail(function (error) {
                console.log(error);
                console.log("Error");
            })
            
    });

});