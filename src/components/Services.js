import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import { FaBriefcase, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import serviceBanner from '../assets/services-banner.png';
import pkgImg6 from '../assets/6.png';
import pkgImg7 from '../assets/7.png';

const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: 'How long does a basic site take?', a: 'Typical turnaround for a service-provider site is 2–3 weeks depending on content and revisions.' },
    { q: 'Do you provide hosting?', a: 'I can recommend hosting providers and assist with setup, but hosting fees are separate.' },
    { q: 'Can I update the site myself?', a: 'Yes — sites are delivered with an easy-to-use editor or instructions so you can make simple updates.' }
  ];

  const testimonials = [
    { name: 'devaly', quote: 'Clean design and easy process — highly recommended.' },
    { name: 'John', quote: 'Easy and convenient to use for visitors.' },
    { name: 'Fyang', quote: 'Professional looking and effective.' }
  ];

  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) el.classList.add('visible');
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToContact = (e) => {
    e && e.preventDefault();
    // navigate to contact route
    navigate('/contact');
  };

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        <h1 className="section-title text-center">Services</h1>
        <img src={serviceBanner} alt="E-commerce example" className="service-banner" />
        <p className="lead text-center">Simple, intentional websites built to help you show up professionally online.</p>
        <div className="services-intro">
          <p>
            I design clean, functional websites for solo service providers and small businesses who want clarity, credibility, and a site that actually works—without unnecessary complexity or overengineering.
          </p>
          <p>
            My approach is straightforward: understand your goal, design with intention, and build something you can confidently use and maintain.
          </p>
        </div>

        <div className="packages-grid">
          <div className="package card-shadow animated-card">
            <img src={pkgImg6} alt="Service example" className="package-img" />
            <h2><FaBriefcase className="package-icon"/> Service Provider Website</h2>
            <p className="muted">Best for: freelancers, consultants, coaches, virtual assistants, and solo professionals.</p>
            <p>
              This package is designed for individuals offering services who need a polished, client-ready website that clearly communicates who they are, what they do, and how potential clients can reach them.
            </p>
            <p>
              The focus is on clarity, trust, and usability—so visitors understand your value without being overwhelmed.
            </p>
            <h3>What’s included</h3>
            <ul className="package-list">
              <li><FaCheckCircle className="list-icon"/> 3–5 custom-designed pages (Home, About, Services, Contact + 1 optional page)</li>
              <li><FaCheckCircle className="list-icon"/> Conversion-focused layout and structure</li>
              <li><FaCheckCircle className="list-icon"/> Copywriting assistance on every page (writing or refining content for clarity and tone)</li>
              <li><FaCheckCircle className="list-icon"/> Mobile-responsive design</li>
              <li><FaCheckCircle className="list-icon"/> Brand-aligned colors, fonts, and layout</li>
              <li><FaCheckCircle className="list-icon"/> Contact form integration & social media links</li>
              <li><FaCheckCircle className="list-icon"/> Basic on-page SEO (titles and meta descriptions)</li>
              <li><FaCheckCircle className="list-icon"/> Image and speed optimization</li>
              <li><FaCheckCircle className="list-icon"/> Free stock images if needed</li>
              <li><FaCheckCircle className="list-icon"/> 1 round of revisions</li>
            </ul>
            <p><strong>Timeline:</strong> Typical turnaround is 2–3 weeks, depending on scope and responsiveness.</p>
            <p><strong>Investment:</strong> Starting at ₱22,000 — final pricing depends on content, number of pages, and overall requirements.</p>
          </div>

          <div className="package card-shadow animated-card">
            <img src={pkgImg7} alt="E-commerce example" className="package-img" />
            <h2><FaShoppingCart className="package-icon"/> Simple E-commerce Website</h2>
            <p className="muted">Best for: small businesses and sellers with a limited product range.</p>
            <p>
              This package is for businesses that want to start selling online without complex systems or bloated features. It’s built for simplicity, reliability, and ease of use—for both you and your customers.
            </p>
            <h3>What’s included</h3>
            <ul className="package-list">
              <li><FaCheckCircle className="list-icon"/> Up to 5 core pages (Home, Shop, Product Pages, About, Contact)</li>
              <li><FaCheckCircle className="list-icon"/> Upload of a set number of products</li>
              <li><FaCheckCircle className="list-icon"/> Payment gateway setup (e.g., PayPal, Stripe)</li>
              <li><FaCheckCircle className="list-icon"/> Mobile-responsive storefront design</li>
              <li><FaCheckCircle className="list-icon"/> Brand-aligned layout and styling</li>
              <li><FaCheckCircle className="list-icon"/> Basic product copy formatting</li>
              <li><FaCheckCircle className="list-icon"/> Essential shop pages (cart, checkout, policies)</li>
              <li><FaCheckCircle className="list-icon"/> Basic on-page SEO</li>
              <li><FaCheckCircle className="list-icon"/> Image and speed optimization</li>
              <li><FaCheckCircle className="list-icon"/> Free stock images if needed</li>
              <li><FaCheckCircle className="list-icon"/> 1 round of revisions</li>
            </ul>
            <p><strong>Timeline:</strong> Typical turnaround is 3–4 weeks.</p>
            <p><strong>Investment:</strong> Starting at ₱35,000 — final pricing depends on product count and functionality.</p>
            <p className="muted">This package is intended for simple e-commerce needs only. Large catalogs or advanced custom features are not included.</p>
          </div>
        </div>
        <div className="addons">
          <h3 className="text-center mb-3">Optional Add‑ons</h3>
          <div className="addons-grid">
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Additional pages</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Additional products</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Extra revision rounds</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Blog setup</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Monthly maintenance and updates</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> SEO expansion</div>
            <div className="addon-card"><FaCheckCircle className="list-icon"/> Analytics setup</div>
          </div>
          <p className="muted text-center" style={{marginTop: '12px'}}>These can be discussed during the inquiry stage.</p>
        </div>

        <div className="testimonials">
          <h3 className="text-center">Testimonials</h3>
          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map((t, i) => (
              <blockquote key={i} className="testimonial">
                <p>"{t.quote}"</p>
                <footer>— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="faq">
          <h3 className="text-center mt-4 mb-4">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                </button>
                <div className="faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta text-center">
          <button className="btn btn-outline-dark" onClick={scrollToContact} style={{marginLeft: '12px'}}>Send an Inquiry</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
