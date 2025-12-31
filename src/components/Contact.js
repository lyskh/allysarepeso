import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import footerWhale from '../assets/footer.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // basic client-side sanitization to prevent injected HTML/script
    const sanitize = (str) => {
      if (!str) return '';
      return String(str).replace(/<[^>]*>/g, '').trim();
    };

    const form = e.target;
    const formDataToSend = new FormData();
    formDataToSend.append('name', sanitize(formData.name));
    formDataToSend.append('email', sanitize(formData.email));
    formDataToSend.append('message', sanitize(formData.message));
    // include hidden fields expected by Formspree
    const hiddenCaptcha = form.querySelector('input[name="_captcha"]');
    const hiddenNext = form.querySelector('input[name="_next"]');
    if (hiddenCaptcha) formDataToSend.append('_captcha', sanitize(hiddenCaptcha.value));
    if (hiddenNext) formDataToSend.append('_next', sanitize(hiddenNext.value));

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        const data = await response.json();
        if (data.errors) {
          console.error('Form errors:', data.errors);
        }
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="contact-section" id="contact" ref={contactRef}>
      <div className="container">
        <h4 className="mt-5">Contact Me</h4>
        <p className="contact-email">Email: allysakhaer@gmail.com</p>
        
        <p className="socials-label">Socials:</p>
        <div className="social-links">
          <a 
            href="https://www.facebook.com/lyskhaer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Facebook"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a 
            href="https://linkedin.com/in/allysarepeso" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <i className="fa fa-linkedin-square"></i>
          </a>
          <a 
            href="https://github.com/lyskh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>

        <h6 className="mb-3 connect-message">
          Let's connect—I'd love to help bring value to your team!
        </h6>

        <form 
          className="contact-form"
          action="https://formspree.io/f/mblganbk"
          method="POST"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value="/thank-you" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="footer-line mt-4 mb-4">
          <img src={footerWhale} alt="Whale" className="footer-image" />
          <p className="footer-quote">
            "Character may be manifested in the great moments, but it is made in the small ones." 
            - Phillips Brooks
          </p>
        </div>
        <hr />

        <p className="copyright mt-5">&copy; 2025 Allysa. All Rights Reserved.</p>

        <button onClick={scrollToTop} className="btn btn-outline-light mt-3">
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Contact;

