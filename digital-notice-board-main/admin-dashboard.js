let form = document.getElementById("notice-form");

let notices = JSON.parse(localStorage.getItem("notices")) || [];
let archived = JSON.parse(localStorage.getItem("archived")) || [];

function loadData() {
    notices = JSON.parse(localStorage.getItem("notices")) || [];
    archived = JSON.parse(localStorage.getItem("archived")) || [];
}

function saveData() {
    localStorage.setItem("notices", JSON.stringify(notices));
    localStorage.setItem("archived", JSON.stringify(archived));
}

autoArchive();
displayNotices();
displayArchived();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let category = document.getElementById("category").value;
    let dept = document.getElementById("department").value;
    let message = document.getElementById("message").value;
    let date = document.getElementById("expiry").value;

    // validation
    if (message.trim() === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    let notice = {
        id: Date.now(),
        category,
        department: dept,
        message,
        date,
        read: false
    };

    notices.push(notice);
    saveData();

    autoArchive();
    displayNotices();
    displayArchived();

    form.reset();
});

function displayNotices() {
    loadData();

    let container = document.getElementById("notice-container");
    container.innerHTML = "";

    notices.forEach(function(notice) {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${notice.category}</h3>
            <p><b>Department:</b> ${notice.department}</p>
            <p>${notice.message}</p>
            <p>Date: ${notice.date}</p>
            <button onclick="deleteNotice(${notice.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function displayArchived() {
    loadData();

    let container = document.getElementById("archive-container");
    container.innerHTML = "";

    archived.forEach(function(notice) {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${notice.category}</h3>
            <p><b>Department:</b> ${notice.department}</p>
            <p>${notice.message}</p>
            <p>Date: ${notice.date}</p>
            <button onclick="deleteArchived(${notice.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function deleteNotice(id) {
    notices = notices.filter(n => n.id !== id);
    saveData();
    displayNotices();
}

function autoArchive() {
    let today = new Date();

    let active = [];
    let newArchived = archived || [];

    notices.forEach(n => {
        if (new Date(n.date) < today) {
            newArchived.push(n);
        } else {
            active.push(n);
        }
    });

    notices = active;
    archived = newArchived;

    saveData();
}
function deleteArchived(id) {
    archived = archived.filter(n => n.id !== id);
    localStorage.setItem("archived", JSON.stringify(archived));
    displayArchived();
}