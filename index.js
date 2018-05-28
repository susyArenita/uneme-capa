//Configuracion del servidor
const express = require('express'),
          app = express(),
          port = process.env.PORT || 3000,
          passport = require('passport'),
          flash = require('connect-flash'),
	        cookieParser = require('cookie-parser'),
          path = require('path'),
          bodyParser = require('body-parser'),
          methodOverride = require('method-override'),
	        session = require('express-session');

//Configuracion de la BD
const configDB = require('./config/database.js');

// configuraciones de express
app.use(cookieParser()); // read cookies (needed for auth)

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(methodOverride("_method"));

//static files
app.use(express.static(path.join(__dirname, 'app/assets')));
app.use('/filesPDF', express.static('app/filesPDF'));
app.use('/instrumentos', express.static('app/instrumentos'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// requieridos por passport
app.use(session({ secret: 'ppcdsalvc' })); // session secret
app.use(passport.initialize()); // persistent login sessions
app.use(passport.session());
app.use(function(req,res,next){
    if(req.user){
    	res.locals.user_nombre = req.user.UsuarioSesion;
    	res.locals.user_id = req.user.idSesion;
    	//console.log("->"+req.user.id_usuario)
	    if(req.user.cat_roles_idRol == 1){
	        res.locals.user_rol = "coordinador";
	    }else if(req.user.cat_roles_idRol == 2){
	        res.locals.user_rol = "psicologo";
	    }else if(req.user.cat_roles_idRol == 3){
	        res.locals.user_rol = "trabajadorSocial";
	    }else if(req.user.cat_roles_idRol == 4){
					res.locals.user_rol = "recepcionista";
			}
    }
    next();
});
app.use(flash());  //use connect-flash for flash messages stored in session
require('./config/passport')(passport);

//routes
require('./app/routes.js')(app, passport, express);
app.listen(port, ()=> {
  console.log('El servidor se escucha en el puerto: ' + port);
});
