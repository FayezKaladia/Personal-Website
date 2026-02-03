// Portfolio data - all content is configurable
export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    summary: string;
    email: string;
    location: string;
    resumeUrl: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description?: string;
  highlights?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl?: string;
}

// Default placeholder data
export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "Mohammed Fayez Kaladia",
    role: "AI & Machine Learning Engineer",
    tagline: "Building intelligent systems that shape the future",
    summary: "AI & Machine Learning Engineering student with a First Class Diploma in AI and ML, currently pursuing BE in CSE (AI & ML). Passionate about developing innovative machine learning solutions and pushing the boundaries of artificial intelligence.",
    email: "fayezkaladia@gmail.com",
    location: "India",
    resumeUrl: "#",
  },
  social: {
    github: "https://github.com/FayezKaladia",
    linkedin:"https://www.linkedin.com/in/mohammed-fayez-kaladia-b24b20375",
    twitter: "https://twitter.com",
  },
  experience: [
    {
      id: "exp-1",
      title: "Data Science Intern",
      company: "Code Alpha",
      location: "Virtual",
      period: "January 2026 – February 2026",
      description: "Worked on practical data science workflows including data analysis, preprocessing, model development, and performance evaluation using Python-based tools.",
      highlights: [
        "Performed exploratory data analysis (EDA) to identify trends, patterns, and correlations in structured datasets",
        "Cleaned and preprocessed datasets using Pandas and NumPy to improve model accuracy",
        "Built and evaluated machine learning models using Scikit-learn",
        "Applied feature engineering techniques to enhance prediction performance",
        "Documented model results and findings for better interpretability",
      ],
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    },
    {
      id: "exp-2",
      title: "Junior AI/ML Engineer",
      company: "CodexIntern",
      location: "Remote",
      period: "October 2025 – December 2025",
      description: "Focused on learning and implementing core AI/ML concepts including supervised learning algorithms, model evaluation techniques, and hyperparameter tuning.",
      highlights: [
        "Implemented regression models for predictive analytics tasks",
        "Built and tested classification models using structured and image datasets",
        "Applied data preprocessing techniques such as normalization, encoding, and dataset splitting",
        "Performed model performance evaluation using accuracy metrics and validation methods",
        "Collaborated on multiple AI projects following industry development practices",
        "Projects: Iris Dataset Classification, House Price Prediction, Cats vs Dogs Image Classifier",
      ],
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
    },
    {
      id: "exp-3",
      title: "Junior Software Developer Intern",
      company: "Hertzsoft Technologies Pvt. Ltd.",
      location: "On-site",
      period: "June 2024 – September 2024",
      description: "Worked on frontend and basic backend web development while gaining hands-on experience in modern development workflows and version control systems.",
      highlights: [
        "Developed and cloned responsive websites from scratch using modern web technologies",
        "Implemented UI components with clean and structured code practices",
        "Learned and applied version control using Git and GitHub for collaborative development",
        "Assisted in debugging, testing, and improving website performance",
        "Gained exposure to software development lifecycle and deployment practices",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Web Development Tools"],
    },
    {
      id: "exp-4",
      title: "Computer Operations Intern",
      company: "Anjuman-I-Islam Computer Centre",
      location: "On-site",
      period: "January 2024 – March 2024",
      description: "Handled academic and administrative data management tasks while assisting in maintaining digital student records and improving data organization processes.",
      highlights: [
        "Managed and maintained student information databases",
        "Performed data cleaning and preprocessing to ensure data accuracy and consistency",
        "Worked extensively with Excel for record management, formatting, and reporting",
        "Assisted staff in maintaining computerized academic systems",
        "Improved data handling workflows for better record accessibility",
      ],
      technologies: ["Microsoft Excel", "Data Processing Tools", "Database Handling Basics"],
    },
    
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Engineering - CSE (AI & ML)",
      institution: "University Name",
      location: "India",
      period: "2028",
      description: "Specializing in Artificial Intelligence and Machine Learning",
      highlights: [
        "Core coursework in Deep Learning, NLP, Computer Vision",
        "Active member of AI Research Club",
      ],
    },
    {
      id: "edu-2",
      degree: "Diploma in AI and Machine Learning",
      institution: "Polytechnic Name",
      location: "India",
      period: "2023 - 2025",
      grade: "First Class",
      description: "Comprehensive foundation in AI/ML fundamentals",
      highlights: [
        "Graduated with First Class distinction",
        "Completed multiple industry-relevant projects",
        "Led technical workshops on Python and ML",
      ],
    },
    {
      id: "edu-3",
      degree: "Secondary Education (11th & 12th)",
      institution: "School Name",
      location: "India",
      period: "2021 - 2023",
      grade: "Distinction",
      description: "Advanced coursework with focus on Science and Mathematics",
      highlights: [
        "Scored 95% in Board Examinations",
        "Merit certificate in Science stream",
        "Active in Science club and projects",
      ],
    },
    {
      id: "edu-4",
      degree: "Secondary Education (10th)",
      institution: "School Name",
      location: "India",
      period: "2021 onwards",
      grade: "Excellent",
      description: "Foundation in core academic subjects and STEM disciplines",
      highlights: [
        "Secured 94% in Board Examinations",
        "Merit certificate for academic excellence",
        "Participated in district-level science fair",
      ],
    },
  ],
  skills: [
    {
      name: "AI & Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLTK", "Hugging Face"],
    },
    {
      name: "Programming",
      skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "R"],
    },
    {
      name: "Tools & Platforms",
      skills: ["Git", "Docker", "AWS", "GCP", "Jupyter", "VS Code", "Linux"],
    },
    {
      name: "Data Science",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "Power BI"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Intelligent Document Analyzer",
      description: "An AI-powered system that extracts, classifies, and summarizes information from documents using NLP and computer vision techniques.",
      technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: true,
    },
    {
      id: "proj-2",
      title: "Real-time Object Detection System",
      description: "Custom YOLO implementation for real-time object detection with optimized inference on edge devices.",
      technologies: ["Python", "PyTorch", "YOLO", "OpenCV"],
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "proj-3",
      title: "Sentiment Analysis Dashboard",
      description: "Full-stack application analyzing social media sentiment with real-time visualization and trend prediction.",
      technologies: ["Python", "React", "BERT", "PostgreSQL"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: false,
    },
    {
      id: "proj-4",
      title: "Neural Style Transfer App",
      description: "Web application that applies artistic styles to images using convolutional neural networks.",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      githubUrl: "https://github.com",
      featured: false,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2024",
      description: "Professional certification demonstrating proficiency in TensorFlow for machine learning.",
    },
    {
      id: "ach-2",
      title: "Hackathon Winner - AI Track",
      issuer: "Tech Conference",
      date: "2024",
      description: "First place in AI/ML category for innovative solution in healthcare automation.",
    },
    {
      id: "ach-3",
      title: "AWS Machine Learning Specialty",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Advanced certification in building and deploying ML solutions on AWS.",
    },
    {
      id: "ach-4",
      title: "Research Publication",
      issuer: "IEEE Conference",
      date: "2023",
      description: "Co-authored paper on efficient transformer architectures for edge deployment.",
    },
    {
      id: "ach-5",
      title: "PyTorch Excellence Award",
      issuer: "PyTorch Community",
      date: "2024",
      description: "Recognition for significant contributions to open-source PyTorch projects and community engagement.",
    },
    {
      id: "ach-6",
      title: "AI Innovation Summit Speaker",
      issuer: "Tech Leaders Forum",
      date: "2024",
      description: "Invited speaker presenting cutting-edge ML techniques at international AI conference.",
    },
    {
      id: "ach-7",
      title: "Microsoft Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "2023",
      description: "Certified in Azure AI services and intelligent cloud solutions architecture.",
    },
    {
      id: "ach-8",
      title: "Data Science Excellence Badge",
      issuer: "Coursera",
      date: "2023",
      description: "Completed advanced specialization in Data Science with distinction from top instructors.",
    },
    {
      id: "ach-9",
      title: "Patent Application - ML Algorithm",
      issuer: "Patent Office",
      date: "2024",
      description: "Filed patent for novel machine learning optimization algorithm for edge computing.",
    },
    {
      id: "ach-10",
      title: "Top 100 AI Innovators",
      issuer: "Global Tech Magazine",
      date: "2023",
      description: "Recognized among top 100 young AI innovators making impact in the tech industry.",
    },
    {
      id: "ach-11",
      title: "Deep Learning Specialization",
      issuer: "Coursera (Andrew Ng)",
      date: "2023",
      description: "Advanced certification in neural networks and deep learning from industry leader Andrew Ng.",
    },
    {
      id: "ach-12",
      title: "Hackathon Finalist - Global AI Cup",
      issuer: "Global AI Cup",
      date: "2024",
      description: "Finalist in prestigious international hackathon competing with 5000+ developers worldwide.",
    },
  ],
};
