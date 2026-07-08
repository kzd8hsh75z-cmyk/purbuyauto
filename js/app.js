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
            <button onclick="showRequests()">Все заявки</button>
            <button onclick="showCars()">🚗 Автомобили</button>
            <button>Финансы</button>
            <button>Сотрудники</button>
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

            <button>Мои задачи</button>
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
    const inputs = document.querySelectorAll(".dashboard input");
    const select = document.querySelector(".dashboard select");
    const textarea = document.querySelector(".dashboard textarea");

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

const request = {
    id: requests.length + 1,
    date: new Date().toLocaleString("ru-RU"),
    client: inputs[0].value,
    phone: inputs[1].value,
    car: inputs[2].value,
    year: inputs[3].value,
    mileage: inputs[4].value,
    price: inputs[5].value,
    type: select.value,
    comment: textarea.value,
    status: "Новая"
};

    requests.push(request);
localStorage.setItem("requests", JSON.stringify(requests));

showRequests();
    localStorage.setItem("requests", JSON.stringify(requests));

    showRequests();
}function showRequests() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    app.innerHTML = `
        <div class="dashboard">
            <h1>Все заявки</h1>
            <p>Сохраненные заявки PurBuyAuto X</p>

            <div class="request-list">
                ${requests.map((request, index) => `
                   <div class="request-card">
    <h3>#${String(request.id || index + 1).padStart(4,"0")} — ${request.car || "Автомобиль не указан"}</h3>

    <p><b>Клиент:</b> ${request.client || "Не указан"}</p>
    <p><b>Телефон:</b> ${request.phone || "Не указан"}</p>
    <p><b>Тип:</b> ${request.type}</p>
    <p><b>Цена:</b> ${request.price || "Не указана"}</p>
    <p><b>Дата:</b> ${request.date || "08.07.2026"}</p>
    <p><b>Статус:</b> 🟡 ${request.status}</p>
    <select onchange="changeStatus(${index}, this.value)">
    <option ${request.status==="Новая"?"selected":""}>Новая</option>
    <option ${request.status==="В работе"?"selected":""}>В работе</option>
    <option ${request.status==="Завершена"?"selected":""}>Завершена</option>
    <option ${request.status==="Отказ"?"selected":""}>Отказ</option>
</select>

    <button onclick="deleteRequest(${index})">
        🗑 Удалить
    </button>
    <button onclick="openClient(${index})">
    👤 Клиент
</button>
</div>
                `).join("")}
            </div>

            <button onclick="showNewRequest()">Новая заявка</button>
            <button class="dark" onclick="location.reload()">Назад</button>
        </div>
    `;
}function deleteRequest(index){

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    requests.splice(index,1);

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    showRequests();
}function changeStatus(index, status){

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    requests[index].status = status;

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    showRequests();
}function openClient(index){

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    const request = requests[index];

    app.innerHTML = `
    <div class="dashboard">

        <h1>👤 Клиент</h1>

        <p><b>Имя:</b> ${request.client}</p>

        <p><b>Телефон:</b> ${request.phone}</p>

        <p><b>Автомобиль:</b> ${request.car}</p>

        <p><b>Год:</b> ${request.year}</p>

        <p><b>Пробег:</b> ${request.mileage}</p>

        <p><b>Бюджет:</b> ${request.price}</p>

        <p><b>Тип:</b> ${request.type}</p>

        <hr>

        <h2>История</h2>

        <p>
        Создана заявка:
        ${request.date || "Сегодня"}
        </p>

        <p>
        Статус:
        ${request.status}
        </p>

        <button onclick="showRequests()">
        Назад к заявкам
        </button>

    </div>
    `;
}function showCars(){

const cars = JSON.parse(localStorage.getItem("cars")) || [];

app.innerHTML = `

<div class="dashboard">

<h1>🚗 Автомобили</h1>

<p>Склад PurBuyAuto X</p>


<button onclick="addCar()">
➕ Добавить автомобиль
</button>


<div class="request-list">

${cars.length === 0 ?

"<p>Автомобилей пока нет</p>"

:

cars.map((car,index)=>`

<div class="request-card">

<h3>${car.brand} ${car.model}</h3>

<p>
<b>Год:</b> ${car.year}
</p>

<p>
<b>Покупка:</b> ${car.buy} ₽
</p>

<p>
<b>Расходы:</b> ${car.costs} ₽
</p>

<p>
<b>Продажа:</b> ${car.sell} ₽
</p>


<p>
<b>Прибыль:</b>

${car.sell-car.buy-car.costs} ₽
</p>


<p>
<b>Статус:</b>
${car.status}
</p>

<button onclick="openCar(${index})">
🚗 Открыть автомобиль
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

}function addCar(){

app.innerHTML=`

<div class="dashboard">

<h1>➕ Новый автомобиль</h1>


<input id="brand" placeholder="Марка">

<input id="model" placeholder="Модель">

<input id="year" placeholder="Год">

<input id="buy" placeholder="Цена покупки">

<input id="costs" placeholder="Расходы">

<input id="sell" placeholder="Цена продажи">


<select id="status">

<option>Куплен</option>
<option>В поиске</option>
<option>Продан</option>

</select>


<button onclick="saveCar()">
Сохранить
</button>


<button onclick="showCars()">
Назад
</button>


</div>

`;

}



