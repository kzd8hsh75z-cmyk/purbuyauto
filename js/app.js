const app = document.getElementById("app");
function getCars(){

return JSON.parse(
localStorage.getItem("cars")
) || [];

}


function getTasks(){

return JSON.parse(
localStorage.getItem("tasks")
) || [];

}


function getEmployees(){

return JSON.parse(
localStorage.getItem("employees")
) || [];


}
function getClients(){

return JSON.parse(
localStorage.getItem("clients")
) || [];

}
function getRequests(){

return JSON.parse(
localStorage.getItem("requests")
) || [];
}

function money(value){

return Number(value) 
? Number(value).toLocaleString("ru-RU")+" ₽"
: "0 ₽";

}
    document.querySelector(".boss")?.addEventListener("click", () => {


const requests =
JSON.parse(localStorage.getItem("requests")) || [];


const cars = getCars();


let totalCosts = 0;
let totalProfit = 0;


cars.forEach(car=>{

totalCosts += Number(car.costs) || 0;

if(car.sell){

totalProfit += 
Number(car.sell) -
Number(car.buy) -
Number(car.costs);

}

});



app.innerHTML = `

<div class="dashboard">

<h1>
Панель руководителя
</h1>

<p>
PurBuyAuto X
</p>


<div class="stats">


<div>
📥
<b>${requests.length}</b>
<span>
Заявки
</span>
</div>


<div>
🚗
<b>${cars.length}</b>
<span>
Автомобили
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
💰
<b>${money(totalProfit)}</b>
<span>
Прибыль
</span>
</div>


</div>



<button onclick="showNewRequest()">
Новая заявка
</button>


<button onclick="showRequests()">
Все заявки
</button>


<button onclick="showCars()">
🚗 Автомобили
</button>


<button onclick="showFinance()">
💰 Финансы
</button>

<button onclick="showDeals()">
🤝 Сделки
</button>

<button onclick="showEmployees()">
👥 Сотрудники
</button>
<button onclick="showClients()">
👤 Клиенты
</button>
<button onclick="showTasks()">
📋 Задачи
</button>
<button>
Haraba
</button>


</div>

`;

});

