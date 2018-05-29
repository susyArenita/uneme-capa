const db = require('../../config/database');
const open = require('open');
var pdfs =require('./pdfs');

exports.tratamientoclinicoprincipal = (req, res) => {
        res.render('psicologo/tratamientoclinicoprincipal');
}



exports.APIBuscarTratamiento_Clinico = function(req, res){
        console.log(req.params.expediente);
        db.query("select expediente.NumeroExpediente, expediente.statusExpediente, paciente.idPaciente, concat(paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, paciente.SexoPaciente, date_format(paciente.FechaNacimientoPaciente,'%e/%m/%Y') as FechaNacimiento, timestampdiff(year,paciente.FechaNacimientoPaciente,CURDATE()) as Edad, tratamiento.NombreTratamiento, tratamiento.TotalSesionesTratamiento, count(notatratamiento.Expediente_NumeroExpediente) as sesiones from expediente inner join paciente on paciente.idPaciente = expediente.Paciente_idPaciente inner join tratamiento on tratamiento.idTratamiento = expediente.Tratamiento_idTratamiento inner join notatratamiento on notatratamiento.Expediente_NumeroExpediente = expediente.NumeroExpediente where expediente.NumeroExpediente=?;", [req.params.expediente], function(err, rows){
          var tratamiento_clinico = JSON.parse(JSON.stringify(rows));
          res.status(200).json(tratamiento_clinico[0]);
          console.log(tratamiento_clinico);
        });
}


exports.egresosHistorial = (req, res) => {
        db.query("select NumeroExpediente, idPaciente, concat(nombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, idEgreso from expediente, paciente, egreso where paciente.idPaciente=expediente.Paciente_idPaciente and expediente.NumeroExpediente=egreso.Expediente_NumeroExpediente;", function(err, rows){
            var egresosFinales = JSON.parse(JSON.stringify(rows));
                  // console.log(usuarios)
            res.render('psicologo/historialEgreso', {egresosFinales: egresosFinales});
        });
}


exports.tratamientoclinicohistorial = (req, res) => {
        db.query("select idNotaSeguimiento, date_format(FechaNotaTratamiento,'%e/%m/%Y') as FechaNota, NumeroSesionNotaTratamiento, ResumenNotaTratamiento from notatratamiento;", function(err, rows){
            var tratamiento = JSON.parse(JSON.stringify(rows));
                  // console.log(usuarios)
            res.render('psicologo/tratamientoclinicohistorial', {tratamiento: tratamiento});
        });
}


exports.APIBuscarExpediente = function(req, res){
            db.query("select idNotaSeguimiento, date_format(FechaNotaTratamiento,'%e/%m/%Y') as FechaNota, NumeroSesionNotaTratamiento, ResumenNotaTratamiento from notatratamiento where Expediente_NumeroExpediente=?;", [req.params.expediente], function(err, rows){
              var tratamientos = JSON.parse(JSON.stringify(rows));
              res.status(200).json(tratamientos);
              console.log(tratamientos);
            });
}


exports.notatratamientodetalles = (req, res) => {
  console.log('GET /notatratamientodetalles/:id');
  data = {}
  //db.query("select * from Actor where PuestoActor!='coordinador'", (err, rows) =>{
    //  data['puesto'] = JSON.parse(JSON.stringify(rows));
    //db.query("select idNotaSeguimiento, FechaNotaSeguimiento, HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from notaseguimiento where idNotaSeguimiento=?;",[req.params.idNotaSeguimiento], function(err, rows){
    db.query("select NumeroExpediente, idPaciente, timestampdiff(year,FechaNacimientoPaciente,CURDATE()) as Edad, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, idNotaSeguimiento, NumeroSesionNotaTratamiento, date_format(FechaNotaTratamiento,'%e/%m/%Y') as FechaNota, time_format(HoraInicioNotaTratamiento,'%h:%i %p') as HoraInicioNotaTratamiento, ResumenNotaTratamiento, DiagnosticoNotaTratamiento, PronosticoNotaTratamiento from paciente, notatratamiento, expediente where paciente.idPaciente=expediente.Paciente_idPaciente and notatratamiento.Expediente_NumeroExpediente=expediente.NumeroExpediente and idNotaSeguimiento=?;",[req.params.idNotaSeguimiento], function(err, rows){
        data['nota_tratamiento'] = JSON.parse(JSON.stringify(rows[0]));
        res.render('psicologo/notatratamientodetalles');
        console.log(data);
    });
  //});
  //res.render('TrabajoSocial/notaseguimientodetalles');
}