function saveCar(){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];


cars.push({

brand:brand.value,
model:model.value,
year:year.value,
buy:Number(buy.value),
costs:Number(costs.value),
sell:Number(sell.value),
status:status.value

});


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


showCars();
function openCar(index){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];

const car = cars[index];


app.innerHTML = `

<div class="dashboard">

<h1>
🚗 ${car.brand} ${car.model}
</h1>


<p>
Год: ${car.year}
</p>


<hr>


<h2>
Финансы
</h2>


<p>
Покупка:
${car.buy} ₽
</p>


<p>
Расходы:
${car.costs} ₽
</p>
<h2>
📋 История расходов
</h2>


${
car.expenses ?

car.expenses.map(e=>`

<p>
${e.date}
<br>
🔧 ${e.name}
—
${e.sum} ₽
</p>

`).join("")

:

"<p>Расходов пока нет</p>"

}


<p>
Продажа:
${car.sell} ₽
</p>


<h2>
Прибыль:

${car.sell-car.buy-car.costs} ₽

</h2>


<hr>


<h2>
Добавить расход
</h2>


<input id="expenseName"
placeholder="Например: Ремонт">


<input id="expense"
placeholder="Сумма">




<button onclick="addExpense(${index})">

Добавить расход

</button>


<button onclick="showCars()">

Назад

</button>


</div>

`;

}function addExpense(index){

let cars =
JSON.parse(localStorage.getItem("cars")) || [];

let sum = Number(
document.getElementById("expense").value
);

cars[index].costs += sum;

localStorage.setItem(
"cars",
JSON.stringify(cars)
);

openCar(index);

}function openCar(index){

const cars = JSON.parse(localStorage.getItem("cars")) || [];

const car = cars[index];


app.innerHTML = `

<div class="dashboard">

<h1>
🚗 ${car.brand} ${car.model}
</h1>

<p>
Год выпуска: ${car.year}
</p>


<div class="request-card">

<h2>💰 Финансы</h2>


<p>
Цена покупки:
${car.buy} ₽
</p>


<p>
Расходы:
${car.costs} ₽
</p>


<p>
Цена продажи:
${car.sell} ₽
</p>


<h2>
Прибыль:
${car.sell - car.buy - car.costs} ₽
</h2>


</div>


<div class="request-card">

<h2>➕ Добавить расход</h2>


<input id="expense"
placeholder="Например: ремонт">


<button onclick="addExpense(${index})">
Добавить
</button>


</div>


<button onclick="showCars()">
Назад
</button>


</div>

`;

}function addExpense(index){

const cars = JSON.parse(localStorage.getItem("cars")) || [];


const value = Number(
document.getElementById("expense").value
);


cars[index].costs += value;


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


openCar(index);

}
}function openCar(index){

const cars = JSON.parse(localStorage.getItem("cars")) || [];

const car = cars[index];


app.innerHTML = `

<div class="dashboard">

<h1>
🚗 ${car.brand} ${car.model}
</h1>

<p>
Год: ${car.year}
</p>

<p>
Покупка: ${car.buy} ₽
</p>

<p>
Расходы: ${car.costs} ₽
</p>

<p>
Продажа: ${car.sell} ₽
</p>

<h2>
Прибыль:
${car.sell - car.buy - car.costs} ₽
<h2>➕ Добавить расход</h2>

<input id="expense"
placeholder="Например: ремонт">


<button onclick="addExpense(${index})">
Добавить расход
</button>


<button onclick="showCars()">
Назад
</button>

</div>

`;

function addExpense(index){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];


const name =
document.getElementById("expenseName").value;


const value =
Number(document.getElementById("expense").value);


if(!name || !value){
alert("Заполни расход");
return;
}


if(!cars[index].expenses){
cars[index].expenses = [];
}


cars[index].expenses.push({

name:name,
sum:value,
date:new Date().toLocaleDateString()

});


cars[index].costs =
Number(cars[index].costs) + value;


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


openCar(index);

}


openCar(index);

}