document.querySelector(".worker")?.addEventListener("click", () => {
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
                <button onclick="showRequests()">📋 Заявки</button>
                <button>Автоподбор</button>
                <button>Привоз</button>
        </div>
    `;
});function showNewRequest() {
    const employees = getEmployees();


const employeeOptions =
employees.map(emp=>`

<option>
${emp.name}
</option>

`).join("");
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

            <select id="requestType">

<option>Выкуп</option>
<option>Автоподбор</option>
<option>Привоз из-за границы</option>

</select>

            <textarea placeholder="Комментарий"></textarea>
            <select id="requestManager"><option>Без ответственного</option>${employeeOptions}</select>
            <button onclick="saveRequest()">Сохранить заявку</button>
            <button class="dark" onclick="location.reload()">Назад</button>
        </div>
    `;
}

function saveRequest() {
   const inputs = document.querySelectorAll(".dashboard input");

if(!inputs[0].value || !inputs[1].value){

alert("Заполните имя и телефон");

return;

}const clients = getClients();


let client = clients.find(
c => c.phone === inputs[1].value
);


if(!client){

client = {

id: Date.now(),


name: inputs[0].value,

phone: inputs[1].value,

cars: [],

deals: [],

history:[

{

type:"Создание",

text:"Первичная заявка",

date:new Date().toLocaleDateString()

}

]

};


clients.push(client);

}

    const typeSelect =
document.getElementById("requestType");
    const textarea = document.querySelector(".dashboard textarea");

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

const request = {
    id: Date.now(),
    clientId:
    client.id,
    date: new Date().toLocaleString("ru-RU"),
    client: inputs[0].value,
    phone: inputs[1].value,
    car: inputs[2].value,
    year: inputs[3].value,
    mileage: inputs[4].value,
    price: inputs[5].value,
    type:typeSelect.value,
    comment: textarea.value,

manager:
document.getElementById("requestManager")?.value || "Без ответственного",

status:"Новая"
};

    requests.push(request);
    
    localStorage.setItem(
"requests",
JSON.stringify(requests)
);

    if(!client.history){

client.history=[];

}
    client.history.push({

type:"Заявка",

text:
request.car || "Новый запрос",

date:
new Date().toLocaleDateString()

});


localStorage.setItem(
"clients",
JSON.stringify(clients)
);



createTaskFromRequest(request);
client.history.push({

type:"Автоматизация",

text:
"Создана задача менеджеру по новой заявке",

date:
new Date().toLocaleDateString()

});


localStorage.setItem(
"clients",
JSON.stringify(clients)
);


localStorage.setItem(
"clients",
JSON.stringify(clients)
);

alert("Заявка сохранена");


showRequests();

}

function showRequests() {

const requests = getRequests();


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
    <button onclick="openClientCardByRequest(${index})">
👤 Клиент
</button>
<button onclick="createDealFromRequest(${index})">
🤝 Создать сделку
</button>
</div>
                `).join("")}
            </div>

            <button onclick="showNewRequest()">Новая заявка</button>
            <button class="dark" onclick="location.reload()">Назад</button>
        </div>
        `;
               
}

function deleteRequest(index){

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    if(!confirm("Удалить заявку?")){
return;
}

requests.splice(index,1);

localStorage.setItem(
"requests",
JSON.stringify(requests)
);

showRequests();
}
function changeStatus(index, status){

let requests =
JSON.parse(localStorage.getItem("requests")) || [];


if(!requests[index]){
return;
}


requests[index].status = status;


localStorage.setItem(
"requests",
JSON.stringify(requests)
);


showRequests();

}
function openClient(index){

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
        <p>
<b>Ответственный:</b>
${request.manager || "Не назначен"}
</p>

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

    }
    
    function showCars(){

const cars = getCars();


app.innerHTML = `

<div class="dashboard">


<h1>
🚗 Автомобили
</h1>


<p>
Склад PurBuyAuto X
</p>


<button onclick="addCar()">
➕ Добавить автомобиль
</button>



<div class="request-list">


${
cars.length === 0 ?

"<p>Автомобилей пока нет</p>"

:

cars.map((car,index)=>`

<div class="request-card">


<h3>
${car.brand} ${car.model}
</h3>


<p>
📅 Год:
${car.year || "Не указан"}
</p>


<p>
🔢 VIN:
${car.vin || "Не указан"}
</p>

<p>
📅 Добавлен:
${car.dateCreated || "—"}
</p>

<p>
📍 Город:
${car.city || "Не указан"}
</p>


<p>
👤 Ответственный:
${car.manager || "Не назначен"}
</p>


<p>
💰 Покупка:
${money(car.buy)}
</p>


<p>
🔧 Расходы:
${money(car.costs)}
</p>


<p>
💵 Продажа:
${money(car.sell)}
</p>


<p>
📈 Прибыль:
${
car.sell
?
money(car.sell - car.buy - car.costs)
:
"Не продан"
}
</p>


<p class="car-status">
${car.status || "Без статуса"}
</p>


<hr>


<h3>
История расходов
</h3>


${
(car.expenses || []).map(e=>`

<div class="expense">

🔧 ${e.name}

<br>

${money(e.sum)}

<br>

${e.date}

</div>

`).join("")
}



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

}   

function addCar(){

const employees = getEmployees();


const employeeOptions =
employees.map(emp=>`

<option>
${emp.name}
</option>

`).join("");


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


<select id="manager">

<option>
Без ответственного
</option>

${employeeOptions}

</select>


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

const brand =
document.getElementById("brand").value;


const model =
document.getElementById("model").value;


const buy =
document.getElementById("buy").value;


if(!brand || !model || !buy){

alert("Заполните марку, модель и цену покупки");

return;

}


const cars = getCars();


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

history:[
{
type:"Создание",
text:"Автомобиль добавлен в склад",
date:new Date().toLocaleDateString()
}
],

dateCreated:new Date().toLocaleDateString(),

});


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


showCars();

}



