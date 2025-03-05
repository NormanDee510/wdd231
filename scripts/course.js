const courses = [
    { code: "CSE 121B", name: "JavaScript Language", credits: 4, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    // ... other courses
];

function renderCourses(filter = 'all') {
    const container = document.getElementById('courseCards');
    const filtered = courses.filter(course => 
        filter === 'all' || course.code.startsWith(filter)
    );
    
    container.innerHTML = filtered.map(course => `
        <div class="course-card ${course.completed ? 'completed' : ''}">
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        </div>
    `).join('');

    // Update total credits
    document.getElementById('totalCredits').textContent = 
        filtered.reduce((sum, course) => sum + course.credits, 0);
}

// Event listeners for filter buttons
document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        renderCourses(button.dataset.filter);
    });
});

// Initial render
renderCourses();