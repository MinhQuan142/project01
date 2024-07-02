//Main.js for Index

//----------------- Account 会計ーーーーーーーーーーーー//
// Lấy danh sách người dùng từ localStorage
let userList = JSON.parse(localStorage.getItem("userList")) || [];

// Tính tổng số tài khoản
let totalAccounts = userList.length;

// Tính số tài khoản bị khóa
let blockedAccounts = userList.filter((user) => !user.status).length;

// Tính số tài khoản bình thường
// let normalAccounts = totalAccounts - blockedAccounts;
let normalAccounts = userList.filter((user) => user.status).length;

// Cập nhật thông tin thống kê trên trang
document.getElementById("totalAccounts").innerText = totalAccounts;
document.getElementById("blockedAccounts").innerText = blockedAccounts;
document.getElementById("normalAccounts").innerText = normalAccounts;

//--------------- Category 会計ーーーーーーーーーーーーーーー//
// Lấy danh sách danh mục từ localStorage
let categoryList = JSON.parse(localStorage.getItem("categories")) || [];

// Tính tổng số Khóa Học
let totalCategories = categoryList.length;

// Cập nhật thông tin thống kê danh mục trên trang
document.getElementById("totalCategories").innerText = totalCategories;

//-------- Product 会計ーーーーーーーーーーーーーーー//
// Lấy danh sách sản phẩm từ localStorage / không cso thì tạo 1 danh sách rỗng
let productList = JSON.parse(localStorage.getItem("products")) || [];
// Tính tổng số Lớp
let totalProducts = productList.length;

// Tính số lớp đàng học
let sellingProducts = productList.filter(
  (product) => product.status === "sellingProducts"
).length;

// Tính số lớp đã học xong
let stoppedProducts = productList.filter(
  (product) => product.status === "stoppedProducts"
).length;

// Tính số lớp sắp mở
let pendingProducts = totalProducts - (sellingProducts + stoppedProducts);
// console.log("đã vào");
// Cập nhật thông tin thống kê sản phẩm trên trang
document.getElementById("totalProducts").innerText = totalProducts;
document.getElementById("sellingProducts").innerText = sellingProducts;
document.getElementById("stoppedProducts").innerText = stoppedProducts;
document.getElementById("pendingProducts").innerText = pendingProducts;
