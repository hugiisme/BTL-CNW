fetch("../shared/user_data.php")
    .then (response => response.json())
    .then (data => {
        if (data.role != "admin"){
            Array.from(document.getElementsByClassName("admin-only")).forEach(element => {
                element.style.display = "none";
            });
        } else {
            Array.from(document.getElementsByClassName("admin-only")).forEach(element => {
                element.style.display = "block";
            });
        }
    })

var navLinks = document.querySelectorAll('.menu > li > a:not([href="#"])'); // chỉ xét thẻ a mà có link, né nút tài khoản để xử lý riêng

function highlightCurrentPage() {
    var currentPath = window.location.pathname; // lấy path đầy đủ của file html đang mở 

    navLinks.forEach(link => {
        // reset active khỏi tất cả các thẻ
        link.classList.remove('active');

        // lấy link của từng thẻ <a> qua thuộc tính href
        var linkPath = link.getAttribute('href');
        
        // check nếu currentPath == linkPath (bỏ ../)
        if (currentPath.includes(linkPath.replace('../', ''))) {
            link.classList.add('active'); // nếu trùng thì thêm .active
        } 
    });

    // Xử lý submenu riêng vì không nằm trong navList
    var submenuLinks = document.querySelectorAll('.submenu a');

    submenuLinks.forEach(subLink => {
        if (currentPath.includes(subLink.getAttribute('href').replace('../', ''))) { // nếu trang hiện tại nằm trong submenu
            var parentId = subLink.closest('li').parentElement.previousElementSibling.id; // lấy thẻ li gốc
            document.getElementById(parentId).classList.add('active'); 
        }
    });

}

highlightCurrentPage();

document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../shared/logout.php";
    // vì header.html được include bởi file php nên đường dẫn tới logout phải xét theo vị trí của file php đã include nó
});