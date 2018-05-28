const db = require('../config/database');
//const validate = require('validate.js');

//Controladores
const principalCTRL = require('./controllers/principal');
const trabajosocialCTRL = require('./controllers/trabajosocial');
const recepcionistaCTRL = require('./controllers/recepcionista');
const psicologoCTRL = require('./controllers/psicologo');
const coordinadorCTRL = require('./controllers/coordinador');
const pacienteCTRL = require('./controllers/paciente');
const helpersCTRL = require('./controllers/helpers');

module.exports = function(app, passport, express) {
  const router = express.Router();

  //Pagina principal
  router.get('/', principalCTRL.index);
  router.get('/consulta', principalCTRL.consulta);
  router.get('/sesionIni', isLoggedIn, helpersCTRL.index);
    //Coordinador
    router.post('/instrumentos', isLoggedIn, isAdministrador, coordinadorCTRL.instrumentosprincipal);
    router.get('/instrumentosPrincipal', isLoggedIn, isAdministrador, coordinadorCTRL.instrumentosprincipal);
    router.post('/registrarE', isLoggedIn, isAdministrador, coordinadorCTRL.registrarempleado);
    router.get('/registrar', isLoggedIn, isAdministrador, coordinadorCTRL.registroempleado);
    router.get('/verEmpleados', isLoggedIn, isAdministrador, coordinadorCTRL.verempleados);
    //Ver informacion del empleado
    router.get('/editarEmpleado:idActor', isLoggedIn, isAdministrador, coordinadorCTRL.editarinformacion);
    router.put('/empleado/editar/:idActor', isLoggedIn, isAdministrador, coordinadorCTRL.updateEmpleado);


    //Trabajo social
    router.post('/seguimiento', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientoprincipal);
    router.get('/seguimientodetalles', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientodetalles);
    router.get('/seguimientoregistro', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientoregistro);
    router.get('/seguimientoprincipal', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientoprincipal);
    //Consultar informacion Nota Seguimiento
    router.get('/seguimientodetalles:idNotaSeguimiento', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientodetalles);
    //Registrar nota de seguimiento
    router.post('/registrarNS', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.notaseguimientoregistrar);
    //PDF seguimiento
    router.get('/seguimientoPDF/:idNotaSeguimiento', isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.PDFseguimiento);


    //Recepcionista
    router.post('/citas', isLoggedIn, isRecepcionista, recepcionistaCTRL.agendarcitasprincipal);
    router.get('/agendarcitas', isLoggedIn, isRecepcionista, recepcionistaCTRL.agendarcitas);
    router.get('/reasignar', isLoggedIn, isRecepcionista, recepcionistaCTRL.reasignarpsicologo);
    router.get('/citasprincipal', isLoggedIn, isRecepcionista, recepcionistaCTRL.agendarcitasprincipal);
    //Informacion de la agenda
    router.get('/detallescita:idAgenda', isLoggedIn, isRecepcionista, recepcionistaCTRL.agendarcitasdetalles);
    router.put('/cita/actualizar/:idAgenda', isLoggedIn, isRecepcionista, recepcionistaCTRL.updatecitar);
    //Registrar cita recepcionista
    router.post('/registrarCitaR', isLoggedIn, isRecepcionista, recepcionistaCTRL.citarecepcionregistrar);
    //actualizar psicologo
    router.put('/psicologo/actualizar/', isLoggedIn, isRecepcionista, recepcionistaCTRL.updatePsicologo);

    //router.put('/psicologo/actualizar/:NumeroExpediente', isLoggedIn, isRecepcionista, recepcionistaCTRL.updatePsicologo);


    //Psicologo
    router.post('/tratamiento', isLoggedIn, isPsicologo, psicologoCTRL.tratamientoclinicoprincipal);
    router.get('/historial', isLoggedIn, isPsicologo, psicologoCTRL.tratamientoclinicohistorial);
    router.get('/tratamientoregistro', isLoggedIn, isPsicologo, psicologoCTRL.notatratamientoregistro);
    router.get('/egreso', isLoggedIn, isPsicologo, psicologoCTRL.egresoprincipal);
    router.get('/egresofinal', isLoggedIn, isPsicologo, psicologoCTRL.egresofinal);
    router.get('/citasP', isLoggedIn, isPsicologo, psicologoCTRL.citasagendar);
    router.get('/tratamientoPrincipal', isLoggedIn, isPsicologo, psicologoCTRL.tratamientoclinicoprincipal);
    router.get('/historialEgresos', isLoggedIn, isPsicologo, psicologoCTRL.egresosHistorial);

    //Informacion de la nota de tratamiento
    router.get('/tratamientodetalles:idNotaSeguimiento', isLoggedIn, isPsicologo, psicologoCTRL.notatratamientodetalles);
    //Registro de la nota de tratamiento
    router.post('/registrartratamiento', isLoggedIn, isPsicologo, psicologoCTRL.notatratamientoregistrar);
    //Registro de la cita
    router.post('/registrarcitaP', isLoggedIn, isPsicologo, psicologoCTRL.citapsicologoregistrar);
    //Registro del egreso final
    router.post('/registrarEgresoFinal', isLoggedIn, isPsicologo, psicologoCTRL.egresofinalregistrar);
    router.post('/registrarEgresos', isLoggedIn, isPsicologo, psicologoCTRL.registroEgresos);
    //PDF nota tratamiento
    router.get('/tratamientoPDF/:idNotaSeguimiento', isLoggedIn, isPsicologo, psicologoCTRL.PDFtratamiento);
    //PDF egreso
    router.get('/egresoPDF/:NumeroExpediente', isLoggedIn, isPsicologo, psicologoCTRL.PDFegreso);




    // inicio de sesion de los usuarios
    router.route('/login')
        .get(notIsLoggedIn, function(req, res){
            console.log('GET /login');
            res.render('login', {message: req.flash('loginMessage')});
        })
        .post(passport.authenticate('local-login',{
            successRedirect: '/sesionIni',
            failureRedirect: '/login',
            failureFlash: true
        }));

    router.get('/logout', function(req, res){
    	req.logout();
    	res.redirect('/login');
    });

    app.use(router);

    const api = express.Router();

    api.route('/expediente/buscar/numero/:NoExpediente/')
        .get(trabajosocialCTRL.APIBuscarExpediente);

    //Api seguimiento
    api.route('/folio/:folio/')
        .get(isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.APIBuscarFolio);

    api.route('/expediente/buscar/paciente/:expediente/')
        .get(isLoggedIn, isTrabajadorSocial, trabajosocialCTRL.APIBuscarExpediente_Paciente);



    //Api tratamiento
    api.route('/expediente/:expediente/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarExpediente);

    api.route('/expediente/buscar/DatosPaciente/:expediente/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarExpediente_Paciente);


    //Api citas recepcion
    api.route('/agenda/:agenda/')
        .get(isLoggedIn, isRecepcionista, recepcionistaCTRL.APIBuscarAgenda);

    api.route('/agenda/buscar/paciente/:paciente/')
        .get(isLoggedIn, isRecepcionista, recepcionistaCTRL.APIBuscarAgenda_Paciente);


    //citas psicologo
    api.route('/cita/buscar/paciente/:identificador/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarPaciente_cita);

    //Tratamiento clinico psicologo
    api.route('/expediente/buscar/tratamiento/:expediente/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarTratamiento_Clinico);

    //Egreso - psicologo
    api.route('/expediente/buscar/egreso/:expediente/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarEgreso_Tratamiento);

    api.route('/expediente/buscar/egresoFinal/:expediente/')
        .get(isLoggedIn, isPsicologo, psicologoCTRL.APIBuscarEgreso_Final);


    //Api reasignar psicologo - recepcionista
    api.route('/expediente/buscar/psicologo/:expediente/')
        .get(recepcionistaCTRL.APIBuscarPsicologo);

    //Api de consulta de citas paciente
    api.route('/expediente/buscar/consultas/:expediente/')
        .get(pacienteCTRL.APIBuscarExpediente_Consultas);

    api.route('/consultaPaciente/:expediente/')
        .get(pacienteCTRL.APIBuscarConsultas);



    app.use('/api', api);



    //Funciones para el inicio de sesionIni
    function isAdministrador(req, res, next) {
        console.log(req.user.cat_roles_idRol);
        // 1 = coordinador
        if (req.user.cat_roles_idRol == 1)
            return next();
        res.render('privileges');
    }

    function isPsicologo(req, res, next) {
        console.log(req.user.cat_roles_idRol);
        // 1 = coordinador
        if (req.user.cat_roles_idRol == 2)
            return next();
        res.render('privileges');
    }

    function isTrabajadorSocial(req, res, next) {
        console.log(req.user.cat_roles_idRol);
        // 1 = coordinador
        if (req.user.cat_roles_idRol == 3)
            return next();
        res.render('privileges');
    }

    function isRecepcionista(req, res, next) {
        console.log(req.user.cat_roles_idRol);
        // 1 = coordinador
        if (req.user.cat_roles_idRol == 4)
            return next();
        res.render('privileges');
    }

    function notIsAdministrador(req, res, next){
        if (req.user.cat_roles_idRol != 1)
            return next();
        res.redirect('/sesionIni');
    }
    // Metodos de autentificacion
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
    function notIsLoggedIn(req, res, next) {
        // if user not is authenticated in the session, carry on
        if (req.isAuthenticated())
            res.redirect('/sesionIni');
        // if they aren't redirect them to the home page
        return next();
    }

}
