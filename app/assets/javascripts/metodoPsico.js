function buscarTratamiento(form){
  expediente = form.NoExpediente.value || "";
  alert(expediente);
  if(expediente != ""){
    $.get('/../api/expediente/'+expediente, function(data, status){
      data.forEach(function(element, index){
        expediente += `
          <tr class="row">
            <td>
              ${element.idNotaSeguimiento}
            </td>
            <td>
              ${element.FechaNota}
            </td>
            <td>
              ${element.NumeroSesionNotaTratamiento}
            </td>
            <td>
              ${element.ResumenNotaTratamiento}
            </td>
            <td>
              <a href="/tratamientodetalles${element.idNotaSeguimiento}">
                Ver detalles </a>
            </td>
          </tr>
          `;
      });
      $('#body_tratamiento').html(expediente);
    });
  }else{
    window.location('/historial');
  }
  return false;
}




$(document).ready(function(){
  $('.expediente_tratamiento').modal({opacity: .7});
});

$(document).ready(function(){
  $('.collapsible').collapsible();
});

function getExpediente(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/DatosPaciente/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        DatosPaciente = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarPaciente(${data.NumeroExpediente},'${data.nombrePaciente}','${data.Edad}','${data.SexoPaciente}');">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Sexo: </strong>
          <span>${data.SexoPaciente} </span>
          <br>
        </div>
      </li>`;
    $('#expediente_list').html(DatosPaciente);
      }
  });
  return false;
}
function seleccionarPaciente(NoExpediente, Nombre, Edad, Sexo){
    alert(NoExpediente);
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(Nombre);
    $('#Edad').val(Edad);
    $('#Sexo').val(Sexo);
    $('#expediente_tratamiento').modal('close');
}




$(document).ready(function(){
  $('.paciente_cita').modal({opacity: .7});
});

function getCita(form){
  identificador = form.idPaciente.value;
  alert(identificador);
  $.get('/../api/cita/buscar/paciente/'+identificador, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        PacienteCita = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarPacienteCita(${data.idPaciente},'${data.nombrePaciente}','${data.NombreTratamiento}',${data.NumeroExpediente});">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Expediente: </strong>
          <span>${data.statusExpediente} </span>
          <br>
        </div>
      </li>`;
    $('#cita_list').html(PacienteCita);
      }
  });
  return false;
}
function seleccionarPacienteCita(idPaciente, nombrePaciente, NombreTratamiento, NoExpediente){
    $('#idPaciente').val(idPaciente);
    $('#NombrePaciente').val(nombrePaciente);
    $('#Tratamiento').val(NombreTratamiento);
    $('#NoExpediente').val(NoExpediente);
    $('#paciente_cita').modal('close');
}


$(document).ready(function(){
  $('.tratamiento_clinico').modal({opacity: .7});
});

function getTratamiento(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/tratamiento/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        Tratamiento = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarTratamiento(${data.NumeroExpediente},'${data.statusExpediente}','${data.nombrePaciente}','${data.SexoPaciente}','${data.Edad}','${data.NombreTratamiento}',${data.sesiones},'${data.TotalSesionesTratamiento}');">
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
    $('#tratamiento_list').html(Tratamiento);
      }
  });
  return false;
}
function seleccionarTratamiento(NoExpediente, statusPaciente, NombrePaciente, Sexo, Edad, Tratamiento, Avances, TotalSesiones){
    $('#NoExpediente').val(NoExpediente);
    $('#Status').val(statusPaciente);
    $('#NombrePaciente').val(NombrePaciente);
    $('#Sexo').val(Sexo);
    $('#Edad').val(Edad);
    $('#Tratamiento').val(Tratamiento);
    $('#Avances').val(Avances);
    $('#TotalSesiones').val(TotalSesiones);
    $('#tratamiento_clinico').modal('close');
}


$(document).ready(function(){
  $('.egreso_tratamiento').modal({opacity: .7});
});

function getEgreso(form){
  expediente = form.NoExpediente.value;
  alert(expediente);
  $.get('/../api/expediente/buscar/egreso/'+expediente, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        Tratamiento = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarEgreso(${data.NumeroExpediente},'${data.nombrePaciente}','${data.NombreTratamiento}',${data.sesiones},'${data.TotalSesionesTratamiento}');">
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
    $('#egreso_list').html(Tratamiento);
      }
  });
  return false;
}
function seleccionarEgreso(NoExpediente, NombrePaciente, Tratamiento, Avances, TotalSesiones){
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(NombrePaciente);
    $('#Tratamiento').val(Tratamiento);
    $('#Avances').val(Avances);
    $('#TotalSesiones').val(TotalSesiones);
    $('#egreso_tratamiento').modal('close');
}


$(document).ready(function(){
  $('.egreso_final').modal({opacity: .7});
});

function getEgresoFinal(form){
  ExpedienteInfo = form.NoExpediente.value;
  alert(ExpedienteInfo);
  $.get('/../api/expediente/buscar/egresoFinal/'+ExpedienteInfo, function(data, status){
      if(data.nombrePaciente == " "){
        alert("El numero de expediente no se encuentra registrado");
      }else {
        EgresoF = `<li>
        <div class="collapsible-header">
          <i class="material-icons left">
            account_circle
          </i>
          ${data.nombrePaciente}
          <i class="material-icons right" onclick="seleccionarEgresoFinal(${data.NumeroExpediente},'${data.nombrePaciente}');">
            add_circle
          </i>
        </div>
        <div class="collapsible-body">
          <strong style="font-weight: bold;"> ID paciente: </strong>
          <span>${data.idPaciente} </span>
          <br>
          <strong style="font-weight: bold;"> Expediente: </strong>
          <span>${data.statusExpediente} </span>
          <br>
        </div>
      </li>`;
    $('#egresoFinal_list').html(EgresoF);
      }
  });
  return false;
}
function seleccionarEgresoFinal(NoExpediente, NombrePaciente){
    $('#NoExpediente').val(NoExpediente);
    $('#NombrePaciente').val(NombrePaciente);
    $('#egreso_final').modal('close');
}
