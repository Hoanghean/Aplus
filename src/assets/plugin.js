import { loadFromLocalStorage } from "./main";

export function targetDisplay(a) {
    let cert = a.value;
  let t='';
    if (cert === "xs") {
      t = 3.6;
    } else if (cert === "gioi") {
      t = 3.2;
    } else {
      t = 2.5;
    }
    document.getElementById('target').innerHTML = t;
}

window.targetDisplay = function (a) {
  let cert = a.value;
  let t='';
  if (cert === "xs") {
    t = 3.6;
  } else if (cert === "gioi") {
    t = 3.2;
  } else {
    t = 2.5;
  }
  document.getElementById("target").innerHTML = t;
};

export function gradeToGPA(grade) {
  switch (grade) {
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case "F":
      return 0;
    default:
      return 0;
  }
}

export function updateGPA(data) {
  data.semesters.forEach((semester) => {
    let totalCredits = 0;
    let totalPoints = 0;

    semester.courses.forEach((course) => {
      const credits = parseInt(course.credits);
      const gpa = gradeToGPA(course.grade);
      totalCredits += credits;
      totalPoints += gpa * credits;
    });

    const GPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById(
      `GPAHK-${semester.id}`
    ).innerHTML = `Học kỳ ${semester.id} <b>GPA: ${GPA}</b>`;
  });
}

export function updateCPA(data, improv) {
  let totalCredits = 0;
  let totalPoints = 0;

  data.semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      if (course.grade !== "") {
        const gradePoints = gradeToGPA(course.grade);
        const credits = parseInt(course.credits);
        totalCredits += credits;
        totalPoints += gradePoints * credits;
      }
    });
  });

  const CPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  if (improv === 0) {
    document.getElementById("improv").innerHTML = CPA;
  } else {
    document.getElementById("current").innerHTML = CPA;
  }
}

export function dataRender(data) {
  const inputData = data.value.trim();
  const rows = inputData.split("\n");

  function convertGradeToLetter(grade) {
    if (!grade || grade === "X") return "";
    grade = parseFloat(grade);
    if (grade >= 8.5) return "A";
    else if (grade >= 7.0) return "B";
    else if (grade >= 5.5) return "C";
    else if (grade >= 4.0) return "D";
    return "F";
  }

  let semesters = [];
  let currentSemesterId = null;
  let currentSemester = null;
  let courseCount = 0;
  let idCounter = 1;
  let previousSemesterSuffix = null;

  rows.forEach((row) => {
    const columns = row.split("\t");
    if (columns.length < 8) return;

    const fullSemesterId = columns[0];
    const semesterSuffix = fullSemesterId.slice(-2);
    const courseName = columns[2].trim();
    const credits = columns[3].trim();
    const grade = columns[7].trim();

    if (courseName.includes("Giáo dục thể chất")) return;

    const letterGrade = convertGradeToLetter(grade);
    const improvement =
      letterGrade === "A" ? "null" : letterGrade ? "Cải thiện?" : "";

    if (previousSemesterSuffix !== semesterSuffix) {
      if (currentSemester) semesters.push(currentSemester);
      currentSemester = { id: idCounter, courses: [] };
      idCounter++;
      previousSemesterSuffix = semesterSuffix;
    }
    currentSemester.courses.push({
      name: courseName,
      credits: credits,
      grade: letterGrade,
      improvement: improvement,
    });
    courseCount++;
  });
  if (currentSemester) semesters.push(currentSemester);
  const result = {
    semesters: semesters,
    courseCount: courseCount,
  };

  localStorage.setItem("gpaCalculatorData", JSON.stringify(result));

  // console.log(JSON.stringify(result, null, 2));
  loadFromLocalStorage();
  updateGPA(result);
  updateCPA(result);
}
