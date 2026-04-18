import React from 'react';
import '../App.css'; // Siguraduhin na tama ang path papunta sa App.css

// Images (Verify if path is correct)
import paintImg from '../assets/paint.jpg';
import artImg from '../assets/art.jpg';
import camImg from '../assets/cam.jpg';
import coffeeImg from '../assets/coffeeart.jpg';
import digitalImg from '../assets/digitalart.png';
import digiEditImg from '../assets/digieditart.jpg';
import plantImg from '../assets/plant.jpg';
import cloudImg from '../assets/cloud.jpg';
import ssetImg from '../assets/sset.jpg';
import sunsetImg from '../assets/sunset.jpg';

function AboutPage() {
  return (
    <div className="about-content">
      
      {/* 🌿 1. Introduction Section */}
      <section className="about-card"> 
        <h3>"Everything is an art."</h3>
        <p className="justify-text">
          Art has always been a significant part of my life. From a young age, I found joy in expressing myself
          through drawing and painting. As I grew older, I discovered photography, which allowed me to capture
          the world around me in unique ways. Through art, I have learned to see beauty in everyday moments
          and to appreciate the little things in life.
        </p>
        
        <div className="gallery">
          <img src={paintImg} alt="Paint" />
          <img src={artImg} alt="Art" />
          <img src={camImg} alt="Cam" />
        </div>
      </section>

      {/* 📜 2. Quote Section */}
      <section className="quote-divider-container">
        <blockquote className="aesthetic-quote">
          "Art washes away from the soul the dust of everyday life." — Pablo Picasso
        </blockquote>
      </section>

      {/* 📈 3. Growth Journey Section */}
      <section className="about-card">
        <h3>My Creative Growth Journey</h3>
        <ol className="growth-list">
          <li>Started drawing and painting as a creative outlet</li>
          <li>Explored different art styles and techniques</li>
          <li>Discovered photography as a way to capture real-life moments</li>
          <li>Used art and photography for reflection and personal growth</li>
        </ol>
        
        <div className="gallery">
          <img src={coffeeImg} alt="Coffee Art" />
          <img src={digitalImg} alt="Digital Art" />
          <img src={digiEditImg} alt="Digital Edited Art" />
        </div>
      </section>

      {/* 📷 4. Photography Section */}
      <section className="about-card photography-section">
        <h3>Photography as an Art Form</h3>
        <p className="justify-text">
          Photography allows me to capture moments that may otherwise go unnoticed. Through simple subjects
          such as nature, daily life, and surroundings, I learn how lighting, angles, and timing can transform
          an ordinary scene into meaningful art.
        </p>

        <div className="photo-quote-box">
          <p className="photo-quote">
            "Art gives me a safe space to express creativity and emotions. It helps me relax, reflect, and better understand myself."
          </p>
        </div>

        <div className="galleryy">
          <img src={plantImg} alt="Plant" />
          <img src={cloudImg} alt="Cloud" />
          <img src={ssetImg} alt="Sunset 1" />
          <img src={sunsetImg} alt="Sunset 2" />
        </div>
      </section>
      
    </div>
  );
}

export default AboutPage;