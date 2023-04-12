const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '10mb' }));
server.set('view engine', 'ejs');

// init express aplication
const serverPort = process.env.PORT || 4000;
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
              cardURL: `http://localhost:4000/api/projects/detail/${results.insertId}`, //http://localhost:4000/api/projects/add/${obj.idProject}
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

server.get('/api/projects/detail/:projectID', (req, res) => {
  const projectId = req.params.projectID;
  const sql =
    'SELECT * FROM project, autor WHERE project.fkAutor = autor.idAutor AND idProject = ?';
  connection
    .query(sql, [projectId])
    .then(([results, fields]) => {
      res.render('project_detail', results[0]);
    })
    .catch((err) => {
      throw err;
    });
});

server.delete('/api/projects/delete_all', (req, res) => {
  const sql = 'DELETE FROM project';
  connection
    .query(sql)
    .then(([results, fields]) => {
      console.log(results);
      const sqlAutor = 'DELETE FROM autor';
      connection
        .query(sqlAutor)
        .then(([results, fields]) => {
          res.json(results);
          // res.json({
          //   message: 'Se han eliminado los registros de la base de datos',
          //});
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
});

const staticServerPathAdmin = './src/public-react';
server.use(express.static(staticServerPathAdmin));

const staticServerPathStyles = './src/public-css/';
server.use(express.static(staticServerPathStyles));

const staticServerPathImages = './src/public-images/';
server.use(express.static(staticServerPathImages));
