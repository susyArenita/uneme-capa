const db = require('../../config/database');

exports.agendarcitasprincipal = (req, res) => {
  db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as Fecha, HoraAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, AreaAgendaCitas from agendacitas, paciente where agendacitas.Paciente_idPaciente=paciente.idPaciente and FechaAgendaCitas=curdate();", function(err, rows){
      var agenda = JSON.parse(JSON.stringify(rows));
            // console.log(usuarios)
      res.render('recepcionista/agendarcitasprincipal', {agenda: agenda});
  });
}

exports.APIBuscarAgenda = function(req, res){
            console.log(req.params.FechaAgendaCitas);
            db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as Fecha, HoraAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, AreaAgendaCitas from agendacitas, paciente where agendacitas.Paciente_idPaciente=paciente.idPaciente and FechaAgendaCitas=?;", [req.params.agenda], function(err, rows){
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
    db.query("select idAgenda, date_format(FechaAgendaCitas,'%Y/%m/%d') as Fecha, HoraAgendaCitas, ObservacionesAgendaCitas, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente, ' ') as Nombre, TelefonoPaciente, AreaAgendaCitas, HoraLlegadAgendaCitas, HoraEntradaAgendaCitas, HoraSalidaAgendaCitas from agendacitas, paciente where agendacitas.Paciente_idPaciente=paciente.idPaciente and idAgenda=?;",[req.params.idAgenda], function(err, rows){
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
  db.query("update agendacitas set AreaAgendaCitas=?, FechaAgendaCitas=?, HoraAgendaCitas=?, ObservacionesAgendaCitas=?, HoraLlegadAgendaCitas=?, HoraEntradaAgendaCitas=?, HoraSalidaAgendaCitas=? where idAgenda=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/citasprincipal');
  });
}

exports.citarecepcionregistrar = (req, res) => {
      console.log('POST /registraCitaRecepcion');
      params=[req.body.Fecha, req.body.Hora, req.body.Area, req.body.Observaciones, req.body.idPaciente]
      console.log(params);
      db.query("insert into agendacitas (FechaAgendaCitas, HoraAgendaCitas, AreaAgendaCitas, ObservacionesAgendaCitas, HoraLlegadAgendaCitas, HoraEntradaAgendaCitas, HoraSalidaAgendaCitas, Paciente_idPaciente) values (?,?,?,?,null,null,null,?);", params, function(err, rows){
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
        db.query("select idPaciente, concat(NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, TelefonoPaciente, NumeroExpediente, StatusExpediente from paciente, expediente where paciente.idPaciente=expediente.Paciente_idPaciente and StatusExpediente='activo' and idPaciente=?;", [req.params.paciente], function(err, rows){
          var agenda_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(agenda_paciente[0]);
          console.log(agenda_paciente);
        });
}


exports.reasignarpsicologo = (req, res) => {
  db.query("select idActor, concat(NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as nombreActor, puestoActor from actor where PuestoActor='psicologo';", function(err, rows){
    var psicologos = JSON.parse(JSON.stringify(rows));
    res.render('recepcionista/reasignarpsicologo', {psicologos: psicologos, messages: req.flash('info')});
    //res.render('administrador/empleado', {roles: roles, messages: req.flash('info')});

    //res.status(200).json(psicologos[0]);
    //console.log(psicologos);
  });
}


exports.APIBuscarPsicologo = function(req, res){
        console.log(req.params.expediente);
        db.query("select expediente.NumeroExpediente, expediente.StatusExpediente, paciente.idPaciente, concat(paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, tratamiento.NombreTratamiento, tratamiento.TotalSesionesTratamiento, count(notatratamiento.Expediente_NumeroExpediente) as sesiones, actor.idActor, concat(actor.NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as NombreActor from expediente inner join paciente on paciente.idPaciente=expediente.Paciente_idPaciente inner join tratamiento on tratamiento.idTratamiento = expediente.Tratamiento_idTratamiento inner join notatratamiento on notatratamiento.Expediente_NumeroExpediente = expediente.NumeroExpediente inner join expediente_has_actor on expediente.NumeroExpediente=expediente_has_actor.Expediente_NumeroExpediente inner join actor on expediente_has_actor.Actor_idActor=actor.idActor where actor.PuestoActor='Psicologo' and expediente.StatusExpediente='Activo' and expediente.NumeroExpediente =?;", [req.params.expediente], function(err, rows){
          var info_psicologo = JSON.parse(JSON.stringify(rows));
          res.status(200).json(info_psicologo[0]);
          console.log(info_psicologo);
        });
}


exports.updatePsicologo = (req, res) =>{
  console.log("Entro a actualizar psicologo");
  parms = [req.body.psico,req.body.NoExpediente,req.body.idPsico];
  console.log(parms);
  db.query("update expediente_has_actor set actor_idActor=? where expediente_NumeroExpediente=? and actor_idActor=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/citasprincipal');
  });
}
