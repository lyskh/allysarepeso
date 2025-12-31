import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import footerWhale from '../assets/footer.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    /* Honeypot field: invisible to real users, present for bots that fill all inputs.
       Use a non-common name to reduce autofill by browsers. */
    hp_field: ''
  });
  // Record when the form was first shown to the user to detect too-fast submissions
  const formStartRef = useRef(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const node = contactRef.current; // capture once
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* -------------------------
     Sanitization & Validation Helpers
     - Lightweight utilities to strip dangerous input and enforce limits.
     - Keep logic on client for UX and early rejection; Formspree will still
       perform its own server-side checks. Client-side checks are NOT a
       substitute for server-side validation, but for this setup (no custom
       backend) they provide defense-in-depth and better UX.
     ------------------------- */
  // Remove HTML tags conservatively
  const stripTags = (s) => {
    if (!s) return '';
    return String(s).replace(/<[^>]*>/g, '');
  };

  // Remove javascript: URIs and other suspicious patterns from text
  const removeDangerousUris = (s) => {
    if (!s) return '';
    return s.replace(/javascript\s*:/gi, '').replace(/(?:on\w+)\s*=\s*['"][^'"]*['"]/gi, '');
  };

  // Encode HTML entities for characters that might be interpreted by downstream viewers
  const encodeHtmlEntities = (s) => {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Basic email validation (not exhaustive RFC check, good UX/gate)
  const isValidEmail = (s) => {
    if (!s) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  };

  // Name allowlist: letters, spaces, basic punctuation. Reject very long names.
  const isValidName = (s) => {
    if (!s) return false;
    // allow common accented latin letters, space, hyphen, apostrophe, dot
    return /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]{1,100}$/.test(s.trim());
  };

  // Normalize and sanitize message before sending
  const sanitizeMessage = (s, maxLen = 2000) => {
    if (!s) return '';
    let out = String(s);
    out = stripTags(out); // remove any HTML tags
    out = removeDangerousUris(out); // remove javascript: and inline event handlers
    out = out.replace(/\s+/g, ' ').trim(); // collapse whitespace
    if (out.length > maxLen) out = out.slice(0, maxLen);
    // encode entities to avoid downstream render as HTML
    out = encodeHtmlEntities(out);
    return out;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // === Input validation & sanitization ===
    // - Enforce length limits to prevent abuse/very large payloads
    // - Apply allowlist checks where appropriate (name/email)
    // - Sanitize message thoroughly to avoid HTML/JS execution downstream
    const MAX_MESSAGE = 2000;
    const MAX_NAME = 100;
    const MAX_EMAIL = 254;

    const rawName = formData.name || '';
    const rawEmail = formData.email || '';
    const rawMessage = formData.message || '';

    // Validate name
    if (rawName.length === 0 || rawName.length > MAX_NAME || !isValidName(rawName)) {
      alert('Please enter a valid name (letters, spaces, and basic punctuation only).');
      setIsSubmitting(false);
      return;
    }

    // Validate email
    if (rawEmail.length === 0 || rawEmail.length > MAX_EMAIL || !isValidEmail(rawEmail)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Sanitize and normalize message text
    const safeMessage = sanitizeMessage(rawMessage, MAX_MESSAGE);

    const payload = {
      // send safe, normalized values
      name: encodeHtmlEntities(rawName.trim()).slice(0, MAX_NAME),
      email: rawEmail.trim().slice(0, MAX_EMAIL),
      message: safeMessage,
      hp_field: (formData.hp_field || '').trim()
    };

    // Note: we encode the `name` with entities to avoid any angle-bracket issues
    //       when messages are viewed in an email client or admin console.

    // === Anti-spam checks (client-side) ===
    // 1) Honeypot: if filled, treat as bot. It's invisible to humans.
    if (payload.hp_field) {
      // Friendly message for humans, but we don't submit to the service.
      alert('Submission blocked: detected as spam.');
      setIsSubmitting(false);
      return;
    }

    // 2) Time-based validation: block submissions that happen too quickly.
    //    Many bots submit instantly; humans need a few seconds to type.
    const now = Date.now();
    const elapsedSeconds = (now - (formStartRef.current || now)) / 1000;
    const minSeconds = 5; // configurable threshold
    if (elapsedSeconds < minSeconds) {
      alert('Please take a moment to write your message before submitting.');
      setIsSubmitting(false);
      return;
    }

    // 3) Basic heuristics: minimum message length and link-only detection
    // Note: payload.message here is encoded (HTML entities), so check length on decoded text.
    const decodedMsg = (payload.message || '').replace(/&lt;|&gt;|&amp;|&quot;|&#39;/g, '');
    const minMessageLength = 15; // humans usually write at least this many chars
    if (decodedMsg.length < minMessageLength) {
      alert('Please provide a bit more detail in your message (at least 15 characters).');
      setIsSubmitting(false);
      return;
    }

    // Link-only detection: if message contains URLs but almost no other content,
    // treat as spam. This is conservative to avoid blocking normal messages.
    const urlRegex = /https?:\/\/[\w\-/?&.=#%]+|www\.[\w\-/?&.=#%]+/gi;
    const urls = decodedMsg.match(urlRegex) || [];
    if (urls.length > 0) {
      // count non-url characters
      const stripped = decodedMsg.replace(urlRegex, '').replace(/\s+/g, '');
      if (stripped.length < 10) {
        alert('Please include some context in your message in addition to links.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const form = e.target;
      // Send JSON to Formspree; Formspree also accepts form-encoded data.
      // We include only sanitized fields.
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Formspree returns 200/201 for success, 422 for validation errors
      if (response.ok) {
        try {
          navigate('/thank-you');
        } catch (navErr) {
          window.location.href = '/thank-you';
        }
        return;
      }

      // if JSON submit failed, attempt form-encoded / FormData fallback (some endpoints expect form posts)
      // This helps when the API rejects application/json but accepts form submissions.
      try {
        const formDataFallback = new FormData();
        formDataFallback.append('name', payload.name);
        formDataFallback.append('email', payload.email);
        formDataFallback.append('message', payload.message);

        const fallbackResp = await fetch(form.action, {
          method: form.method || 'POST',
          body: formDataFallback,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (fallbackResp.ok) {
          try {
            navigate('/thank-you');
          } catch (navErr) {
            window.location.href = '/thank-you';
          }
          return;
        }

        // parse fallback response details if available
        let fbErr = `Submission failed (status ${fallbackResp.status})`;
        try {
          const data = await fallbackResp.json();
          if (data && data.errors) fbErr = data.errors.map((x) => x.message || x).join(', ');
        } catch (_) {}
        throw new Error(fbErr);
      } catch (fallbackError) {
        let errText = 'Form submission failed';
        try {
          const data = await response.json();
          if (data && data.errors) {
            errText = data.errors.map((x) => x.message || x).join(', ');
          } else if (data && data.type) {
            errText = data.type;
          }
        } catch (_) {}
        throw new Error(errText || `Submission failed (status ${response.status})`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'There was an error sending your message. Please try again.');
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
          {/* Honeypot field (invisible to sighted users).
              - Not required, named `hp_field` to avoid browser autofill.
              - `aria-hidden` + `tabIndex` prevent assistive tech or keyboard focus.
              - CSS `.visually-hidden` keeps element out of layout without using display:none. */}
          <label htmlFor="hp_field" className="visually-hidden" aria-hidden="true">Leave this field empty</label>
          <input
            type="text"
            id="hp_field"
            name="hp_field"
            value={formData.hp_field}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="visually-hidden"
          />
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

          {/* _captcha and _next removed: we handle redirect client-side and avoid server-side redirect conflicts on Netlify SPA */}

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

