const db = require('../../config/database');

exports.agendarcitasprincipal = (req, res) => {
  db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as Fecha, HoraAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, AreaAgendaCitas from agendaCitas, Paciente where AgendaCitas.Paciente_idPaciente=Paciente.idPaciente and FechaAgendaCitas=curdate();", function(err, rows){
      var agenda = JSON.parse(JSON.stringify(rows));
            // console.log(usuarios)
      res.render('recepcionista/agendarcitasprincipal', {agenda: agenda});
  });
}

exports.APIBuscarAgenda = function(req, res){
            console.log(req.params.FechaAgendaCitas);
            db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as Fecha, HoraAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, AreaAgendaCitas from agendaCitas, Paciente where AgendaCitas.Paciente_idPaciente=Paciente.idPaciente and FechaAgendaCitas=?;", [req.params.agenda], function(err, rows){
              if(err){
                console.log(err);
              }else{
                var agenda = JSON.parse(JSON.stringify(rows));
                res.status(200).json(agenda);

                console.log(agenda);
              }
            });
}

exports.agendarcitasdetalles = (req, res) => {
  console.log('GET /detallescita/:id');
  console.log(req.params.idAgenda);
  data = {}
    db.query("select idAgenda, date_format(FechaAgendaCitas,'%Y/%m/%d') as Fecha, HoraAgendaCitas, ObservacionesAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, TelefonoPaciente, AreaAgendaCitas, HoraLlegadAgendaCitas, HoraEntradaAgendaCitas, HoraSalidaAgendaCitas from AgendaCitas, Paciente where AgendaCitas.Paciente_idPaciente=Paciente.idPaciente and idAgenda=?;",[req.params.idAgenda], function(err, rows){
        data['citaR'] = JSON.parse(JSON.stringify(rows[0]));
        res.render('recepcionista/agendarcitasdetalles', data);
        console.log(data);
    });
}

exports.updatecitar = (req, res) =>{
  console.log('PUT /agenda/actualizar/:idAgenda');
  console.log(req.params.idAgenda+" "+req.body.idAgenda);
  parms = [req.body.Area,req.body.Fecha,req.body.Hora,req.body.Observaciones,req.body.Llegada,req.body.Entrada,req.body.Salida,req.body.idAgenda];
  console.log(parms);
  db.query("update AgendaCitas set AreaAgendaCitas=?, FechaAgendaCitas=?, HoraAgendaCitas=?, ObservacionesAgendaCitas=?, HoraLlegadAgendaCitas=?, HoraEntradaAgendaCitas=?, HoraSalidaAgendaCitas=? where idAgenda=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/citasprincipal');
  });
}

exports.citarecepcionregistrar = (req, res) => {
      console.log('POST /registraCitaRecepcion');
      params=[req.body.Fecha, req.body.Hora, req.body.Area, req.body.Observaciones, req.body.idPaciente]
      console.log(params);
      db.query("insert into AgendaCitas (FechaAgendaCitas, HoraAgendaCitas, AreaAgendaCitas, ObservacionesAgendaCitas, HoraLlegadAgendaCitas, HoraEntradaAgendaCitas, HoraSalidaAgendaCitas, Paciente_idPaciente) values (?,?,?,?,null,null,null,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
          res.redirect('/citasprincipal');
        }
      });
}


exports.agendarcitas = (req, res) => {
  res.render('recepcionista/agendarcitas');
}


exports.APIBuscarAgenda_Paciente = function(req, res){
        console.log(req.params.paciente);
        db.query("select idPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, TelefonoPaciente, NumeroExpediente, StatusExpediente from Paciente, Expediente where Paciente.idPaciente=Expediente.Paciente_idPaciente and StatusExpediente='activo' and idPaciente=?;", [req.params.paciente], function(err, rows){
          var agenda_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(agenda_paciente[0]);
          console.log(agenda_paciente);
        });
}


exports.reasignarpsicologo = (req, res) => {
  db.query("select idActor, concat(NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as nombreActor, puestoActor from Actor where PuestoActor='psicologo';", function(err, rows){
    var psicologos = JSON.parse(JSON.stringify(rows));
    res.render('recepcionista/reasignarpsicologo', {psicologos: psicologos, messages: req.flash('info')});
    //res.render('administrador/empleado', {roles: roles, messages: req.flash('info')});

    //res.status(200).json(psicologos[0]);
    //console.log(psicologos);
  });
}


exports.APIBuscarPsicologo = function(req, res){
        console.log(req.params.expediente);
        db.query("select Expediente.NumeroExpediente, Expediente.StatusExpediente, Paciente.idPaciente, concat(Paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, Tratamiento.NombreTratamiento, Tratamiento.TotalSesionesTratamiento, count(NotaTratamiento.Expediente_NumeroExpediente) as sesiones, Actor.idActor, concat(Actor.NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as NombreActor from Expediente inner join Paciente on Paciente.idPaciente=Expediente.Paciente_idPaciente inner join Tratamiento on Tratamiento.idTratamiento = Expediente.Tratamiento_idTratamiento inner join NotaTratamiento on NotaTratamiento.Expediente_NumeroExpediente = Expediente.NumeroExpediente inner join Expediente_has_Actor on Expediente.NumeroExpediente=Expediente_has_Actor.Expediente_NumeroExpediente inner join Actor on Expediente_has_Actor.Actor_idActor=Actor.idActor where Actor.PuestoActor='Psicologo' and Expediente.StatusExpediente='Activo' and Expediente.NumeroExpediente =?;", [req.params.expediente], function(err, rows){
          var info_psicologo = JSON.parse(JSON.stringify(rows));
          res.status(200).json(info_psicologo[0]);
          console.log(info_psicologo);
        });
}


exports.updatePsicologo = (req, res) =>{
  console.log("Entro a actualizar psicologo");
  parms = [req.body.psico,req.body.NoExpediente,req.body.idPsico];
  console.log(parms);
  db.query("update Expediente_has_Actor set Actor_idActor=? where Expediente_NumeroExpediente=? and Actor_idActor=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/citasprincipal');
  });
}
