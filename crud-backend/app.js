var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
mongoose.Promise = global.Promise;

// adding require dependencies
app.use(cors());
app.use(bodyParser.json());

// importing routes
var usersRouter = require('./route/user-router.js');
var placesRouter = require('./route/place-router.js');
var criteriasRouter = require('./route/criteria-router.js');
var ahpRouter = require('./route/ahp-router.js');

// setting api
app.use('/api/user', usersRouter);
app.use('/api/place', placesRouter);
app.use('/api/criteria', criteriasRouter);
app.use('/api/ahp', ahpRouter);
app.use(express.static('../crud-frontend'));

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/travelApp')
    .then(() => console.log('Connection succesfull at port 27017'))
    .catch((err) => console.error(err));

const PORT = 3000;

app.listen(PORT, () => {

    /**
     * 1. Lugares + Hoteles + Criterios
     * 2. AHP a los subcriterios entre hoteles de un mismo lugar (el criterio padre toma el valor retornado por AHP).
     * 3. AHP entre los hoteles + criterios de cada lugar.
     * 4. Ordenamos de mayor a menor todas las ponderaciones y elegimos el top 10.
     */

    /*let matrix = {
        'Opcion 1': [3500, 10, 300, 1000],
        'Opcion 2': [2700, 8, 315, 850],
        'Opcion 3': [3100, 12, 280, 950],
        'Opcion 4': [4000, 12, 305, 975]
    };

    var ahpContext = new AHP();
 
    ahpContext.addItems(['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4']);
    
    ahpContext.addCriteria(['Precio', 'Vida util', 'Coste', 'Produccion']);

    const peso = getPeso(matrix['Opcion 2'][1], matrix['Opcion 1'][1], true);
    console.log('Peso', peso);
    
    //rank criteria with rank scale
    ahpContext.rankCriteriaItem('Precio', [
        ['Opcion 1', 'Opcion 2', 1 / 5],
        ['Opcion 1', 'Opcion 3', 1 / 5],
        ['Opcion 1', 'Opcion 4', 5],
        ['Opcion 2', 'Opcion 3', 3],
        ['Opcion 2', 'Opcion 4', 9],
        ['Opcion 3', 'Opcion 4', 9]
    ]);
    
    //rank criteria with rank scale
    ahpContext.rankCriteriaItem('Vida util', [
        ['Opcion 1', 'Opcion 2', 1 / 3],
        ['Opcion 1', 'Opcion 3', 3],
        ['Opcion 1', 'Opcion 4', 3],
        ['Opcion 2', 'Opcion 3', 5],
        ['Opcion 2', 'Opcion 4', 5],
        ['Opcion 3', 'Opcion 4', 1]
    ]);

    //rank criteria with rank scale
    ahpContext.rankCriteriaItem('Coste', [
        ['Opcion 1', 'Opcion 2', 7],
        ['Opcion 1', 'Opcion 3', 1/5],
        ['Opcion 1', 'Opcion 4', 3],
        ['Opcion 2', 'Opcion 3', 1/9],
        ['Opcion 2', 'Opcion 4', 1/5],
        ['Opcion 3', 'Opcion 4', 7]
    ]);

    //rank criteria with rank scale
    ahpContext.rankCriteriaItem('Produccion', [
        ['Opcion 1', 'Opcion 2', 9],
        ['Opcion 1', 'Opcion 3', 5],
        ['Opcion 1', 'Opcion 4', 3],
        ['Opcion 2', 'Opcion 3', 1/7],
        ['Opcion 2', 'Opcion 4', 1/7],
        ['Opcion 3', 'Opcion 4', 1/3]
    ]);
    
    ahpContext.rankCriteria(
        [
            ['Precio', 'Vida util', 1/5],
            ['Precio', 'Coste', 5],
            ['Precio', 'Produccion', 1/3],
            ['Vida util', 'Coste', 9],
            ['Vida util', 'Produccion', 1],
            ['Coste', 'Produccion', 1/5]
        ]
    );
    
    let output = ahpContext.run();

    console.log(output.rankedScoreMap);*/
});

module.exports = app;
