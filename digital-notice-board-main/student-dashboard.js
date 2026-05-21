let notices = JSON.parse(localStorage.getItem("notices")) || [];

function loadData() {
    notices = JSON.parse(localStorage.getItem("notices")) || [];
}

loadData();
// displayNotices(notices);

function displayNotices(data) {
    let container = document.getElementById("student-container");
    container.innerHTML = "";

    let today = new Date();

    data.forEach(function(notice) {
        if (new Date(notice.date) < today) return;

        let div = document.createElement("div");

        div.innerHTML = `
            <h3>${notice.category}</h3>
            <p><b>Department:</b> ${notice.department}</p>
            <p>${notice.message}</p>
            <p>Expiry Date: ${notice.date}</p>
            <p>Status: ${notice.read ? "Read" : "Unread"}</p>
            <button onclick="readNotice(${notice.id})">Read</button>
        `;

        container.appendChild(div);
    });
}

function filterNotices() {
    loadData();

    let dept = document.getElementById("student-dept").value;

    if (dept === "All") {
        displayNotices(notices);
    } else {
        let filtered = notices.filter(n => n.department === dept);
        displayNotices(filtered);
    }
}

function filterCategory() {
    loadData();

    let cat = document.getElementById("student-category").value;

    if (cat === "All") {
        displayNotices(notices);
    } else {
        let filtered = notices.filter(n => n.category === cat);
        displayNotices(filtered);
    }
}

function searchNotice() {
    loadData();

    let text = document.getElementById("search").value.toLowerCase();

    let filtered = notices.filter(n =>
        n.message.toLowerCase().includes(text)
    );

    displayNotices(filtered);
}

function readNotice(id) {
    let notice = notices.find(n => n.id === id);

    if (notice) {
        notice.read = true;
        localStorage.setItem("notices", JSON.stringify(notices));
        displayNotices(notices);
    }
}