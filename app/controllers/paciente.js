const db = require('../../config/database');

exports.APIBuscarExpediente_Consultas = function(req, res){
        console.log(req.params.expediente);
        db.query("select expediente.NumeroExpediente, expediente.StatusExpediente, paciente.idPaciente, concat(paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, tratamiento.NombreTratamiento, tratamiento.TotalSesionesTratamiento, count(notatratamiento.Expediente_NumeroExpediente) as sesiones, actor.idActor, concat(actor.NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as NombreActor from expediente inner join paciente on paciente.idPaciente=expediente.Paciente_idPaciente inner join tratamiento on tratamiento.idTratamiento = expediente.Tratamiento_idTratamiento inner join notatratamiento on notatratamiento.Expediente_NumeroExpediente = expediente.NumeroExpediente inner join expediente_has_actor on expediente.NumeroExpediente=expediente_has_actor.Expediente_NumeroExpediente inner join actor on expediente_has_actor.Actor_idActor=actor.idActor where actor.PuestoActor='Psicologo' and expediente.StatusExpediente='Activo' and expediente.NumeroExpediente =?;", [req.params.expediente], function(err, rows){
          var consultas_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(consultas_paciente[0]);
          console.log(consultas_paciente);
        });
}


exports.APIBuscarConsultas = function(req, res){
            db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as FechaAgenda, HoraAgendaCitas, AreaAgendaCitas, ObservacionesAgendaCitas, idPaciente, NumeroExpediente, StatusExpediente from agendacitas, paciente, expediente where agendacitas.Paciente_idPaciente=paciente.idPaciente and paciente.idPaciente=expediente.Paciente_idPaciente and FechaAgendaCitas>=CURDATE() and StatusExpediente='Activo' and NumeroExpediente=?;", [req.params.expediente], function(err, rows){
              var citaspaciente = JSON.parse(JSON.stringify(rows));
              res.status(200).json(citaspaciente);
              console.log(citaspaciente);
            });
}
