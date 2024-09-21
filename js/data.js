// data.js


export const skills = [
  {
    category: "Programming Languages",
    experience: "4 years of experience",
    skillsList: [
      { name: "C++", percentage: 100 },
      { name: "Python", percentage: 100 },
      { name: "HTML", percentage: 95 },
      { name: "JavaScript", percentage: 90 },
      { name: "CSS", percentage: 90 },
      { name: "SQL", percentage: 85 },
      { name: "C#", percentage: 75 },
      { name: "Java", percentage: 70 },
      { name: "R", percentage: 65 },
      { name: "LaTeX", percentage: 60 }
    ]
  },
  {
    category: "Web & Frontend Frameworks",
    experience: "2 years of experience",
    skillsList: [
      { name: "Bootstrap", percentage: 90 },
      { name: "React JS", percentage: 90 },
      { name: "NodeJS", percentage: 85 },
      { name: "React Native", percentage: 80 },
      { name: "Vue.js", percentage: 80 },
      { name: "Redux", percentage: 70}
    ]
  },
  {
    category: "3D Modeling & Scientific Libraries",
    experience: "2 years of experience",
    skillsList: [
      { name: "NumPy", percentage: 85 },
      { name: "ThreeJS", percentage: 80 },
      { name: "OpenJSCad", percentage: 75 }
    ]
  },
  {
    category: "Backend & Databases",
    experience: "2 years of experience",
    skillsList: [
      { name: "SQLite", percentage: 85 },
      { name: "MongoDB", percentage: 80 },
      { name: "Docker", percentage: 75 },
      { name: "Sanity IO", percentage: 70 },
      { name: "Stripe", percentage: 65 },
      { name: "SQLAlchemy", percentage: 60 }
    ]
  },
  {
    category: "Development Tools & Platforms",
    experience: "1 year of experience",
    skillsList: [
      { name: "VS Code", percentage: 100 },
      { name: "Git", percentage: 90 },
      { name: "Linux Shell", percentage: 85 },
      { name: "GitHub", percentage: 85 },
      { name: "Xcode", percentage: 80 },
      { name: "GDB", percentage: 75 },
      { name: "VMware", percentage: 70 },
      { name: "Anaconda", percentage: 65 },
      { name: "GCC", percentage: 60 },
      { name: "Python Sockets", percentage: 55 }
    ]
  },
  {
    category: "Design & Other Skills",
    experience: "1 year of experience",
    skillsList: [

      { name: "Figma", percentage: 95 },
      { name: "Canva", percentage: 90 },
      { name: "Photoshop", percentage: 80 },
      { name: "Wireshark", percentage: 75 },
      { name: "Adobe Illustrator", percentage: 75 },
      { name: "Wireframing", percentage: 75 },
      { name: "Autopsy", percentage: 65 },
      { name: "R Studio", percentage: 65 }
    ]
  }
];

// Projects data
export const projects = [
  {
    title: "Multi Stage Pipeline Processor",
    description: "A simulator for the processes of a multi-stage processor pipeline. Takes input of LegV8 assembly language file and assembles it into machine code in C, then simulates a processor that updates and accesses a virtual processor registry and stack.",
    tech: "C, LegV8",
    category: "C",
    link: "#",
  },
  {
    title: "Malik Industries",
    description: "An e-commerce website using Sanity IO to store a database of products that can be managed and easily updated using the Sanity client dashboard in addition to real-time payments from active users on the website with user feedback on purchase.",
    tech: "React, NextJS, Sanity, Stripe, JavaScript",
    category: "Javascript",
    link: "https://github.com/sammalik111/malik_Industries",
  },
  {
    title: "Would You Rather?",
    description: "A website that mimics an online game where you choose between two options with a functioning comments section, search bar, a working database, and profile options that have login credentials and store session information.",
    tech: "React, NodeJS, MongoDB, JavaScript, AJAX requests",
    category: "Javascript",
    link: "https://github.com/sammalik111/Would-You-Rather-",
  },
  {
    title: "Sound Survivor",
    description: "Programmed a 2D platform game using NodeJS where the player has the ability to pick up powers & escape the dimension they're trapped in with multiple game scenes and cinematic effects.",
    tech: "C#, Unity",
    category: "C",
    link: "https://github.com/sammalik111/sound-survivor",
  },
  {
    title: "Convolutions",
    description: "An ongoing development project testing convolutional neural networks and image interpretation using different forms of kernels on a variable amount of convolutional layers.",
    tech: "Python, Bashscript",
    category: "Python",
    link: "https://github.com/sammalik111/convolutions",
  },
  {
    title: "Stock Exchange",
    description: "A stock exchange data analysis tool that simulates all trades in any given time period by interpreting information from a CSV file, with 100,000 test sales to test and ensure accuracy of data.",
    tech: "C++",
    category: "C",
    link: "#",
  },
];
  
  // Qualifications data
  export const qualifications = [
    {
        type: 'school',
        date: "2021 - 2024",
        title: "Bachelor's Degree in Computer Science",
        institution: "University of Michigan, Ann Arbor",
        description: "Graduated with a major in Computer Science with a focus in artifical intelligence and business, including coursework in algorithms, machine learning, and web development.",
    },
    {
        type: 'school',
        date: "2021 - 2021",
        title: "Google Data Analytics Certification",
        institution: "",
        description: "Completed Google's professional certificate in Data Analytics, which included hands-on projects analyzing large datasets with Python and SQL.",
    },
    {
      type: 'work',
      date: "OCT 2023 - MAY 2024",
      title: "Software Engineer",
      institution: "University of Michigan, Ann Arbor, MI",
      description: `
          Consolidated anatomic 3D models from OpenJSCad and ThreeJS into a unified format for business export, optimizing the models for 
          commercial use. Developed a new website using Vite and ReactJS to enable parametric human body modeling for hospitals, allowing for 
          patient-specific equipment design based on six parameters.`,
    },
    {
      type: 'work',
      date: "MAY 2024 - AUG 2024",
      title: "Employment Training Intern",
      institution: "Talent Beyond Boundaries, Amman, Jordan",
      description: `
          Conducted English training sessions to improve refugees' employability and language proficiency.
          Facilitated acquiring passports and travel documents to aid refugees in relocating to safer countries.
          Prepared refugees for technical interviews by conducting mock interviews with feedback on technical and soft skills.
      `,
    }
  ];