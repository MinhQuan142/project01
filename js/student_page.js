// JS Student_pagee------ Bắt đầu-------

let studentsForm = document.getElementById("studentsForm");
let studentsTable = document.getElementById("studentsTable");
// let students = []; // bỏ dòng này đi vì dòng dưới sẽ khởi tạo
// Lấy dữ liệu từ localStorage,  và chuyển đổi chuỗi JSON thành mảng đối tượng students. Nếu không có dữ liệu trong localStorage, nó sẽ khởi tạo students thành một mảng rỗng.
let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

document.getElementById("addNewBtn").addEventListener("click", function () {
  document.getElementById("addNewModal").style.display = "block";
});

document.querySelectorAll(".close").forEach(function (element) {
  element.addEventListener("click", function () {
    document.getElementById("addNewModal").style.display = "none";
  });
});

window.onclick = function (event) {
  if (event.target == document.getElementById("addNewModal")) {
    document.getElementById("addNewModal").style.display = "none";
  }
};

studentsForm.addEventListener("submit", function (event) {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let birthYear = parseInt(document.getElementById("birthYear").value);
  let address = document.getElementById("address").value;
  let status = document.getElementById("status").value;
  let className = document.getElementById("class").value;

  if (editIndex === -1) {
    let student = { id, name, birthYear, address, status, class: className };
    students.push(student);
  } else {
    students[editIndex] = {
      id,
      name,
      birthYear,
      address,
      status,
      class: className,
    };
    editIndex = -1;
  }

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("students", JSON.stringify(students));

  updateTable();
  event.preventDefault();
  studentsForm.reset();
  document.getElementById("addNewModal").style.display = "none";
});

function updateTable(filteredStudents = students) {
  let bodyTable = document.querySelector("tbody");
  bodyTable.innerHTML = "";

  for (let i = 0; i < filteredStudents.length; i++) {
    let student = filteredStudents[i];
    bodyTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.birthYear}</td>
        <td>${student.address}</td>
        <td>${student.status}</td>
        <td>${student.class}</td>
        <td>
          <button class="btn btn-primary" onclick="editStudent(${i})">Sửa</button>
          <button class="btn btn-danger" onclick="deleteStudent(${i})">Xóa</button>
        </td>
      </tr>
    `;
  }
}

function editStudent(index) {
  let student = students[index];
  document.getElementById("id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("birthYear").value = student.birthYear;
  document.getElementById("address").value = student.address;
  document.getElementById("status").value = student.status;
  document.getElementById("class").value = student.class;

  editIndex = index;
  document.getElementById("addNewModal").style.display = "block";
}

function deleteStudent(index) {
  students.splice(index, 1);

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("students", JSON.stringify(students));

  updateTable();
}

function searchStudent() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchValue)
  );
  updateTable(filteredStudents);
}

function sortTable() {
  let sortOption = document.getElementById("sortOptions").value;
  students.sort((a, b) => {
    if (a[sortOption] < b[sortOption]) return -1;
    if (a[sortOption] > b[sortOption]) return 1;
    return 0;
  });
  updateTable();
}

// Cập nhật bảng khi trang được tải lại ( nếu không sau khi F5 sẽ hiển thị dữ liệu)
updateTable();

//----------JS của Student_page ---------- Kết thúc----
