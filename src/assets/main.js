import * as plugin from "./plugin";
// Global variables
let semesterCount = 0;
let courseCount = 0;

// Function to add a new semester
export function addSemester() {
  semesterCount++;
  const semesterId = `HK-${semesterCount}`;
  const semesterHtml = `
        <div class="container mt-3 borderX pt-4 pb-4" id="${semesterId}">
            <h4 id="GPA${semesterId}"></h4><hr/>
            <div id="listHP-${semesterCount}"></div>
            <div class="row justify-content-center">
                <div class="col-auto"> 
                    <button class="btn btn-success" onclick="showAddCoursePopup(${semesterCount})"><i class="fa fa-plus"></i> Thêm học phần</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-danger" onclick="deleteSemester(${semesterCount})"><i class="fa fa-trash"></i> Xóa kỳ này</button>
                </div>
            </div>
        </div>
    `;
  document
    .getElementById("listHK")
    .insertAdjacentHTML("beforeend", semesterHtml);
  saveToLocalStorage();
}

// Function to show add course popup
window.showAddCoursePopup = function (semesterNumber) {
  const popupHtml = `
        <div id="addCoursePopup" class="modal" style="display:block; background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm học phần</h5>
                        <button type="button" class="btn-close" onclick="closePopup(1)"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="courseName" class="form-label">Tên học phần</label>
                            <input type="text" class="form-control" id="courseName">
                        </div>
                        <div class="mb-3">
                            <label for="courseCredits" class="form-label">Số tín chỉ</label>
                            <input type="number" class="form-control" id="courseCredits">
                        </div>
                        <div class="mb-3">
                            <label for="courseGrade" class="form-label">Điểm</label>
                            <select class="form-select" id="courseGrade">
                                <option value="A">A (8.5 - 10)</option>
                                <option value="B">B (7.0 - 8.4)</option>
                                <option value="C">C (5.5 - 6.9)</option>
                                <option value="D">D (4.0 - 5.4)</option>
                                <option value="F">F (0 - 3.9)</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closePopup(1)">Đóng</button>
                        <button type="button" class="btn btn-primary" onclick="saveCourse(${semesterNumber})">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", popupHtml);
};

function closePopup(n) {
  if (n === 1) {
    document.getElementById('addCoursePopup').remove();
  } else {
    document.getElementById('editCoursePopup').remove();
  }
}

// Function to close popup
window.closePopup = function (n) {
  if (n === 1) {
    document.getElementById("addCoursePopup").remove();
  } else {
    document.getElementById("editCoursePopup").remove();
  }
};

// Function to save course
window.saveCourse = function (semesterNumber) {
  courseCount++;
  const courseName = document.getElementById("courseName").value;
  const courseCredits = document.getElementById("courseCredits").value;
  const courseGrade = document.getElementById("courseGrade").value;

  const courseHtml = `
        <div id="mon-${courseCount}" data-semester="${semesterNumber}">
            <div class="row">
                <div class="col-6">
                    <span>${courseName}</span>
                </div>
                <div class="col-6 text-end">
                    <button class="btn btn-primary" onclick="editCourse(${courseCount})"><i class="fa fa-pencil"></i> sửa</button>
                    <button class="btn btn-danger" onclick="deleteCourse(${courseCount})"><i class="fa fa-trash"></i> xóa</button>
                </div>
            </div>
            <div class="row mt-3" style="gap: 10px;">
                <div class="col-auto nX2">
                    <span class="btn btn-primary mb-3">${courseCredits}TC</span>
                </div>
                <div class="col-auto nX">
                    <input value="${courseGrade}" class="form-control mZ" type="text" disabled />
                    <input value="${courseGrade}" class="hiddenIp" type="hidden" />
                </div>
                ${
                  courseGrade !== "A"
                    ? `
                <div class="col-auto nX">
                    <select class="form-select mX" onchange="toggleFlag(this, ${courseCount})">
                        <option selected>Cải thiện?</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div class="col-auto nX flag-container" style="display: none;">
                    <span class="btn btn-success mb-3">
                        <i class="fa fa-flag" aria-hidden="true"></i>
                    </span>
                </div>
                `
                    : ""
                }
            </div>
            <hr />
        </div>
    `;
  document
    .getElementById(`listHP-${semesterNumber}`)
    .insertAdjacentHTML("beforeend", courseHtml);
  closePopup(1);
  reindexCourses();
  saveToLocalStorage();
};

// Function to toggle flag visibility
window.toggleFlag = function (selectElement, courseId) {
  // export function toggleFlag(selectElement, courseId) {
  const row = selectElement.closest(".row");
  const flagContainer = row.querySelector(".flag-container");

  flagContainer.style.display =
    selectElement.value !== "Cải thiện?" ? "block" : "none";

  const inputElement = row.querySelector(".hiddenIp");
  if (selectElement.value !== "Cải thiện?") {
    inputElement.value = selectElement.value;
  } else {
    inputElement.value = "";
  }
  getImprov(dataFromHidden());
};

export function getGradeDescription(grade) {
  switch (grade) {
    case "A":
      return "A ( ≥ 8.5 )";
    case "B":
      return "B ( 7.0 - 8.4 )";
    case "C":
      return "C ( 5.5 - 6.9 )";
    default:
      return grade;
  }
}

export function getImprov(data) {
  const improvementNeeded = [];
  data.semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      if (
        course.improvement !== "Cải thiện?" &&
        course.improvement !== "null"
      ) {
        improvementNeeded.push({
          name: course.name,
          improvement: course.improvement,
        });
      }
    });
  });

  const divGoal = document.getElementById("goals");
  divGoal.innerHTML = `
  <hr>
  <h4>Mục tiêu cải thiện:</h4>
  <ul>
      ${improvementNeeded
        .map(
          (goal) => `
          <li>${goal.name}: <span class="grade">${getGradeDescription(
            goal.improvement
          )}</span></li>
      `
        )
        .join("")}
  </ul>`;
}

// window.dataFromHidden = function () {
export function dataFromHidden() {
  const data = {
    semesters: [],
    courseCount: courseCount,
  };
  const semesters = document.querySelectorAll('[id^="HK-"]');
  semesters.forEach((semester, index) => {
    const semesterData = {
      id: index + 1,
      courses: [],
    };
    const courses = semester.querySelectorAll('[id^="mon-"]');
    courses.forEach((course) => {
      semesterData.courses.push({
        name: course.querySelector(".col-6 span").textContent,
        credits: course
          .querySelector(".nX2 span")
          .textContent.replace("TC", ""),
        grade: course.querySelector(".hiddenIp").value,
        improvement: course.querySelector(".mX")
          ? course.querySelector(".mX").value
          : "null",
      });
    });
    data.semesters.push(semesterData);
  });
  // console.log(JSON.stringify(data, null, 2))
  plugin.updateGPA(data);
  plugin.updateCPA(data, 0);
  return data;
}

// Function to edit course
window.editCourse = function (courseId) {
  const courseElement = document.getElementById(`mon-${courseId}`);
  const courseName = courseElement.querySelector(".col-6 span").textContent;
  const courseCredits = courseElement
    .querySelector(".nX2 span")
    .textContent.replace("TC", "");
  const courseGrade = courseElement.querySelector(".mZ").value;

  const popupHtml = `
        <div id="editCoursePopup" class="modal" style="display:block; background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Chỉnh sửa học phần</h5>
                        <button type="button" class="btn-close" onclick="closePopup(0)"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="editCourseName" class="form-label">Tên học phần</label>
                            <input type="text" class="form-control" id="editCourseName" value="${courseName}">
                        </div>
                        <div class="mb-3">
                            <label for="editCourseCredits" class="form-label">Số tín chỉ</label>
                            <input type="number" class="form-control" id="editCourseCredits" value="${courseCredits}">
                        </div>
                        <div class="mb-3">
                            <label for="editCourseGrade" class="form-label">Điểm</label>
                            <select class="form-select" id="editCourseGrade">
                                <option value="A" ${
                                  courseGrade === "A" ? "selected" : ""
                                }>A (8.5 - 10)</option>
                                <option value="B" ${
                                  courseGrade === "B" ? "selected" : ""
                                }>B (7.0 - 8.4)</option>
                                <option value="C" ${
                                  courseGrade === "C" ? "selected" : ""
                                }>C (5.5 - 6.9)</option>
                                <option value="D" ${
                                  courseGrade === "D" ? "selected" : ""
                                }>D (4.0 - 5.4)</option>
                                <option value="F" ${
                                  courseGrade === "F" ? "selected" : ""
                                }>F (0 - 3.9)</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closePopup(0)">Đóng</button>
                        <button type="button" class="btn btn-primary" onclick="updateCourse(${courseId})">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", popupHtml);
};

