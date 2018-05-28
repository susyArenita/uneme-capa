function buscarCita(form){
  agenda = form.Fecha.value || "";
  alert(agenda);
  if(agenda != ""){
    $.get('/../api/agenda/'+agenda, function(data, status){
      data.forEach(function(element, index){
        agenda += `
          <tr class="row">
            <td>
              ${element.idAgenda}
            </td>
            <td>
              ${element.Fecha}
            </td>
            <td>
              ${element.HoraAgendaCitas}
            </td>
            <td>
              ${element.Nombre}
            </td>
            <td>
              ${element.AreaAgendaCitas}
            </td>
            <td>
              <a href="/detallescita${element.idAgenda}">
                Detalles </a>
            </td>
          </tr>
          `;
      });
      $('#body_agendacitas').html(agenda);
    });
  }else{
    window.location('/citasprincipal');
  }
  return false;
}



$(document).ready(function(){
  $('.paciente_agenda').modal({opacity: .7});
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});

function getPaciente(form){
  paciente = form.idPaciente.value;
  alert(paciente);
  $.get('/../api/agenda/buscar/paciente/'+paciente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        Paciente = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarPaciente(${data.idPaciente},'${data.nombrePaciente}','${data.TelefonoPaciente}',${data.NumeroExpediente});">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Telefono: </strong>
          <span>${data.TelefonoPaciente} </span>
          <br>
        </div>
      </li>`;
    $('#paciente_list').html(Paciente);
      }
  });
  return false;
}
function seleccionarPaciente(idPaciente, Nombre, Telefono, NoExpediente){
    $('#idPaciente').val(idPaciente);
    $('#NombrePaciente').val(Nombre);
    $('#Telefono').val(Telefono);
    $('#NoExpediente').val(NoExpediente);
    $('#paciente_agenda').modal('close');
}




$(document).ready(function(){
  $('.reasignar_psicologo').modal({opacity: .7});
});

function getPsicologo(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/psicologo/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        psicologo = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarPsicologo(${data.NumeroExpediente},'${data.nombrePaciente}','${data.NombreTratamiento}','${data.NombreActor}',${data.sesiones},'${data.TotalSesionesTratamiento}',${data.idActor});">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Nombre paciente: </strong>
          <span>${data.nombrePaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Tratamiento: </strong>
          <span>${data.NombreTratamiento} </span>
          <br>
        </div>
      </li>`;
    $('#psicologo_list').html(psicologo);
      }
  });
  return false;
}
function seleccionarPsicologo(NoExpediente, NombrePaciente, Tratamiento, Psicologo, Avances, TotalSesiones, idPsico){
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(NombrePaciente);
    $('#Tratamiento').val(Tratamiento);
    $('#PsicologoActual').val(Psicologo);
    $('#Avances').val(Avances);
    $('#TotalSesiones').val(TotalSesiones);
    $('#idPsico').val(idPsico);    
    $('#reasignar_psicologo').modal('close');
}
