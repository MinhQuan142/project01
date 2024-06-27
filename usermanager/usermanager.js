// Số lượng tài khoản hiển thị trên mỗi trang
const itemsPerPage = 5;
let currentPage = 1; // Trang hiện tại

renderHeader();
function renderData(filteredUsers = null) {
  // Lấy danh sách người dùng từ localStorage và chuyển đổi từ JSON thành mảng đối tượng
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  console.log("đã vào" + userList);
  // Nếu có danh sách người dùng được lọc, sử dụng danh sách này thay cho danh sách từ localStorage
  if (filteredUsers) {
    userList = filteredUsers;
  }

  // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Cắt mảng người dùng để lấy những người dùng thuộc trang hiện tại
  const paginatedUsers = userList.slice(startIndex, endIndex);

  // Khởi tạo chuỗi HTML để hiển thị người dùng
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
          })">Khóa / Mở Khóa</button>
          <button class="btn btn-danger" onclick="deleteUser(${
            paginatedUsers[i].id
          })">Xóa</button>
        </td>
      </tr>
    `;
  }

  // Chèn chuỗi HTML vào bảng người dùng trong trang web
  document.querySelector("#user_box").innerHTML = htmlStr;

  // Cập nhật thông tin trang hiện tại
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
  // window.location.reload();
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
