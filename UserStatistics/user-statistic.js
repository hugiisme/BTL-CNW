var currentUser = null;
var timeOut = null;

document.addEventListener("DOMContentLoaded", () => {// DomContentLoaded đảm bảo ngay sau khi load html xong thì sẽ chạy JS
    loadUsers();
    initializeEventListeners()
});

function initializeEventListeners(){
    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("pop-up").style.display = "none";
    });

    document.getElementById("delete-btn").addEventListener("click", () => {
        if (currentUser) {
            deleteUser(currentUser.username);
        }
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
        if (currentUser) {
            const newRole = document.getElementById("role-selection").value;
            updateUser(currentUser.username, newRole);
        }
    });

    document.getElementById("search").addEventListener("input", () => {
        clearTimeout(timeOut);
        timeOut = setTimeout(loadUsers, 300); // set timeout 300ms, nếu trong 300ms mà người dùng thay đổi input thì cancel lần gọi hàm trước đó và reset timer
        // phải có nếu không sẽ có quá nhiều request gửi đến server tạo bug duplicate user
    }); // input để có thể load ngay khi người dùng thay đổi input

    document.getElementById("role-selection-filter").addEventListener("change", loadUsers);
    document.getElementById("sort-by-name").addEventListener("change", loadUsers);
}

function loadUsers(){
    var query = document.getElementById("search").value;
    var roleFilter = document.getElementById("role-selection-filter").value;
    var sortOrder = document.getElementById("sort-by-name").value;
    var tableBody = document.getElementById("user-table-body"); // dùng tbody để khi xóa output cũ không bị xóa tiêu đề
    tableBody.innerHTML = ''; // xóa output cũ

    fetch(`user_info.php?query=${query}&role=${roleFilter}&sort=${sortOrder}`)
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
                return;
            }
            data.forEach(user => {
                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td><button class="edit-btn" data-id="${user.id}" data-username="${user.username}" data-role="${user.role}">Chỉnh sửa</button></td>
                `;
                tableBody.appendChild(row);

                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", (event) => {
                        var button = event.target; // lấy nút hiện tại
                        var userId = button.getAttribute("data-id");
                        var username = button.getAttribute("data-username");
                        var role = button.getAttribute("data-role");

                        currentUser = {userId, username, role};
                        openEdit(userId, username, role);
                    });
                });     
            });
        })
}

function openEdit(id, username, role){
    document.getElementById("user-id").textContent = "Id: " + id;
    document.getElementById("user-name").textContent = "Tên người dùng: " + username;
    document.getElementById("role-selection").value = role; 

    document.getElementById("pop-up").style.display = "flex"; 
}

function deleteUser(username) {
    fetch("edit_control.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            action: "delete"
        })
        
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == "error"){
                alert(data.message);
                return;
            }

            confirm(data.message);
            loadUsers();
            document.getElementById("pop-up").style.display = "none";
        })
}

function updateUser(username, newRole){
    fetch("edit_control.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            action: "update",
            role: newRole
        })
    })
        .then(response => response.json())
        .then(data => {
            if(data.status == "error"){
                alert(data);
                return;
            }
            confirm(data.message);
            loadUsers();
            document.getElementById("pop-up").style.display = "none";
        })
}