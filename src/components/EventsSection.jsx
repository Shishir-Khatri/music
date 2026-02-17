import { useDB } from '../hooks/useDB';

export default function EventsSection() {
    const [eventsData] = useDB('events', []);

    // Sort events: closest date first
    const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <section id="events" className="section events-section">
            <div className="section-container">
                <div className="section-header" data-animate="fade-up">
                    <span className="section-tag"><i className="fas fa-calendar-alt" aria-hidden="true"></i> Events</span>
                    <h2 className="section-title">Upcoming <span className="gradient-text">Shows</span></h2>
                    <p className="section-desc">Catch Bikki Gurung live at these upcoming events</p>
                </div>
                <div className="events-list" id="eventsList">
                    {sortedEvents.length === 0 ? (
                        <div className="empty-state" data-animate="fade-up">
                            <i className="fas fa-calendar" aria-hidden="true"></i>
                            <p>No upcoming events</p>
                        </div>
                    ) : (
                        sortedEvents.map(event => {
                            const eventDate = new Date(event.date);
                            const day = eventDate.getDate();
                            const month = eventDate.toLocaleString('default', { month: 'short' });
                            const year = eventDate.getFullYear();

                            return (
                                <div key={event.id} className="event-card" data-animate="fade-up">
                                    <div className="event-date-box">
                                        <span className="event-day">{day}</span>
                                        <span className="event-month">{month} {year}</span>
                                    </div>
                                    <div className="event-details">
                                        <h3>{event.title}</h3>
                                        <div className="event-venue">
                                            <i className="fas fa-map-marker-alt" aria-hidden="true"></i> {event.venue}{event.location ? ', ' + event.location : ''}
                                        </div>
                                        <div className="event-time">
                                            <i className="fas fa-clock" aria-hidden="true"></i> {event.time || 'TBA'}
                                        </div>
                                    </div>
                                    {event.status === 'upcoming' ? (
                                        event.ticket_link ? (
                                            <a href={event.ticket_link} target="_blank" rel="noopener noreferrer" className="event-status upcoming">Get Tickets</a>
                                        ) : (
                                            <span className="event-status upcoming">Upcoming</span>
                                        )
                                    ) : (
                                        <span className={`event-status ${event.status}`}>{event.status === 'soldout' ? 'Sold Out' : 'Cancelled'}</span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
