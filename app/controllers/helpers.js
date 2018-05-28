const db = require('../../config/database');

exports.index = function(req, res) {
        console.log('GET /');
        console.log(req.user);
        console.log(req.user.cat_roles_idRol);
        db.query("select NombreRol from cat_roles where idRol=?",[req.user.cat_roles_idRol], function(err, rows){
            var rol = JSON.parse(JSON.stringify(rows));
            //console.log(rol);
            if(rol[0].NombreRol == 'coordinador'){
                console.log('Es coordinador');
                  res.redirect('/verEmpleados');
            }else if(rol[0].NombreRol == 'recepcionista'){
                console.log('Es recepcionista');
                res.redirect('/citasprincipal');
            }else if(rol[0].NombreRol == 'psicologo'){
                console.log('Es psicologo');
                res.redirect('/tratamientoPrincipal');
            }else if(rol[0].NombreRol == 'trabajadorSocial'){
                console.log('Es trabajador social');
                res.redirect('/seguimientoprincipal');
            }
        });
    }
