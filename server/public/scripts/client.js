$(document).ready(readyUp);

function readyUp() {
  //click listeners
  $('#js-addBtn').on('click', handleClickAdd);
  $('.js-tasks').on('click', '.js-deleteBtn', handleDeleteTask);
  $('.js-tasks').on('click', '.js-completeBtn', handleCompleteTask);
  //run GET function to display tasks on page load
  getTasks();
}

function handleCompleteTask() {
  //retrieve id of task
  const taskId = $(this).data('id');
  let taskStatus = $(this).data('status');
  //console.log(taskId, taskStatus);
  if (taskStatus) {
    taskStatus = false;
  } else {
    taskStatus = true;
  }
  completeTask(taskId, taskStatus);
}

function handleDeleteTask() {
  //retrieve id of task
  const taskId = $(this).data('id');
  //console.log('in delete', taskId);
  //run DELETE route
  deleteTask(taskId);
}

function handleClickAdd() {
  const taskObj = {
    task: $('#js-task').val(),
  };
  postTask(taskObj);
}

function clearField() {
  $('#js-task').val('');
}

//GET function to get the list of tasks from db
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/todo',
  })
    .then((response) => {
      render(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

//POST function to send object to db
function postTask(obj) {
  $.ajax({
    type: 'POST',
    url: '/todo',
    data: obj,
  })
    .then((response) => {
      //clearForm();
      //db is updated, update DOM
      getTasks();
      clearField();
    })
    .catch((err) => {
      console.log(err);
    });
}

//DELETE function to delete task
function deleteTask(id) {
  $.ajax({
    type: 'DELETE',
    url: `/todo/${id}`,
  })
    .then((deleteMessage) => {
      //db is updated, update DOM
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('yikes');
    });
}

//PUT route to change status of task from true->false or false->true
function completeTask(id, status) {
  $.ajax({
    type: 'PUT',
    url: `/todo/status/${id}`,
    data: { status: status },
  })
    .then(() => {
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('Issue updating');
    });
}
function render(response) {
  $('.js-tasks').empty();
  for (let task of response) {
    if (task.status) {
      $('.js-tasks').append(
        `<tr class="js-tr">
          <td class="js-tdTask strikeThrough">${task.task}</td>
          <td><button class="js-completeBtn btnColour" data-status="${task.status}" data-id="${task.id}">INCOMPLETE</button></td>
          <td><button class="js-deleteBtn" data-id="${task.id}">DELETE</button></td>
      </tr>`
      );
    } else if (task.status === false) {
      $('.js-tasks').append(
        `<tr class="js-tr">
        <td class="js-tdTask">${task.task}</td>
        <td><button class="js-completeBtn" data-status="${task.status}" data-id="${task.id}">COMPLETED</button></td>
        <td><button class="js-deleteBtn" data-id="${task.id}">DELETE</button></td>
      </tr>`
      );
    }
  }
}
