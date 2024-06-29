// categorymanager.js
const categoriesPerPage = 5; // Số danh mục mỗi trang
let currentPage = 1; // Trang hiện tại
let categories = JSON.parse(localStorage.getItem("categories")) || []; // Danh sách danh mục từ localStorage hoặc khởi tạo rỗng

// Hàm khởi tạo trang
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
});

// Hàm hiển thị danh mục trên trang
function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";

  // Tính toán danh mục cần hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const endIndex = startIndex + categoriesPerPage;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  // Tạo HTML cho danh sách danh mục
  paginatedCategories.forEach((category, index) => {
    categoryList.innerHTML += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${category.name}</td>
                <td>
                    <button class="btn btn-primary" onclick="editCategory('${
                      category.id
                    }')">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteCategory('${
                      category.id
                    }')">Xóa</button>
                </td>
            </tr>
        `;
  });

  // Cập nhật thông tin trang hiện tại
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${Math.ceil(
    categories.length / categoriesPerPage
  )}`;
}

// Hiển thị modal thêm danh mục mới
function showAddModal() {
  document.getElementById("categoryForm").reset(); // Đặt lại biểu mẫu
  document.getElementById("categoryId").value = ""; // Xóa ID danh mục
  document.getElementById("modalTitle").textContent = "Thêm Danh Mục"; // Đặt tiêu đề modal
  document.getElementById("addEditModal").style.display = "block"; // Hiển thị modal
}

// Ẩn modal thêm/sửa danh mục
function hideAddEditModal() {
  document.getElementById("addEditModal").style.display = "none";
}

// Xử lý gửi biểu mẫu thêm/sửa danh mục
function submitCategoryForm(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
  const categoryId = document.getElementById("categoryId").value; // Lấy ID danh mục (nếu có)
  const categoryName = document.getElementById("categoryName").value.trim(); // Lấy tên danh mục

  // Nếu có ID danh mục, nghĩa là đang chỉnh sửa danh mục
  if (categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    category.name = categoryName;
  } else {
    // Nếu không có ID, nghĩa là thêm danh mục mới
    const newCategory = {
      id: Date.now().toString(), // Tạo ID danh mục mới
      name: categoryName,
      createdAt: new Date(),
    };
    categories.push(newCategory);
  }

  // Lưu danh sách danh mục vào localStorage
  localStorage.setItem("categories", JSON.stringify(categories));
  hideAddEditModal(); // Ẩn modal
  renderCategories(); // Cập nhật danh sách danh mục
}

// Hiển thị thông tin danh mục cần sửa lên modal
function editCategory(categoryId) {
  const category = categories.find((cat) => cat.id === categoryId);
  document.getElementById("categoryId").value = category.id;
  document.getElementById("categoryName").value = category.name;
  document.getElementById("modalTitle").textContent = "Sửa Danh Mục";
  document.getElementById("addEditModal").style.display = "block";
}

// Xóa danh mục
function deleteCategory(categoryId) {
  categories = categories.filter((cat) => cat.id !== categoryId);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderCategories();
}

// Tìm kiếm danh mục
function searchCategories() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  categories = JSON.parse(localStorage.getItem("categories")).filter((cat) =>
    cat.name.toLowerCase().includes(searchInput)
  );
  renderCategories();
}

// Sắp xếp danh mục
function sortCategories() {
  const sortOption = document.getElementById("sortOptions").value;
  categories.sort((a, b) => a[sortOption].localeCompare(b[sortOption]));
  renderCategories();
}

// Chuyển sang trang trước
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderCategories();
  }
}

function nextPage() {
  if (currentPage * categoriesPerPage < categories.length) {
    currentPage++;
    renderCategories();
  }
}
