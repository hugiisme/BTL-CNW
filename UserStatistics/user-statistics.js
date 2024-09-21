var currentUser = null;
var timeOut = null;
var currentColumn = "user_id";
var sortOrder = "asc";
var page = 0;
var limit = 10;
var totalResult = 0;

// cần xử lý nút và input cho page

document.addEventListener("DOMContentLoaded", () => { // DomContentLoaded đảm bảo ngay sau khi load html xong thì sẽ chạy JS
    document.getElementById("page").value = page + 1;
    loadUsers();
    initializeEventListeners();
})

function initializeEventListeners(){
    document.getElementById("prev-btn").addEventListener("click", () => {
        if (page > 0) {
            page--;
            document.getElementById("page").value = page + 1;
            loadUsers();
        }
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        if ((page + 1) * limit < totalResult) {
            page++;
            document.getElementById("page").value = page + 1;
            loadUsers();
        }
    });

    // input đổi trang
    document.getElementById("page").addEventListener("change", () => {
        let inputPage = parseInt(document.getElementById("page").value) - 1;  // Subtract 1 to convert to zero-indexed page number

        if (isNaN(inputPage)) {
            alert("Số trang không hợp lệ");
            document.getElementById("page").value = page + 1;  // Reset to the current page
            return;
        }

        if (inputPage >= 0 && inputPage * limit < totalResult) {
            page = inputPage;
            loadUsers();
        } else {
            alert("Số trang vượt quá phạm vi");
            document.getElementById("page").value = page + 1;  // Reset to the current page
        }
        loadUsers();
        updatePageButton();
    })

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
        timeOut = setTimeout(loadUsers, 300);
        // set timeout 300ms, nếu trong 300ms mà người dùng thay đổi input thì cancel lần gọi hàm trước đó và reset timer
        // phải có nếu không sẽ có quá nhiều request gửi đến server tạo bug duplicate user
    }); // input để có thể load ngay khi người dùng thay đổi input

    document.getElementById("search-by").addEventListener("change", () => {
        loadUsers();
    });
    
    document.getElementById("filter-by").addEventListener("change", () => {
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
    var pageNumber = document.getElementById("page").value;
    
    fetch(`user_info.php?search_by=${searchBy}&search_content=${searchContent}&filter_by=${filterBy}&page=${pageNumber}&limit=${limit}&sort_order=${sortOrder}&sort_by=${currentColumn}`)
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
                return;
            }
            totalResult = data.total;
            // nếu không sử dụng cache thì mỗi lần thay sort bảng sẽ bị flick nhấp nháy vì phải fetch và đẩy lại dữ liệu trong khi sort không làm thay đổi các phần tử mà chỉ thay đổi thứ tự phần tử
            document.getElementById("total-result").textContent = "Tổng số kết quả: " + totalResult;    
            
            displayUsers(data.users); // vì dùng cache nên phải tạo hàm riêng để tránh reload bảng
            updatePageButton(); 
        });
    
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
                data-id="${user.user_id}"
                data-name="${user.name}"
                data-role="${user.role}"
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
            loadUsers();
            document.getElementById("pop-up").style.display = "none";
        })
}

function updatePageButton() {
    document.getElementById("prev-btn").disabled = (page === 0);
    document.getElementById("next-btn").disabled = ((page + 1) * limit >= totalResult);
}
