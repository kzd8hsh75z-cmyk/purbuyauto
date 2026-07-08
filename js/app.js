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
            <button>Автомобили</button>
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
                    </div>
                `).join("")}
            </div>

            <button onclick="showNewRequest()">Новая заявка</button>
            <button class="dark" onclick="location.reload()">Назад</button>
        </div>
    `;
}