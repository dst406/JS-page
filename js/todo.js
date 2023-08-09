const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY ="todos";

let toDos = []; //localStorage에 저장할 array설정


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function deleteToDo(event){ //클릭된이벤트 정보를 통해 button들을 구분(각자의 요소주소가 다르기 때문에 id를 개개인별로 할당할 필요가 없음)
    const li = event.target.parentElement; //li를 지우기위해 button의 부모요소를 가져옴
    li.remove(); //li 삭제
    toDos = toDos.filter(element => element.id !== parseInt(li.id)); //toDo에 있는 id와 버튼에 있는 id값이 같지않으면 true리턴 => 버튼에 있는 id값을 제외한 값들로 array 재생성
    saveToDos(); //바뀐값으로 다시 저장
}

function paintToDo(newToDo) { //화면에 요소 뿌려주는 함수
    const li = document.createElement("li");
    li.id = newToDo.id; //li에 id값 부여
    const span = document.createElement("span"); //나중에 ToDo를 지울 버튼을 만들기 위해 span을 추가
    span.innerText = newToDo.text; //span에 입력받은 newToDo 
    const button = document.createElement("button");

    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span); //li 밑에 span을 자식으로 넣음
    li.appendChild(button);
    
    toDoList.appendChild(li); //toDoList에 li 추가

}

function handleToDoSubmit(event) {
    event.preventDefault(); //자동 새로고침방지
    const newToDo = toDoInput.value; //입력받은 값 저장
    toDoInput.value = ""; //엔터를 누르면 칸을 비움
    const newTodoObj = {
        text:newToDo,
        id: Date.now(), //현재의 밀리세컨을 주는함수로 랜덤함수 대용으로 사용가능
    }; //삭제버튼을 눌러도 메모리에서 삭제되지 않기 때문에 각각의 id를 부여해 식별함
    toDos.push(newTodoObj); //입력받은 값을 localStorage에 저장
    paintToDo(newTodoObj); //입력받은걸 그려줌
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){//string으로 검사해서 null이 아니면 즉, 데이터가 존재하면 그걸 가지고 화면을 뿌려줌
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; //새로운값을 덮어씌우지 않기위해 전에 값들을 불러옴
    parsedToDos.forEach(paintToDo);
}