// Khởi tạo dữ liệu mẫu nếu chưa có
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

// Chức năng đăng nhập
function login(event) {
  event.preventDefault();

  let userName = event.target.userName.value;
  let password = event.target.password.value;

  let userList = JSON.parse(localStorage.getItem("userList"));

  let userExisted = null; // Biến để lưu trữ thông tin người dùng nếu tìm thấy.

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].userName == userName) {
      userExisted = userList[i];
      break;
    }
  }
  // Nếu không tìm thấy người dùng, hiển thị thông báo và thoát khỏi hàm
  if (!userExisted) {
    alert("Tài Khoản Không Tồn Tại");
    return;
  }

  if (userExisted.password != password) {
    alert("Mật Khẩu Sai");
    return;
  }

  if (!userExisted.status) {
    alert("Tài khoản đã bị khóa");
    return;
  }

  alert("Đăng Nhập Thành Công");

  localStorage.setItem("userLogin", JSON.stringify(userExisted));
  window.location.href = "/";
}
