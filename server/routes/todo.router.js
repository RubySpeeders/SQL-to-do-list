const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET route (gets list of tasks from db to client)
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "todo" ORDER BY "id";';
  //for stretch goal, you would say ORDER BY "id" DESC to reverse the order of todos. In MY mind, however, I don't want to forget an incomplete task I have had on the list for a long time! I would want it at the top reminding me to finish it. So I would not have that feature in my application.

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

//POST route (takes the input from client and inserts task into db. then GET to give list of tasks from db to client)
router.post('/', (req, res) => {
  const todoData = req.body;
  const queryText = `INSERT INTO "todo" ("task", "status") 
    VALUES ($1, 'false');`;

  const queryArray = [todoData.task];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//UPDATE route (updates the task from incomplete to complete)
router.put('/status/:id', (req, res) => {
  const newTaskInfo = req.body;
  const queryText = `UPDATE "todo" SET status=$1 WHERE id=$2;`;
  const queryArray = [newTaskInfo.status, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//DELETE route (deletes a task from the db)
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "todo" WHERE id=$1;`;
  const queryArrayData = [taskId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
