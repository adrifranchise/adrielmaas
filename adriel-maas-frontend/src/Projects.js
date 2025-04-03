import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { fetchProjects } from './services/api';

// Project Card Component
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {project.image && (
        <div className="h-48 bg-gray-200">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x200?text=Project+Image";
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-4">{project.description}</p>
        
        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies && project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Links */}
        <div className="flex gap-4 mt-2">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              GitHub
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Fallback data if API fails or during development
  const dummyProjects = [
    {
      id: 1,
      title: "Personal Website",
      description: "A responsive personal website built with React and Flask to showcase my projects and thoughts.",
      image: "https://via.placeholder.com/400x200?text=Personal+Website",
      technologies: ["React", "Flask", "Tailwind CSS", "Python"],
      github: "https://github.com/yourusername/personal-website",
      live: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A full-stack task management application with user authentication and real-time updates.",
      image: "https://via.placeholder.com/400x200?text=Task+App",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/yourusername/task-app",
      live: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A weather application that fetches and displays current weather and forecasts for any location.",
      image: "https://via.placeholder.com/400x200?text=Weather+App",
      technologies: ["JavaScript", "HTML", "CSS", "Weather API"],
      github: "https://github.com/yourusername/weather-app",
      live: "#"
    }
  ];

  return (
    <Layout>
      <div className="py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
        
        {loading && (
          <div className="flex justify-center">
            <p className="text-gray-700">Loading projects...</p>
          </div>
        )}
        
        {error && (
          <div className="max-w-md mx-auto bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <p className="mt-2">Showing sample projects instead.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Use API data if available, fall back to dummy data if not */}
          {(projects.length > 0 ? projects : error ? dummyProjects : []).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;
