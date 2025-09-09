//유저가 값을 입력한다
//+버튼을 클릭하면, 할 일이 추가된다
//Delete버튼을 클릭하면, 할 일이 삭제된다
//Check버튼을 클릭하면, 할 일이 끝나면서 밑줄이 간다
//진행중 끝 탭을 클릭하면, 언더바가 이동한다
//끝 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아온다

let taskInput = document.getElementById('task-input');
let addBtn = document.getElementById('add-btn');
let taskList = [];

addBtn.addEventListener('click', addTask);

function addTask() {
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
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div class="btn-area">
              <button class="btn-style rotate-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
              <button class="btn-style delete-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
              <div>${taskList[i].taskContent}</div>
              <div class="btn-area">
                <button class="btn-style click-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                <button class="btn-style delete-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
              </div>
            </div>`;
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
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}
