$(document).ready(function () {

    var token = null;
    

    $("#iniciarSesion").click(function () {
        var email = $("#emailUsuario").val();
        var pass = $("#passwordUsuario").val();
        console.log(email);
        console.log(pass);
        alert("Boton Iniciar Sesion");
        $.post("http://localhost:3000/api/Usuarios/login",
            {
                email: email,
                password: pass
            }).done(function (data) {
                console.log(data.id);
                token = data.id;
                document.cookie = "access_token=" + token + "; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/";
                console.log(token); 
                //Cookies.set('access_token', data.id,{expires: 365});
                //console.log(email); 
                //console.log(pass);
                location.href ="pantallasAplicacion/";
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