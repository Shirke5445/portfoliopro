import React, { useEffect } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './AboutMe.css';

export default function AboutMe(props) {
  useEffect(() => {
    const fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

    // Clean up the subscription on component unmount
    return () => {
      fadeInSubscription.unsubscribe();
    };
  }, [props.id]);

  const SCREEN_CONSTSANTS = {
    description: `System Admin => Frontend Developer (MERN Stack Devloper)
    I started my career as a System Administrator, but found my true calling in Frontend Development. 
    With a passion for building user-friendly, visually appealing, and high-performance web apps,
     I’ve transitioned into a developer role — and I’m loving it.`,
    highlights: {
      bullets: [
        'MERN Stack development',
        'Full Stack web development',
        'Interactive Front End as per the design',
        'React and React Native',
        'Building REST API',
        'Managing database',
      ],
      heading: 'Here are a Few Highlights:',
    },
  };

  const renderHighlight = () =>
    SCREEN_CONSTSANTS.highlights.bullets.map((value, i) => (
      <div className="highlight" key={i}>
        <div className="highlight-blob"></div>
        <span>{value}</span>
      </div>
    ));

  return (
    <div
      className="about-me-container screen-container fade-in"
      id={props.id || ''}
    >
      <div className="about-me-parent">
        <ScreenHeading title={'About Me'} subHeading={'Why Choose Me?'} />
        <div className="about-me-card">
          <div className="about-me-profile"></div>
          <div className="about-me-details">
            <span className="about-me-description">
              {SCREEN_CONSTSANTS.description}
            </span>
            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>{SCREEN_CONSTSANTS.highlights.heading}</span>
              </div>
              {renderHighlight()}
            </div>
            <div className="about-me-options">
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
        </div>
      </div>
    </div>
  );
}
