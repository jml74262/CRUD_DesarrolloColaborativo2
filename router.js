const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error(error);
            return;
        }else{
            res.send(results)
        }
    });
});

module.exports = router;