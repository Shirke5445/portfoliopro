import { useState } from 'react';
import React from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Resume.css';
import educationIcon from '../../Assets/Resume/education.svg';
import workIcon from '../../Assets/Resume/work-history.svg';
import skillsIcon from '../../Assets/Resume/programming-skills.svg';
import projectsIcon from '../../Assets/Resume/projects.svg';
import interestsIcon from '../../Assets/Resume/interests.svg';
import certificationsIcon from '../../Assets/Resume/certification.svg';
export default function Resume(props) {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };

  ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ''}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + '-' + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ''}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ''}</span>
        </div>
      </div>
    );
  };

  /* STATIC RESUME DATA FOR THE LABELS*/
  const resumeBullets = [
    { label: 'Education', logoSrc: educationIcon },
    { label: 'Certifications', logoSrc: certificationsIcon },
    { label: 'Work History', logoSrc: workIcon },
    { label: 'Programming Skills', logoSrc: skillsIcon },
    { label: 'Projects', logoSrc: projectsIcon },
    { label: 'Interests', logoSrc: interestsIcon },
  ];

  //here we have programming skills
  const programmingSkillsDetails = [
    { skill: 'JavaScript', ratingPercentage: 85 },
    { skill: 'React JS', ratingPercentage: 85 },
    { skill: 'React Native', ratingPercentage: 85 },
    { skill: 'Express JS', ratingPercentage: 89 },
    { skill: 'Node JS', ratingPercentage: 89 },
    { skill: 'MongoDB', ratingPercentage: 70 },
    { skill: 'Bootstrap', ratingPercentage: 80 },
    { skill: 'HTML', ratingPercentage: 80 },
    { skill: 'CSS', ratingPercentage: 80 },
  ];

  const projectsDetails = [
    {
      title: 'Personal Portfolio Website',
      duration: { fromDate: 'June 2025', toDate: 'July 2025' },
      description: `Developed a responsive portfolio website utilizing HTML, CSS, JavaScript, Bootstrap, React.js, RxJs, Express.js, and Node.js. Backend deployed on Render for secure and reliable server hosting. Frontend deployed on Vercel for fast performance and scalability. Showcases professional projects, skills, and contact features.`,
      subHeading: 'Technologies Used: React.js, Bootsrap,RxJs,Node.js',
    },

    {
      title: 'Movie Ticket Booking System ',
      duration: { fromDate: 'July 2025', toDate: 'Aug 2025' },
      description: `Designed and developed a movie ticket booking system using HTML, CSS, JavaScript, Bootstrap, React.js, Redux, Express.js, Node.js, MongoDB, ANTD, and JWT Authentication. Fully deployed on Render for both backend and frontend hosting. Includes seat selection, user authentication, and secure booking process.`,
      subHeading:
        'Technologies Used: MongoDB, Express.js, React.js, Node.js, Redux, Bootstrap.',
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={'Pillai College of Arts,Commerce and Science,Navi Mumbai'}
        subHeading={'Master of Science Information Technology'}
        fromDate={'2024'}
        toDate={'2026'}
      />

      <ResumeHeading
        heading={'Yashwantrao Chavan Maharashtra Open University'}
        subHeading={'Master of Computer Applications - MCA'}
        fromDate={'2020'}
        toDate={'2022'}
      />
      <ResumeHeading
        heading={'University of Mumbai'}
        subHeading={'Bachelor of Science Information Technology'}
        fromDate={'2016'}
        toDate={'2019'}
      />
    </div>,

    // ✅ Certifications
    <div className="resume-screen-container" key="certifications">
      <ResumeHeading
        heading="Fundamentals With SQL- MERN/MEAN Stack"
        subHeading="IT Vedant Institute, Thane"
        fromDate="2023"
        toDate="2024"
      />
      <ResumeHeading
        heading="Web Designing Basic - MERN/MEAN Stack"
        subHeading="IT Vedant Institute, Thane"
        fromDate="2023"
        toDate="2024"
      />
      <ResumeHeading
        heading="Web Designing Advanced - MERN/MEAN Stack"
        subHeading="IT Vedant Institute, Thane"
        fromDate="2023"
        toDate="2024"
      />
      <ResumeHeading
        heading="MERN Essentials & Professional - MERN/MEAN Stack"
        subHeading="IT Vedant Institute, Thane"
        fromDate="2023"
        toDate="2024"
      />
      <ResumeHeading
        heading="Angular- MERN/MEAN Stack"
        subHeading="IT Vedant Institute, Thane"
        fromDate="2023"
        toDate="2024"
      />
    </div>,

    /* WORK EXPERIENCE */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={'Supreme Petrochem Ltd'}
          subHeading={'System Administrator'}
          fromDate={'May 2022'}
          toDate={'Aug 2024'}
        />

        <div className="experience-description">
          <span className="resume-description-text">
            Assisted users with hardware and software setup, installation, and
            configuration. Identified and resolved technical problems, including
            network connectivity, printing, software compatibility, and system
            errors. Installed, upgraded, and configured software applications
            and operating systems.
          </span>
        </div>
        <br />

        <ResumeHeading
          heading={'Breezeitech Services Pvt. Ltd'}
          subHeading={'IT Support Technician'}
          fromDate={'Nov 2019'}
          toDate={'April 2022'}
        />
        <div className="experience-description">
          <span className="resume-description-text">
            Delivered exceptional technical support for clients like Supreme
            Petrochem Ltd. Monitored and ensured the availability and
            performance of IT systems and network infrastructure. Collaborated
            effectively with their IT team to swiftly diagnose and resolve
            hardware/software issues.
          </span>
          <br />
        </div>
      </div>
    </div>,
    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + '%' }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

    /* Interests */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Traveling"
        description="I love exploring new places, experiencing different cultures, and discovering the beauty of nature. Traveling helps me grow both personally and creatively."
      />
      <ResumeHeading
        heading="Geography"
        description="I have a deep interest in geography — understanding different regions, climates, and the way landscapes shape our world fascinates me."
      />
      <ResumeHeading
        heading="Reading Books"
        description="Reading is one of my favorite pastimes. I enjoy diving into both fiction and non-fiction books that help expand my knowledge and imagination."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: 'translateY(' + index * offsetHeight * -1 + 'px)' },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? 'bullet selected-bullet' : 'bullet'
        }
        key={index}
      >
        <img className="bullet-logo" src={bullet.logoSrc} alt={bullet.label} />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ''}
    >
      <div className="resume-content">
        <ScreenHeading title={'Resume'} subHeading={'My formal Bio Details'} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
}
