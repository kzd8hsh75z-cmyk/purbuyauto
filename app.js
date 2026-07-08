const app = document.getElementById("app");

document.querySelector(".boss").addEventListener("click", () => {
    app.innerHTML = `
        <div class="dashboard">
            <h1>Панель руководителя</h1>
            <p>PurBuyAuto X</p>

            <div class="stats">
                <div>📥 <b>28</b><span>Заявки</span></div>
                <div>🚗 <b>16</b><span>Выкуп</span></div>
                <div>🌍 <b>8</b><span>Привоз</span></div>
                <div>🤖 <b>AI</b><span>PurBuyAI</span></div>
            </div>

            <button onclick="showNewRequest()">Новая заявка</button>
            <button onclick="showCars()">🚗 Автомобили</button>
            <button onclick="showFinance()">💰 Финансы</button>
            <button onclick="showEmployees()">👥 Сотрудники</button>
            <button>Haraba</button>
        </div>
    `;
});

document.querySelector(".worker").addEventListener("click", () => {
    app.innerHTML = `
        <div class="dashboard">
            <h1>Кабинет сотрудника</h1>
            <p>Рабочее пространство</p>

            <div class="stats">
                <div>📋 <b>12</b><span>Мои заявки</span></div>
                <div>📞 <b>5</b><span>Звонки</span></div>
                <div>🚘 <b>3</b><span>Осмотры</span></div>
                <div>✅ <b>2</b><span>Сделки</span></div>
            </div>

            <button onclick="showTasks()">📋 Мои задачи</button>
            <button>Заявки</button>
            <button>Автоподбор</button>
            <button>Привоз</button>
        </div>
    `;
});function showNewRequest() {
    app.innerHTML = `
        <div class="dashboard">
            <h1>Новая заявка</h1>
            <p>Создание заявки PurBuyAuto X</p>

            <input placeholder="Имя клиента">
            <input placeholder="Телефон клиента">
            <input placeholder="Марка и модель авто">
            <input placeholder="Год выпуска">
            <input placeholder="Пробег">
            <input placeholder="Желаемая цена">

            <select>
                <option>Выкуп</option>
                <option>Автоподбор</option>
                <option>Привоз из-за границы</option>
            </select>

            <textarea placeholder="Комментарий"></textarea>

            <button onclick="saveRequest()">Сохранить заявку</button>
            <button class="dark" onclick="location.reload()">Назад</button>
        </div>
    `;
}

function saveRequest() {
    alert("Заявка сохранена. Скоро подключим базу данных.");
}
function showTasks(){

const tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


app.innerHTML = `

<div class="dashboard">

<h1>
📋 Задачи
</h1>


<button onclick="addTask()">
➕ Новая задача
</button>


<div class="request-list">


${
tasks.length === 0 ?

"<p>Задач пока нет</p>"

:

tasks.map((task,index)=>`

<div class="request-card">


<h3>
${task.title}
</h3>


<p>
👤 ${task.employee}
</p>


<p>
🚗 ${task.car}
</p>


<p>
📞 ${task.type}
</p>


<p>
Статус:
${task.status}
</p>


<button onclick="completeTask(${index})">
✅ Выполнено
</button>


<button onclick="deleteTask(${index})">
🗑 Удалить
</button>


</div>


`).join("")

}


</div>


<button onclick="location.reload()">
Назад
</button>


</div>

`;

}
function addTask(){

const employees =
JSON.parse(localStorage.getItem("employees")) || [];


const options =
employees.map(emp=>`

<option>
${emp.name}
</option>

`).join("");


app.innerHTML=`

<div class="dashboard">

<h1>
➕ Новая задача
</h1>


<input id="taskTitle"
placeholder="Что сделать">


<input id="taskCar"
placeholder="Автомобиль">


<select id="taskEmployee">

<option>
Без сотрудника
</option>

${options}

</select>


<select id="taskType">

<option>
📞 Звонок
</option>

<option>
🔧 Осмотр
</option>

<option>
💰 Продажа
</option>

</select>


<button onclick="saveTask()">
Создать
</button>


<button onclick="showTasks()">
Назад
</button>


</div>

`;

}
function saveTask(){

const tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


tasks.push({

title:
document.getElementById("taskTitle").value,

car:
document.getElementById("taskCar").value,

employee:
document.getElementById("taskEmployee").value,

type:
document.getElementById("taskType").value,

status:
"Новая",

date:
new Date().toLocaleDateString()

});


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}
function completeTask(index){

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


tasks[index].status="Выполнено";


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}
function deleteTask(index){

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


tasks.splice(index,1);


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}