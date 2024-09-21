import { skills, qualifications, projects } from './data.js';

document.addEventListener('DOMContentLoaded', function () {
    // Inject School Qualifications by default
    injectQualifications('school');

    // Inject Skills
    injectSkills();

    // Inject Projects
    injectProjects();

    // Add event listeners to qualification filters
    document.getElementById('SchoolFilter').addEventListener('click', () => {
        console.log('SchoolFilter clicked');
        filterQualifications('school');
    });
    document.getElementById('WorkFilter').addEventListener('click', () => {
        console.log('WorkFilter clicked');
        filterQualifications('work');
    });
});

// Function to inject qualifications based on type (school/work)
function injectQualifications(type) {
    const timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = ''; // Clear current qualifications

    qualifications.forEach((qualification, index) => {
        if (qualification.type === type) {
            const timelineItem = document.createElement('div');

            // Alternate between 'left' and 'right' classes based on index
            timelineItem.classList.add('timeline-item', index % 2 === 0 ? 'left' : 'right');
            timelineItem.innerHTML = `
                <div class="timeline-date">${qualification.date}</div>
                <div class="timeline-content">
                    <h3>${qualification.title}</h3>
                    <p>${qualification.institution}</p>
                    <p>${qualification.description}</p>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        }
    });
}

// Filter function for qualifications
function filterQualifications(type) {
    injectQualifications(type);

    // Add active class to the clicked button and remove from others
    document.querySelectorAll('.filterbutton').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(type === 'school' ? 'SchoolFilter' : 'WorkFilter').classList.add('active');
}

// Inject Skills functionality remains unchanged
function injectSkills() {
    const skillsContainer = document.querySelector('.skills-grid');
    const skillsOutput = document.getElementById('skills-output');

    // Function to reset the skills list to its default empty state
    function resetSkillsList() {
        skillsOutput.innerHTML = '<p>Select a category to view skills</p>';
    }

    // Initially, the skills list is empty
    resetSkillsList();

    // Populate the skills categories
    skills.forEach((skillCategory) => {
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        // Create the dropdown header
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="dropdown-title">
                    <h3>${skillCategory.category}</h3>
                    <p>${skillCategory.experience}</p>
                </div>
                <button class="dropdown-arrow">▶</button>
            </div>
        `;

        // Add the category to the grid
        skillsContainer.appendChild(dropdown);

        // Handle click to populate skills on the right
        dropdown.addEventListener('click', () => {
            // Clear the current skills list
            skillsOutput.innerHTML = '';

            // Populate the skills
            skillCategory.skillsList.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.classList.add('skill-row');

                // Skill name and percentage
                skillItem.innerHTML = `
                    <span>${skill.name}</span>
                    <span class="skill-percentage">${skill.percentage}%</span>
                `;

                // Create skill bar container
                const skillBar = document.createElement('div');
                skillBar.classList.add('skill-bar');

                // Create skill bar fill based on percentage
                const skillFill = document.createElement('div');
                skillFill.classList.add('skill-fill');
                skillFill.style.width = `${skill.percentage}%`;

                // Append fill to bar
                skillBar.appendChild(skillFill);

                // Append skill row and skill bar to output
                skillsOutput.appendChild(skillItem);
                skillsOutput.appendChild(skillBar);
            });
        });
    });

    // Reset the skills list when clicking outside categories
    document.addEventListener('click', function (event) {
        const isDropdown = event.target.closest('.dropdown');
        if (!isDropdown) {
            resetSkillsList();
        }
    });
}

// Inject Projects functionality remains unchanged
function injectProjects() {
    const projectGrid = document.querySelector('.project-grid');

    // Populate all projects initially
    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', project.category);
        projectCard.innerHTML = `
            <div class="project-title">
                <div>${project.title}</div>
                <div class="card-text">
                    <div class="card-info-container">
                        <div class="left-div">${project.tech}</div>
                    </div>
                </div>
            </div>
            <div class="project-description">
                ${project.description}
            </div>
            <div class="link-list">
                <a href="${project.link}">${project.link ? 'View Project' : 'No Link Available'}</a>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });

    // Add event listeners to filter buttons
    document.getElementById('AllFilter').addEventListener('click', () => {
        filterProjects('ALL');
    });

    document.getElementById('CFilter').addEventListener('click', () => {
        filterProjects('C');
    });

    document.getElementById('JavascriptFilter').addEventListener('click', () => {
        filterProjects('Javascript');
    });

    document.getElementById('PythonFilter').addEventListener('click', () => {
        filterProjects('Python');
    });

    function filterProjects(category) {
        document.querySelectorAll('.project-card').forEach(project => {
            if (category === 'ALL' || project.classList.contains(category)) {
                project.style.display = 'inline-block';
            } else {
                project.style.display = 'none';
            }
        });
    }
}

document.getElementById('night-mode-toggle').addEventListener('click', function() {
    const darkModeLink = document.getElementById('dark-mode-stylesheet');

    if (!darkModeLink) {
        // If dark mode stylesheet is not added yet, add it
        const link = document.createElement('link');
        link.id = 'dark-mode-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'css/darkmode.css';
        document.head.appendChild(link);
    } else {
        // If dark mode is active, remove the stylesheet
        darkModeLink.remove();
    }
});