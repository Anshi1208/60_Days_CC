document.addEventListener("DOMContentLoaded", function() {
    var storedData = JSON.parse(localStorage.getItem("employees"));
    if (storedData) {
      var table = document.getElementById("employeeData");
      storedData.forEach(function(employee) {
        addRow(table, employee);
      });
    }
  });

  function addEmployee() {
    var name = document.getElementById("name").value;
    var employeeId = document.getElementById("employeeId").value;
    var department = document.getElementById("department").value;
    var experience = parseInt(document.getElementById("experience").value);
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;

    var role = getRole(experience);

    var table = document.getElementById("employeeData");
    var employee = {
      name: name,
      employeeId: employeeId,
      department: department,
      experience: experience,
      email: email,
      mobile: mobile,
      role: role
    };
    addRow(table, employee);

    // Save to local storage
    var storedData = JSON.parse(localStorage.getItem("employees")) || [];
    storedData.push(employee);
    localStorage.setItem("employees", JSON.stringify(storedData));

    // Reset form
    document.getElementById("employeeForm").reset();
  }

  function addRow(table, employee) {
    var newRow = table.insertRow();
    newRow.innerHTML = "<td>" + employee.name + "</td><td>" + employee.employeeId + "</td><td>" + employee.department + "</td><td>" + employee.experience + "</td><td>" + employee.email + "</td><td>" + employee.mobile + "</td><td>" + employee.role + "</td><td><button onclick='deleteRow(this)'>Delete</button></td>";
  }

  function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    var rowIndex = row.rowIndex;
    row.parentNode.removeChild(row);

    // Remove from local storage
    var storedData = JSON.parse(localStorage.getItem("employees")) || [];
    storedData.splice(rowIndex - 1, 1);
    localStorage.setItem("employees", JSON.stringify(storedData));
  }

  function getRole(experience) {
    if (experience > 5) {
      return "Senior";
    } else if (experience >= 2 && experience <= 5) {
      return "Junior";
    } else {
      return "Fresher";
    }
  }

  function filterEmployees() {
    var filterValue = document.getElementById("filter").value;
    var rows = document.getElementById("employeeData").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      var department = rows[i].getElementsByTagName("td")[2].innerText;
      if (filterValue === "all" || department === filterValue) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }