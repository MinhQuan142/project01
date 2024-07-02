// productmanager.js

const productsPerPage = 5; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại
let products = JSON.parse(localStorage.getItem("products")) || []; // Danh sách sản phẩm từ localStorage hoặc khởi tạo rỗng
let categories = JSON.parse(localStorage.getItem("categories")) || []; // Danh sách danh mục categor từ localStorage

// Hàm khởi tạo trang
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  populateCategoryOptions();
});

// Hàm hiển thị sản phẩm trên trang
function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  // Tính toán sản phẩm cần hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Tạo HTML cho danh sách sản phẩm
  paginatedProducts.forEach((product, index) => {
    let statusClass = "";
    let statusText = "";
    if (product.status === "Đang Học") {
      statusClass = "text-success";
      statusText = "Đang Học";
    } else if (product.status === "Đã Xong") {
      statusClass = "text-danger text-decoration-line-through";
      statusText = "Đã Xong";
    } else if (product.status === "Sắp Mở") {
      statusClass = "text-warning";
      statusText = "Sắp Mở";
    }

    productList.innerHTML += `
      <tr>
        <td>${startIndex + index + 1}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td class="${statusClass}">${statusText}</td>
        <td>
          <button class="btn btn-primary" onclick="editProduct('${
            product.id
          }')">Sửa</button>
          <button class="btn btn-danger" onclick="deleteProduct('${
            product.id
          }')">Xóa</button>
        </td>
      </tr>
    `;
  });

  // Cập nhật thông tin trang hiện tại
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${Math.ceil(
    products.length / productsPerPage
  )}`;
}

// Hiển thị modal thêm sản phẩm mới
function showAddModal() {
  document.getElementById("productForm").reset(); // Đặt lại biểu mẫu
  document.getElementById("productId").value = ""; // Xóa ID sản phẩm
  document.getElementById("modalTitle").textContent = "Thêm Sản Phẩm"; // Đặt tiêu đề modal
  document.getElementById("addEditModal").style.display = "block"; // Hiển thị modal
}

// Ẩn modal thêm/sửa sản phẩm
function hideAddEditModal() {
  document.getElementById("addEditModal").style.display = "none";
}

// Điền các danh mục vào select box
function populateCategoryOptions() {
  const productCategory = document.getElementById("productCategory");
  productCategory.innerHTML = categories
    .map(
      (category) => `<option value="${category.name}">${category.name}</option>`
    )
    .join("");
}

// Xử lý gửi biểu mẫu thêm/sửa sản phẩm
function submitProductForm(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
  const productId = document.getElementById("productId").value; // Lấy ID sản phẩm (nếu có)
  const productName = document.getElementById("productName").value.trim(); // Lấy tên sản phẩm * bỏ khoảng trắng 2 đầu giá trị
  const productCategory = document.getElementById("productCategory").value; // Lấy danh mục sản phẩm
  const productStatus = document.getElementById("productStatus").value; // Lấy trạng thái sản phẩm

  // Nếu có ID sản phẩm, nghĩa là đang chỉnh sửa sản phẩm
  if (productId) {
    const product = products.find((prod) => prod.id === productId);
    product.name = productName;
    product.category = productCategory;
    product.status = productStatus;
  } else {
    // Nếu không có ID, nghĩa là thêm sản phẩm mới
    const newProduct = {
      id: Date.now().toString(), // Tạo ID sản phẩm mới
      name: productName,
      category: productCategory,
      status: productStatus,
    };
    products.push(newProduct);
  }

  // Lưu danh sách sản phẩm vào localStorage
  localStorage.setItem("products", JSON.stringify(products));
  hideAddEditModal(); // Ẩn modal
  renderProducts(); // Cập nhật danh sách sản phẩm
}

// Hiển thị thông tin sản phẩm cần sửa lên modal
function editProduct(productId) {
  const product = products.find((prod) => prod.id === productId);
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productStatus").value = product.status;
  document.getElementById("modalTitle").textContent = "Sửa Sản Phẩm";
  document.getElementById("addEditModal").style.display = "block";
}

// Xóa sản phẩm
function deleteProduct(productId) {
  products = products.filter((prod) => prod.id !== productId);
  localStorage.setItem("products", JSON.stringify(products));
  alert("Bạn có thực sự muốn xóa lớp học này");
  renderProducts();
}

// Tìm kiếm sản phẩm
function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  products = JSON.parse(localStorage.getItem("products")).filter((prod) =>
    prod.name.toLowerCase().includes(searchInput)
  );
  renderProducts();
}

// Sắp xếp sản phẩm
function sortProducts() {
  const sortOption = document.getElementById("sortOptions").value;
  products.sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
  renderProducts();
}

// Chuyển sang trang trước
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
}

// Chuyển sang trang sau
function nextPage() {
  if (currentPage * productsPerPage < products.length) {
    currentPage++;
    renderProducts();
  }
}
