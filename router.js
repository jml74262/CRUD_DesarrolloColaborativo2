const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res) => {
    res.render('index');
    // conexion.query('SELECT * FROM user', (error, results) => {
    //     if (error) {
    //         console.error(error);
    //         return;
    //     }else{
    //         res.send(results)
    //     }
    // });
});

router.get('/materia', (req, res) => {
    res.render('materia/materia');
});

router.get('/create_materia', (req, res) => {
    res.render('materia/create_materia');
});

//se tiene que agregar :id para que funcione la ruta al final de edit_materia/
router.get('edit_materia/', (req, res) => {
    res.render('materia/edit_materia');
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

module.exports = router;