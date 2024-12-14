const apiUrl = "http://localhost:8080/api/students"; // Your backend API base URL

// Fetch and display all students
function getStudents() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("student-table-body");
            tableBody.innerHTML = ""; // Clear existing rows

            data.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.indexNo}</td>
                        <td>${student.name}</td>
                        <td>${student.dob}</td>
                        <td>${student.gpa}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id}, '${student.indexNo}', '${student.name}', '${student.dob}', ${student.gpa})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
}

// Add or update a student
document.getElementById("student-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const indexNo = document.getElementById("indexNo").value;
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const gpa = document.getElementById("gpa").value;

    const student = { indexNo, name, dob, gpa };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(() => {
        getStudents(); // Refresh table
        document.getElementById("student-form").reset();
    });
});

// Edit a student
function editStudent(id, indexNo, name, dob, gpa) {
    document.getElementById("indexNo").value = indexNo;
    document.getElementById("name").value = name;
    document.getElementById("dob").value = dob;
    document.getElementById("gpa").value = gpa;

    // Update logic can be added here
    alert("Modify the form and submit to update student details.");
}

// Delete a student
function deleteStudent(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => getStudents());
}

// Initial call to fetch students
getStudents();
