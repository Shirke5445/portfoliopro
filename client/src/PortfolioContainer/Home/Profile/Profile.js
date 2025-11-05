import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './Profile.css';
import ScrollService from '../../../utilities/ScrollService';
export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a href="https://www.linkedin.com/in/girish-shirke-42420721b/">
                <i className="fa fa-linkedin-square"></i>
              </a>
              <a href="https://www.instagram.com/girish.shirke_54/">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://github.com/Shirke5445">
                <i className="fa fa-github-square"></i>
              </a>
              <a href="mailto:girishshirke54s@gmail.com">
                <i className="fa fa-envelope-square"></i>
              </a>
              <a
                href="https://wa.me/918208715337"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="profile-details-name">
            <span className="primary-text">
              {' '}
              Hello, I'm <span className="highlighted-text">Girish Shirke</span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              <h1 className="primary-text">
                <Typewriter
                  words={[
                    'Enthusiastic Devloper 💡',
                    'Full Stack Developer 🖥️🛠️',
                    'MERN Stack Developer 💻',
                    'Cross Platform Developer 📱',
                    'React Developer ⚛️',
                  ]}
                  loop={0} // 0 = infinite loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500} // how long to keep text before deleting
                />
              </h1>
              <span className="profile-role-tagline">
                MERN Stack Developer with a passion for building modern frontend
                experiences.
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button
              className="btn primary-btn"
              onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              Hire Me
            </button>
            <a href="girishshirke.pdf" download="girishshirke.pdf">
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}
