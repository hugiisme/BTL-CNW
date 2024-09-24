document.getElementById("close-create-btn").addEventListener("click", () => {
    document.getElementById("create-major-pop-up").style.display = "none";
})

document.getElementById("create-major-btn").addEventListener("click", () => {
    document.getElementById("create-major-pop-up").style.display = "flex";
})

document.addEventListener("DOMContentLoaded", () => {
    loadTeachers();
})

function loadTeachers(){
    var searchContent = document.getElementById("search-content").value;
    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';  // xóa output cũ

    fetch(`major_info.php?search_content=${searchContent}`)
        .then(response => response.json())
        .then(data => {
            if (data.redirect){
                window.location.href = data.redirect;
                return;
            }

            document.getElementById("total-result").textContent = "Tổng số kết quả: " + data.total;

            if (data.majors.length === 0) {
                document.getElementById("table-empty-message").style.display = "block";
                document.getElementById("major-table").style.display = "none";
                return;
            } else {
                document.getElementById("table-empty-message").style.display = "none"; 
                document.getElementById("major-table").style.display = "table";
            }
        
            data.majors.forEach(major => {
                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${major.major_id}</td>
                    <td>${major.major_name}</td>
                    <td>${major.description}</td>
                    <td>${major.start_date}</td>
                    <td>${major.end_date}</td>
                    <td><button class="edit-btn"
                        data-id="${major.major_id}" 
                        data-name="${major.major_name}"
                        data-start-date="${major.start_date}"
                        data-end-date="${major.end_date}"
                    >Chỉnh sửa</button></td>
                `;
                tableBody.appendChild(row);
            });
            
        })
}