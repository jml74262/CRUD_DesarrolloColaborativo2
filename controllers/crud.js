const conexion = require('../database/db');

exports.save_materia = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const sql = "INSERT INTO asignature SET ?";
    conexion.query(sql, {name: name, description : description}, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.redirect('/materia');
            console.log("Materia guardada")
        }
    });
}

exports.update_materia = (req, res) => {
    const id = req.body.id;
    console.log(id);
    const name = req.body.name;
    const description = req.body.description;
    const sql = "UPDATE asignature SET ? WHERE id = ?";
    conexion.query(sql, [{name: name, description: description}, id], (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.redirect('/materia');
            console.log("Materia actualizada")
        }
    });    
}

exports.save_user = (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const role = req.body.role;
    const age = req.body.age;
    const sql = "INSERT INTO user SET ?";
    conexion.query(sql, {name: name,lastname: lastname, role:role, age:age}, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.redirect('/alumno');
            console.log("Usuario guardado")
        }
    });
}
exports.update_user = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const role = req.body.role;
    const age = req.body.age;
    const sql = "UPDATE user SET ? WHERE id = ?";
    conexion.query(sql,[{name: name,lastname: lastname, role:role, age:age}, id], (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.redirect('/alumno');
            console.log("Usuario actualizado")
        }
    });
}