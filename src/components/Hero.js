import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroIntro from '../assets/hero-intro.png';

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const node = heroRef.current; // capture once
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

  const scrollToWorks = () => {
    navigate('/works');
  };

  return (
    <section className="hero" id="intro" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-image">
            <img src={heroIntro} alt="Allysa" />
          </div>
          <h1>Hi, I'm Allysa</h1>
          <p className="lead">
            An aspiring IT professional with a strong passion for web development and design, 
            eager to create visually stunning and highly functional digital experiences. 
            Continuously learning and exploring new technologies to enhance skills, build 
            innovative projects, and contribute to the ever-evolving world of technology.
          </p>
          <button className="btn btn-outline-dark" onClick={scrollToWorks}>
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


