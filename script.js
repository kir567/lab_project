// Ждем полной загрузки DOM структуры, чтобы скрипт точно увидел все теги
document.addEventListener("DOMContentLoaded", function () {

    // --- ИНТЕРАКТИВНОСТЬ: Приветствие по клику ---
    const greetButton = document.getElementById('greetBtn');
    const text = document.getElementById('greetText');
    if (greetButton && text) {
        greetButton.addEventListener('click', function() {
            text.textContent = "Привет! Вы только что кликнули на кнопку!";
        });
    }

    // --- ИНТЕРАКТИВНОСТЬ: Изменение цвета при наведении ---
    const hoverText = document.getElementById('hoverText');
    if (hoverText) {
        hoverText.addEventListener('mouseover', function() {
            hoverText.style.color = 'red';
            hoverText.style.fontWeight = 'bold';
        });
        hoverText.addEventListener('mouseout', function() {
            hoverText.style.color = 'black';
            hoverText.style.fontWeight = 'normal';
        });
    }

    // --- ИНТЕРАКТИВНОСТЬ: Показать / Скрыть блок ---
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            if (sidebar.style.display === 'none' || sidebar.style.display === '') {
                sidebar.style.display = 'block';
            } else {
                sidebar.style.display = 'none';
            }
        });
    }

    // --- ИНТЕРАКТИВНОСТЬ: Динамическая форма ---
    const form = document.getElementById('dynamicForm');
    const output = document.getElementById('output');
    if (form && output) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            output.innerHTML = `<p><strong>${name}</strong> пишет: ${message}</p>`;
            form.reset();
        });
    }

    // --- ОБЪЕКТ JAVASCRIPT ---
    const user = {
        name: "Иван",
        age: 25,
        role: "Студент",
        greet: function() {
            return `Привет, меня зовут ${this.name}, мне ${this.age} лет, я ${this.role}.`;
        }
    };
    const userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
        userInfoEl.textContent = user.greet();
    }

    // --- ЗАМЫКАНИЕ: Счётчик кликов ---
    function createCounter() {
        let count = 0;
        return function() {
            count++;
            return count;
        };
    }
    const counter = createCounter();
    const clickButton = document.getElementById('clickBtn');
    const countDisplay = document.getElementById('count');
    if (clickButton && countDisplay) {
        clickButton.addEventListener('click', function() {
            countDisplay.textContent = counter();
        });
    }

    // ==========================================
    // БЛОК ЛАБОРАТОРНОЙ РАБОТЫ (REST API)
    // ==========================================

    // 🔸 Задание 1: Получение данных через AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://typicode.com");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Задание 1 (AJAX) данные получены:", data);
        }
    };
    xhr.send();

    // 🔸 Задание 2: Получение данных через Fetch API
    fetch("https://typicode.com")
        .then(response => response.json())
        .then(data => console.log("Задание 2 (Fetch API) данные получены:", data))
        .catch(error => console.error("Ошибка в Задании 2:", error));

    // 🔸 Задание 3: Отправка POST-запроса через Fetch API
    fetch("https://typicode.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Новая запись Snickers",
            body: "Текст тестовой записи",
            userId: 1
        })
    })
    .then(response => response.json())
    .then(data => console.log("Задание 3 (POST-запрос) ответ сервера:", data))
    .catch(error => console.error("Ошибка в Задании 3:", error));

    // 🔸 Задание 4: Вывод данных на HTML-страницу (Ограничение 5 постов)
    const list = document.getElementById("posts");
    if (list) {
        fetch("https://typicode.com?_limit=5")
            .then(res => {
                if (!res.ok) throw new Error("Сбой сети");
                return res.json();
            })
            .then(data => {
                list.innerHTML = ""; // Очищаем список перед выводом
                data.forEach(post => {
                    const li = document.createElement("li");
                    li.textContent = post.title;
                    list.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Ошибка в Задании 4:", error);
                list.innerHTML = `<li style="color:red;">Не удалось загрузить постов: ${error.message}</li>`;
            });
    }

});
