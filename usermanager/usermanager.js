// usermanager.js

const usersPerPage = 5; // Số tài khoản mỗi trang
let currentPage = 1; // Trang hiện tại
let users = JSON.parse(localStorage.getItem("userList")) || []; // Lấy danh sách tài khoản từ localStorage hoặc khởi tạo rỗng

// Khởi tạo trang
document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});

// Hiển thị danh sách tài khoản trên trang
function renderUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  // Tính toán sản phẩm cần hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Tạo HTML cho danh sách tài khoản
  paginatedUsers.forEach((user, index) => {
    const statusText = user.status ? "Bình Thường" : "Đã Khóa";
    const statusClass = user.status
      ? "text-success"
      : "text-danger text-decoration-line-through";
    userList.innerHTML += `
      <tr>
        <td>${startIndex + index + 1}</td>
        <td>${user.userName}</td>
        <td>${user.nickName}</td>
        <td class="${statusClass}">${statusText}</td>
        <td>
          <button class="btn btn-primary" onclick="toggleUserStatus('${
            user.id
          }')">Khóa / Mở khóa</button>
          <button class="btn btn-danger" onclick="deleteUser('${
            user.id
          }')">Xóa TK</button>
        </td>
      </tr>
    `;
  });

  document.getElementById(
    "pageInfo"
  ).innerText = `Trang ${currentPage} / ${Math.ceil(
    users.length / usersPerPage
  )}`;
}

// Hiển thị modal thêm/sửa tài khoản
function showAddModal() {
  document.getElementById("userId").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("nickName").value = "";
  document.getElementById("userPassword").value = "";
  document.getElementById("modalTitle").innerText = "Thêm Tài Khoản";
  document.getElementById("addEditModal").style.display = "block";
}

// Ẩn modal thêm/sửa tài khoản
function hideAddEditModal() {
  document.getElementById("addEditModal").style.display = "none";
}

// Xử lý form thêm/sửa tài khoản
function submitUserForm(event) {
  event.preventDefault();
  const userId = document.getElementById("userId").value;
  const userName = document.getElementById("userName").value;
  const nickName = document.getElementById("nickName").value;
  const userPassword = document.getElementById("userPassword").value;

  // Kiểm tra đầu vào của dữ liệu xem có đảm bảo khoong

  if (
    (userName.trim(), nickName.trim(), userPassword.trim() === "") ||
    userName.includes(" ")
  ) {
    alert(
      "Tài Khoản ( không được phép chứa khoảng trống)/ Mật khẩu /  Nick Name không được để trống"
    );
    return;
  }
  // if (userId) {
  //   //Chỉnh sửa tài khoản
  //   const userIndex = users.findIndex((user) => user.id === userId);
  //   users[userIndex].userName = userName;
  //   users[userIndex].nickName = nickName;
  //   users[userIndex].password = userPassword;
  // }
  else {
    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingUser = users.find((user) => user.userName === userName);
    if (existingUser) {
      alert(`Tên đăng nhập ${userName} đã tồn tại`);
      return;
    }
    //Thêm mới tài khoản
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36),
      userName: userName,
      nickName: nickName,
      password: userPassword,
      status: true,
    };
    users.push(newUser);
  }

  localStorage.setItem("userList", JSON.stringify(users));
  renderUsers();
  hideAddEditModal();
}

// Chức năng tìm kiếm tài khoản
function searchUsers() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchValue)
  );
  renderUsers(filteredUsers);
}

// Chức năng sắp xếp tài khoản
function sortUsers() {
  const sortOption = document.getElementById("sortOptions").value;
  users.sort((a, b) => {
    if (a[sortOption] < b[sortOption]) return -1;
    if (a[sortOption] > b[sortOption]) return 1;
    return 0;
  });
  renderUsers();
}

// Chuyển đến trang trước
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
}

// Chuyển đến trang sau
function nextPage() {
  if (currentPage < Math.ceil(users.length / usersPerPage)) {
    currentPage++;
    renderUsers();
  }
}

// Chức năng khóa/mở khóa tài khoản
function toggleUserStatus(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);
  users[userIndex].status = !users[userIndex].status;
  localStorage.setItem("userList", JSON.stringify(users));
  renderUsers();
}

// Chức năng xóa tài khoản
function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("userList", JSON.stringify(users));
  alert(`Bạn có thực sự muốn xoá tài khoản này không?`);
  renderUsers();
}
renderUsers();
