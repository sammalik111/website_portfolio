// data.js


export const skills = [
  {
    category: "Programming Languages",
    experience: "4 years of experience",
    skillsList: [
      { name: "Python", percentage: 100 },
      { name: "JavaScript", percentage: 95 },
      { name: "TypeScript", percentage: 95 },
      { name: "Ruby", percentage: 90 },
      { name: "Go", percentage: 90 },
      { name: "C++", percentage: 85 },
      { name: "C", percentage: 85 },
      { name: "SQL", percentage: 85 },
      { name: "LaTeX", percentage: 75 }
    ]
  },
  {
    category: "Web & Cloud Technologies",
    experience: "3 years of experience",
    skillsList: [
      { name: "React JS", percentage: 95 },
      { name: "NodeJS", percentage: 90 },
      { name: "AWS", percentage: 90 },
      { name: "Bootstrap", percentage: 85 },
      { name: "Vue.js", percentage: 80 },
      { name: "React Native", percentage: 80 },
      { name: "Docker", percentage: 75 }
    ]
  },
  {
    category: "Security & Network",
    experience: "2 years of experience",
    skillsList: [
      { name: "SSH", percentage: 95 },
      { name: "Network Security", percentage: 90 },
      { name: "AES Ciphers", percentage: 80 },
      { name: "Python Sockets", percentage: 75 }
    ]
  },
  {
    category: "Development & Methodologies",
    experience: "3 years of experience",
    skillsList: [
      { name: "Agile Development", percentage: 95 },
      { name: "Scrum", percentage: 95 },
      { name: "Git", percentage: 90 },
      { name: "Project Planning", percentage: 90 },
      { name: "Daily Standup", percentage: 85 },
      { name: "Sprint Review", percentage: 85 },
      { name: "MVC", percentage: 80 }
    ]
  },
  {
    category: "3D & Scientific Computing",
    experience: "2 years of experience",
    skillsList: [
      { name: "ThreeJS", percentage: 90 },
      { name: "NumPy", percentage: 85 },
      { name: "OpenJSCad", percentage: 80 },
      { name: "Unity", percentage: 75 }
    ]
  },
  {
    category: "Tools & Platforms",
    experience: "3 years of experience",
    skillsList: [
      { name: "VS Code", percentage: 100 },
      { name: "Linux", percentage: 95 },
      { name: "Figma", percentage: 90 },
      { name: "SQLite", percentage: 85 },
      { name: "Gitlab", percentage: 80 },
      { name: "Sanity IO", percentage: 75 },
      { name: "Stripe", percentage: 70 }
    ]
  }
];

// Projects data
export const projects = [
  {
    title: "Multi Cycle Processor Simulator",
    description: "Designed a two-stage simulator for a multi-stage processor pipeline that converts LegV8 assembly files to C language machine code. Enhanced performance by debugging edge cases and optimizing execution times using VSCode debugger to address data and control hazards.",
    tech: "C, LegV8, Assembly",
    category: "C",
    link: "#",
  },
  {
    title: "Malik Industries",
    description: "An e-commerce website using Sanity IO to store a database of products that can be managed and easily updated using the Sanity client dashboard in addition to real-time payments from active users on the website with user feedback on purchase.",
    tech: "React, NextJS, Sanity, Stripe, JavaScript",
    category: "Javascript",
    link: "https://github.com/Shahmeermalik111/malik_Industries",
  },
  {
    title: "Would You Rather?",
    description: "A website that mimics an online game where you choose between two options with a functioning comments section, search bar, a working database, and profile options that have login credentials and store session information.",
    tech: "React, NodeJS, MongoDB, JavaScript, AJAX requests",
    category: "Javascript",
    link: "https://github.com/Shahmeermalik111/Would-You-Rather-",
  },
  {
    title: "Sound Survivor",
    description: "Programmed a 2D platform game using NodeJS where the player has the ability to pick up powers & escape the dimension they're trapped in with multiple game scenes and cinematic effects.",
    tech: "C#, Unity",
    category: "C",
    link: "https://github.com/Shahmeermalik111/sound-survivor",
  },
  {
    title: "Convolutions",
    description: "An ongoing development project testing convolutional neural networks and image interpretation using different forms of kernels on a variable amount of convolutional layers.",
    tech: "Python, Bashscript",
    category: "Python",
    link: "https://github.com/Shahmeermalik111/convolutions",
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
        date: "SEP 2019 - AUG 2024",
        title: "Bachelor of Science in Engineering - Computer Science",
        institution: "University of Michigan, Ann Arbor",
        description: "Coursework: Discrete Mathematics, System Architecture, Computer Security, Artificial Intelligence, Advanced Data Structures & Algorithms, Advanced Business Analytics, Statistics and Data Analysis, Software Engineering, User Interface Development, Data Analytics.",
    },
    {
        type: 'school',
        date: "JUN 2022 - JUL 2022",
        title: "Google Data Analytics Certification",
        institution: "Google",
        description: "Gained proficiency in data cleaning, preparation, and validation techniques using spreadsheets and SQL. Developed strong proficiency in SQL for querying and managing large datasets in relational databases.",
    },
    {
        type: 'school',
        date: "AUG 2025 - OCT 2025",
        title: "AWS Cloud Practitioner Certification",
        institution: "Amazon Web Services",
        description: "Gained proficiency in core AWS services including EC2, S3, Lambda, RDS, and IAM, with emphasis on security best practices. Developed understanding of cloud deployment models, shared responsibility model, and compliance frameworks within the AWS ecosystem.",
    },
    {
      type: 'work',
      date: "SEP 2024 - PRESENT",
      title: "Software Development Engineer",
      institution: "Amazon Web Services Security, Herndon, VA",
      description: `
          Supported and optimized secure, scalable access solutions within AWS infrastructure, specializing in SSH, WebSocket-SSH, and Certificate Authority (CA) services. 
          Implemented and maintained CI/CD pipelines with SCRUM workflows to ensure rapid, reliable deployment of security services. 
          Enhanced cloud access efficiency and compliance by streamlining remote connectivity, enforcing AWS security standards, and collaborating with clients to ensure service availability and scalability.
      `,
    },
    {
      type: 'work',
      date: "OCT 2023 - MAY 2024",
      title: "Software Engineer",
      institution: "University of Michigan, Ann Arbor, MI",
      description: `
          Consolidated multiple anatomic 3D models sourced from modeling libraries such as OpenJSCad and ThreeJS into a unified object file format by optimizing the models for commercial and business export purposes. 
          Accomplished the development of a new website using Vite and ReactJS enabling parametric human body modeling for hospitals by incorporating 3D models that allow for the design of patient-specific equipment based on 6 unique parameters.
      `,
    }
  ];