# Giới Thiệu Về Dự Án

Đây là dự án xây dựng một website để đăng ký xét tuyển hồ sơ học bạ cho kỳ xét tuyển đại học. Dự án này là bài tập cuối kỳ của môn **COMP307 - Công Nghệ Web**.

## Công Nghệ Sử Dụng
Dự án sử dụng các công nghệ và ngôn ngữ lập trình sau:
- **HTML**: Để xây dựng cấu trúc của các trang web.
- **CSS**: Để thiết kế và định dạng giao diện người dùng.
- **JavaScript**: Để thêm các tính năng tương tác và xử lý sự kiện trên trang web.
- **PHP**: Để xử lý các yêu cầu phía server, kết nối và tương tác với cơ sở dữ liệu.
- **SQL**: Để quản lý và thao tác dữ liệu trong cơ sở dữ liệu.

# Hướng dẫn Cài Đặt Dự Án
## 1. Clone Repo
Bạn có thể thực hiện một trong hai cách sau để sao chép repo về máy:

1. Click vào biểu tượng **Code** màu xanh trên GitHub.
2. Chọn **Download ZIP** để tải về máy và giải nén.
   - Hoặc bạn có thể copy link HTTPS và clone thông qua GitHub Desktop hoặc Git.

## 2. Cài đặt cơ sở dữ liệu

### 1. Mở phpMyAdmin

1. Mở [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/) (Hoặc mở Xampp, khởi chạy MySQL và chọn admin). 

### 2. Tạo Cơ Sở Dữ Liệu Mới

1. Trong giao diện phpMyAdmin, chọn tab **Databases**.
2. Tại mục **Create database**, nhập tên cơ sở dữ liệu là `universityapplicationdb`.
3. Nhấn **Create** để tạo cơ sở dữ liệu mới.

### 3. Nhập Dữ Liệu vào Cơ Sở Dữ Liệu

1. Chọn cơ sở dữ liệu `universityapplicationdb` mà bạn vừa tạo.
2. Chọn tab **Import**.
3. Trong mục **File to import**, nhấn **Choose File** và chọn file `universityapplicationdb.sql` từ thư mục `Database` của dự án.
4. Nhấn **Go** để bắt đầu quá trình nhập dữ liệu.

## Hoàn Tất

# Giới thiệu từng trang
> TODO: Thêm chức năng chi tiết của từng trang, cách chúng xử lý và gửi thông tin
## Trang đăng nhập
Yêu cầu: Đã sở hữu tài khoản

## Trang đăng ký

## Trang chủ
### Admin
Yêu cầu: 
- Đã đăng nhập
- Tài khoản có quyền admin

### Giáo viên
Yêu cầu:
- Đã đăng nhập
- Tài khoản có quyền giáo viên

### Học sinh
Yêu cầu:
- Đã đăng nhập
- Tài khoản có quyền học sinh

## Trang nộp hồ sơ chi tiết
### Admin/Giáo viên
Yêu cầu: 
- Đã đăng nhập
- Tài khoản có quyền admin/giáo viên

### Học sinh
Yêu cầu:
- Đã đăng nhập
- Tài khoản có quyền học sinh

## Trang xem hồ sơ chi tiết
Yêu cầu:
- Đã đăng nhập

## Trang thống kê hồ sơ
Yêu cầu: 
- Đã đăng nhập
- Tài khoản có quyền admin