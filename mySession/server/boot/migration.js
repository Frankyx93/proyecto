'use strict';

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mySessionDS;
    
    if(process.env.AUTOMIGRATE) {
        mysqlDs.automigrate(null, function (err) {
            if (err) console.log(err);
            console.log('> Models migrated to tables');
       });
    }
}