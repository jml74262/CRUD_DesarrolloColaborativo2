const conexion = require("../database/db");

exports.login = (req, res) => {
    //si encuentra una coincidecia en la base de datos, redirecciona a la ruta /home
    const username = req.body.usuario;
    const contrasena = req.body.contrasena;
    const sql = "SELECT * FROM user WHERE usuario = ? AND contrasena = ?";
    conexion.query(sql, [username, contrasena], (error, results) => {
        if (error) {
            console.error(error);
            return;
        } else {
            if (results.length > 0) {
                console.log(results);
            res.redirect("/login_check");
            } else {
            console.log("Usuario o contraseña incorrectos");
            res.redirect("/login");
            }
        }
        }
    );
};

exports.save_materia = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const sql = "INSERT INTO asignature SET ?";
  conexion.query(
    sql,
    { name: name, description: description },
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/materia");
        console.log("Materia guardada");
      }
    }
  );
};

exports.update_materia = (req, res) => {
  const id = req.body.id;
  console.log(id);
  const name = req.body.name;
  const description = req.body.description;
  const sql = "UPDATE asignature SET ? WHERE id = ?";
  conexion.query(
    sql,
    [{ name: name, description: description }, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/materia");
        console.log("Materia actualizada");
      }
    }
  );
};

exports.save_user = (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const role = req.body.role;
  const age = req.body.age;
  const sql = "INSERT INTO user SET ?";
  conexion.query(
    sql,
    { name: name, lastname: lastname, role: role, age: age },
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/alumno");
        console.log("Usuario guardado");
      }
    }
  );
};
exports.update_user = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const role = req.body.role;
  const age = req.body.age;
  const sql = "UPDATE user SET ? WHERE id = ?";
  conexion.query(
    sql,
    [{ name: name, lastname: lastname, role: role, age: age }, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/alumno");
        console.log("Usuario actualizado");
      }
    }
  );
};

// CRUD alumno_materia
exports.save_alumno_materia = (req, res) => {
  const idUsuario = req.body.idUsuario;
  const idMateria = req.body.idMateria;
  const sql = "INSERT INTO detail_grade SET ?";
  conexion.query(
    sql,
    {
      id_user: idUsuario,
      id_asignature: idMateria,
    },
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/materia");
        console.log("Materia vinculada");
      }
    }
  );
};

exports.update_alumno_materia = (req, res) => {
  const id = req.body.id;
  const idMateria = req.body.id_asignature;
  const grade1 = req.body.grade1;
  const grade2 = req.body.grade2;
  const grade3 = req.body.grade3;
  console.log("body");
  console.log(req.body);
  const sql = "UPDATE detail_grade SET ? WHERE id = ?";
  conexion.query(
    sql,
    [
      {
        grade1: grade1,
        grade2: grade2,
        grade3: grade3,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/alumno_materia/" + idMateria);
        console.log("Calificaciones actualizadas");
      }
    }
  );
};
