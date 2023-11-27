const express = require("express");
const router = express.Router();

const conexion = require("./database/db");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/materia", (req, res) => {
  conexion.query("SELECT * FROM asignature", (error, results) => {
    if (error) {
      console.error(error);
      return;
    } else {
      res.render("materia/materia", { materias: results });
    }
  });
  // res.render('materia/materia');
});

router.get("/create_materia", (req, res) => {
  res.render("materia/create_materia");
});

//se tiene que agregar :id para que funcione la ruta al final de edit_materia/
router.get("/edit_materia/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM asignature WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        console.log(results[0]);
        res.render("materia/edit_materia", { materia: results[0] });
      }
    }
  );
  // res.render('materia/edit_materia');
});

//ruta para borrar materia
router.get("/delete_materia/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "DELETE FROM asignature WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/materia");
      }
    }
  );
});

router.get("/alumno", (req, res) => {
  conexion.query("SELECT * FROM user", (error, results) => {
    if (error) {
      console.error(error);
      return;
    } else {
      res.render("alumno/alumno", { user: results });
    }
  });
  // res.render('materia/materia');
});

router.get("/create_alumno", (req, res) => {
  res.render("alumno/create_alumno");
});

router.get("/edit_alumno/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM user WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      return;
    } else {
      res.render("alumno/edit_alumno", { user: results[0] });
    }
  });
});
//ruta para borrar alumno
router.get("/delete_alumno/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM user WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      return;
    } else {
      res.redirect("/alumno");
    }
  });
});

router.get("/alumno_materia/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    `SELECT dg.id, dg.id_user, us.name, us.lastname, dg.id_asignature, asi.name as Materia FROM school.detail_grade dg
    INNER JOIN school.user us on us.id = dg.id_user
    INNER JOIN school.asignature asi on asi.id = dg.id_asignature
    WHERE dg.id_asignature = ?;`,
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.render("alumno_materia/alumno_materia", {
          alumno_materias: results,
        });
      }
    }
  );
  // res.render('materia/materia');
});

//ruta para borrar alumno_materia
router.get("/delete_alumno_materia/:id", (req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM detail_grade WHERE id = ?", [id], (error, results) => {
      if (error) {
        console.error(error);
        return;
      } else {
        res.redirect("/materia");
      }
    });
  });

//Control de CRUD
const crud = require("./controllers/crud");
router.post("/save_materia", crud.save_materia);
router.post("/update_materia", crud.update_materia);
router.post("/save_user", crud.save_user);
router.post("/update_user", crud.update_user);

module.exports = router;
