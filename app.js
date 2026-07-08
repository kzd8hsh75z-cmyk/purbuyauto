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

            <button>Новая заявка</button>
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
});