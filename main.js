// Lấy danh sách người dùng từ localStorage
let userList = JSON.parse(localStorage.getItem("userList")) || [];

// Tính tổng số tài khoản
let totalAccounts = userList.length;

// Tính số tài khoản bị khóa
let blockedAccounts = userList.filter((user) => !user.status).length;

// Tính số tài khoản bình thường
let normalAccounts = totalAccounts - blockedAccounts;

// Cập nhật thông tin thống kê trên trang
document.getElementById("totalAccounts").innerText = totalAccounts;
document.getElementById("blockedAccounts").innerText = blockedAccounts;
document.getElementById("normalAccounts").innerText = normalAccounts;

// Cập nhật thông tin thống kê danh mục trên trang
document.getElementById("totalCategories").innerText = totalCategories;

// Lấy danh sách danh mục từ localStorage
let categoryList = JSON.parse(localStorage.getItem("categories")) || [];

// Tính tổng số danh mục
let totalCategories = categoryList.length;

// Cập nhật thông tin thống kê danh mục trên trang
document.getElementById("totalCategories").innerText = totalCategories;
