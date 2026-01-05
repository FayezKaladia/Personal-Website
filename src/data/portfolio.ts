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
      title: "Machine Learning Intern",
      company: "Tech Company",
      location: "Remote",
      period: "2024 - Present",
      description: "Developing and deploying machine learning models for production environments.",
      highlights: [
        "Built predictive models achieving 95% accuracy",
        "Implemented data pipelines for real-time processing",
        "Collaborated with cross-functional teams on AI initiatives",
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "AWS"],
    },
    {
      id: "exp-2",
      title: "AI Research Assistant",
      company: "University Lab",
      location: "On-site",
      period: "2023 - 2024",
      description: "Conducted research on deep learning architectures and natural language processing.",
      highlights: [
        "Published research on transformer architectures",
        "Developed novel NLP preprocessing techniques",
        "Mentored junior students in ML fundamentals",
      ],
      technologies: ["Python", "Hugging Face", "BERT", "GPT"],
    },
    {
      id: "exp-3",
      title: "Data Science Trainee",
      company: "Analytics Corp",
      location: "Hybrid",
      period: "2022 - 2023",
      description: "Worked on data analysis projects and built visualization dashboards for business insights.",
      highlights: [
        "Created interactive dashboards reducing report time by 40%",
        "Automated data cleaning pipelines for 10+ datasets",
        "Presented insights to stakeholders and executives",
      ],
      technologies: ["Python", "Pandas", "Tableau", "SQL"],
    },
    {
      id: "exp-4",
      title: "Open Source Contributor",
      company: "Various Projects",
      location: "Remote",
      period: "2021 - 2022",
      description: "Contributed to open-source machine learning and data science projects.",
      highlights: [
        "Merged 15+ pull requests to popular ML libraries",
        "Fixed critical bugs in scikit-learn documentation",
        "Built community tutorials for beginner developers",
      ],
      technologies: ["Python", "Git", "Scikit-learn", "NumPy"],
    },
    {
      id: "exp-5",
      title: "Technical Workshop Lead",
      company: "College Tech Club",
      location: "On-site",
      period: "2020 - 2021",
      description: "Organized and led technical workshops on programming and AI fundamentals.",
      highlights: [
        "Trained 100+ students in Python programming",
        "Organized hackathon with 200+ participants",
        "Created curriculum for intro to machine learning",
      ],
      technologies: ["Python", "Jupyter", "Git", "Linux"],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Engineering - CSE (AI & ML)",
      institution: "University Name",
      location: "India",
      period: "2024 - Present",
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
      period: "2021 - 2024",
      grade: "First Class",
      description: "Comprehensive foundation in AI/ML fundamentals",
      highlights: [
        "Graduated with First Class distinction",
        "Completed multiple industry-relevant projects",
        "Led technical workshops on Python and ML",
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
  ],
};
