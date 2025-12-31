import React, { useEffect, useRef } from 'react';
import './Gallery.css';
import lineDivider from '../assets/line.png';
import photo1 from '../assets/1.jpg';
import photo2 from '../assets/2.jpg';
import photo3 from '../assets/3.jpg';
import photo4 from '../assets/4.jpg';
import photo5 from '../assets/5.jpg';
import sample1 from '../assets/gallery/sample-1.png';
import sample2 from '../assets/gallery/sample-2.png';
import sample3 from '../assets/gallery/sample-3.png';
import sample4 from '../assets/gallery/sample-4.png';
import sample5 from '../assets/gallery/sample-5.png';
import sample6 from '../assets/gallery/sample-6.png';
import sample7 from '../assets/gallery/sample-7.png';
import sample8 from '../assets/gallery/sample-8.png';
import sample9 from '../assets/gallery/sample-9.png';
import sample10 from '../assets/gallery/sample-10.png';
import sample11 from '../assets/gallery/sample-11.png';

const Gallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const node = galleryRef.current; // capture once
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

  const photos = [
    { src: photo1, alt: 'Photo 1' },
    { src: photo2, alt: 'Photo 2' },
    { src: photo3, alt: 'Photo 3' },
    { src: photo4, alt: 'Photo 4' },
    { src: photo5, alt: 'Photo 5' },
  ];

  const journalSamples = [
    { src: sample1, alt: 'Sample 1' },
    { src: sample2, alt: 'Sample 2' },
    { src: sample3, alt: 'Sample 3' },
    { src: sample4, alt: 'Sample 4' },
    { src: sample5, alt: 'Sample 5' },
    { src: sample6, alt: 'Sample 6' },
    { src: sample7, alt: 'Sample 7' },
    { src: sample8, alt: 'Sample 8' },
    { src: sample9, alt: 'Sample 9' },
    { src: sample10, alt: 'Sample 10' },
    { src: sample11, alt: 'Sample 11' },
  ];

  const liveProjects = [
    {
      url: 'https://theeverythingjournal.netlify.app/',
      title: 'The Everything Journal',
      iframe: 'https://theeverythingjournal.netlify.app/'
    },
    {
      url: 'https://lyskh.github.io/ACS/',
      title: 'Organization Website',
      iframe: 'https://lyskh.github.io/ACS/'
    },
    {
      url: 'https://lyskh.github.io/my-portfolio/',
      title: 'This Site',
      iframe: 'https://lyskh.github.io/my-portfolio/'
    },
    {
      url: 'https://digital-visitor-log-12121.web.app/',
      title: 'Digital Visitor Log',
      iframe: 'https://digital-visitor-log-12121.web.app/'
    }
  ];

  return (
    <section className="gallery-section" id="samples" ref={galleryRef}>
      <div className="container">
        <div className="section-divider">
          <img src={lineDivider} alt="Divider" />
        </div>
        
        <h1 className="section-title">Sample Works and Photographs</h1>
        
        <h6 className="gallery-subtitle">Photographs</h6>

        {/* Photos carousel (single-row) */}
        <div className="carousel" aria-label="Photographs carousel">
          <button className="carousel-control prev" aria-label="Previous" onClick={() => {
            const track = document.getElementById('photos-track');
            track && (track.scrollLeft -= track.clientWidth * 0.9);
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="carousel-track" id="photos-track">
            {photos.map((photo, index) => (
              <div key={index} className="carousel-item">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <button className="carousel-control next" aria-label="Next" onClick={() => {
            const track = document.getElementById('photos-track');
            track && (track.scrollLeft += track.clientWidth * 0.9);
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <h6 className="gallery-subtitle">Graphic Design</h6>
        
        {/* Journal samples carousel (single-row) */}
        <div className="carousel journal" aria-label="Sample works carousel">
          <button className="carousel-control prev" aria-label="Previous sample" onClick={() => {
            const track = document.getElementById('samples-track');
            track && (track.scrollLeft -= track.clientWidth * 0.9);
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="carousel-track" id="samples-track">
            {journalSamples.map((sample, index) => (
              <div key={index} className="carousel-item">
                <img src={sample.src} alt={sample.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <button className="carousel-control next" aria-label="Next sample" onClick={() => {
            const track = document.getElementById('samples-track');
            track && (track.scrollLeft += track.clientWidth * 0.9);
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="section-divider">
          <img src={lineDivider} alt="Divider" />
        </div>

        <h1 className="section-title">Live Sites</h1>

        {liveProjects.map((project, index) => (
          <div key={index} className="live-project">
            <div className="iframe-container">
              <iframe
                src={project.iframe}
                title={project.title}
                frameBorder="0"
                loading="lazy"
              />
            </div>
            <div className="live-project-button">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                {project.title}
              </a>
            </div>
            {index < liveProjects.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

