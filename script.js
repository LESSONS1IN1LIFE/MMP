let users = [];

// تحميل البيانات من users.json
fetch('users.json')
    .then(response => response.json())
    .then(data => {
        users = data;
    })
    .catch(err => console.error('Failed to load users:', err));

// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        switch (user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'teacher':
                window.location.href = 'teachers.html';
                break;
            case 'student':
                window.location.href = 'attendance.html';
                break;
            default:
                alert('Role not defined!');
        }
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid email or password.';
    }
});

// تسجيل مستخدم جديد
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('role').value;

    if (users.some(u => u.email === email)) {
        document.getElementById('registerMessage').textContent = 'Email already exists.';
        return;
    }

    users.push({ email, password, role });
    alert('Registration successful! You can now log in.');
    window.location.href = 'index.html';
});

// إدارة إضافة المعلمين والفصول والإشراف
document.addEventListener('DOMContentLoaded', function() {
    const teacherForm = document.getElementById('teacherForm');
    const teacherList = document.getElementById('teacherList');
    const classForm = document.getElementById('classForm');
    const classList = document.getElementById('classList');
    const supervisionForm = document.getElementById('supervisionForm');
    const supervisionList = document.getElementById('supervisionList');
    const scheduleForm = document.getElementById('scheduleForm');
    const scheduleList = document.getElementById('scheduleList');

    // إضافة معلم
    teacherForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const teacherName = document.getElementById('teacherName').value;
        const teacherEmail = document.getElementById('teacherEmail').value;

        const teacherItem = document.createElement('li');
        teacherItem.textContent = `${teacherName} - ${teacherEmail}`;
        teacherList.appendChild(teacherItem);

        teacherForm.reset();
    });

    // إضافة فصل
    classForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const className = document.getElementById('className').value;
        const classGrade = document.getElementById('classGrade').value;

        const classItem = document.createElement('li');
        classItem.textContent = `${className} - ${classGrade}`;
        classList.appendChild(classItem);

        classForm.reset();
    });

    // إضافة إشراف
    supervisionForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const supervisionClass = document.getElementById('supervisionClass').value;
        const supervisionTeacher = document.getElementById('supervisionTeacher').value;

        const supervisionItem = document.createElement('li');
        supervisionItem.textContent = `${supervisionClass} supervised by ${supervisionTeacher}`;
        supervisionList.appendChild(supervisionItem);

        supervisionForm.reset();
    });

    // إضافة جدول الحصص
    scheduleForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const className = document.getElementById('scheduleClass').value;
        const classTime = document.getElementById('scheduleTime').value;
        const teacherName = document.getElementById('scheduleTeacher').value;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${className}</td><td>${classTime}</td><td>${teacherName}</td>`;
        scheduleList.appendChild(row);

        scheduleForm.reset();
    });
});