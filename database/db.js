const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Meza4870',
  database: 'school'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ', err);
      return;
    }
    console.log('Conexión a la base de datos establecida');
  });

module.exports = connection;