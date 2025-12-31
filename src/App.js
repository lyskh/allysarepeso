import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import './App.css';
const Services = lazy(() => import('./components/Services'));

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
          </>
        } />
        <Route path="/works" element={
          <>
            <Navbar />
            <Projects />
          </>
        } />
        <Route path="/gallery" element={
          <>
            <Navbar />
            <Gallery />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
          </>
        } />
        <Route path="/services" element={
          <>
            <Navbar />
            <Suspense fallback={<div className="container">Loading…</div>}>
              <Services />
            </Suspense>
            <Contact />
          </>
        } />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;