// Function to update course
window.updateCourse = function (courseId) {
  const courseElement = document.getElementById(`mon-${courseId}`);
  const newName = document.getElementById("editCourseName").value;
  const newCredits = document.getElementById("editCourseCredits").value;
  const newGrade = document.getElementById("editCourseGrade").value;

  courseElement.querySelector(".col-6 span").textContent = newName;
  courseElement.querySelector(".nX2 span").textContent = `${newCredits}TC`;
  courseElement.querySelector(".mZ").value = newGrade;

  // Xử lý hiển thị/ẩn select-option "Cải thiện?"
  const improvementSelect = courseElement.querySelector(".mX");
  const flagContainer = courseElement.querySelector(".flag-container");

  if (newGrade === "A") {
    if (improvementSelect) {
      improvementSelect.closest(".col-auto").remove();
    }
    if (flagContainer) {
      flagContainer.remove();
    }
  } else if (!improvementSelect) {
    const selectHtml = `
            <div class="col-auto nX">
                <select class="form-select mX" onchange="toggleFlag(this, ${courseId})">
                    <option selected>Cải thiện?</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div class="col-auto nX flag-container" style="display: none;">
                <span class="btn btn-success mb-3">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                </span>
            </div>
        `;
    courseElement
      .querySelector(".row.mt-3")
      .insertAdjacentHTML("beforeend", selectHtml);
  }

  closePopup();
  saveToLocalStorage();
};

