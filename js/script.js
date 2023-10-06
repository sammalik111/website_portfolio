document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            const targetPosition = target.offsetTop;
            const screenHeight = window.innerHeight;
            const offset = screenHeight / 2;

            window.scrollTo({
                top: targetPosition - offset,
                behavior: 'smooth'
            });
        });
    });
});
document.getElementById('scroll-button').addEventListener('click', function() {
    var aboutMeSectionHeight = document.querySelector('.about-me').offsetHeight;
    window.scrollBy({
        top: aboutMeSectionHeight,
        behavior: 'smooth'
    });
});

document.querySelector('.night_mode').addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    document
});

// Get the necessary elements
const nightModeToggle = document.querySelector('.night_mode');
const mainSection = document.querySelector('main');
const aboutMeSection = document.querySelector('.about-me');
const skillsSection = document.querySelector('.skills');
const projectsSection = document.querySelector('.projects');
const projectTitles = document.querySelectorAll('.project-title');
const additionalLinksSection = document.querySelector('.additional-links');
const linkList = document.querySelector('.link-list');
const contactBar = document.getElementById('contact-bar');

// Add event listener to night mode toggle button
nightModeToggle.addEventListener('click', function() {
    // Toggle night mode class on necessary sections
    mainSection.classList.toggle('night-mode');
    aboutMeSection.classList.toggle('night-mode');
    skillsSection.classList.toggle('night-mode');
    projectsSection.classList.toggle('night-mode');
    additionalLinksSection.classList.toggle('night-mode');
    contactBar.classList.toggle('night-mode');
    toggleSkillsNightMode();
    toggleProjectTitlesNightMode();
    toggleLinkListNightMode();
});

// Toggle night mode for skills section
function toggleSkillsNightMode() {
    const skillParagraphs = skillsSection.querySelectorAll('.skill-list p');
    skillParagraphs.forEach((paragraph) => {
        paragraph.classList.toggle('night-mode-text');
    });
}

// Toggle night mode for project titles
function toggleProjectTitlesNightMode() {
    projectTitles.forEach((title) => {
        title.classList.toggle('night-mode');
    });
}

// Toggle night mode for link list
function toggleLinkListNightMode() {
    const linkItems = linkList.querySelectorAll('li');
    linkItems.forEach((item) => {
        item.classList.toggle('night-mode');
    });
}
