const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '10mb' }));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

let connection;

mysql
  .createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_Full Of Projects',
    user: 'freedb_Base64',
    password: 'HFpUad@JqahhC6d',
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(
          `Conexión establecida con la base de datos (identificador=${connection.threadId})`
        );
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

server.get('/api/projects/all', (req, res) => {
  console.log('Pidiendo a la base de datos información de las tarjetas.');
  let sql =
    'SELECT * FROM project, autor WHERE project.fkAutor = autor.idAutor;';
  connection
    .query(sql)
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
      });

      res.json(results);
    })
    .catch((err) => {
      throw err;
    });
});

server.post('/api/projects/add', (req, res) => {
  const data = req.body;
  //validar aqui
  let validaciones = {};
  if (!data.name) {
    validaciones.name = 'name';
  }
  if (!data.slogan) {
    validaciones.slogan = 'slogan';
  }
  if (!data.technologies) {
    validaciones.technologies = 'technologies';
  }
  if (!data.repo) {
    validaciones.repo = 'repo';
  }
  if (!data.demo) {
    validaciones.demo = 'demo';
  }
  if (!data.desc) {
    validaciones.desc = 'desc';
  }
  if (!data.autor) {
    validaciones.autor = 'autor';
  }
  if (!data.job) {
    validaciones.job = 'job';
  }
  if (!data.image) {
    validaciones.image = 'image';
  }
  if (!data.photo) {
    validaciones.photo = 'photo';
  }
  if (Object.keys(validaciones).length !== 0) {
    res.json(validaciones);
  } else {
    let sqlAutor = 'INSERT INTO autor (autor, job, photo) VALUES (?,?,?)';
    let valuesAutor = [data.autor, data.job, data.photo];
    connection
      .query(sqlAutor, valuesAutor)
      .then(([results, fields]) => {
        console.log(results);
        let sqlProject =
          'INSERT INTO project (nameProject, slogan, technologies, repo, demo, descProject, image, fkAutor) VALUES (?,?,?,?,?,?,?,?)';
        let valuesProject = [
          data.name,
          data.slogan,
          data.technologies,
          data.repo,
          data.demo,
          data.desc,
          data.image,
          results.insertId,
        ];
        connection
          .query(sqlProject, valuesProject)
          .then(([results, fields]) => {
            let response = {
              success: true,
              cardURL: `http://localhost:4000/api/projects/add/${results.insertId}`,
            };
            res.json(response);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
});

server.use(express.static('./src/public-react'));