exports.PDFtratamiento = (req, res) => {
  console.log("get PDFtratamiento");
  data=[];
  db.query("select NumeroExpediente, idPaciente, FechaNacimientoPaciente, SexoPaciente, timestampdiff(year,FechaNacimientoPaciente,CURDATE()) as Edad, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, idNotaSeguimiento, NumeroSesionNotaTratamiento, date_format(FechaNotaTratamiento,'%e/%m/%Y') as FechaNota, time_format(HoraInicioNotaTratamiento,'%h:%i %p') as HoraInicioNotaTratamiento, ResumenNotaTratamiento, DiagnosticoNotaTratamiento, PronosticoNotaTratamiento from paciente, notatratamiento, expediente where paciente.idPaciente=expediente.Paciente_idPaciente and notatratamiento.Expediente_NumeroExpediente=expediente.NumeroExpediente and idNotaSeguimiento=?;", [req.params.idNotaSeguimiento], (err, rows) =>{
    var Info_Tratamiento=JSON.parse(JSON.stringify(rows[0]));
    if(err){
      res.status(500).json(err);
    }else{
      pdfs.NotaTratamiento(Info_Tratamiento, res);
    }
  });
}

exports.notatratamientoregistro = (req, res) => {
  res.render('psicologo/notatratamientoregistro');
}


exports.notatratamientoregistrar = (req, res) => {
      console.log('POST /registraNotaTratamiento');
      params=[req.body.Sesion, req.body.Resumen, req.body.Diagnostico, req.body.Pronostico, req.body.NoExpediente]
      console.log(params);
      db.query("insert into notatratamiento (FechaNotaTratamiento, NumeroSesionNotaTratamiento, HoraInicioNotaTratamiento, ResumenNotaTratamiento, DiagnosticoNotaTratamiento, PronosticoNotaTratamiento, Expediente_NumeroExpediente) values (NOW(),?,CURRENT_TIME(),?,?,?,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
          res.redirect('/historial');
        }
      });
}

exports.APIBuscarExpediente_Paciente = function(req, res){
        console.log(req.params.expediente);
        db.query("select idPaciente, concat(nombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, date_format(FechaNacimientoPaciente,'%e/%m/%Y') as FechaNacimiento, timestampdiff(year,FechaNacimientoPaciente,CURDATE()) as Edad, SexoPaciente, NumeroExpediente, statusPaciente from paciente, expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and statusExpediente='activo' and NumeroExpediente=?;", [req.params.expediente], function(err, rows){
          var expediente_DatosPaciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(expediente_DatosPaciente[0]);
          console.log(expediente_DatosPaciente);
        });
}


exports.egresoprincipal = (req, res) => {
  res.render('psicologo/egresoprincipal');
}

exports.egresofinal = (req, res) => {
  res.render('psicologo/egresofinal');
}

exports.PDFegreso = (req, res) => {
  console.log("get PDFegreso");
  data=[];
  console.log(req.params.NumeroExpediente+"Lo que recibe");
  db.query("select NumeroExpediente, idPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, MotivoEgreso, ResumenEgreso, ImpresionDiagnosticaEgreso, PronosticoEgreso, SugerenciasEgreso, ObservacionesEgreso from egreso, paciente, expediente where paciente.idPaciente=expediente.Paciente_idPaciente and expediente.NumeroExpediente=egreso.Expediente_NumeroExpediente and NumeroExpediente=?;", [req.params.NumeroExpediente], (err, rows) =>{
    var info_egreso=JSON.parse(JSON.stringify(rows[0]));
    console.log(info_egreso);
    if(err){
      res.status(500).json(err);
    }else{
      pdfs.Egreso(info_egreso, res);
    }
  });
}

exports.APIBuscarEgreso_Tratamiento = function(req, res){
        console.log(req.params.expediente);
        db.query("select expediente.NumeroExpediente, expediente.statusExpediente, paciente.idPaciente, concat(paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, paciente.SexoPaciente, date_format(paciente.FechaNacimientoPaciente,'%e/%m/%Y') as FechaNacimiento, Tratamiento.NombreTratamiento, tratamiento.TotalSesionesTratamiento, count(notatratamiento.Expediente_NumeroExpediente) as sesiones from expediente inner join paciente on paciente.idPaciente = expediente.Paciente_idPaciente inner join tratamiento on tratamiento.idTratamiento = expediente.Tratamiento_idTratamiento inner join notatratamiento on notatratamiento.Expediente_NumeroExpediente = expediente.NumeroExpediente where StatusExpediente='Activo' and Expediente.NumeroExpediente=?;", [req.params.expediente], function(err, rows){
          var egreso_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(egreso_paciente[0]);
          console.log(egreso_paciente);
        });
}


