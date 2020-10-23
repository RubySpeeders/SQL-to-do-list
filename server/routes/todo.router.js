const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET route (gets list of tasks from db to client)
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "todo";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//POST route

//UPDATE route

//DELETE route

module.exports = router;
