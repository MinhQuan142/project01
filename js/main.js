//tạo dữ liệu để đăng nhập
let userList = [
  {
    id: Date.now(),
    userName: "admin",
    password: "123",
  },
  {
    id: Date.now(),
    userName: "member",
    password: "1234",
  },
];

localStorage.setItem("userList", JSON.stringify(userList));
//login
function login(event) {
  event.preventDefault();

  let userName = event.target.userName.value;
  let password = event.target.password.value;

  let userList = JSON.parse(localStorage.getItem("userList"));

  let userExisted = null; //Biến để lưu trữ thông tin người dùng nếu tìm thấy.

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].userName == userName) {
      userExisted = userList[i];
      break;
    }
  }
  //Nếu không tìm thấy người dùng, hiển thị thông báo và thoát khỏi hàm
  if (!userExisted) {
    alert("Tài Khoản Không Tồn Tại");
    return;
  }

  if (userExisted.password != password) {
    alert("Mật Khẩu Sai");
    return;
  }

  alert("Đăng Nhập Thành Công");

  localStorage.setItem("userLogin", JSON.stringify(userExisted));
  window.location.href = "../";
}

// Đăng Xuất Tài Khoản
let user = JSON.parse(localStorage.getItem("userLogin"));
document.querySelector(".userNameLogin").innerText = user.userName;
