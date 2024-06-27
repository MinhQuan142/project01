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

// Lấy danh sách danh mục từ localStorage
let categoryList = JSON.parse(localStorage.getItem("categories")) || [];

// Tính tổng số danh mục
let totalCategories = categoryList.length;

// Cập nhật thông tin thống kê danh mục trên trang
document.getElementById("totalCategories").innerText = totalCategories;

// Lấy danh sách sản phẩm từ localStorage
let productList = JSON.parse(localStorage.getItem("products")) || [];

// Tính tổng số sản phẩm
let totalProducts = productList.length;

// // Tính số sản phẩm đang bán
// let sellingProducts = productList.filter(
//   (product) => product.status === "Đang Bán"
// ).length;

// // Tính số sản phẩm ngưng bán
// let stoppedProducts = productList.filter(
//   (product) => product.status === "Ngưng Bán"
// ).length;

// // Tính số sản phẩm sắp bán
// let comingProducts = productList.filter(
//   (product) => product.status === "Sắp Bán"
// ).length;

// Cập nhật thông tin thống kê sản phẩm trên trang
document.getElementById("totalProducts").innerText = totalProducts;
document.getElementById("sellingProducts").innerText = sellingProducts;
document.getElementById("stoppedProducts").innerText = stoppedProducts;
document.getElementById("comingProducts").innerText = comingProducts;
