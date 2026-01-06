import React, { useEffect, useState } from 'react';
import './ProjectModal.css';

interface MediaItem {
  type: 'image' | 'youtube';
  url: string;
  thumbnail?: string;
  title?: string;
}

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  media?: MediaItem[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0); // Reset to first image when modal opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePrevious = () => {
    if (!project?.media) return;
    setCurrentImageIndex((prev: number) => (prev === 0 ? project.media!.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!project?.media) return;
    setCurrentImageIndex((prev: number) => (prev === project.media!.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
        </div>

        {project.media && project.media.length > 0 && (
          <div className="modal-gallery">
            {project.media.length > 1 && (
              <button className="gallery-arrow gallery-arrow-left" onClick={handlePrevious} aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
            <div className="gallery-container">
              {project.media.map((item, index) => (
                <div 
                  key={index} 
                  className={`gallery-item ${index === currentImageIndex ? 'active' : ''}`}
                >
                  {item.type === 'youtube' ? (
                    <div className="youtube-embed">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(item.url)}`}
                        title={item.title || project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title || `Screenshot ${index + 1} of ${project.title}`}
                      className="gallery-image"
                    />
                  )}
                </div>
              ))}
            </div>
            {project.media.length > 1 && (
              <button className="gallery-arrow gallery-arrow-right" onClick={handleNext} aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
            {project.media.length > 1 && (
              <div className="gallery-dots">
                {project.media.map((_, index) => (
                  <button
                    key={index}
                    className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="modal-body">
          <div className="modal-description">
            <h3>About this project</h3>
            <p>{project.longDescription || project.description}</p>
          </div>

          <div className="modal-links">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link demo-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View Demo
              </a>
            )}
          </div>

          {project.technologies && (
            <div className="modal-tech-section">
              <h3>Technologies Used</h3>
              <div className="modal-tech-list">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {project.githubUrl && (
            <div className="modal-github-section">
              <h3>Code</h3>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

