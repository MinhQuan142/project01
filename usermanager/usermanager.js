// Kiểm tra nếu userList không tồn tại trong localStorage thì khởi tạo một danh sách người dùng mặc định
if (!localStorage.getItem("userList")) {
  let userList = [
    {
      id: Date.now().toString(36) + Math.random().toString(36),
      userName: "admin",
      password: "",
      status: true,
    },
  ];
  localStorage.setItem("userList", JSON.stringify(userList));
}

// Lấy thông tin đăng nhập của người dùng từ localStorage
let userLogin = localStorage.getItem("userLogin");
if (!userLogin) {
  window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
} else {
  userLogin = JSON.parse(userLogin);
}

// Số lượng tài khoản hiển thị trên mỗi trang
const itemsPerPage = 5;
let currentPage = 1; // Trang hiện tại

renderHeader();

// Hiển thị dữ liệu tài khoản người dùng lên trang
function renderData(filteredUsers = null) {
  let userList = JSON.parse(localStorage.getItem("userList"));
  if (filteredUsers) {
    userList = filteredUsers;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = userList.slice(startIndex, endIndex);

  let htmlStr = ``;
  for (let i = 0; i < paginatedUsers.length; i++) {
    htmlStr += `
      <tr>
        <th scope="row">${startIndex + i + 1}</th>
        <td>${paginatedUsers[i].userName}</td>
        <td>${paginatedUsers[i].status ? "bình thường" : "tạm khóa"}</td>
        <td>
          <button class="btn btn-primary" onclick="changeStatusUser(${
            paginatedUsers[i].id
          })">block / unlock</button>
          <button class="btn btn-danger" onclick="deleteUser(${
            paginatedUsers[i].id
          })">Xóa</button>
        </td>
      </tr>
    `;
  }
  document.querySelector("#user_box").innerHTML = htmlStr;
  document.getElementById(
    "pageInfo"
  ).innerText = `Page ${currentPage} of ${Math.ceil(
    userList.length / itemsPerPage
  )}`;
}

renderData();

// Thay đổi trạng thái của tài khoản (khóa/mở khóa)
function changeStatusUser(userId) {
  let userList = JSON.parse(localStorage.getItem("userList"));
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id == userId) {
      userList[i].status = !userList[i].status;
      break;
    }
  }
  localStorage.setItem("userList", JSON.stringify(userList));
  renderData();
}

// Xóa tài khoản
function deleteUser(userId) {
  let userList = JSON.parse(localStorage.getItem("userList"));
  userList = userList.filter((user) => user.id !== userId);
  localStorage.setItem("userList", JSON.stringify(userList));
  renderData();
}

// Thêm tài khoản mới
function addUser() {
  let newUser = {
    id: Date.now(),
    userName: window.prompt("Nhập user name"),
    password: window.prompt("Nhập password"),
    status: true,
  };

  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  userList.push(newUser);
  localStorage.setItem("userList", JSON.stringify(userList));
  renderData();
}

// Tìm kiếm tài khoản
function searchUser() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let userList = JSON.parse(localStorage.getItem("userList"));
  let filteredUsers = userList.filter((user) =>
    user.userName.toLowerCase().includes(searchValue)
  );
  renderData(filteredUsers);
}

// Sắp xếp tài khoản
function sortTable() {
  let sortOption = document.getElementById("sortOptions").value;
  let userList = JSON.parse(localStorage.getItem("userList"));
  userList.sort((a, b) => {
    if (a[sortOption] < b[sortOption]) return -1;
    if (a[sortOption] > b[sortOption]) return 1;
    return 0;
  });
  localStorage.setItem("userList", JSON.stringify(userList));
  renderData();
}

// Chuyển đến trang tiếp theo
function nextPage() {
  const userList = JSON.parse(localStorage.getItem("userList"));
  if (currentPage * itemsPerPage < userList.length) {
    currentPage++;
    renderData();
  }
}

// Chuyển đến trang trước đó
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderData();
  }
}
