const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: String,
	pw: String,
	searches: [{
		criteria: [],
		places: [],
		convenience: [] 
	}]
});

/*
//STATICS. Devolver todos los usuarios que contengan en su nombre la expresion regular 'nombre'.
userSchema.statics.findByNameAndPassword = function(name, password, cb) {
	
	const userToFind = {
        name: name,
        pw: password
    };

    return this.findOne(userToFind, cb);
};

//METODO INSTANCIA. Devuelve todos los amigos de determinado usuario.
gamesSchema.methods.showAmigos = function() {
	return 'Los amigos de ' + this.nombre + ' son: ' + this.amigos;
}

//METODO INSTANCIA. Devuelve todas las estadisticas del usuario, en determinado juego.
gamesSchema.methods.showStats = function(game, cb) {
	var result = this.juegos.map(function(juego) {
		if (juego.nombreJuego == game)
			return juego.nombreJuego + ", " + juego.partidasPerdidas + " partidas perdidas, " + juego.partidasEmpatadas + " partidas empatadas, y " + juego.partidasPerdidas + " partidas perdidas.";
	});
	console.log(result);
	return result;
}

//METODO INSTANCIA. Devuelve todos los juegos de determinado usuario.
gamesSchema.methods.showJuegos = function() {
	console.log('Los juegos que juega ' + this.nombre + ' son: ' + this.juegos);
}

//STATICS. Devolver todos los usuarios que contengan en su nombre la expresion regular 'nombre'.
gamesSchema.statics.findByName = function(nombre, cb) {
    return this.find({ nombre: new RegExp(nombre, 'i') }, cb);
};

//STATICS. Devolver todos los usuarios que jueguen determinado juego.
gamesSchema.statics.findByGame = function(juego, cb) {
    return this.find({ "juegos.nombreJuego" : juego}, cb);
};

// VIRTUALS. Devolver la informacion principal de un usuario (nombre, contrasena, amigos).
gamesSchema.virtual('mainInformation').get(function () {
	return this.nombre + ', ' + this.contraseña + ', '  + this.amigos + '.';
});

// Usuario.findOne({ 'nombre': 'Lucas' }, function (err, usuario) {
// 	if (err) return handleError(err);
// 	console.log(usuario.mainInformation);
// 	db.close();
// });

// Usuario.findByGame('FIFA18', function(err, usuarios) {
// 	console.log(usuarios);
// 	db.close();
// });

// Usuario.findByName('u', function(err, usuarios) {
// 	console.log(usuarios);
// 	db.close();
// });

// var userJuan = new Usuario({ 
// 	nombre: 'Juan',
// 	contraseña: '1234',
// 	amigos: ['Covelli', 'Pepito', 'Lucas', 'Santi'],
// 	juegos: []
// });

// userJuan.save();

// var userCovelli = new Usuario({ 
// 	nombre: 'Covelli',
// 	contraseña: '1234',
// 	amigos: ['Juan'],
// 	juegos: []
// });

// userCovelli.save();

// var userLucas = new Usuario({ 
//  	nombre: 'Lucas',
//  	contraseña: '1234',
//  	amigos: ['Juan','Covelli'],
//  	juegos: [{
// 		nombreJuego: 'FIFA18',
// 		partidasGanadas: 2,
// 		partidasEmpatadas: 0,
// 		partidasPerdidas: 4,
// 		historialPartidas: [{
// 				adversario: 'Juan',
// 				ganadas: 1,
// 				empatadas: 0,
// 				perdidas: 2 
// 			}, {
// 				adversario: 'Covelli',
// 				ganadas: 1,
// 				empatadas: 0,
// 				perdidas: 2
// 			}
// 		]
// 	}]
// });

// userLucas.showStats('FIFA18', function(err, stats) {
// 	console.log(stats);
// 	db.close();
// });

// userLucas.save();

// Usuario.find({}, function(err, usuarios) {
// 	if (err) return handleError(err);
// 	console.log(usuarios);
// });*/

module.exports = mongoose.model('User', userSchema);