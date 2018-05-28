const db = require('../../config/database');

exports.APIBuscarExpediente_Consultas = function(req, res){
        console.log(req.params.expediente);
        db.query("select Expediente.NumeroExpediente, Expediente.StatusExpediente, Paciente.idPaciente, concat(Paciente.NombrePaciente, ' ', ApellidoPaternoPaciente, ' ', ApellidoMaternoPaciente) as nombrePaciente, Tratamiento.NombreTratamiento, Tratamiento.TotalSesionesTratamiento, count(NotaTratamiento.Expediente_NumeroExpediente) as sesiones, Actor.idActor, concat(Actor.NombreActor, ' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as NombreActor from Expediente inner join Paciente on Paciente.idPaciente=Expediente.Paciente_idPaciente inner join Tratamiento on Tratamiento.idTratamiento = Expediente.Tratamiento_idTratamiento inner join NotaTratamiento on NotaTratamiento.Expediente_NumeroExpediente = Expediente.NumeroExpediente inner join Expediente_has_Actor on Expediente.NumeroExpediente=Expediente_has_Actor.Expediente_NumeroExpediente inner join Actor on Expediente_has_Actor.Actor_idActor=Actor.idActor where Actor.PuestoActor='Psicologo' and Expediente.StatusExpediente='Activo' and Expediente.NumeroExpediente =?;", [req.params.expediente], function(err, rows){
          var consultas_paciente = JSON.parse(JSON.stringify(rows));
          res.status(200).json(consultas_paciente[0]);
          console.log(consultas_paciente);
        });
}


exports.APIBuscarConsultas = function(req, res){
            db.query("select idAgenda, date_format(FechaAgendaCitas,'%e/%m/%Y') as FechaAgenda, HoraAgendaCitas, AreaAgendaCitas, ObservacionesAgendaCitas, idPaciente, NumeroExpediente, StatusExpediente from AgendaCitas, Paciente, Expediente where AgendaCitas.Paciente_idPaciente=Paciente.idPaciente and Paciente.idPaciente=Expediente.Paciente_idPaciente and FechaAgendaCitas>=CURDATE() and StatusExpediente='Activo' and NumeroExpediente=?;", [req.params.expediente], function(err, rows){
              var citaspaciente = JSON.parse(JSON.stringify(rows));
              res.status(200).json(citaspaciente);
              console.log(citaspaciente);
            });
}
