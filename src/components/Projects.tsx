import React, { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';
import './Projects.css';

export interface MediaItem {
  type: 'image' | 'youtube';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  media?: MediaItem[];
}

const projects: Project[] = [
  {
    title: 'Project Title',
    description: 'Brief description of your project.',
    longDescription: 'Detailed description of your project. Explain what it does, how it works, and what technologies or techniques you used. This will appear in the modal when users click on the project.',
    technologies: ['Technology 1', 'Technology 2', 'Technology 3'],
    imageUrl: undefined,
    media: [],
  },
  {
    title: 'Real-Time Multiplayer Game Platform (1v1 Tag Arena)',
    description: 'Implemented an authoritative real-time multiplayer backend supporting concurrent 1v1 matches with deterministic state updates.',
    longDescription: 'Implemented an authoritative real-time multiplayer backend supporting concurrent 1v1 matches with deterministic state updates. Built matchmaking, server-side collision detection, and graceful handling of disconnects and timeouts. The system ensures fair gameplay through server-authoritative game state management and handles network latency challenges.',
    technologies: ['Python', 'Go', 'WebSockets', 'Redis', 'PostgreSQL'],
    media: [],
  },
  {
    title: 'Neuroevolution-Based Game AI (Flappy Bird)',
    description: 'Developed an AI that learns to play Flappy Bird using the NEAT algorithm, evolving neural networks through genetic algorithms.',
    longDescription: 'Built a neuroevolution system using the NEAT (NeuroEvolution of Augmenting Topologies) algorithm to train an AI to play Flappy Bird. The system evolves neural network architectures and weights through genetic algorithms, starting with simple networks and gradually increasing complexity. Over multiple generations, the AI learns optimal strategies for navigating obstacles by selecting the best-performing networks and mutating them to create improved versions.',
    technologies: ['Python', 'NEAT', 'Pygame', 'Genetic Algorithms'],
    imageUrl: '/NEAT1.png',
    githubUrl: 'https://github.com/NickGardi/NEATFlappyBird',
    media: [
      { type: 'image', url: '/NEAT1.png', title: 'NEAT Evolution - Generation 1' },
      { type: 'image', url: '/NEAT2.png', title: 'NEAT Evolution - Mid Generations' },
      { type: 'image', url: '/NEAT3.png', title: 'NEAT Evolution - Advanced Generations' },
    ],
  },
  {
    title: 'Fitness Wearable Data Aggregation Mobile App',
    description: 'A mobile app that connects to WHOOP wearables to display real-time heart rate data and provide audio feedback based on heart rate zones.',
    longDescription: 'A mobile application that integrates with WHOOP fitness trackers to display real-time heart rate monitoring. The app processes continuous BPM data streams and provides zone-based audio feedback to help users stay within their target heart rate zones during workouts. App Store coming soon.',
    technologies: ['React Native', 'TypeScript', 'REST APIs'],
    imageUrl: '/whoopapp.png',
    githubUrl: 'https://github.com/NickGardi/WhoopRun',
    media: [
      { type: 'image', url: '/whoopapp.png', title: 'Fitness App Screenshot' },
    ],
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<{ [key: number]: number }>({});
  const hoverIntervalRef = useRef<{ [key: number]: ReturnType<typeof setInterval> }>({});

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleProjectMouseEnter = (projectIndex: number, project: Project) => {
    if (!project.media || project.media.length <= 1) return;
    
    setHoveredProjectIndex(projectIndex);
    setHoveredImageIndex((prev) => ({ ...prev, [projectIndex]: 0 }));
    
    // Clear any existing interval for this project
    if (hoverIntervalRef.current[projectIndex]) {
      clearInterval(hoverIntervalRef.current[projectIndex]);
    }
    
    // Start cycling through images
    hoverIntervalRef.current[projectIndex] = setInterval(() => {
      setHoveredImageIndex((prev) => {
        const currentIndex = prev[projectIndex] || 0;
        const nextIndex = (currentIndex + 1) % project.media!.length;
        return { ...prev, [projectIndex]: nextIndex };
      });
    }, 1500);
  };

  const handleProjectMouseLeave = (projectIndex: number) => {
    setHoveredProjectIndex(null);
    
    // Clear the interval when mouse leaves
    if (hoverIntervalRef.current[projectIndex]) {
      clearInterval(hoverIntervalRef.current[projectIndex]);
      delete hoverIntervalRef.current[projectIndex];
    }
    
    // Reset to first image
    setHoveredImageIndex((prev) => ({ ...prev, [projectIndex]: 0 }));
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(hoverIntervalRef.current).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <>
      <section className="projects section">
        <div className="container">
          <h2 className="section-title">Personal Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => handleProjectMouseEnter(index, project)}
                onMouseLeave={() => handleProjectMouseLeave(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                {(() => {
                  // Show cycling images if hovering and project has multiple media items
                  if (hoveredProjectIndex === index && project.media && project.media.length > 1) {
                    const currentMediaIndex = hoveredImageIndex[index] || 0;
                    const currentMedia = project.media[currentMediaIndex];
                    if (currentMedia && currentMedia.type === 'image') {
                      return <img src={currentMedia.url} alt={project.title} className="project-image" />;
                    }
                  }
                  // Otherwise show the default image
                  return project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="project-image" />
                  ) : (
                    <div className="project-image-placeholder">
                      <span>Project Screenshot</span>
                    </div>
                  );
                })()}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.technologies && (
                    <div className="project-technologies">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-links">
                    <span className="project-link view-details">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;

