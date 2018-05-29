const db = require('../../config/database');
const fs = require('fs');

exports.instrumentosprincipal = (req, res) => {
  res.render('coordinador/instrumentosprincipal')
}


exports.registroempleado = (req, res) => {
  res.render('coordinador/registrarempleado')
}

exports.registrarempleado = (req, res) => {
      console.log('POST /agregarEmpleado');
      params=[req.body.Nombre, req.body.ApPaterno, req.body.ApMaterno, req.body.Sexo, req.body.Telefono, req.body.Puesto]
      console.log(params);
      db.query("insert into Actor (NombreActor, ApellidoPaternoActor, ApellidoMaternoActor, SexoActor, TelefonoActor, PuestoActor) values (?,?,?,?,?,?);", params, function(err, rows){
        if(err){
          console.log(err);
        }else{
          console.log('success');
          res.redirect('/verEmpleados');
        }
      });
}

exports.verempleados = (req, res) => {
        db.query("select idActor, concat(NombreActor,' ', ApellidoPaternoActor, ' ', ApellidoMaternoActor) as nombre, SexoActor, TelefonoActor, PuestoActor from actor where PuestoActor!='coordinador';", function(err, rows){
            var usuarios = JSON.parse(JSON.stringify(rows));
                  // console.log(usuarios)
            res.render('coordinador/verempleados', {usuarios: usuarios});
        });
}

exports.editarinformacion = (req, res) => {
  console.log('GET /edit_empleado/:id');
  console.log(req.params.idActor);
  data = {}
  db.query("select * from actor where PuestoActor!='coordinador'", (err, rows) =>{
      data['puesto'] = JSON.parse(JSON.stringify(rows));
      db.query("select idActor, NombreActor, ApellidoPaternoActor, ApellidoMaternoActor, SexoActor, TelefonoActor, PuestoActor from actor where idActor=?;",[req.params.idActor], function(err, rows){
          data['empleado'] = JSON.parse(JSON.stringify(rows[0]));
          res.render('coordinador/editarinformacion', data);
          console.log(data);
    });
  });
}

exports.updateEmpleado = (req, res) =>{
  console.log('PUT /empleado/editar/:id_empleado');

  parms = [req.body.Nombre,req.body.ApPaterno,req.body.ApMaterno,req.body.Sexo,req.body.Telefono,req.body.Puesto,req.body.idA];
  console.log(parms);
  db.query("update actor set NombreActor=?, ApellidoPaternoActor=?, ApellidoMaternoActor=?, SexoActor=?, TelefonoActor=?, PuestoActor=? where idActor=?;", parms, (err, result) => {
      console.log(err);
      console.log(result);
      res.redirect('/verEmpleados');
  });
}
