import DB from '../utils/db';
import { useToast } from './Toast';

export default function NewsletterSection() {
    const showToast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const subscribers = await DB.getAll('subscribers');
        if (subscribers.find(s => s.email === email)) {
            showToast('You are already subscribed!', 'info');
        } else {
            await DB.add('subscribers', { email });
            showToast('Subscribed successfully!', 'success');
        }
        e.target.reset();
    };

    return (
        <section className="newsletter-section">
            <div className="section-container">
                <div className="newsletter-card glass-card" data-animate="fade-up">
                    <div className="newsletter-content">
                        <h3>Stay <span className="gradient-text">Updated</span></h3>
                        <p>Subscribe to get the latest news about new releases and upcoming events</p>
                    </div>
                    <form className="newsletter-form" id="newsletterForm" onSubmit={handleSubmit}>
                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                        <input type="email" id="newsletter-email" placeholder="Enter your email" required />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
