const db = require('./database');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');


module.exports = function(passport){
	passport.serializeUser(function(usuario, done){
		done(null, usuario.idSesion);
	});

	passport.deserializeUser(function(id, done){
		db.query("select idSesion, UsuarioSesion, cat_roles_idRol from sesion where sesion.idSesion=?",[id], function(err, rows){
			done(err, rows[0]);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'usuario',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, usuario, password, done){
		console.log('POST /login')
		db.query("select * from sesion where sesion.UsuarioSesion=?", [usuario], function(err, rows){
			if(err) return done(err);
      var isvalidContrasena = (hash, contrasena) =>{
        return bcrypt.compareSync(contrasena, hash);
      }
			if(!rows.length)
				return done(null, false, req.flash('loginMessage', 'Usuario no encontrado o inactivo.'));

			if(!isvalidContrasena(rows[0].ContraseniaSesion, password))
				return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));

			console.log('login success!!!' + rows[0]);
			return done(null, rows[0]);
		});
	}));
}
