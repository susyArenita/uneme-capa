$(document).ready(function(){
   $('.collapsible').collapsible();
   $('.modal').modal({opacity: 0.8});
});


$(function(){
   $('.stepper').activateStepper({
     // showFeedbackLoader: true,
     linearStepsNavigation: false
   });
   solucion = $('#solucion');
   solucion.change( function(){
   //alert($("#solucion").is(':checked'));
   setSolucion(solucion.is(':checked'));
 });
   setSolucion(solucion.is(':checked'));
});


function getInfo(input){
  NoExpediente = input.value;
  $.get('/../api/expediente/buscar/numero/' + NoExpediente, function(data, status){
    expedientes="";
    data.forEach( function(element, index) {
      expedientes += `<li>
                <div class="collapsible-header">
                  <i class="material-icons left">
                    arrow_rop_down_circle
                  </i>
                  ${element.nombre}
                  <a href="/seguimientodetalles/${element.idNotaSeguimiento}">
                    <i class="material-icons right blue-text tooltipped" data-position="top" data-delay="50" data-tooltip="Ver informacion">
                      edit
                    </i>
                  </a>
                </div>
                <div class="collapsible-body">
                  <strong> Id nota seguimiento: </strong>
                  <span>${element.idNotaSeguimiento} </span>
                  <br>
                  <strong> Fecha: </strong>
                  <span>${element.FechaNotaSeguimiento} </span>
                  <br>
                  <strong> Resumen: </strong>
                  <span>${element.ResumenNotaSeguimiento} </span>
                  <br>
                </div>
              </li>`;
    });
    if(expedientes == ""){
      $('#empleados_list').html("<p class='red-text center'> No se encontraron resultados</p>");
    }else{
      $('#empleados_list').html(expedientes);
    }

    $('.stepper').resetStepper(2);
  });
  return false;
}
