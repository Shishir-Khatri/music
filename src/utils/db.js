// ============================================
// DATABASE LAYER - LocalStorage Based CMS
// ============================================

const DB = {
    defaults: {
        hero: {
            badgeText: 'Nepali Music Artist',
            firstName: 'BIKKI',
            lastName: 'GURUNG',
            description: 'Captivating audiences with soulful melodies and powerful vocals. Experience the magic of Nepali music through a voice that transcends boundaries.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=800&fit=crop',
            statSongs: '50+',
            statShows: '200+',
            statFans: '1M+',
            ytSubscribers: '500K+',
            spotifyListeners: '100K+'
        },
        about: {
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
            expYears: '10+',
            subtitle: 'A Voice That Echoes Through The Himalayas',
            text1: 'Bikki Gurung is a renowned Nepali singer and musician whose melodious voice has captured the hearts of millions across Nepal and beyond. Born with an innate passion for music, Bikki has dedicated his life to creating soulful compositions that blend traditional Nepali folk elements with contemporary musical styles.',
            text2: 'With a career spanning over a decade, he has released numerous hit songs, performed at prestigious venues, and collaborated with some of the finest musicians in the Nepali music industry. His unique ability to connect with audiences through heartfelt lyrics and powerful performances has earned him a special place in Nepali music.',
            feat1: 'Vocalist',
            feat2: 'Musician',
            feat3: 'Songwriter',
            feat4: 'Composer'
        },
        contact: {
            email: 'contact@bikkigurung.com',
            phone: '+977 9800000000',
            location: 'Kathmandu, Nepal',
            socialYoutube: 'https://youtube.com/@bikkigurung',
            socialInstagram: 'https://instagram.com/bikkigurung',
            socialFacebook: 'https://facebook.com/bikkigurung',
            socialTiktok: 'https://tiktok.com/@bikkigurung',
            socialSpotify: 'https://open.spotify.com/artist/bikkigurung'
        },
        settings: {
            username: 'admin',
            password: 'admin123',
            footerDesc: 'Nepali singer, musician, and songwriter creating soulful melodies that resonate with hearts worldwide.'
        },
        music: [
            { id: '1', title: 'Timro Lagi', album: 'Aasha', year: '2024', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '4:32' },
            { id: '2', title: 'Maya Lagcha', album: 'Prem Kahani', year: '2023', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '3:58' },
            { id: '3', title: 'Sapana Mero', album: 'Single', year: '2023', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '5:12' },
            { id: '4', title: 'Himalko Chiso', album: 'Pahad', year: '2024', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '4:05' },
            { id: '5', title: 'Dherai Maya', album: 'Single', year: '2024', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '3:45' },
            { id: '6', title: 'Samjhana', album: 'Memories', year: '2022', cover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&h=400&fit=crop', link: 'https://youtube.com', duration: '4:18' }
        ],
        events: [
            { id: '1', title: 'Kathmandu Night Live', date: '2025-02-14', time: '7:00 PM', venue: 'Hyatt Regency', location: 'Kathmandu, Nepal', description: "An unforgettable Valentine's night with Bikki Gurung live.", ticketLink: 'https://tickets.example.com', image: '', status: 'upcoming' },
            { id: '2', title: 'Pokhara Music Festival', date: '2025-03-15', time: '5:00 PM', venue: 'Lakeside Stage', location: 'Pokhara, Nepal', description: 'Three-day music festival featuring top Nepali artists.', ticketLink: 'https://tickets.example.com', image: '', status: 'upcoming' },
            { id: '3', title: 'Nepali New Year Concert', date: '2025-04-14', time: '6:00 PM', venue: 'Dasarath Stadium', location: 'Kathmandu, Nepal', description: 'Celebrate Nepali New Year with a grand musical evening.', ticketLink: '', image: '', status: 'upcoming' },
            { id: '4', title: 'Sydney Nepali Night', date: '2025-05-20', time: '7:30 PM', venue: 'Sydney Opera House', location: 'Sydney, Australia', description: 'Bikki Gurung goes international — live in Sydney!', ticketLink: 'https://tickets.example.com', image: '', status: 'upcoming' }
        ],
        gallery: [
            { id: '1', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop', caption: 'Live at Kathmandu Festival', category: 'performance' },
            { id: '2', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop', caption: 'Recording Session', category: 'studio' },
            { id: '3', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', caption: 'Concert Night', category: 'performance' },
            { id: '4', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop', caption: 'Behind The Scenes', category: 'backstage' },
            { id: '5', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop', caption: 'Stage Performance', category: 'performance' },
            { id: '6', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop', caption: 'DJ Night Collab', category: 'performance' },
            { id: '7', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop', caption: 'Music Studio', category: 'studio' },
            { id: '8', image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=600&h=400&fit=crop', caption: 'Mountain Retreat', category: 'personal' }
        ],
        messages: [],
        subscribers: []
    },

    init() {
        const keys = ['hero', 'about', 'contact', 'settings', 'music', 'events', 'gallery', 'messages', 'subscribers'];
        keys.forEach(key => {
            if (!localStorage.getItem(`bg_${key}`)) {
                localStorage.setItem(`bg_${key}`, JSON.stringify(this.defaults[key]));
            }
        });
    },

    get(key) {
        const data = localStorage.getItem(`bg_${key}`);
        return data ? JSON.parse(data) : this.defaults[key];
    },

    set(key, value) {
        localStorage.setItem(`bg_${key}`, JSON.stringify(value));
    },

    getAll(key) {
        return this.get(key) || [];
    },

    getById(key, id) {
        const items = this.getAll(key);
        return items.find(item => item.id === id);
    },

    add(key, item) {
        const items = this.getAll(key);
        item.id = Date.now().toString();
        items.push(item);
        this.set(key, items);
        return item;
    },

    update(key, id, updatedItem) {
        const items = this.getAll(key);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            this.set(key, items);
            return items[index];
        }
        return null;
    },

    delete(key, id) {
        let items = this.getAll(key);
        items = items.filter(item => item.id !== id);
        this.set(key, items);
    },

    exportAll() {
        const data = {};
        const keys = ['hero', 'about', 'contact', 'settings', 'music', 'events', 'gallery', 'messages', 'subscribers'];
        keys.forEach(key => { data[key] = this.get(key); });
        return data;
    },

    importAll(data) {
        Object.keys(data).forEach(key => {
            this.set(key, data[key]);
        });
    },

    resetAll() {
        const keys = ['hero', 'about', 'contact', 'settings', 'music', 'events', 'gallery', 'messages', 'subscribers'];
        keys.forEach(key => {
            localStorage.setItem(`bg_${key}`, JSON.stringify(this.defaults[key]));
        });
    }
};

DB.init();

export default DB;
