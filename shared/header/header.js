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

    // vì thông tin tài khoản là trong account.php nằm trong submenu chứ không nằm trong navList nên xử lý riêng
    if (currentPath.includes('account.php')) {
        document.querySelector('.menu > li > a[href="#"]').classList.add("active");
    }
}

highlightCurrentPage();

document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../shared/logout.php";
    // vì header.html được include bởi file php nên đường dẫn tới logout phải xét theo vị trí của file php đã include nó
});