function openCar(index){

const cars = getCars();

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

<p>
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
${
car.sell
?
money(car.sell - car.buy - car.costs)
:
"Не продан"
}
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
<hr>

<h2>
📜 История автомобиля
</h2>


${
(car.history || []).map(h=>`

<p>

📌 ${h.type}

<br>

${h.text}

<br>

${h.date}

</p>

`).join("")
}

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

const cars = getCars();


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
if(!cars[index].history){

cars[index].history=[];

}


cars[index].history.push({

type:"Расход",

text:
name+" "+money(sum),

date:
new Date().toLocaleDateString()

});

cars[index].costs =
Number(cars[index].costs)+sum;


localStorage.setItem(
"cars",
JSON.stringify(cars)
);


openCar(index);

}
function deleteCar(index){

let cars = getCars();

if(confirm("Удалить этот автомобиль?")){

cars.splice(index,1);

localStorage.setItem(
"cars",
JSON.stringify(cars)
);

showCars();
}

}function showFinance(){

const cars = getCars();


let totalBuy = 0;
let totalCosts = 0;
let totalSell = 0;


cars.forEach(car=>{

totalBuy += Number(car.buy) || 0;

totalCosts += Number(car.costs) || 0;

if(car.sell){

totalSell += Number(car.sell);

}

});


const profit =
cars
.filter(car=>car.sell)
.reduce(
(sum,car)=>
sum + Number(car.sell)
- Number(car.buy)
- Number(car.costs),
0
);



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
${car.sell ? money(car.sell - car.buy - car.costs) : "Не продан"}
</p>


</div>


`).join("")

}



<button onclick="location.reload()">
Назад
</button>


</div>

`;

}function showEmployees(){

const employees = getEmployees();


app.innerHTML = `

<div class="dashboard">


<h1>
👥 Сотрудники
</h1>


<button onclick="addEmployee()">
➕ Добавить сотрудника
</button>


<div class="request-list">


${
employees.length === 0 ?

"<p>Сотрудников пока нет</p>"

:

employees.map((emp,index)=>`

<div class="request-card">


<h3>
${emp.name}
</h3>


<p>
Роль:
${emp.role}
</p>


<p>
Телефон:
${emp.phone}
</p>


<button onclick="deleteEmployee(${index})">
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

}function addEmployee(){

app.innerHTML = `

<div class="dashboard">

<h1>
➕ Новый сотрудник
</h1>


<input id="empName"
placeholder="Имя">


<input id="empRole"
placeholder="Должность">


<input id="empPhone"
placeholder="Телефон">


<button onclick="saveEmployee()">
Сохранить
</button>


<button onclick="showEmployees()">
Назад
</button>


</div>

`;

}function saveEmployee(){

const employees = getEmployees();

if(!document.getElementById("empName").value){

alert("Введите имя сотрудника");

return;

}
employees.push({

name:
document.getElementById("empName").value,

role:
document.getElementById("empRole").value,

phone:
document.getElementById("empPhone").value

});


localStorage.setItem(
"employees",
JSON.stringify(employees)
);


showEmployees();

}function deleteEmployee(index){

let employees = getEmployees();


if(!confirm("Удалить сотрудника?")){
return;
}


employees.splice(index,1);


localStorage.setItem(
"employees",
JSON.stringify(employees)
);


showEmployees();

}function showDeals(){

const deals =
JSON.parse(localStorage.getItem("deals")) || [];


app.innerHTML = `

<div class="dashboard">

<h1>
🤝 Сделки PurBuyAuto X
</h1>


<button onclick="addDeal()">
➕ Новая сделка
</button>


<div class="request-list">


${
deals.length === 0 ?

"<p>Сделок пока нет</p>"

:

deals.map((deal,index)=>`

<div class="request-card">


<h3>
#${deal.id}
${deal.client}
</h3>


<p>
🚗 Авто:
${deal.car}
</p>

<p>
📞 Телефон:
${deal.phone || "Нет"}
</p>

<p>
📋 Заявка:
${deal.requestId || "Ручная сделка"}
</p>
<p>
Тип:
${
deal.requestId 
?
"Из заявки"
:
"Создана вручную"
}
</p>
<p>
💰 Покупка:
${money(deal.buyPrice)}
</p>


<p>
💵 Продажа:
${money(deal.sellPrice)}
</p>


<p>
📈 Прибыль:
${money(deal.profit)}
</p>


<p>
👤 Менеджер:
${deal.manager}
</p>


<select onchange="changeDealStatus(${index}, this.value)">

<option ${deal.status==="Новая"?"selected":""}>
Новая
</option>

<option ${deal.status==="Связались"?"selected":""}>
Связались
</option>

<option ${deal.status==="Осмотр"?"selected":""}>
Осмотр
</option>

<option ${deal.status==="Торг"?"selected":""}>
Торг
</option>

<option ${deal.status==="Куплено"?"selected":""}>
Куплено
</option>

<option ${deal.status==="Продано"?"selected":""}>
Продано
</option>

<option ${deal.status==="Отказ"?"selected":""}>
Отказ
</option>

</select>

<p>
📅 Дата:
${deal.date}
</p>

<button onclick="deleteDeal(${index})">
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
function changeDealStatus(index,status){

const deals =
JSON.parse(localStorage.getItem("deals")) || [];


deals[index].status = status;

deals[index].profit =
Number(deals[index].sellPrice)
-
Number(deals[index].buyPrice);

localStorage.setItem(
"deals",
JSON.stringify(deals)
);


if(status === "Продано"){

updateCarAfterDeal(
deals[index]
);

}


showDeals();

}
function addDeal(){

const employees = getEmployees();


const employeeOptions =
employees.map(emp=>`

<option>
${emp.name}
</option>

`).join("");


app.innerHTML=`

<div class="dashboard">

<h1>
➕ Новая сделка
</h1>


<input id="dealClient"
placeholder="Клиент">


<select id="dealCar">

<option value="">
Выберите автомобиль
</option>

${

getCars().map((car,index)=>`

<option value="${index}">
${car.brand} ${car.model} | VIN ${car.vin || "нет"}

</option>

`).join("")

}

</select>


<input id="dealBuy"
placeholder="Цена покупки">


<input id="dealSell"
placeholder="Цена продажи">


<select id="dealManager">

<option>
Без менеджера
</option>

${employeeOptions}

</select>


<select id="dealStatus">

<option>
Новая
</option>

<option>
Связались
</option>

<option>
Осмотр
</option>

<option>
Торг
</option>

<option>
Куплено
</option>

<option>
Продано
</option>

<option>
Отказ
</option>

<option>
Завершена
</option>



</select>


<button onclick="saveDeal()">
Создать сделку
</button>


<button onclick="showDeals()">
Назад
</button>


</div>

`;

}function saveDeal(){

const deals =
JSON.parse(localStorage.getItem("deals")) || [];


const buy =
Number(document.getElementById("dealBuy").value);


const sell =
Number(document.getElementById("dealSell").value);
const client =
document.getElementById("dealClient").value;


const car =
document.getElementById("dealCar").value;
if(car === ""){

alert("Выберите автомобиль");

return;

}
const carIndex =
Number(
document.getElementById("dealCar").value
);


const selectedCar =
getCars()[carIndex];


if(!client || !buy){

alert("Заполните клиента и цену покупки");

return;

}


if(sell && sell < buy){

alert("Цена продажи не может быть ниже покупки");

return;

}


deals.push({

id:
Date.now(),

client: client,

carId: carIndex,

car:
selectedCar
?
selectedCar.brand+" "+selectedCar.model
:
"Без автомобиля",

buyPrice:
buy,

sellPrice:
sell,

profit:
sell-buy,


manager:
document.getElementById("dealManager").value,

status:
document.getElementById("dealStatus").value,

date:
new Date().toLocaleDateString()

});


localStorage.setItem(
"deals",
JSON.stringify(deals)
);


const newDeal =
deals[deals.length - 1];


if(newDeal.status === "Продано"){

updateCarAfterDeal(newDeal);

}


showDeals();

}
function deleteDeal(index){

let deals =
JSON.parse(localStorage.getItem("deals")) || [];


if(!confirm("Удалить сделку?")){
return;
}


deals.splice(index,1);


localStorage.setItem(
"deals",
JSON.stringify(deals)
);


showDeals();

}

function createDealFromRequest(index){

const requests =
JSON.parse(localStorage.getItem("requests")) || [];


const request = requests[index];


const deals =
JSON.parse(localStorage.getItem("deals")) || [];


const exists =
deals.find(
deal => deal.requestId === request.id
);


if(exists){

alert("По этой заявке уже существует сделка");

return;

}


deals.push({

id:
Date.now(),

requestId:
request.id,

carId:
null,

client:
request.client,

phone:
request.phone,

car:
request.car,

buyPrice:
0,

sellPrice:
0,

profit:
0,

manager:
request.manager || "Без менеджера",

status:
"Новая",

date:
new Date().toLocaleDateString()

});


localStorage.setItem(
"deals",
JSON.stringify(deals)
);


alert("Сделка создана");


showDeals();

}
function updateCarAfterDeal(deal){

const cars = getCars();


if(deal.carId === null || deal.carId === undefined){

return;

}


const car = cars[deal.carId];


if(!car){

return;

}


// записываем продажу

car.sell = deal.sellPrice;


// меняем статус

car.status = "⚫ Продан";
if(!car.history){

car.history=[];

}


if(
!car.history.some(
h=>h.type==="Продажа"
)
){

car.history.push({

type:"Продажа",

text:
"Продан за "+money(deal.sellPrice),

date:
new Date().toLocaleDateString()

});

}
car.saleDate =
new Date().toLocaleDateString();


// сохраняем

localStorage.setItem(
"cars",
JSON.stringify(cars)
);

}function showClients(){

const clients = getClients();


app.innerHTML=`

<div class="dashboard">

<h1>
👤 Клиенты PurBuyAuto X
</h1>


<button onclick="location.reload()">
Назад
</button>


<div class="request-list">


${
clients.length===0

?

"<p>Клиентов пока нет</p>"

:

clients.map((client,index)=>`

<div class="request-card">

<h3>
${client.name}
</h3>


<p>
📞 ${client.phone}
</p>


<p>
Заявок:
${client.history ? client.history.length : 0}
</p>


<button onclick="openClientCard(${index})">
Открыть
</button>


</div>


`).join("")

}


</div>


</div>

`;

}function openClientCard(index){

const clients=getClients();

const client=clients[index];


app.innerHTML=`

<div class="dashboard">


<h1>
👤 ${client.name}
</h1>


<p>
📞 ${client.phone}
</p>


<hr>


<h2>
История
</h2>
<button onclick="addClientEvent(${index})">
➕ Добавить событие
</button>

${
(client.history||[]).map(h=>`

<p>

📌 ${h.type}

<br>

${h.text}

<br>

${h.date}

</p>

`).join("")
}


<button onclick="showClients()">
Назад
</button>


</div>

`;

}function addClientEvent(index){

const clients = getClients();

const client = clients[index];


app.innerHTML=`

<div class="dashboard">

<h1>
➕ Новое событие
</h1>


<select id="eventType">

<option>
☎ Звонок
</option>

<option>
💬 Сообщение
</option>

<option>
🚗 Осмотр
</option>

<option>
🤝 Встреча
</option>

<option>
📝 Комментарий
</option>

</select>


<textarea id="eventText"
placeholder="Комментарий"></textarea>


<button onclick="saveClientEvent(${index})">
Сохранить
</button>


<button onclick="openClientCard(${index})">
Назад
</button>


</div>

`;

}function saveClientEvent(index){

const clients = getClients();


const type =
document.getElementById("eventType").value;


const text =
document.getElementById("eventText").value;


if(!text){

alert("Введите комментарий");

return;

}


if(!clients[index].history){

clients[index].history=[];

}


clients[index].history.push({

type:type,

text:text,

date:new Date().toLocaleDateString()

});


localStorage.setItem(
"clients",
JSON.stringify(clients)
);


openClientCard(index);

}function showTasks(){

const tasks=getTasks();


app.innerHTML=`

<div class="dashboard">

<h1>
📋 Задачи
</h1>


<button onclick="addTask()">
➕ Новая задача
</button>


<div class="request-list">


${
tasks.length===0

?

"<p>Задач пока нет</p>"

:

tasks.map((task,index)=>`

<div class="request-card">

<h3>
${task.title}
</h3>


<p>
👤 Клиент:
${task.client}
</p>


<p>
Ответственный:
${task.employee}
</p>


<p>
📅 ${task.date}
</p>
<p>
Тип:
${task.type || "Обычная задача"}
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

}function addTask(){

const employees=getEmployees();


app.innerHTML=`

<div class="dashboard">

<h1>
➕ Новая задача
</h1>


<input id="taskTitle"
placeholder="Название задачи">


<input id="taskClient"
placeholder="Клиент">


<select id="taskEmployee">

<option>
Без сотрудника
</option>

${employees.map(e=>`

<option>
${e.name}
</option>

`).join("")}

</select>


<input id="taskDate"
placeholder="Дата контакта">


<button onclick="saveTask()">
Сохранить
</button>


<button onclick="showTasks()">
Назад
</button>


</div>

`;

}function saveTask(){

const tasks=getTasks();
const title =
document.getElementById("taskTitle").value;


if(!title){

alert("Введите название задачи");

return;

}

tasks.push({

id:Date.now(),

title:title,

client:
document.getElementById("taskClient").value,

employee:
document.getElementById("taskEmployee").value,

date:
document.getElementById("taskDate").value,

status:
"Новая"

});


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}

function completeTask(index){

const tasks = getTasks();


if(!tasks[index]){
return;
}


tasks[index].status = "Выполнено";


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}function openClientCardByRequest(index){

const requests =
JSON.parse(localStorage.getItem("requests")) || [];

const clients=getClients();


const request=requests[index];


const clientIndex =
clients.findIndex(
c=>c.id===request.clientId
);


if(clientIndex===-1){

alert("Клиент не найден");

return;

}


openClientCard(clientIndex);

}

function deleteTask(index){

const tasks = getTasks();


if(!confirm("Удалить задачу?")){
return;
}


tasks.splice(index,1);


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


showTasks();

}

function createTaskFromRequest(request){

const tasks = getTasks();


tasks.push({

id: Date.now(),

title:
"Позвонить клиенту: " + request.client,

client:
request.client,

employee:
request.manager || "Без ответственного",

date:
new Date().toLocaleDateString(),

type:
"Новая заявка",

requestId:
request.id,

status:
"Новая"

});


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}