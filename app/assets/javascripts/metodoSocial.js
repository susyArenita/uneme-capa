function buscarSeguimiento(form){
  folio = form.NoExpediente.value || "";
  //alert(folio);
  if(folio != ""){
    $.get('/../api/folio/'+folio, function(data, status){
      data.forEach(function(element, index){
        folio += `
          <tr class="row">
            <td>
              ${element.idNotaSeguimiento}
            </td>
            <td>
              ${element.FechaNota}
            </td>
            <td>
              ${element.HoraNotaSeguimiento}
            </td>
            <td>
              ${element.ResumenNotaSeguimiento}
            </td>
            <td>
              <a href="/seguimientodetalles${element.idNotaSeguimiento}">
                Ver detalles </a>
            </td>
          </tr>
          `;
      });
      $('#body_seguimiento').html(folio);
    });
  }else{
    window.location('/seguimientoprincipal');
  }
  return false;
}



$(document).ready(function(){
  $('.expediente_seguimiento').modal({opacity: .7});
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});

function getExpediente(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/paciente/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        Paciente = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarPaciente(${data.NumeroExpediente},'${data.nombrePaciente}');">
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
    $('#expediente_list').html(Paciente);
      }
  });
  return false;
}
function seleccionarPaciente(NoExpediente, Nombre){
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(Nombre);
    $('#expediente_seguimiento').modal('close');
}
