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
                    <span className="section-tag"><i className="fas fa-envelope"></i> Contact</span>
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-desc">For bookings, collaborations, or just to say hello</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-info" data-animate="fade-right">
                        <div className="contact-card glass-card">
                            <i className="fas fa-envelope"></i>
                            <h4>Email</h4>
                            <p id="contactEmail">{contact.email}</p>
                        </div>
                        <div className="contact-card glass-card">
                            <i className="fas fa-phone"></i>
                            <h4>Phone</h4>
                            <p id="contactPhone">{contact.phone}</p>
                        </div>
                        <div className="contact-card glass-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <h4>Location</h4>
                            <p id="contactLocation">{contact.location}</p>
                        </div>
                        <div className="social-links">
                            <a href={contact.socialYoutube} className="social-link glass-card-subtle" id="socialYoutube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                            <a href={contact.socialInstagram} className="social-link glass-card-subtle" id="socialInstagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href={contact.socialFacebook} className="social-link glass-card-subtle" id="socialFacebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href={contact.socialTiktok} className="social-link glass-card-subtle" id="socialTiktok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                            <a href={contact.socialSpotify} className="social-link glass-card-subtle" id="socialSpotify" target="_blank" rel="noopener noreferrer"><i className="fab fa-spotify"></i></a>
                        </div>
                    </div>
                    <form className="contact-form glass-card" id="contactForm" data-animate="fade-left" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Your Name" required />
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Your Email" required />
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="form-group">
                            <select name="subject" required defaultValue="">
                                <option value="" disabled>Select Subject</option>
                                <option value="booking">Event Booking</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="media">Media Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                        <div className="form-group">
                            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                            <i className="fas fa-comment"></i>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full">
                            <span>Send Message</span>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
