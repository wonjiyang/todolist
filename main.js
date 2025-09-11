let taskInput = document.getElementById('task-input');
let addBtn = document.getElementById('add-btn');
let tabs = document.querySelectorAll('.filter-nav button');
let underLine = document.getElementById('under-line');
let taskList = [];
let mode = 'all';
let filterList = [];

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('focus', function () {
  taskInput.value = '';
});
taskInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
tabs.forEach((menu) => menu.addEventListener('click', (e) => indicator(e)));

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function indicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}

function addTask() {
  event.preventDefault();
  if (taskInput.value == '') {
    Swal.fire({
      icon: 'info',
      text: '내용을 입력해주세요',
      customClass: {
        popup: 'add-popup',
        icon: 'add-icon',
        text: 'add-txt',
        confirmButtonText: 'X',
        confirmButton: 'add-confirm',
      },
    });
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'active' || mode === 'done') {
    list = filterList;
  }
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<li class="list-content">
        <div class="list-area">
        <button class="check-btn" onclick="toggleComplete('${list[i].id}')">
        <i class="fa-solid fa-circle-check"></i></button>
        <div class="task-done">${list[i].taskContent}</div>
        </div>
        <button class="delete-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash "></i></button>
        </li>`;
    } else {
      resultHTML += `<li class="list-content">
        <div class="list-area">
        <button class="check-btn" onclick="toggleComplete('${list[i].id}')">
        <i class="fa-regular fa-circle" ></i></button>
        <div>${list[i].taskContent}</div>
        </div>
        <button class="delete-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </li>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === 'all') {
    render();
  } else if (mode === 'active') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}