// Function to delete course
window.deleteCourse = function (courseId) {
  document.getElementById(`mon-${courseId}`).remove();
  reindexCourses();
  saveToLocalStorage();
};

// Function to delete semester
window.deleteSemester = function (semesterNumber) {
  document.getElementById(`HK-${semesterNumber}`).remove();
  reindexSemesters();
  saveToLocalStorage();
};

// Function to reindex courses
export function reindexCourses() {
  const courses = document.querySelectorAll('[id^="mon-"]');
  courses.forEach((course, index) => {
    const newId = index + 1;
    course.id = `mon-${newId}`;
    course
      .querySelector(".btn-primary")
      .setAttribute("onclick", `editCourse(${newId})`);
    course
      .querySelector(".btn-danger")
      .setAttribute("onclick", `deleteCourse(${newId})`);
    try {
      course
        .querySelector(".mX")
        .setAttribute("onchange", `toggleFlag(this, ${newId})`);
    } catch (error) {}
  });
  courseCount = courses.length;
}

// Function to reindex semesters
export function reindexSemesters() {
  const semesters = document.querySelectorAll('[id^="HK-"]');
  semesters.forEach((semester, index) => {
    const newId = index + 1;
    const oldId = semester.id.split("-")[1];
    semester.id = `HK-${newId}`;
    semester.querySelector("h4").textContent = `Kỳ ${newId}`;
    semester.querySelector("#listHP-" + oldId).id = `listHP-${newId}`;
    semester
      .querySelector(".btn-success")
      .setAttribute("onclick", `showAddCoursePopup(${newId})`);
    semester
      .querySelector(".btn-danger")
      .setAttribute("onclick", `deleteSemester(${newId})`);
  });
  semesterCount = semesters.length;
  saveToLocalStorage();
}

