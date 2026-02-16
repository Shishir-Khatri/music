import { useState, useEffect } from 'react';
import DB from '../../utils/db';
import { useToast } from '../Toast';
import ImageUploader from './ImageUploader';

export default function AdminDashboard({ onLogout }) {
    const showToast = useToast();
    const [activePanel, setActivePanel] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Modal states
    const [musicModal, setMusicModal] = useState(false);
    const [eventModal, setEventModal] = useState(false);
    const [galleryModal, setGalleryModal] = useState(false);

    // Form states
    const [heroForm, setHeroForm] = useState(DB.get('hero'));
    const [aboutForm, setAboutForm] = useState(DB.get('about'));
    const [contactForm, setContactForm] = useState(DB.get('contact'));
    const [settingsForm, setSettingsForm] = useState({ ...DB.get('settings'), newPassword: '' });

    // Edit item states
    const [editMusic, setEditMusic] = useState(null);
    const [editEvent, setEditEvent] = useState(null);
    const [editGallery, setEditGallery] = useState(null);

    const refresh = () => setRefreshKey(k => k + 1);

    const panels = [
        { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
        { id: 'hero', icon: 'fa-home', label: 'Hero Section' },
        { id: 'about', icon: 'fa-user', label: 'About' },
        { id: 'music', icon: 'fa-music', label: 'Music' },
        { id: 'events', icon: 'fa-calendar', label: 'Events' },
        { id: 'gallery', icon: 'fa-images', label: 'Gallery' },
        { id: 'contact', icon: 'fa-envelope', label: 'Contact Info' },
        { id: 'messages', icon: 'fa-inbox', label: 'Messages' },
        { id: 'settings', icon: 'fa-cog', label: 'Settings' },
    ];

    const titles = {
        dashboard: 'Dashboard', hero: 'Hero Section', about: 'About',
        music: 'Music', events: 'Events', gallery: 'Gallery',
        contact: 'Contact Info', messages: 'Messages', settings: 'Settings'
    };

    const switchPanel = (id) => {
        setActivePanel(id);
        setMobileSidebarOpen(false);
    };

    // ===== HERO =====
    const saveHero = (e) => {
        e.preventDefault();
        DB.set('hero', heroForm);
        showToast('Hero section saved!', 'success');
    };

    // ===== ABOUT =====
    const saveAbout = (e) => {
        e.preventDefault();
        DB.set('about', aboutForm);
        showToast('About section saved!', 'success');
    };

    // ===== MUSIC =====
    const music = DB.getAll('music');
    const openAddMusic = () => {
        setEditMusic({ title: '', album: '', year: '', cover: '', link: '', duration: '' });
        setMusicModal(true);
    };
    const openEditMusic = (id) => {
        const song = DB.getById('music', id);
        if (song) { setEditMusic({ ...song }); setMusicModal(true); }
    };
    const saveMusic = (e) => {
        e.preventDefault();
        if (editMusic.id) {
            DB.update('music', editMusic.id, editMusic);
            showToast('Song updated!', 'success');
        } else {
            DB.add('music', { ...editMusic });
            showToast('Song added!', 'success');
        }
        setMusicModal(false);
        refresh();
    };
    const deleteMusic = (id) => {
        if (confirm('Delete this song?')) {
            DB.delete('music', id);
            showToast('Song deleted!', 'success');
            refresh();
        }
    };

    // ===== EVENTS =====
    const events = DB.getAll('events');
    const openAddEvent = () => {
        setEditEvent({ title: '', date: '', time: '', venue: '', location: '', description: '', ticketLink: '', image: '', status: 'upcoming' });
        setEventModal(true);
    };
    const openEditEvent = (id) => {
        const event = DB.getById('events', id);
        if (event) { setEditEvent({ ...event }); setEventModal(true); }
    };
    const saveEvent = (e) => {
        e.preventDefault();
        if (editEvent.id) {
            DB.update('events', editEvent.id, editEvent);
            showToast('Event updated!', 'success');
        } else {
            DB.add('events', { ...editEvent });
            showToast('Event added!', 'success');
        }
        setEventModal(false);
        refresh();
    };
    const deleteEvent = (id) => {
        if (confirm('Delete this event?')) {
            DB.delete('events', id);
            showToast('Event deleted!', 'success');
            refresh();
        }
    };

    // ===== GALLERY =====
    const gallery = DB.getAll('gallery');
    const openAddGallery = () => {
        setEditGallery({ image: '', caption: '', category: 'performance' });
        setGalleryModal(true);
    };
    const openEditGallery = (id) => {
        const photo = DB.getById('gallery', id);
        if (photo) { setEditGallery({ ...photo }); setGalleryModal(true); }
    };
    const saveGallery = (e) => {
        e.preventDefault();
        if (editGallery.id) {
            DB.update('gallery', editGallery.id, editGallery);
            showToast('Photo updated!', 'success');
        } else {
            DB.add('gallery', { ...editGallery });
            showToast('Photo added!', 'success');
        }
        setGalleryModal(false);
        refresh();
    };
    const deleteGallery = (id) => {
        if (confirm('Delete this photo?')) {
            DB.delete('gallery', id);
            showToast('Photo deleted!', 'success');
            refresh();
        }
    };

    // ===== CONTACT =====
    const saveContact = (e) => {
        e.preventDefault();
        DB.set('contact', contactForm);
        showToast('Contact info saved!', 'success');
    };

    // ===== MESSAGES =====
    const messages = DB.getAll('messages').sort((a, b) => new Date(b.date) - new Date(a.date));
    const deleteMessage = (id) => {
        DB.delete('messages', id);
        showToast('Message deleted!', 'success');
        refresh();
    };

    // ===== SETTINGS =====
    const saveSettings = (e) => {
        e.preventDefault();
        const current = DB.get('settings');
        DB.set('settings', {
            username: settingsForm.username || current.username,
            password: settingsForm.newPassword || current.password,
            footerDesc: settingsForm.footerDesc || current.footerDesc
        });
        setSettingsForm(prev => ({ ...prev, newPassword: '' }));
        showToast('Settings saved!', 'success');
    };

    // Export
    const exportData = () => {
        const data = DB.exportAll();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bikki-gurung-data-${Date.now()}.json`;
        a.click();
        showToast('Data exported!', 'success');
    };

    // Import
    const importData = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                DB.importAll(data);
                showToast('Data imported successfully!', 'success');
                setHeroForm(DB.get('hero'));
                setAboutForm(DB.get('about'));
                setContactForm(DB.get('contact'));
                setSettingsForm({ ...DB.get('settings'), newPassword: '' });
                refresh();
            } catch {
                showToast('Invalid JSON file!', 'error');
            }
        };
        reader.readAsText(file);
    };

    // Reset
    const resetData = () => {
        if (confirm('Are you sure you want to reset ALL data to defaults? This cannot be undone.')) {
            DB.resetAll();
            showToast('All data reset to defaults!', 'success');
            setHeroForm(DB.get('hero'));
            setAboutForm(DB.get('about'));
            setContactForm(DB.get('contact'));
            setSettingsForm({ ...DB.get('settings'), newPassword: '' });
            refresh();
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('bg_admin_auth');
        onLogout();
    };

    return (
        <div className="admin-dashboard" id="adminDashboard" style={{ display: 'flex' }}>
            {/* Sidebar */}
            <aside className={`admin-sidebar${sidebarCollapsed ? ' collapsed' : ''}${mobileSidebarOpen ? ' mobile-open' : ''}`} id="adminSidebar">
                <div className="sidebar-header">
                    <h3>BIKKI <span className="gradient-text">G.</span></h3>
                    <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    {panels.map(p => (
                        <a
                            key={p.id}
                            href="#"
                            className={`sidebar-link${activePanel === p.id ? ' active' : ''}`}
                            data-panel={p.id}
                            onClick={(e) => { e.preventDefault(); switchPanel(p.id); }}
                        >
                            <i className={`fas ${p.icon}`}></i><span>{p.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <a href="/" className="sidebar-link"><i className="fas fa-external-link-alt"></i><span>View Site</span></a>
                    <a href="#" className="sidebar-link" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i><span>Logout</span></a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <div className="admin-header-left">
                        <button className="mobile-sidebar-toggle" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
                            <i className="fas fa-bars"></i>
                        </button>
                        <h2 id="panelTitle">{titles[activePanel]}</h2>
                    </div>
                    <div className="admin-header-right">
                        <span className="admin-user"><i className="fas fa-user-circle"></i> Admin</span>
                    </div>
                </header>

                <div className="admin-content">
                    {/* Dashboard */}
                    {activePanel === 'dashboard' && (
                        <div className="admin-panel active" id="panel-dashboard">
                            <div className="dashboard-stats">
                                <div className="dash-stat glass-card">
                                    <i className="fas fa-music"></i>
                                    <div><span className="dash-stat-number">{music.length}</span><span className="dash-stat-label">Songs</span></div>
                                </div>
                                <div className="dash-stat glass-card">
                                    <i className="fas fa-calendar"></i>
                                    <div><span className="dash-stat-number">{events.length}</span><span className="dash-stat-label">Events</span></div>
                                </div>
                                <div className="dash-stat glass-card">
                                    <i className="fas fa-images"></i>
                                    <div><span className="dash-stat-number">{gallery.length}</span><span className="dash-stat-label">Photos</span></div>
                                </div>
                                <div className="dash-stat glass-card">
                                    <i className="fas fa-inbox"></i>
                                    <div><span className="dash-stat-number">{messages.length}</span><span className="dash-stat-label">Messages</span></div>
                                </div>
                            </div>
                            <div className="dash-welcome glass-card">
                                <h3>Welcome to Admin Panel</h3>
                                <p>Manage all content of your website from here. Use the sidebar to navigate between different sections.</p>
                            </div>
                        </div>
                    )}

                    {/* Hero Panel */}
                    {activePanel === 'hero' && (
                        <div className="admin-panel active" id="panel-hero">
                            <form id="heroForm" className="admin-form glass-card" onSubmit={saveHero}>
                                <h3><i className="fas fa-home"></i> Hero Section</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Badge Text</label>
                                        <input type="text" value={heroForm.badgeText} onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })} placeholder="e.g. Nepali Music Artist" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" value={heroForm.firstName} onChange={(e) => setHeroForm({ ...heroForm, firstName: e.target.value })} placeholder="BIKKI" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" value={heroForm.lastName} onChange={(e) => setHeroForm({ ...heroForm, lastName: e.target.value })} placeholder="GURUNG" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} rows="3" placeholder="Hero description..."></textarea>
                                </div>
                                <ImageUploader label="Hero Image" value={heroForm.image} onChange={(val) => setHeroForm({ ...heroForm, image: val })} />
                                <div className="form-row three-col">
                                    <div className="form-group">
                                        <label>Songs Count</label>
                                        <input type="text" value={heroForm.statSongs} onChange={(e) => setHeroForm({ ...heroForm, statSongs: e.target.value })} placeholder="50+" />
                                    </div>
                                    <div className="form-group">
                                        <label>Shows Count</label>
                                        <input type="text" value={heroForm.statShows} onChange={(e) => setHeroForm({ ...heroForm, statShows: e.target.value })} placeholder="200+" />
                                    </div>
                                    <div className="form-group">
                                        <label>Fans Count</label>
                                        <input type="text" value={heroForm.statFans} onChange={(e) => setHeroForm({ ...heroForm, statFans: e.target.value })} placeholder="1M+" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>YouTube Subscribers</label>
                                        <input type="text" value={heroForm.ytSubscribers} onChange={(e) => setHeroForm({ ...heroForm, ytSubscribers: e.target.value })} placeholder="500K+" />
                                    </div>
                                    <div className="form-group">
                                        <label>Spotify Listeners</label>
                                        <input type="text" value={heroForm.spotifyListeners} onChange={(e) => setHeroForm({ ...heroForm, spotifyListeners: e.target.value })} placeholder="100K+" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save Changes</button>
                            </form>
                        </div>
                    )}

                    {/* About Panel */}
                    {activePanel === 'about' && (
                        <div className="admin-panel active" id="panel-about">
                            <form id="aboutForm" className="admin-form glass-card" onSubmit={saveAbout}>
                                <h3><i className="fas fa-user"></i> About Section</h3>
                                <ImageUploader label="About Image" value={aboutForm.image} onChange={(val) => setAboutForm({ ...aboutForm, image: val })} />
                                <div className="form-group">
                                    <label>Years of Experience</label>
                                    <input type="text" value={aboutForm.expYears} onChange={(e) => setAboutForm({ ...aboutForm, expYears: e.target.value })} placeholder="10+" />
                                </div>
                                <div className="form-group">
                                    <label>Subtitle</label>
                                    <input type="text" value={aboutForm.subtitle} onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })} placeholder="A Voice That Echoes..." />
                                </div>
                                <div className="form-group">
                                    <label>Paragraph 1</label>
                                    <textarea value={aboutForm.text1} onChange={(e) => setAboutForm({ ...aboutForm, text1: e.target.value })} rows="4" placeholder="First paragraph..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Paragraph 2</label>
                                    <textarea value={aboutForm.text2} onChange={(e) => setAboutForm({ ...aboutForm, text2: e.target.value })} rows="4" placeholder="Second paragraph..."></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Feature 1</label><input type="text" value={aboutForm.feat1} onChange={(e) => setAboutForm({ ...aboutForm, feat1: e.target.value })} placeholder="Vocalist" /></div>
                                    <div className="form-group"><label>Feature 2</label><input type="text" value={aboutForm.feat2} onChange={(e) => setAboutForm({ ...aboutForm, feat2: e.target.value })} placeholder="Musician" /></div>
                                    <div className="form-group"><label>Feature 3</label><input type="text" value={aboutForm.feat3} onChange={(e) => setAboutForm({ ...aboutForm, feat3: e.target.value })} placeholder="Songwriter" /></div>
                                    <div className="form-group"><label>Feature 4</label><input type="text" value={aboutForm.feat4} onChange={(e) => setAboutForm({ ...aboutForm, feat4: e.target.value })} placeholder="Composer" /></div>
                                </div>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save Changes</button>
                            </form>
                        </div>
                    )}

                    {/* Music Panel */}
                    {activePanel === 'music' && (
                        <div className="admin-panel active" id="panel-music">
                            <div className="panel-header-actions">
                                <h3><i className="fas fa-music"></i> Music</h3>
                                <button className="btn btn-primary" onClick={openAddMusic}><i className="fas fa-plus"></i> Add Song</button>
                            </div>
                            <div className="admin-items-list">
                                {music.length === 0 ? (
                                    <div className="empty-state"><i className="fas fa-music"></i><p>No songs added yet</p></div>
                                ) : music.map(song => (
                                    <div key={song.id} className="admin-item">
                                        <div className="admin-item-info">
                                            <img src={song.cover || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'} className="admin-item-thumb" alt={song.title} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop'; }} />
                                            <div className="admin-item-details">
                                                <h4>{song.title}</h4>
                                                <p>{song.album || 'Single'} • {song.year || ''} • {song.duration || ''}</p>
                                            </div>
                                        </div>
                                        <div className="admin-item-actions">
                                            <button className="edit-btn" onClick={() => openEditMusic(song.id)}><i className="fas fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => deleteMusic(song.id)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Music Modal */}
                            {musicModal && (
                                <div className="admin-modal active" onClick={(e) => { if (e.target.className.includes('admin-modal')) setMusicModal(false); }}>
                                    <div className="modal-content glass-card">
                                        <div className="modal-header">
                                            <h3>{editMusic?.id ? 'Edit Song' : 'Add Song'}</h3>
                                            <button className="modal-close" onClick={() => setMusicModal(false)}><i className="fas fa-times"></i></button>
                                        </div>
                                        <form onSubmit={saveMusic}>
                                            <div className="form-group"><label>Song Title</label><input type="text" value={editMusic?.title || ''} onChange={(e) => setEditMusic({ ...editMusic, title: e.target.value })} required /></div>
                                            <div className="form-group"><label>Album</label><input type="text" value={editMusic?.album || ''} onChange={(e) => setEditMusic({ ...editMusic, album: e.target.value })} /></div>
                                            <div className="form-group"><label>Year</label><input type="text" value={editMusic?.year || ''} onChange={(e) => setEditMusic({ ...editMusic, year: e.target.value })} /></div>
                                            <ImageUploader label="Cover Image" value={editMusic?.cover || ''} onChange={(val) => setEditMusic({ ...editMusic, cover: val })} />
                                            <div className="form-group"><label>Song Link (YouTube/Spotify)</label><input type="url" value={editMusic?.link || ''} onChange={(e) => setEditMusic({ ...editMusic, link: e.target.value })} /></div>
                                            <div className="form-group"><label>Duration</label><input type="text" value={editMusic?.duration || ''} onChange={(e) => setEditMusic({ ...editMusic, duration: e.target.value })} placeholder="3:45" /></div>
                                            <button type="submit" className="btn btn-primary btn-full"><i className="fas fa-save"></i> Save</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Events Panel */}
                    {activePanel === 'events' && (
                        <div className="admin-panel active" id="panel-events">
                            <div className="panel-header-actions">
                                <h3><i className="fas fa-calendar"></i> Events</h3>
                                <button className="btn btn-primary" onClick={openAddEvent}><i className="fas fa-plus"></i> Add Event</button>
                            </div>
                            <div className="admin-items-list">
                                {events.length === 0 ? (
                                    <div className="empty-state"><i className="fas fa-calendar"></i><p>No events added yet</p></div>
                                ) : events.map(event => (
                                    <div key={event.id} className="admin-item">
                                        <div className="admin-item-info">
                                            <div className="admin-item-details">
                                                <h4>{event.title}</h4>
                                                <p>{event.date} • {event.time || 'TBA'} • {event.venue} • <em>{event.status}</em></p>
                                            </div>
                                        </div>
                                        <div className="admin-item-actions">
                                            <button className="edit-btn" onClick={() => openEditEvent(event.id)}><i className="fas fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => deleteEvent(event.id)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {eventModal && (
                                <div className="admin-modal active" onClick={(e) => { if (e.target.className.includes('admin-modal')) setEventModal(false); }}>
                                    <div className="modal-content glass-card">
                                        <div className="modal-header">
                                            <h3>{editEvent?.id ? 'Edit Event' : 'Add Event'}</h3>
                                            <button className="modal-close" onClick={() => setEventModal(false)}><i className="fas fa-times"></i></button>
                                        </div>
                                        <form onSubmit={saveEvent}>
                                            <div className="form-group"><label>Event Title</label><input type="text" value={editEvent?.title || ''} onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })} required /></div>
                                            <div className="form-group"><label>Date</label><input type="date" value={editEvent?.date || ''} onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })} required /></div>
                                            <div className="form-group"><label>Time</label><input type="text" value={editEvent?.time || ''} onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })} placeholder="7:00 PM" /></div>
                                            <div className="form-group"><label>Venue</label><input type="text" value={editEvent?.venue || ''} onChange={(e) => setEditEvent({ ...editEvent, venue: e.target.value })} required /></div>
                                            <div className="form-group"><label>Location</label><input type="text" value={editEvent?.location || ''} onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })} /></div>
                                            <div className="form-group"><label>Description</label><textarea value={editEvent?.description || ''} onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })} rows="3"></textarea></div>
                                            <div className="form-group"><label>Ticket Link</label><input type="url" value={editEvent?.ticketLink || ''} onChange={(e) => setEditEvent({ ...editEvent, ticketLink: e.target.value })} /></div>
                                            <ImageUploader label="Event Image" value={editEvent?.image || ''} onChange={(val) => setEditEvent({ ...editEvent, image: val })} />
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select value={editEvent?.status || 'upcoming'} onChange={(e) => setEditEvent({ ...editEvent, status: e.target.value })}>
                                                    <option value="upcoming">Upcoming</option>
                                                    <option value="soldout">Sold Out</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-full"><i className="fas fa-save"></i> Save</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Gallery Panel */}
                    {activePanel === 'gallery' && (
                        <div className="admin-panel active" id="panel-gallery">
                            <div className="panel-header-actions">
                                <h3><i className="fas fa-images"></i> Gallery</h3>
                                <button className="btn btn-primary" onClick={openAddGallery}><i className="fas fa-plus"></i> Add Photo</button>
                            </div>
                            <div className="admin-gallery-grid">
                                {gallery.length === 0 ? (
                                    <div className="empty-state"><i className="fas fa-images"></i><p>No photos added yet</p></div>
                                ) : gallery.map(photo => (
                                    <div key={photo.id} className="admin-gallery-item">
                                        <img src={photo.image} alt={photo.caption || ''} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'; }} />
                                        <div className="admin-gallery-actions">
                                            <button className="edit-btn" onClick={() => openEditGallery(photo.id)}><i className="fas fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => deleteGallery(photo.id)}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {galleryModal && (
                                <div className="admin-modal active" onClick={(e) => { if (e.target.className.includes('admin-modal')) setGalleryModal(false); }}>
                                    <div className="modal-content glass-card">
                                        <div className="modal-header">
                                            <h3>{editGallery?.id ? 'Edit Photo' : 'Add Photo'}</h3>
                                            <button className="modal-close" onClick={() => setGalleryModal(false)}><i className="fas fa-times"></i></button>
                                        </div>
                                        <form onSubmit={saveGallery}>
                                            <ImageUploader label="Image" value={editGallery?.image || ''} onChange={(val) => setEditGallery({ ...editGallery, image: val })} />
                                            <div className="form-group"><label>Caption</label><input type="text" value={editGallery?.caption || ''} onChange={(e) => setEditGallery({ ...editGallery, caption: e.target.value })} /></div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select value={editGallery?.category || 'performance'} onChange={(e) => setEditGallery({ ...editGallery, category: e.target.value })}>
                                                    <option value="performance">Performance</option>
                                                    <option value="studio">Studio</option>
                                                    <option value="backstage">Backstage</option>
                                                    <option value="personal">Personal</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-full"><i className="fas fa-save"></i> Save</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contact Panel */}
                    {activePanel === 'contact' && (
                        <div className="admin-panel active" id="panel-contact">
                            <form className="admin-form glass-card" onSubmit={saveContact}>
                                <h3><i className="fas fa-envelope"></i> Contact Information</h3>
                                <div className="form-group"><label>Email</label><input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} /></div>
                                <div className="form-group"><label>Phone</label><input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} /></div>
                                <div className="form-group"><label>Location</label><input type="text" value={contactForm.location} onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })} /></div>
                                <h4 style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Social Links</h4>
                                <div className="form-group"><label><i className="fab fa-youtube"></i> YouTube</label><input type="url" value={contactForm.socialYoutube} onChange={(e) => setContactForm({ ...contactForm, socialYoutube: e.target.value })} /></div>
                                <div className="form-group"><label><i className="fab fa-instagram"></i> Instagram</label><input type="url" value={contactForm.socialInstagram} onChange={(e) => setContactForm({ ...contactForm, socialInstagram: e.target.value })} /></div>
                                <div className="form-group"><label><i className="fab fa-facebook"></i> Facebook</label><input type="url" value={contactForm.socialFacebook} onChange={(e) => setContactForm({ ...contactForm, socialFacebook: e.target.value })} /></div>
                                <div className="form-group"><label><i className="fab fa-tiktok"></i> TikTok</label><input type="url" value={contactForm.socialTiktok} onChange={(e) => setContactForm({ ...contactForm, socialTiktok: e.target.value })} /></div>
                                <div className="form-group"><label><i className="fab fa-spotify"></i> Spotify</label><input type="url" value={contactForm.socialSpotify} onChange={(e) => setContactForm({ ...contactForm, socialSpotify: e.target.value })} /></div>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save Changes</button>
                            </form>
                        </div>
                    )}

                    {/* Messages Panel */}
                    {activePanel === 'messages' && (
                        <div className="admin-panel active" id="panel-messages">
                            <h3><i className="fas fa-inbox"></i> Messages</h3>
                            <div className="admin-items-list">
                                {messages.length === 0 ? (
                                    <div className="empty-state"><i className="fas fa-inbox"></i><p>No messages yet</p></div>
                                ) : messages.map(msg => (
                                    <div key={msg.id} className="message-card">
                                        <div className="message-card-header">
                                            <h4>{msg.name}</h4>
                                            <span>{msg.date ? new Date(msg.date).toLocaleDateString() : ''}</span>
                                        </div>
                                        <p className="message-email">{msg.email}</p>
                                        <p className="message-subject">Subject: {msg.subject}</p>
                                        <p>{msg.message}</p>
                                        <button className="message-delete" onClick={() => deleteMessage(msg.id)}>
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Settings Panel */}
                    {activePanel === 'settings' && (
                        <div className="admin-panel active" id="panel-settings">
                            <form className="admin-form glass-card" onSubmit={saveSettings}>
                                <h3><i className="fas fa-cog"></i> Settings</h3>
                                <div className="form-group"><label>Admin Username</label><input type="text" value={settingsForm.username} onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })} /></div>
                                <div className="form-group"><label>New Password</label><input type="password" value={settingsForm.newPassword} onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })} placeholder="Leave blank to keep current" /></div>
                                <div className="form-group"><label>Footer Description</label><textarea value={settingsForm.footerDesc} onChange={(e) => setSettingsForm({ ...settingsForm, footerDesc: e.target.value })} rows="3"></textarea></div>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save Settings</button>
                            </form>
                            <div className="admin-form glass-card" style={{ marginTop: '20px' }}>
                                <h3><i className="fas fa-database"></i> Data Management</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>Export or import your website data</p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <button className="btn btn-outline" onClick={exportData}><i className="fas fa-download"></i> Export Data</button>
                                    <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-upload"></i> Import Data
                                        <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
                                    </label>
                                    <button className="btn btn-danger" onClick={resetData}><i className="fas fa-trash"></i> Reset All Data</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
