
// ===== НОВАЯ ЛАБОРАТОРНАЯ РАБОТА: СЕТЕВЫЕ ЗАПРОСЫ =====

// 🔸 Задание 1: Получение данных через AJAX (XMLHttpRequest)
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.onload = function () {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Задание 1 (AJAX) данные получены:", data);
    }
};
xhr.send();

// 🔸 Задание 2: Получение данных через Fetch API
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        console.log("Задание 2 (Fetch API) данные получены:", data);
    })
    .catch(error => console.error("Ошибка во втором задании:", error));

// 🔸 Задание 3: Отправка POST-запроса (Изменили данные на свои)
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "Моя лабораторная работа по Fetch",
        body: "Успешно отправленный текст через POST-запрос",
        userId: 567 // Изменили ID под ваш никнейм
    })
})
.then(response => response.json())
.then(data => {
    console.log("Задание 3 (POST-запрос) результат отправки:", data);
});

// 🔸 Задание 4: Вывод данных на страницу (Ограничение до 5 постов)
fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("posts");
        if (list) {
            data.forEach(post => {
                const li = document.createElement("li");
                li.textContent = post.title;
                list.appendChild(li);
            });
        }
    });