// Function to save data to localStorage
export function saveToLocalStorage() {
  const data = {
    semesters: [],
    courseCount: courseCount,
  };
  const semesters = document.querySelectorAll('[id^="HK-"]');
  semesters.forEach((semester, index) => {
    const semesterData = {
      id: index + 1,
      courses: [],
    };
    const courses = semester.querySelectorAll('[id^="mon-"]');
    courses.forEach((course) => {
      semesterData.courses.push({
        name: course.querySelector(".col-6 span").textContent,
        credits: course
          .querySelector(".nX2 span")
          .textContent.replace("TC", ""),
        grade: course.querySelector(".mZ").value,
        improvement: course.querySelector(".mX")
          ? course.querySelector(".mX").value
          : "null",
      });
    });
    data.semesters.push(semesterData);
  });
  localStorage.setItem("gpaCalculatorData", JSON.stringify(data));
  plugin.updateGPA(data);
  plugin.updateCPA(data);
}

// Function to load data from localStorage
export function loadFromLocalStorage() {
  const savedData = localStorage.getItem("gpaCalculatorData");
  if (savedData) {
    const data = JSON.parse(savedData);
    courseCount = data.courseCount || 0;

    // Xóa tất cả các kỳ học hiện có trước khi tải lại
    document.getElementById("listHK").innerHTML = "";
    semesterCount = 0;

    data.semesters.forEach((semester) => {
      addSemester();
      semester.courses.forEach((course) => {
        const semesterElement = document.getElementById(`HK-${semester.id}`);
        const courseHtml = `
                    <div id="mon-${++courseCount}" data-semester="${
          semester.id
        }">
                        <div class="row">
                            <div class="col-6">
                                <span>${course.name}</span>
                            </div>
                            <div class="col-6 text-end">
                                <button class="btn btn-primary" onclick="editCourse(${courseCount})"><i class="fa fa-pencil"></i> sửa</button>
                                <button class="btn btn-danger" onclick="deleteCourse(${courseCount})"><i class="fa fa-trash"></i> xóa</button>
                            </div>
                        </div>
                        <div class="row mt-3" style="gap: 10px;">
                            <div class="col-auto nX2">
                                <span class="btn btn-primary mb-3">${
                                  course.credits
                                }TC</span>
                            </div>
                            <div class="col-auto nX">
                                <input value="${
                                  course.grade
                                }" class="form-control mZ" type="text" disabled />
                                <input value="${
                                  course.grade
                                }" class="hiddenIp" type="hidden" />
                            </div>
                            ${
                              course.grade !== "A"
                                ? `
                            <div class="col-auto nX">
                                <select class="form-select mX" onchange="toggleFlag(this, ${courseCount})">
                                    <option ${
                                      course.improvement === "Cải thiện?"
                                        ? "selected"
                                        : ""
                                    }>Cải thiện?</option>
                                    <option value="A" ${
                                      course.improvement === "A"
                                        ? "selected"
                                        : ""
                                    }>A</option>
                                    <option value="B" ${
                                      course.improvement === "B"
                                        ? "selected"
                                        : ""
                                    }>B</option>
                                    <option value="C" ${
                                      course.improvement === "C"
                                        ? "selected"
                                        : ""
                                    }>C</option>
                                </select>
                            </div>
                            <div class="col-auto nX flag-container" style="display: ${
                              course.improvement !== "Cải thiện?"
                                ? "block"
                                : "none"
                            };">
                                <span class="btn btn-success mb-3">
                                    <i class="fa fa-flag" aria-hidden="true"></i>
                                </span>
                            </div>
                            `
                                : ""
                            }
                        </div>
                        <hr />
                    </div>
                `;
        semesterElement
          .querySelector(`#listHP-${semester.id}`)
          .insertAdjacentHTML("beforeend", courseHtml);
      });
    });
    plugin.updateGPA(data);
    plugin.updateCPA(data);
  }
}
