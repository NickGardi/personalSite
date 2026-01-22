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
    title: 'Limit Order Book & Execution Simulator',
    description: 'Built a Python-based limit order book and execution simulator modeling price–time priority, partial fills, and market orders.',
    longDescription: 'Developed a limit order book and execution simulator in Python to model exchange matching engine behavior. The system implements price–time priority matching, handles partial fills, and processes market orders. Built post-trade analytics to explore execution quality, slippage, and liquidity dynamics through scenario-based simulations. Created a lightweight web interface using React and FastAPI for interactive visualization and analysis of order execution patterns.',
    technologies: ['Python', 'FastAPI', 'NumPy', 'SortedContainers', 'React'],
    imageUrl: '/chart.jpg',
    media: [
      { type: 'image', url: '/chart.jpg', title: 'Limit Order Book Visualization' },
    ],
  },
  {
    title: 'Concurrent Multiplayer Game Platform',
    description: 'A scalable multiplayer game platform built with Go, leveraging goroutines and channels to handle concurrent game sessions and real-time player communication.',
    longDescription: 'Developed a high-performance multiplayer game platform using Go that enables multiple players to compete in real-time minigames. The system utilizes Go\'s concurrency primitives (goroutines and channels) to efficiently manage concurrent game sessions, player matchmaking, and WebSocket connections. Implemented server-side game state synchronization to ensure fair gameplay and handle network latency. The platform supports multiple game types with a clean, modular architecture that allows for easy addition of new games. Built with a Go backend and JavaScript frontend, demonstrating full-stack development capabilities.',
    technologies: ['Go', 'WebSockets', 'JavaScript', 'REST APIs'],
    imageUrl: '/typegamepic.png',
    demoUrl: 'https://goservergames.fly.dev/',
    githubUrl: 'https://github.com/NickGardi/GoServerGames',
    media: [
      { type: 'image', url: '/typegamepic.png', title: 'Concurrent Multiplayer Game Platform Screenshot' },
      { type: 'image', url: '/rtgame2.png', title: 'Real-Time Game Screenshot 2' },
      { type: 'image', url: '/rtgame1.png', title: 'Real-Time Game Screenshot 1' },
    ],
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
    }, 1000);
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

