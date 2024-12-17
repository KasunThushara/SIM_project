$(document).ready(function () {
    let editMode = false; // Tracks whether you're editing a student
    let editingId = null; // Stores the ID of the student being edited

    // Handle form submission
    $('#student-form').submit(function (e) {
        e.preventDefault();

        // Get form values
        const indexNo = $('#indexNo').val();
        const name = $('#name').val();
        const dob = $('#dob').val();
        const gpa = $('#gpa').val();

        // Check if updating or creating
        if (editMode) {
            // Update existing student (PUT request)
            $.ajax({
                url: `/api/students/${editingId}`, // Include the ID in the URL
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ indexNo, name, dob, gpa }),
                success: function () {
                    alert('Student updated successfully!');
                    resetForm();
                    loadStudents(); // Reload student list
                },
                error: function () {
                    alert('Error updating student.');
                }
            });
        } else {
            // Create new student (POST request)
            $.ajax({
                url: '/api/students',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ indexNo, name, dob, gpa }),
                success: function () {
                    alert('Student added successfully!');
                    resetForm();
                    loadStudents(); // Reload student list
                },
                error: function () {
                    alert('Error adding student.');
                }
            });
        }
    });

    // Edit button click handler
    $('body').on('click', '.edit-btn', function () {
        const studentId = $(this).data('id'); // Get ID from the Edit button
        $.get(`/api/students/${studentId}`, function (student) {
            // Populate form with student data
            $('#indexNo').val(student.indexNo);
            $('#name').val(student.name);
            $('#dob').val(student.dob);
            $('#gpa').val(student.gpa);

            // Enable edit mode
            editMode = true;
            editingId = studentId;
        });
    });

    // Reset form and variables
    function resetForm() {
        $('#indexNo').val('');
        $('#name').val('');
        $('#dob').val('');
        $('#gpa').val('');
        editMode = false;
        editingId = null;
    }

    // Function to load all students
    function loadStudents() {
        $.get('/api/students', function (students) {
            let rows = '';
            students.forEach(student => {
                rows += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.indexNo}</td>
                        <td>${student.name}</td>
                        <td>${student.dob}</td>
                        <td>${student.gpa}</td>
                        <td>
                            <button class="btn btn-warning edit-btn" data-id="${student.id}">Edit</button>
                            <button class="btn btn-danger delete-btn" data-id="${student.id}">Delete</button>
                        </td>
                    </tr>
                `;
            });
            $('#student-table-body').html(rows);
        });
    }

    // Load students on page load
    loadStudents();
});
