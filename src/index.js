const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '10mb' }));
server.set('view engine', 'ejs');
server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// init express aplication
const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at https://full-of-projects.onrender.com`);
});

async function api() {
  /*
  fetch('')
  .then(resp => resp.json())
  .then(data => console.log(data))
  */
  const resp = await fetch('');
  const data = await resp.json();
  console.log(data);
}

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_Full Of Projects',
    user: 'freedb_Base64',
    password: 'HFpUad@JqahhC6d',
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
  /*
  return mysql
    .createConnection({
      host: 'sql.freedb.tech',
      database: 'freedb_Full Of Projects',
      user: 'freedb_Base64',
      password: 'HFpUad@JqahhC6d',
    })
    .then((connection) => connection.connect())
    .then((connection) => {
      console.log(
        `Conexión establecida con la base de datos (identificador=${connection.threadId})`
      );
      return connection;
    })
    .catch((err) => {
      console.error('Error de configuración: ' + err.stack);
    });
    */
}

server.get('/api/projects/all', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las tarjetas.');
  let sql =
    'SELECT * FROM project, autor WHERE project.fkAutor = autor.idAutor;';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
  /*
  getConnection()
    .then((connection) => {
      return connection.query(sql);
    })
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
      });

      res.json(results);
      connection.end();
    })
    .catch((err) => {
      throw err;
    });
    */
});

server.post('/api/projects/add', async (req, res) => {
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
    const connection = await getConnection();
    const [results, fields] = await connection.query(sqlAutor, valuesAutor);

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
    const [resultsInsert] = await connection.query(sqlProject, valuesProject);

    let response = {
      success: true,
      cardURL: `https://full-of-projects.onrender.com/api/projects/detail/${resultsInsert.insertId}`, //https://full-of-projects.onrender.com/api/projects/add/${obj.idProject}
    };
    res.json(response);
    connection.end();
  }
});

server.get('/api/projects/detail/:projectID', async (req, res) => {
  const projectId = req.params.projectID;
  const sql =
    'SELECT * FROM project, autor WHERE project.fkAutor = autor.idAutor AND idProject = ?';
  const connection = await getConnection();
  const [results, fields] = await connection.query(sql, [projectId]);

  res.render('project_detail', results[0]);
  connection.end();
});

server.delete('/api/projects/delete_all', async (req, res) => {
  const sql = 'DELETE FROM project';
  const connection = await getConnection();
  const [results] = await connection.query(sql);

  console.log(results);
  const sqlAutor = 'DELETE FROM autor';
  const [resultsDelete] = await connection.query(sqlAutor);

  res.json(resultsDelete);
  connection.end();
});

server.delete('/api/projects/delete_one/:idCard', async (req, res) => {
  let idCard = req.params.idCard;
  const sql = 'DELETE FROM project WHERE fkAutor = ?';
  const connection = await getConnection();
  const [results] = await connection.query(sql, [idCard]);

  console.log(results);
  const sqlAutor = 'DELETE FROM autor WHERE idAutor= ?';
  const [resultsDetele] = await connection.query(sqlAutor, [idCard]);

  res.json(resultsDetele);
  connection.end();
});

const staticServerPathAdmin = './src/public-react';
server.use(express.static(staticServerPathAdmin));

const staticServerPathStyles = './src/public-css/';
server.use(express.static(staticServerPathStyles));

const staticServerPathImages = './src/public-images/';
server.use(express.static(staticServerPathImages));
