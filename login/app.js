$(document).ready(function () {
  $("#eye").click(function () {
    $(this).toggleClass("open");
    $(this).children("i").toggleClass("fa-eye-slash fa-eye");
    if ($(this).hasClass("open")) {
      $(this).prev().attr("type", "text");
    } else {
      $(this).prev().attr("type", "password");
    }
  });
});

// nhập form vào
//tạo dữ liệu để đăng nhập
let userList = [
  {
    id: Date.now(),
    userName: "admin",
    password: "123",
  },
  {
    id: Date.now(),
    userName: "member1",
    password: "1234",
  },
];

localStorage.setItem("userList", JSON.stringify(userList));
//login
function login(event) {
  event.preventDefault();

  // let userName = document.querySelector(".userName").value;
  // let userPassword = document.querySelector(".userPassword").value;
  // console.log("đã vào", userName,userPassword)

  let userName = event.target.userName.value;
  let password = event.target.password.value;

  let userList = JSON.parse(localStorage.getItem("userList"));

  let userExisted = null;

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].userName == userName) {
      userExisted = userList[i];
      break;
    }
  }

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
  window.location.href = "trangchu.html";
}

// Đăng Xuất Tài Khoản
let user = JSON.parse(localStorage.getItem("userLogin"));
document.querySelector(".userNameLogin").innerText = user.userName;
