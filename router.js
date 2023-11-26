const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/materia', (req, res) => {
    conexion.query('SELECT * FROM asignature', (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.render('materia/materia', {materias: results});
        }
    });
    // res.render('materia/materia');
});

router.get('/create_materia', (req, res) => {
    
    res.render('materia/create_materia');
});

//se tiene que agregar :id para que funcione la ruta al final de edit_materia/
router.get('/edit_materia/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM asignature WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            console.log(results[0]);
            res.render('materia/edit_materia', {materia: results[0]});
        }
    });
    // res.render('materia/edit_materia');
});

//ruta para borrar materia
router.get('/delete_materia/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM asignature WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.redirect('/materia');
        }
    });
});

router.get('/alumno', (req, res) => {
    res.render('alumno/alumno');
});

router.get('/create_alumno', (req, res) => {
    res.render('alumno/create_alumno');
});

router.get('/edit_alumno', (req, res) => {
    res.render('alumno/edit_alumno');
});

//Control de CRUD
const crud = require('./controllers/crud');
router.post('/save_materia', crud.save_materia);
router.post('/update_materia', crud.update_materia);

module.exports = router;