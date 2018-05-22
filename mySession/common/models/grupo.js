'use strict';

module.exports = function(Grupo) {
    	// Asignar como 'propietario' del grupo que se va a crear, al usuario que solicita su creación
        Grupo.beforeRemote('create', function (context, Grupo, next) {
            context.args.data.usuarioId = context.req.accessToken.userId;
            next();
        });
      
};
