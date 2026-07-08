const app = document.getElementById("app");
function money(value){

return Number(value || 0)
.toLocaleString("ru-RU") + " ₽";

}
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
            <button onclick="showFinance()">
💰 Финансы
</button>
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

localStorage.setItem(
"requests",
JSON.stringify(requests)
);

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
<b>VIN:</b> ${car.vin || "Не указан"}
</p>

<p>
<b>Город:</b> ${car.city || "Не указан"}
</p>

<p>
<b>Ответственный:</b> ${car.manager || "Не назначен"}
</p>

<p>
<b>Покупка:</b> ${money(car.buy)}
</p>

<p>
<b>Расходы:</b> ${money(car.costs)}
</p>

<p>
<b>Продажа:</b> ${money(car.sell)}
</p>


<p>
<b>Прибыль:</b>

${money(car.sell-car.buy-car.costs)}
</p>

<hr>

<h3>
История расходов
</h3>


${
(car.expenses || []).map(e=>`

<div class="expense">

<b>${e.name}</b>

<br>

Сумма: ${money(e.sum)}

<br>

Дата: ${e.date}

</div>

`).join("")
}
<p class="car-status">

${car.status || "Без статуса"}

</p>

<button onclick="openCar(${index})">
🚗 Открыть автомобиль
</button>

<button class="delete-btn" onclick="deleteCar(${index})">
🗑 Удалить автомобиль
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

<input id="mileage" placeholder="Пробег">

<input id="vin" placeholder="VIN номер">

<input id="photo" placeholder="Ссылка на фото">

<input id="dateBuy" placeholder="Дата покупки">

<input id="manager" placeholder="Ответственный сотрудник">

<input id="city" placeholder="Город">

<textarea id="comment" placeholder="Комментарий по автомобилю"></textarea>

<input id="buy" placeholder="Цена покупки">

<input id="costs" placeholder="Расходы">

<input id="sell" placeholder="Цена продажи">


<select id="status">

<option>🔎 В поиске</option>
<option>🟡 Куплен</option>
<option>🔵 На подготовке</option>
<option>🟢 В продаже</option>
<option>⚫ Продан</option>

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

brand: document.getElementById("brand").value,
model: document.getElementById("model").value,
year: document.getElementById("year").value,
mileage: document.getElementById("mileage").value,
vin: document.getElementById("vin").value,
photo: document.getElementById("photo").value,
dateBuy: document.getElementById("dateBuy").value,
manager: document.getElementById("manager").value,
city: document.getElementById("city").value,
comment: document.getElementById("comment").value,
buy: Number(document.getElementById("buy").value),
costs: Number(document.getElementById("costs").value),
sell: Number(document.getElementById("sell").value),
status: document.getElementById("status").value,
expenses: [],
dateCreated:new Date().toLocaleDateString(),

});


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


showCars();

}



function openCar(index){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];

const car = cars[index];


app.innerHTML = `

<div class="dashboard">

<h1>
🚗 ${car.brand} ${car.model}
</h1>


<p>Год: ${car.year}</p>

<p>
🛣 Пробег:
${car.mileage || "Не указан"} км
</p>

<p>
🔢 VIN:
${car.vin || "Не указан"}
</p>

<p>
📅 Дата покупки:
${car.dateBuy || "Не указана"}
</p>

📌 Добавлен в систему:
${car.dateCreated || "Сегодня"}
</p>

<p>
👤 Ответственный:
${car.manager || "Не назначен"}
</p>

<p>
📍 Город:
${car.city || "Не указан"}
</p>

<p>
📝 Комментарий:
${car.comment || "Нет"}
</p>

${
car.photo ?

`
<img src="${car.photo}" class="car-photo">
`

:

"<p>📸 Фото не добавлено</p>"

}

<p>
Покупка:
${money(car.buy)}
</p>


<p>
Расходы:
${money(car.costs)}
</p>


<p>
Продажа:
${money(car.sell)}
</p>


<h2>
Прибыль:
${money(car.sell - car.buy - car.costs)}
</h2>


<hr>


<h2>
➕ Добавить расход
</h2>


<input id="expenseName"
placeholder="Например: Ремонт">


<input id="expense"
placeholder="Сумма">


<button onclick="addExpense(${index})">
Добавить расход
</button>


<hr>


<h2>
История расходов
</h2>


${
(car.expenses || []).map(e=>`

<p>
🔧 ${e.name}
<br>
${money(e.sum)}
<br>
${e.date}
</p>

`).join("")
}


<button onclick="showCars()">
Назад
</button>


</div>

`;

}



function addExpense(index){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];


const name =
document.getElementById("expenseName").value;


const sum =
Number(document.getElementById("expense").value);



if(!name || !sum){

alert("Заполни расход и сумму");

return;

}



if(!cars[index].expenses){

cars[index].expenses=[];

}



cars[index].expenses.push({

name:name,

sum:sum,

date:new Date().toLocaleDateString()

});


cars[index].costs =
Number(cars[index].costs) + sum;



localStorage.setItem(
"cars",
JSON.stringify(cars)
);



openCar(index);

}
function deleteCar(index){

let cars =
JSON.parse(localStorage.getItem("cars")) || [];

if(confirm("Удалить этот автомобиль?")){

cars.splice(index,1);

localStorage.setItem(
"cars",
JSON.stringify(cars)
);

showCars();
}

}function showFinance(){

const cars =
JSON.parse(localStorage.getItem("cars")) || [];


let totalBuy = 0;
let totalCosts = 0;
let totalSell = 0;


cars.forEach(car=>{

totalBuy += Number(car.buy) || 0;

totalCosts += Number(car.costs) || 0;

totalSell += Number(car.sell) || 0;

});


const profit =
totalSell - totalBuy - totalCosts;



app.innerHTML = `

<div class="dashboard">


<h1>
💰 Финансы PurBuyAuto X
</h1>


<div class="stats">


<div>
🚗
<b>${cars.length}</b>
<span>
Автомобилей
</span>
</div>


<div>
💵
<b>${money(totalBuy)}</b>
<span>
Вложено
</span>
</div>


<div>
🔧
<b>${money(totalCosts)}</b>
<span>
Расходы
</span>
</div>


<div>
📈
<b>${money(profit)}</b>
<span>
Прибыль
</span>
</div>


</div>



<h2>
Автомобили
</h2>


${

cars.map(car=>`

<div class="request-card">


<h3>
${car.brand} ${car.model}
</h3>


<p>
Покупка:
${money(car.buy)}
</p>


<p>
Расходы:
${money(car.costs)}
</p>


<p>
Продажа:
${money(car.sell)}
</p>


<p>
Прибыль:
${money(car.sell-car.buy-car.costs)}
</p>


</div>


`).join("")

}



<button onclick="location.reload()">
Назад
</button>


</div>

`;

}