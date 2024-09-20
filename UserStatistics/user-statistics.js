var currentUser = null;
var timeOut = null;
var currentColumn = "name";
var sortOrder = "asc";
var cachedUsers = [];

document.addEventListener("DOMContentLoaded", () => { // DomContentLoaded đảm bảo ngay sau khi load html xong thì sẽ chạy JS
    loadUsers();
    initializeEventListeners();
})

function initializeEventListeners(){
    // nút đóng của cửa sổ popup
    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("pop-up").style.display = "none";
    });

    // nút xóa trong cửa sổ popup
    document.getElementById("delete-btn").addEventListener("click", () => {
        if (currentUser) {
            deleteUser(currentUser.name);
        }
    });

    // nút submit trong cửa sổ popup
    document.getElementById("submit-btn").addEventListener("click", () => {
        if (currentUser) {
            var newRole = document.getElementById("role-selection").value;
            updateUser(currentUser.name, newRole);
        }
    });

    document.getElementById("search-content").addEventListener("input", () => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            cachedUsers = [];  // xóa cache
            loadUsers();
        }, 300);
        // set timeout 300ms, nếu trong 300ms mà người dùng thay đổi input thì cancel lần gọi hàm trước đó và reset timer
        // phải có nếu không sẽ có quá nhiều request gửi đến server tạo bug duplicate user
    }); // input để có thể load ngay khi người dùng thay đổi input

    document.getElementById("search-by").addEventListener("change", () => {
        cachedUsers = [];  // xóa cache để reload data
        loadUsers();
    });
    
    document.getElementById("filter-by").addEventListener("change", () => {
        cachedUsers = [];  // xóa cache để reload data
        loadUsers();
    });
    

    document.querySelectorAll("th:not(:last-child)").forEach(header => {
        header.addEventListener("click", () => {
            document.querySelectorAll("th:not(:last-child)").forEach(th => {
                th.classList.remove("choosen");
                th.querySelector(".sort-arrow").textContent = ''; 
            });
            header.classList.add("choosen");
            
            if(currentColumn != header.getAttribute("data-column")){
                sortOrder = "asc";
            } else {
                sortOrder = sortOrder == "asc" ? "desc" : "asc";
            }

            var arrow = sortOrder === "asc" ? "↑" : "↓";
            header.querySelector(".sort-arrow").textContent = arrow;

            currentColumn = header.getAttribute("data-column");
            loadUsers();
        })
    });
}

function loadUsers() {
    var searchBy = document.getElementById("search-by").value;
    var searchContent = document.getElementById("search-content").value;
    var filterBy = document.getElementById("filter-by").value;

    if (cachedUsers.length === 0) {
        fetch(`user_info.php?search_by=${searchBy}&search_content=${searchContent}&filter_by=${filterBy}`)
            .then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                    return;
                }
                cachedUsers = data;  // gán cache bằng data
                // nếu không sử dụng cache thì mỗi lần thay sort bảng sẽ bị flick nhấp nháy vì phải fetch và đẩy lại dữ liệu trong khi sort không làm thay đổi các phần tử mà chỉ thay đổi thứ tự phần tử
                displayUsers(cachedUsers); // vì dùng cache nên phải tạo hàm riêng để tránh reload bảng
            });
    } else {
        displayUsers(cachedUsers);  // nếu đã có user trong cache thì hiển thị luôn không fetch
    }
}

function displayUsers(users) {
    var tableBody = document.getElementById("user-table-body"); // dùng tbody để khi xóa output cũ không bị xóa tiêu đề
    tableBody.innerHTML = '';  // xóa output cũ

    if (users.length === 0) {
        document.getElementById("table-empty-message").style.display = "block";
        document.getElementById("user-table").style.display = "none";
        return;
    } else {
        document.getElementById("table-empty-message").style.display = "none"; 
        document.getElementById("user-table").style.display = "table";
    }
    // sắp xếp, chọn sắp xếp bằng js để không cần phải đẩy dữ liệu và lấy dữ liệu từ server liên tục
    // cần xem lại
    if (currentColumn !== null && sortOrder !== null) {
        users.sort((a, b) => {
            var valueA = a[currentColumn];
            var valueB = b[currentColumn];

            if (currentColumn === 'user_id') {
                valueA = parseInt(valueA);
                valueB = parseInt(valueB);
            }
            if (currentColumn === 'create_at' || currentColumn === 'update_at') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
            }

            return (sortOrder === "asc") ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
        });
    }

    // Populate the table
    users.forEach(user => {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.user_id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.email}</td>
            <td>${user.create_at}</td>
            <td>${user.update_at}</td>
            <td><button class="edit-btn"
                data-id=${user.user_id}
                data-name=${user.name}
                data-role=${user.role}
            >Chỉnh sửa</button></td>
        `;
        tableBody.appendChild(row);
    });

    // nút chỉnh sửa sẽ mở ra trang popup thông tin tương ứng của người dùng đã chọn
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            var button = event.target;
            var userId = button.getAttribute("data-id");
            var name = button.getAttribute("data-name");
            var role = button.getAttribute("data-role");

            currentUser = { userId, name, role };
            openEdit(userId, name, role);
        });
    });
}


function openEdit(id, name, role){
    document.getElementById("user-id").textContent = "Id: " + id;
    document.getElementById("user-name").textContent = "Tên người dùng: " + name;
    document.getElementById("role-selection").value = role; 

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
            cachedUsers = cachedUsers.filter(user => user.name !== name);
            loadUsers();
            document.getElementById("pop-up").style.display = "none";
        })
}