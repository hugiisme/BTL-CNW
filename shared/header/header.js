var navLinks = document.querySelectorAll('.menu > li > a');

function handleNavLinkClick(event) {
    event.preventDefault();
    
    // tìm item đang active
    var activeElement = document.querySelector('.active');
    
    // nếu item đó tồn tại, loại bỏ class active ra khỏi item
    if (activeElement) {
        activeElement.classList.remove('active');
    }
    
    // thêm class active vào item vừa click
    event.target.classList.add('active');
}
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));


document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../shared/logout.php";
    // vì header.html được include bởi file php nên đường dẫn tới logout phải xét theo vị trí của file php đã include nó
});