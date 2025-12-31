import React, { useEffect, useRef } from 'react';
import './Projects.css';
import work1 from '../assets/work-1.png';
import work2 from '../assets/work-2.png';
import work3 from '../assets/work-3.png';

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const node = projectsRef.current; // capture once
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node); // safe, stable reference
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Retail Inventory Management System',
      image: work1,
      description: 'I embarked on the development of a retail inventory system to streamline inventory management processes for businesses. The system is designed to support role-based access control, allowing Admins, Managers, Employees, and Customers to interact with the system based on their respective roles. Additionally, I incorporated Bootstrap and CSS for a visually appealing and responsive interface, alongside PHP and MySQL for robust backend functionality.',
      technologies: ['PHP', 'MySQL', 'Bootstrap', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'SQLI Environment',
      image: work2,
      description: 'A development and testing of a purposefully vulnerable web application designed to demonstrate SQL injection vulnerabilities. SQL injection remains one of the most critical web application security risks, ranked third in the OWASP Top 10 2021. The application serves as an educational tool to understand how SQL injection attacks work, their potential impact, and the importance of implementing proper security measures.',
      note: 'Note: This application and all attack vectors presented are for educational purposes only and should never be implemented in production environments.',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS']
    },
    {
      id: 3,
      title: 'The Little Boy 2D Animation',
      image: work3,
      description: 'This is a short film project using Flash 8. It is a 2D animation short clip about the moral lesson of giving.',
      technologies: ['Flash 8', 'ibisPaint', 'Canva', 'Capcut'],
      note: 'Link to video will soon be updated.'
    }
  ];

  return (
    <section className="projects-section bg-light" id="works" ref={projectsRef}>
      <div className="container">
        <h2 className="text-center section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                {project.technologies && (
                  <div className="technologies">
                    <p className="tech-label">Technologies Used:</p>
                    <ul className="tech-list">
                      {project.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.note && (
                  <p className={`note ${project.id === 2 ? 'text-danger' : 'text-primary'}`}>
                    {project.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;


