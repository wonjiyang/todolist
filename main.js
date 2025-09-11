let taskInput = document.getElementById('task-input');
let addBtn = document.getElementById('add-btn');
let tabs = document.querySelectorAll('.filter-nav button');
let underLine = document.getElementById('under-line');
let clearBtn = document.getElementById('clear-btn');
let taskList = [];
let mode = 'all'; // 기본적으로 'all' 탭 활성화

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
    activateTab(event); // 탭 클릭 시 해당 탭을 활성화
  });
}

// 탭 클릭 시, 밑줄 애니메이션 효과
function indicator(e) {
  const tab = e.currentTarget;

  underLine.style.left = tab.offsetLeft + 'px'; // 탭의 왼쪽 위치
  underLine.style.width = tab.offsetWidth + 'px'; // 탭의 너비
  underLine.style.top = tab.offsetTop + tab.offsetHeight + 'px'; // 탭 바로 아래로 위치
}

// 화면 크기 조정 시 탭의 위치 및 밑줄 위치 업데이트
window.addEventListener('resize', function () {
  const activeTab = document.querySelector('.filter-nav .ac'); // 활성화된 탭을 찾음
  if (activeTab) {
    indicator({ currentTarget: activeTab }); // 활성화된 탭 기준으로 밑줄 위치 업데이트
  }
});

// 할 일 추가
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

// 할 일 전체 삭제
function clearTask() {
  taskList = [];
  render();
}

// 할 일 목록 렌더링
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

// 완료 상태 토글
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

// 할 일 삭제
function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

// 필터링 처리
function filter(event) {
  mode = event.target.id; // 클릭한 탭의 id 값으로 모드 변경
  render(); // 변경된 모드로 리스트 렌더링
}

// 탭 활성화 처리
function activateTab(event) {
  // 모든 탭에서 'ac' 클래스를 제거
  tabs.forEach((tab) => {
    tab.classList.remove('ac');
  });

  // 클릭한 탭에 'ac' 클래스를 추가
  event.target.classList.add('ac');
}

// 랜덤 ID 생성
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

// 페이지 로드 후 'all' 모드로 초기 렌더링
window.addEventListener('DOMContentLoaded', function () {
  mode = 'all'; // 기본 모드 'all'로 설정
  render(); // 화면 렌더링

  // 첫 번째 탭을 클릭한 것처럼 동작하게 만들어 underLine 표시
  const firstTab = document.querySelector('.filter-nav button'); // 첫 번째 탭을 찾음
  // 처음에 underLine의 width를 0으로 설정하여 안보이게 함
  underLine.style.width = '0';

  // 첫 번째 탭 클릭 시 indicator 함수와 activateTab 함수 호출
  setTimeout(() => {
    indicator({ currentTarget: firstTab }); // 첫 번째 탭에 대한 indicator 함수 실행
    activateTab({ target: firstTab }); // 첫 번째 탭을 활성화
  }, 1); // 약간의 지연을 줘서 첫 번째 탭에서 'line'을 확인하게 함
});
