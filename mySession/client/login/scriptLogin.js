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
                document.cookie = "access_token=" + token + "; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
                location.href ="pantallasAplicacion?userid="+data.userId;
            })
            .fail(function (error) {
                console.log(error);
                console.log("Credenciales incorrectas");
            })
        // setTimeout(function () {
        //     $.get("http://localhost:3000/api/Ejercicios?"+document.cookie)
        //         .done(function (data) {
        //             console.log(data);
        //         })
        //         .fail(function (error) {
        //             console.log(error);
        //         }, 2000)
        // })
    });

});