
$(document).ready(function(){
  $('.consultas_paciente').modal({opacity: .7});
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});

function getConsultas(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/consultas/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        consultas = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarConsultas(${data.NumeroExpediente},'${data.nombrePaciente}','${data.NombreTratamiento}','${data.NombreActor}',${data.sesiones},'${data.TotalSesionesTratamiento}');">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Tratamiento: </strong>
          <span>${data.NombreTratamiento} </span>
          <br>
        </div>
      </li>`;
    $('#consultas_list').html(consultas);
      }
  });
  $.get('/../api/consultaPaciente/'+expediente, function(data, status){
    consultasPaciente='';
    data.forEach(function(element, index){
      consultasPaciente += `
        <tr class="row">
          <td>
            ${element.FechaAgenda}
          </td>
          <td>
            ${element.HoraAgendaCitas}
          </td>
          <td>
            ${element.AreaAgendaCitas}
          </td>
          <td>
            ${element.ObservacionesAgendaCitas}
          </td>
        </tr>
        `;
    });
    $('#body_consultas').html(consultasPaciente);
  });
  return false;
}
function seleccionarConsultas(NoExpediente, NombrePaciente, Tratamiento, Psicologo, Avances, TotalSesiones){
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(NombrePaciente);
    $('#Tratamiento').val(Tratamiento);
    $('#Psicologo').val(Psicologo);
    $('#Avances').val(Avances);
    $('#TotalSesiones').val(TotalSesiones);
    $('#consultas_paciente').modal('close');
}
