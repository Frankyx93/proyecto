
// funcion para el funcionamiento del calendario 
$(function () {
    var now = new Date();

    $('#demo').mobiscroll().calendar({
        display: 'inline',
        layout: 'liquid',
        theme: 'material',
        markedDisplay: 'bottom',
        marked: [{
            d: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6),
            color: 'rgb(28, 161, 227)'
        }, {
            d: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8),
            color: 'rgb(28, 161, 227)'
        }, {
            d: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9),
            color: 'rgb(28, 161, 227)'
        }, {
            d: new Date(now.getFullYear(), now.getMonth() + 1, 15),
            color: 'rgb(28, 161, 227)'
        }, {
            d: '11/30',
            color: 'rgb(163, 0, 38)'
        }, {
            d: '5/23',
            color: 'rgb(163, 0, 38)'
        }, {
            d: '3/12',
            color: 'rgb(163, 0, 38)'
        }, {
            d: '14',
            color: 'rgb(204,204,0)'
        }, {
            d: 'w5',
            color: 'rgb(34, 139, 34)'
        }, {
            d: '1/1',
            color: 'rgb(250,104,0)'
        }, {
            d: '1/2',
            color: 'rgb(250,104,0)'
        }, {
            d: '6/4',
            color: 'rgb(250,104,0)'
        }, {
            d: '8/4',
            color: 'rgb(250,104,0)'
        }, {
            d: '12/25',
            color: 'rgb(250,104,0)'
        }, {
            d: '12/26',
            color: 'rgb(250,104,0)'
        }]
    });

    $('.md-marked-list').mobiscroll().listview({
        theme: 'material',
        display: 'center',
        swipe: false
    });

});

