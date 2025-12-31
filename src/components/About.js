import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import skillImg4 from '../assets/4.png';
import skillImg1 from '../assets/1.png';
import skillImg2 from '../assets/2.png';
import skillImg3 from '../assets/3.png';

const About = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(0);
  const aboutRef = useRef(null);

  useEffect(() => {
    const node = aboutRef.current; // capture once
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate progress bars when section becomes visible
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach((bar, index) => {
              const level = bar.getAttribute('data-level');
              setTimeout(() => {
                bar.style.width = `${level}%`;
              }, 200 + (index * 50));
            });
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

  const skills = {
    webDev: [
      { name: 'HTML', level: 80, color: 'success' },
      { name: 'CSS', level: 70, color: 'info' },
      { name: 'JavaScript', level: 25, color: 'warning' },
      { name: 'Bootstrap', level: 70, color: 'subtle' },
      { name: 'PHP', level: 40, color: 'danger' },
      { name: 'SQL', level: 35, color: 'warning' },
      { name: 'Java', level: 10, color: 'danger' },
      { name: 'C', level: 5, color: 'info' },
      { name: 'Visual Basic', level: 30, color: 'subtle' },
      { name: 'Python', level: 10, color: 'success' },
      { name: 'ReactJS', level: 15, color: 'danger' },
      { name: 'NEXTJS', level: 14, color: 'danger' },
    ]
  };

  const experiences = [
    {
      id: 0,
      title: 'Customer Service Representative (Novus Philippines) | April – September 2021',
      icon: 'fa-comments-o',
      details: [
        'Handled inbound/outbound calls for US loan companies & IQVIA',
        'Managed client interactions using Five CRM',
        'Provided professional customer support & problem resolution'
      ]
    },
    {
      id: 1,
      title: 'Appointment Setter (VA Achievers - Celebrity Branding) | December 2021 – January 2022',
      icon: 'fa-calendar',
      details: [
        'Contacted leads & scheduled calls using HubSpot',
        'Introduced branding services to potential clients'
      ]
    },
    {
      id: 2,
      title: 'Student Assistant (CSA-B External Relations Office) | June 2023 – August 2024',
      icon: 'fa-user',
      details: [
        'Managed office paperwork, official documents & emails',
        'Created social media content & tracked engagement',
        'Handled alumni assistance & customer inquiries'
      ]
    },
    {
      id: 3,
      title: 'General Virtual Assistant (Freelance) | January – August 2025',
      icon: 'fa-book',
      details: [
        'Graphic Design – Create visually engaging graphics for social media using Canva.',
        'Data Entry & Organization – Format and organize documents for better readability and structure.',
        'Administrative Support – Help streamline workflows by managing files and ensuring document accuracy.'
      ]
    },
        {
      id: 4,
      title: 'Appointment Setter (Dodoche) | April – October 2025',
      icon: 'fa-calendar',
      details: [
        'Scheduled appointments for loan officers by managing outbound and follow-up calls.',
        'Used GoHighLevel (GHL) CRM to update client records, track interactions, and monitor pipelines.',
        'Delivered professional customer support, ensuring smooth communication between loan officers and prospects.'
      ]
    }
  ];

  const toggleAccordion = (id) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  const navigate = useNavigate();

  const scrollToSamples = () => {
    // navigate to the works/gallery route
    navigate('/works');
  };

  const getProgressBarColor = (color) => {
    const colors = {
      success: '#28a745',
      info: '#17a2b8',
      warning: '#ffc107',
      danger: '#dc3545',
      subtle: '#6c757d'
    };
    return colors[color] || '#6c757d';
  };

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      <div className="about-wrapper">

        <div className="container info">
          <h1 className="text-center card-title mb-4">About Me</h1>
          <div className="about-content">
            <p className="text-center h4">
              I’m an IT professional with a strong passion for web development, UX/UI design, and cybersecurity. I have hands-on experience working with both front-end and back-end technologies, and I enjoy building clean, functional, and user-friendly websites that prioritize usability, performance, and accessibility. I’m particularly interested in creating digital experiences that are not only visually appealing but also intuitive and secure.
            </p>
            <div className="text-center mb-4 mt-4">
              <p className="text-center h4">
                Beyond technical skills, I bring a strong background in communication and client-facing roles. As a Customer Service Representative and Appointment Setter, I developed excellent verbal and written communication skills, attention to detail, and the ability to solve problems efficiently in fast-paced environments. These roles strengthened my ability to understand user needs and translate them into effective solutions.
              </p>
              <p className="text-center h4">
                I also worked as a Student Assistant, where I supported administrative operations, managed social media content, and provided basic technical assistance. This experience improved my organizational skills, adaptability, and ability to work collaboratively with different teams. I’m eager to continue growing as a developer by building real-world projects, learning new technologies, and contributing to meaningful digital solutions.
                </p>
            </div>
            <hr />

            <div className="skills-section mb-4">
              <h1 className="text-center mb-4">Skills & Technologies</h1>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="card-title text-center mt-4 mb-4 h5">Web Development</div>
                  <div className="card-body text-center">
                    <img src={skillImg4} alt="Web Development" className="skill-icon" />
                    <div className="progress-container">
                      {skills.webDev.map((skill, index) => (
                        <div key={index} className="progress-item">
                          <div className="progress-label">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percentage">{skill.level}%</span>
                          </div>
                          <div className="progress-wrapper">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                style={{
                                  backgroundColor: getProgressBarColor(skill.color)
                                }}
                                data-level={skill.level}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="card-title text-center mt-4 mb-4 h5">Cybersecurity</div>
                  <div className="card-body text-center">
                    <img src={skillImg1} alt="Cybersecurity" className="skill-icon" />
                    <div className="skills-list">
                      <p className="card-text">SQL Injection Testing</p>
                      <p className="card-text">Ethical Hacking Basics</p>
                      <p className="card-text">Kali Linux</p>
                      <p className="card-text">XSS</p>
                      <p className="card-text">Network Analysis</p>
                    </div>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="card-title text-center mt-4 mb-4 h5">Tools & Platforms</div>
                  <div className="card-body text-center">
                    <img src={skillImg2} alt="Tools & Platforms" className="skill-icon" />
                    <div className="tools-grid mt-4">
                      <div>
                        <p>GitHub</p>
                        <p>Five9 CRM</p>
                        <p>HubSpot</p>
                        <p>MailChimp</p>
                        <p>Notion</p>
                      </div>
                      <div>
                        <p>Dialer</p>
                        <p>Microsoft Office</p>
                        <p>GSuite</p>
                        <p>Formspree</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="skill-card">
                  <div className="card-title text-center mt-4 mb-4 h5">Design & Content Creation</div>
                  <div className="card-body text-center">
                    <img src={skillImg3} alt="Design & Content Creation" className="skill-icon" />
                    <div className="tools-grid mt-4">
                      <div>
                        <p>Canva</p>
                        <p>Capcut</p>
                        <p>Bandlab</p>
                        <p>Framer</p>
                        <p>Fillout</p>
                      </div>
                      <div>
                        <p>ibisPaint</p>
                        <p>Flash 8</p>
                        <p>Meta Business</p>
                        <p>Hugo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h1 className="mt-3 text-center">Experiences</h1>
            <div className="accordion mt-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="accordion-item">
                  <button
                    className={`accordion-button ${expandedAccordion === exp.id ? 'active' : ''}`}
                    onClick={() => toggleAccordion(exp.id)}
                  >
                    <p>
                      <i className={`fa ${exp.icon}`}></i> {exp.title}
                    </p>
                  </button>
                  {expandedAccordion === exp.id && (
                    <div className="accordion-body">
                      <ul>
                        {exp.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-outline-dark" onClick={scrollToSamples}>
              View My Work
            </button>
          </div>
        </div>

        <div className="container mb-5 mt-5">
          <div className="video-section">
            <iframe
              width="560"
              height="330"
              src="https://www.youtube.com/embed/5ZxsL2TWfac?si=Cix5FyYIyfroNRfU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="video-description">
              <h3 className="text-center">About Me</h3>
              <p>
Hi! I'm a Virtual Assistant with a diverse skill set spanning customer service, administrative work, and graphic design. My experience includes handling calls, lead generation, CRM management, social media content creation, data entry, and document preparation. As an IT student, I'm proficient in various software tools including Microsoft Office, Google Workspace, HubSpot, Five9 CRM, and Canva. I am detail-oriented, tech-savvy, and focused on helping businesses operate efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

