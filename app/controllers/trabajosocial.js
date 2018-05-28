const db = require('../../config/database');
var pdfs =require('./pdfs');

exports.notaseguimientoprincipal = (req, res) => {
        db.query("select idNotaSeguimiento, date_format(FechaNotaSeguimiento,'%e/%m/%Y') as FechaNota, HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from NotaSeguimiento;", function(err, rows){
            var seguimiento = JSON.parse(JSON.stringify(rows));
                  // console.log(usuarios)
            res.render('TrabajoSocial/notaseguimientoprincipal', {seguimiento: seguimiento});
        });
}


exports.APIBuscarFolio = function(req, res){
            db.query("select idNotaSeguimiento, date_format(FechaNotaSeguimiento,'%e/%m/%Y') as FechaNota, HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from NotaSeguimiento where Expediente_NumeroExpediente=?;", [req.params.folio], function(err, rows){
              var seguimientos = JSON.parse(JSON.stringify(rows));
              res.status(200).json(seguimientos);
              console.log(seguimientos);
            });
}


exports.notaseguimientodetalles = (req, res) => {
  console.log('GET /notaseguimientodetalles/:id');
  data = {}
  //db.query("select * from Actor where PuestoActor!='coordinador'", (err, rows) =>{
    //  data['puesto'] = JSON.parse(JSON.stringify(rows));
    //db.query("select idNotaSeguimiento, FechaNotaSeguimiento, HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from notaseguimiento where idNotaSeguimiento=?;",[req.params.idNotaSeguimiento], function(err, rows){
    db.query("select NumeroExpediente, idPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, idNotaSeguimiento, date_format(FechaNotaSeguimiento,'%e/%m/%Y') as FechaNota, time_format(HoraNotaSeguimiento,'%h:%i %p') as HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from Paciente, NotaSeguimiento, Expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and NotaSeguimiento.Expediente_NumeroExpediente=Expediente.NumeroExpediente and idNotaSeguimiento=?;",[req.params.idNotaSeguimiento], function(err, rows){
        data['nota_seguimiento'] = JSON.parse(JSON.stringify(rows[0]));
        res.render('TrabajoSocial/notaseguimientodetalles', data);
        console.log(data);
    });
  //});
  //res.render('TrabajoSocial/notaseguimientodetalles');
}


exports.PDFseguimiento = (req, res) => {
  data=[];
  db.query("select NumeroExpediente, idPaciente, timestampdiff(year,FechaNacimientoPaciente,CURDATE()) as Edad, SexoPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, idNotaSeguimiento, date_format(FechaNotaSeguimiento,'%e/%m/%Y') as FechaNota, time_format(HoraNotaSeguimiento,'%h:%i %p') as HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento from Paciente, NotaSeguimiento, Expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and NotaSeguimiento.Expediente_NumeroExpediente=Expediente.NumeroExpediente and idNotaSeguimiento=?;", [req.params.idNotaSeguimiento], (err, rows) =>{
    var Info_Seguimiento=JSON.parse(JSON.stringify(rows[0]));
    if(err){
      res.status(500).json(err);
    }else{
      pdfs.NotaSeguimiento(Info_Seguimiento, res);
    }
  });
}


exports.notaseguimientoregistro = (req, res) => {
  res.render('TrabajoSocial/notaseguimientoregistro');
}

exports.notaseguimientoregistrar = (req, res) => {
      console.log('POST /registraNotaSeguimiento');
      params=[req.body.Resumen, req.body.Diagnostico, req.body.Pronostico, req.body.NoExpediente]
      console.log(params);
      db.query("insert into notaseguimiento (FechaNotaSeguimiento, HoraNotaSeguimiento, ResumenNotaSeguimiento, DiagnosticoNotaSeguimiento, PronosticoNotaSeguimiento, Expediente_NumeroExpediente) values (NOW(),CURRENT_TIME(),?,?,?,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
          res.redirect('/seguimientoprincipal');
        }
      });
}


exports.APIBuscarExpediente_Paciente = function(req, res){
        console.log(req.params.expediente);
        db.query("select idPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, TelefonoPaciente, NumeroExpediente from paciente, expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and statusExpediente='activo' and NumeroExpediente=?;", [req.params.expediente], function(err, rows){
          var expediente_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(expediente_paciente[0]);
          console.log(expediente_paciente);
        });
}

exports.APIBuscarExpediente = function(req, res){
          db.query("select NumeroExpediente, idPaciente, concat(NombrePaciente,' ', ApellidoPaternoPaciente,' ',ApellidoMaternoPaciente) as nombre, idNotaSeguimiento, FechaNotaSeguimiento, ResumenNotaSeguimiento from Paciente, NotaSeguimiento, Expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and NotaSeguimiento.Expediente_NumeroExpediente=Expediente.NumeroExpediente and NumeroExpediente=?;", [req.params.NoExpediente], function(err, rows){
            var notaseguimiento = JSON.parse(JSON.stringify(rows));
            res.status(200).json(notaseguimiento);
          });
}
