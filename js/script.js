// Night mode toggle
const nightModeToggle = document.getElementById('night-mode-toggle');
const body = document.body;

nightModeToggle.addEventListener('click', () => {
    body.classList.toggle('night-mode');
});


document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.dynamic-text');
    const roles = ["Software Developer", "Programmer", "3D Modeler", "Lab Researcher"];
    let index = 0;

    function changeText() {
        textElement.classList.add('fade-out'); // Start fading out

        setTimeout(() => {
            index = (index + 1) % roles.length; // Move to the next role
            textElement.textContent = roles[index];
            textElement.classList.remove('fade-out'); // Remove fade-out
            textElement.classList.add('fade-in'); // Start fading in

            setTimeout(() => {
                textElement.classList.remove('fade-in'); // Cleanup
            }, 1000); // Match fade-in duration
        }, 1000); // Match fade-out duration
    }

    setInterval(changeText, 4000); // Change text every 4 seconds
});




// Particle.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
