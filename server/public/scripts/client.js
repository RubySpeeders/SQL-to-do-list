$(document).ready(readyUp);

function readyUp() {
  //click listener for submit button
  $('#js-addBtn').on('click', handleClickAdd);
  getTasks();
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

function render(response) {
  $('.js-tasks').empty();
  for (let task of response) {
    $('.js-tasks').append(
      `<tr>
        <td>${task.task}</td>
        <td><button>DONE</button></td>
        <td><button>DELETE</button></td>
      </tr>`
    );
  }
}
