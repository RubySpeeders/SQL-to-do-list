$(document).ready(readyUp);

function readyUp() {
  //click listeners
  $('#js-addBtn').on('click', handleClickAdd);
  $('.js-tasks').on('click', '.js-delete', handleDeleteTask);
  //run GET function to display tasks on page load
  getTasks();
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

function render(response) {
  $('.js-tasks').empty();
  for (let task of response) {
    $('.js-tasks').append(
      `<tr>
        <td>${task.task}</td>
        <td><button>DONE</button></td>
        <td><button class="js-delete" data-id="${task.id}">DELETE</button></td>
      </tr>`
    );
  }
}
