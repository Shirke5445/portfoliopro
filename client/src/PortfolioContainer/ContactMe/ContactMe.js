import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import imgBack from '../../../src/images/mailz.jpeg';
import load1 from '../../../src/images/load2.gif';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import Footer from '../Home/Footer/Footer';
import './ContactMe.css';

export default function ContactMe(props) {
  // -----------------------------
  // Animation handler
  // -----------------------------
  const fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  // -----------------------------
  // EmailJS Configuration - GIRISH'S ACTUAL KEYS
  // -----------------------------
  const EMAILJS_SERVICE_ID = 'service_wwigwn4';
  const EMAILJS_TEMPLATE_ID = 'template_3w86hpf'; // Your actual Template ID
  const EMAILJS_PUBLIC_KEY = 'b-i8aVO28FXz8EJl2';

  // -----------------------------
  // Form state
  // -----------------------------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    if (formData.message.length > 2000) {
      toast.error('Message must be less than 2000 characters');
      return false;
    }
    return true;
  };

  // -----------------------------
  // Form submission with EmailJS
  // -----------------------------
  const submitForm = async (e) => {
    e.preventDefault();
    setLastError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Send email directly using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'girishshirke54s@gmail.com',
          to_name: 'Girish Shirke',
          date: new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'medium',
          }),
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      toast.success('Message sent successfully! I will reply within 24 hours.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setLastError(error);

      let userMessage = 'Failed to send message';
      if (error && error.text) {
        userMessage = error.text;
      }

      toast.error(userMessage);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="main-container fade-in" id={props.id || ''}>
      <ScreenHeading subHeading="Lets Keep In Touch" title="Contact Me" />

      <div className="central-form">
        {/* Left column */}
        <div className="col">
          <h2 className="title">
            <Typewriter
              words={['Get In Touch 📧']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/girish-shirke-42420721b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa fa-linkedin-square"></i>
            </a>
            <a
              href="https://www.instagram.com/girish.shirke_54/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa fa-instagram"></i>
            </a>
            <a
              href="https://github.com/Shirke5445"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fa fa-github-square"></i>
            </a>
            <a href="mailto:girishshirke54s@gmail.com" aria-label="Email">
              <i className="fa fa-envelope-square"></i>
            </a>
            <a
              href="https://wa.me/918208715337"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fa fa-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Right column (form) */}
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="Email background" loading="lazy" />
          </div>

          <form onSubmit={submitForm}>
            {lastError && (
              <div className="error-notice">
                <small>Last error: {lastError.message}</small>
              </div>
            )}

            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              disabled={loading}
            />

            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              disabled={loading}
            />

            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows="5"
              maxLength="2000"
              required
              disabled={loading}
            />

            <div className="send-btn">
              <button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? (
                  <>
                    <img
                      src={load1}
                      alt="Sending..."
                      className="loading-spinner"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send <i className="fa fa-paper-plane" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
