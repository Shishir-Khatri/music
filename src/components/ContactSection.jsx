import { useState } from 'react';
import DB from '../utils/db';
import { useToast } from './Toast';

export default function ContactSection() {
    const contact = DB.get('contact');
    const showToast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        DB.add('messages', message);
        showToast('Message sent successfully!', 'success');
        e.target.reset();
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="section-container">
                <div className="section-header" data-animate="fade-up">
                    <span className="section-tag"><i className="fas fa-envelope" aria-hidden="true"></i> Contact</span>
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-desc">For bookings, collaborations, or just to say hello</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-info" data-animate="fade-right">
                        <div className="contact-card glass-card">
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                            <h4>Email</h4>
                            <p id="contactEmail">{contact.email}</p>
                        </div>
                        <div className="contact-card glass-card">
                            <i className="fas fa-phone" aria-hidden="true"></i>
                            <h4>Phone</h4>
                            <p id="contactPhone">{contact.phone}</p>
                        </div>
                        <div className="contact-card glass-card">
                            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                            <h4>Location</h4>
                            <p id="contactLocation">{contact.location}</p>
                        </div>
                        <div className="social-links">
                            <a href={contact.socialYoutube} className="social-link glass-card-subtle" id="socialYoutube" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
                            <a href={contact.socialInstagram} className="social-link glass-card-subtle" id="socialInstagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                            <a href={contact.socialFacebook} className="social-link glass-card-subtle" id="socialFacebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook" aria-hidden="true"></i></a>
                            <a href={contact.socialTiktok} className="social-link glass-card-subtle" id="socialTiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" aria-hidden="true"></i></a>
                            <a href={contact.socialSpotify} className="social-link glass-card-subtle" id="socialSpotify" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><i className="fab fa-spotify" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <form className="contact-form glass-card" id="contactForm" data-animate="fade-left" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="contact-name" className="sr-only">Your Name</label>
                            <input type="text" id="contact-name" name="name" placeholder="Your Name" required />
                            <i className="fas fa-user" aria-hidden="true"></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email" className="sr-only">Your Email</label>
                            <input type="email" id="contact-email" name="email" placeholder="Your Email" required />
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-subject" className="sr-only">Subject</label>
                            <select id="contact-subject" name="subject" required defaultValue="">
                                <option value="" disabled>Select Subject</option>
                                <option value="booking">Event Booking</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="media">Media Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                            <i className="fas fa-chevron-down" aria-hidden="true"></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-message" className="sr-only">Your Message</label>
                            <textarea id="contact-message" name="message" placeholder="Your Message" rows="5" required></textarea>
                            <i className="fas fa-comment" aria-hidden="true"></i>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">
                            <span>Send Message</span>
                            <i className="fas fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
