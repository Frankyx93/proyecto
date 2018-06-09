$(document).ready(function () {

    var token = null;
    

    $("#iniciarSesion").click(function () {
        var email = $("#emailUsuario").val();
        var pass = $("#passwordUsuario").val();
        $.post("http://localhost:3000/api/Usuarios/login",
            {
                email: email,
                password: pass
            }).done(function (data) {
                token = data.id;
                usuarioId = data.userId;
                document.cookie = "access_token=" + token + "; expires=Thu, 05 Dec 2019 12:00:00 UTC; path=/";
                //ENCONTRAR FORMA DE ENVIAR EL ID DE USUARIO
                location.href ="app?userid="+usuarioId+"&access_token="+token;
            })
            .fail(function (error) {
                console.log(error);
                console.log("Credenciales incorrectas");
            })
    });

});