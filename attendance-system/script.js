let students = [];
let attendance = {};

// Register Student
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("studentName").value;
  students.push(name);
  attendance[name] = [];
  document.getElementById("studentName").value = "";
  loadAttendanceList();
});

// Load Attendance List
function loadAttendanceList(){
  let listDiv = document.getElementById("attendanceList");
  listDiv.innerHTML = "";
  students.forEach(student => {
    listDiv.innerHTML += `
      <label>${student}</label>
      <select id="status-${student}">
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select><br>
    `;
  });
}

// Save Attendance
document.getElementById("saveAttendance").addEventListener("click", function(){
  students.forEach(student => {
    let status = document.getElementById(`status-${student}`).value;
    attendance[student].push(status);
  });
  generateReport();
});

// Generate Report
function generateReport(){
  let reportDiv = document.getElementById("report");
  reportDiv.innerHTML = "";
  students.forEach(student => {
    let total = attendance[student].length;
    let presentCount = attendance[student].filter(s => s === "Present").length;
    let percentage = ((presentCount / total) * 100).toFixed(2);
    reportDiv.innerHTML += `<p>${student}: ${percentage}% attendance</p>`;
  });
}
