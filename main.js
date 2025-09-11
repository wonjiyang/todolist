let taskInput = document.getElementById('task-input');
let addBtn = document.getElementById('add-btn');
let tabs = document.querySelectorAll('.filter-nav button');
let underLine = document.getElementById('under-line');
let clearBtn = document.getElementById('clear-btn');
let taskList = [];
let mode = 'all';

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
clearBtn.addEventListener('click', clearTask);

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
    activateTab(event);
  });
}

function indicator(e) {
  const tab = e.currentTarget;

  underLine.style.left = tab.offsetLeft + 'px';
  underLine.style.width = tab.offsetWidth + 'px';
  underLine.style.top = tab.offsetTop + tab.offsetHeight + 'px';
}

window.addEventListener('resize', function () {
  const activeTab = document.querySelector('.filter-nav .ac');
  if (activeTab) {
    indicator({ currentTarget: activeTab });
  }
});

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
    return false;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = null;
  render();
}

function clearTask() {
  taskList = [];
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'active') {
    list = taskList.filter((task) => !task.isComplete);
  } else if (mode === 'done') {
    list = taskList.filter((task) => task.isComplete);
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<li class="list-content">
        <div class="list-area">
        <button class="check-btn" onclick="toggleComplete('${list[i].id}')">
        <i class="fa-solid fa-circle-check"></i></button>
        <div class="task-list task-done">${list[i].taskContent}</div>
        </div>
        <button class="delete-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash "></i></button>
        </li>`;
    } else {
      resultHTML += `<li class="list-content">
        <div class="list-area">
        <button class="check-btn" onclick="toggleComplete('${list[i].id}')">
        <i class="fa-regular fa-circle" ></i></button>
        <div class="task-list">${list[i].taskContent}</div>
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
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

function filter(event) {
  mode = event.target.id;
  render();
}

function activateTab(event) {
  tabs.forEach((tab) => {
    tab.classList.remove('ac');
  });

  event.target.classList.add('ac');
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

window.addEventListener('DOMContentLoaded', function () {
  mode = 'all';
  render();

  const firstTab = document.querySelector('.filter-nav button');
  underLine.style.width = '0';

  setTimeout(() => {
    indicator({ currentTarget: firstTab });
    activateTab({ target: firstTab });
  }, 1);
});
