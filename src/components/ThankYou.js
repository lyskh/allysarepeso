import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-page">
      <div className="thank-you-container">
        <h1>Thank You!</h1>
        <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
        <p className="signature">- Allysa 🫶</p>
        <Link to="/" className="btn-home">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;


