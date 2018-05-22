'use strict';

module.exports = function(Sesion) {
        	// Asignar como 'propietario' de la sesión que se va a crear, al usuario que solicita su creación
            Sesion.beforeRemote('create', function (context, Sesion, next) {
                context.args.data.usuarioId = context.req.accessToken.userId;
                next();
            });
          
};
