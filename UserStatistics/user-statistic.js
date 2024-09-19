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
            deleteUser(currentUser.name);
        }
    });

    document.getElementById("submit-btn").addEventListener("click", () => {
        if (currentUser) {
            var newRole = document.getElementById("role-selection").value;
            updateUser(currentUser.name, newRole);
        }
    });

    document.getElementById("search").addEventListener("input", () => {
        clearTimeout(timeOut);
        timeOut = setTimeout(loadUsers, 300); // set timeout 300ms, nếu trong 300ms mà người dùng thay đổi input thì cancel lần gọi hàm trước đó và reset timer
        // phải có nếu không sẽ có quá nhiều request gửi đến server tạo bug duplicate user
    }); // input để có thể load ngay khi người dùng thay đổi input

    document.getElementById("role-selection-filter").addEventListener("change", loadUsers);
    document.getElementById("sort-by").addEventListener("change", loadUsers);
    document.getElementById("sort-order").addEventListener("change", loadUsers);
}

function loadUsers(){
    var name = document.getElementById("search").value;
    var roleFilter = document.getElementById("role-selection-filter").value;
    var sortBy = document.getElementById("sort-by").value
    var sortOrder = document.getElementById("sort-order").value;
    var tableBody = document.getElementById("user-table-body"); // dùng tbody để khi xóa output cũ không bị xóa tiêu đề
    tableBody.innerHTML = ''; // xóa output cũ

    fetch(`user_info.php?name=${name}&role=${roleFilter}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
                return;
            }
            data.forEach(user => {
                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.user_id}</td>
                    <td>${user.name}</td>
                    <td>${user.role}</td>
                    <td>${user.email}</td>
                    <td>${user.create_at}</td>
                    <td>${user.update_at}</td>
                    <td><button class="edit-btn" 
                        data-id="${user.user_id}" 
                        data-name="${user.name}" 
                        data-role="${user.role}"
                        data-email="${user.email}"
                        data-create-at="${user.create_at}"
                        data-update-at="${user.update_at}"
                    >Chỉnh sửa</button></td>
                `;
                tableBody.appendChild(row);

                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", (event) => {
                        var button = event.target; // lấy nút hiện tại
                        var userId = button.getAttribute("data-id");
                        var name = button.getAttribute("data-name");
                        var role = button.getAttribute("data-role");
                        var email = button.getAttribute("data-email");
                        var createAt = button.getAttribute("data-create-at");
                        var updateAt = button.getAttribute("data-update-at");

                        currentUser = {userId, name, role, email, createAt, updateAt};
                        openEdit(userId, name, role, email, createAt, updateAt);
                    });
                });    
                if (data.length === 0) {
                    document.getElementById("user-table").style.display = "none";
                    document.getElementById("tbody-empty").style.display = "block";
                } else {
                    document.getElementById("user-table").style.display = "table";
                    document.getElementById("tbody-empty").style.display = "none";
                } 
            });
        })
}

function openEdit(id, name, role, email, create_at, update_at){
    document.getElementById("user-id").textContent = "Id: " + id;
    document.getElementById("user-name").textContent = "Tên người dùng: " + name;
    document.getElementById("user-email").textContent = "Email: " + email;
    document.getElementById("role-selection").value = role; 
    document.getElementById("user-create-at").textContent = "Thời gian tạo: " + create_at;
    document.getElementById("user-update-at").textContent = "Lần chỉnh sửa cuối: " + update_at;

    document.getElementById("pop-up").style.display = "flex"; 
}

function deleteUser(name) {
    fetch("edit_control.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
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

function updateUser(name, newRole){
    fetch("edit_control.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
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