
const greetButton = document.getElementById('greetBtn');
const text = document.getElementById('greetText');
if (greetButton && text) {
    greetButton.addEventListener('click', function() {
        text.textContent = "Привет! Вы только что кликнули на кнопку!";
    });
}
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

const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    });
}

const form = document.getElementById('dynamicForm');
const output = document.getElementById('output');
if (form && output) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        output.innerHTML = ` <p><strong>${name}</strong> пишет: ${message}</p> `;
        form.reset();
    });
}

const user = {
    name: "Иван",
    age: 25,
    role: "Студент",
    greet: function() {
        return `Привет, меня зовут ${this.name}, мне ${this.age} лет, я ${this.role}.`;
    }
};
if (document.getElementById('userInfo')) {
    document.getElementById('userInfo').textContent = user.greet();
}

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
        const currentCount = counter();
        countDisplay.textContent = currentCount;
    });
}

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
xhr.onload = function () {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Задание 1 (AJAX) данные получены:", data);
    }
};
xhr.send();

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log("Задание 2 (Fetch API) данные получены:", data))
    .catch(error => console.error("Ошибка во Fetch:", error));

fetch("https://jsonplaceholder.typicode.com/posts", {
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
.then(data => console.log("Задание 3 (POST-запрос) ответ сервера:", data));

fetch("https://typicode.com")
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