exports.egresofinalregistrar = (req, res) => {
      console.log('POST /egresofinalregistrar');
      params=[req.body.Fase, req.body.Motivo, req.body.Resumen, req.body.Impresion, req.body.Pronostico, req.body.Sugerencias, req.body.Observaciones, req.body.NoExpediente]
      console.log(params);
      db.query("insert into egreso (TipoEgreso, FaseEgreso, MotivoEgreso, ResumenEgreso, ImpresionDiagnosticaEgreso, PronosticoEgreso, SugerenciasEgreso, ObservacionesEgreso, Expediente_NumeroExpediente) values ('Alta por termino',?,?,?,?,?,?,?,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          parms=[req.body.NoExpediente]
          console.log(params);
          db.query("update expediente set StatusExpediente='Alta por termino' where numeroExpediente=?;", parms, (err, result) => {
              if(err){
                console.log(err);
              }else{
                console.log(result);
                console.log('success');
                res.redirect('/historialEgresos');
              }
          });

        }
      });
}


exports.APIBuscarEgreso_Final = function(req, res){
        console.log(req.params.expediente);
        db.query("select expediente.NumeroExpediente, statusExpediente, paciente.idPaciente, concat(Paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente from expediente, paciente where expediente.Paciente_idPaciente=paciente.idPaciente and statusExpediente='Activo' and expediente.NumeroExpediente=?;", [req.params.expediente], function(err, rows){
          var egreso_Final = JSON.parse(JSON.stringify(rows));
          res.status(200).json(egreso_Final[0]);
          console.log(egreso_Final);
        });
}

exports.citasagendar = (req, res) => {
  res.render('psicologo/citasagendar')
}

exports.citapsicologoregistrar = (req, res) => {
      console.log('POST /registraCitaPsicologo');
      params=[req.body.Fecha, req.body.Hora, req.body.Observaciones, req.body.idPaciente]
      console.log(params);
      db.query("insert into agendacitas (FechaAgendaCitas, HoraAgendaCitas, AreaAgendaCitas, ObservacionesAgendaCitas, HoraLlegadAgendaCitas, HoraEntradaAgendaCitas, HoraSalidaAgendaCitas, Paciente_idPaciente) values (?,?,'Psicologia',?,null,null,null,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
          res.redirect('/tratamientoPrincipal');
        }
      });
}


exports.APIBuscarPaciente_cita = function(req, res){
        console.log(req.params.identificador);
        db.query("select idPaciente, concat(nombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, idTratamiento, NombreTratamiento, NumeroExpediente, statusExpediente from paciente, tratamiento, expediente where paciente.idPaciente=expediente.Paciente_idPaciente and tratamiento.idTratamiento=expediente.Tratamiento_idTratamiento and statusExpediente='activo' and idPaciente=?;", [req.params.identificador], function(err, rows){
          var paciente_cita = JSON.parse(JSON.stringify(rows));
          res.status(200).json(paciente_cita[0]);
          console.log(paciente_cita);
        });
}



exports.registroEgresos = (req, res) => {
      tipoEgreso=req.body.Tipo;
      console.log(tipoEgreso);
      data={}
      if(tipoEgreso=='Alta voluntaria'){
        db.query("update expediente set StatusExpediente='Alta voluntaria' where numeroExpediente=?;", req.body.NoExpediente, (err, rows) =>{
          if(err){
            console.log(err);
          }else{
            //var ventana;
            open('app/assets/instrumentos/CARTA DE EGRESO VOLUNTARIO.pdf', (err) => {
              if(err){
                console.log(err);
              }else{
                res.redirect('/tratamientoPrincipal');
              }
            });
            //ventana = window.open('/../instrumentos/CARTA DE EGRESO VOLUNTARIO.pdf');
            //res.render("window.open('/../instrumentos/CARTA DE EGRESO VOLUNTARIO.pdf')");
          }
        });
      }else{
        db.query("update expediente set StatusExpediente='Alta por termino' where numeroExpediente=?;", req.body.NoExpediente, (err, rows) =>{
          if(err){
            console.log(err);
          }else{
            console.log(req.body.NoExpediente);
            db.query("select expediente.NumeroExpediente, statusExpediente, paciente.idPaciente, concat(Paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente from expediente, paciente where expediente.Paciente_idPaciente=paciente.idPaciente and expediente.NumeroExpediente=?;", req.body.NoExpediente, (err, rows) => {
              data['inforExpediente']=JSON.parse(JSON.stringify(rows[0]));
              if(err){
                console.log(err);
              }else{
                res.render('psicologo/egresofinal', data);
              }
            });
          }
        });
      }
}
