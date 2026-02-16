// ============================================
// DATABASE LAYER - Supabase Shared Database
// ============================================
import { supabase } from './supabaseClient';

const DB = {
    defaults: {
        hero: {
            badgeText: 'Nepali Music Artist',
            firstName: 'BIKKI',
            lastName: 'GURUNG',
            description: 'Captivating audiences with soulful melodies and powerful vocals. Experience the magic of Nepali music through a voice that transcends boundaries.',
            image: 'https://scontent.fktm9-2.fna.fbcdn.net/v/t39.30808-1/612624817_1438810484278806_5885528685666392533_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=gJI4Y0BubRQQ7kNvwF0Q5Vn&_nc_oc=Adn2XnmLMaHpOIeNhJwYpUvdBhCP5HPz7aGe4un2pgZ3T7c7t8L2gZ5UKdwNMF5egRLK12tSABBC_gguusqZtfzw&_nc_zt=24&_nc_ht=scontent.fktm9-2.fna&_nc_gid=E8AtZQFDezznnop4oxXbQg&oh=00_AfulLm4IjcCsq2ifPvmLc3UjDeE841qf2RtVVUGUtv8VGQ&oe=699912D6',
            statSongs: '50+',
            statShows: '200+',
            statFans: '1M+',
            ytSubscribers: '500K+',
            spotifyListeners: '100K+'
        },
        about: {
            image: 'https://scontent.fktm9-2.fna.fbcdn.net/v/t39.30808-6/307058605_649943229832206_3095593770252687574_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=2TbG7Ji-UBcQ7kNvwFin3wb&_nc_oc=Adkv-A_Mo_KUC-6vWDj5zYKOCtrJ-8iOuBTA4MSVxTQXNg1FVBDghKIecdxGq8wPKqnZbaOMmL6JdrZQgqVNlTam&_nc_zt=23&_nc_ht=scontent.fktm9-2.fna&_nc_gid=eETtwDu0FmjiYja8Aq4sUQ&oh=00_Aftug40qVQmBPjjDsJMQwMA75B2eHLoVS4-tLb_SkSf6Jw&oe=69991A6C',
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
        }
    },

    // Check if we have a table for the key or if it's in site_content
    isCollection(key) {
        return ['music', 'events', 'gallery', 'messages', 'subscribers'].includes(key);
    },

    async get(key) {
        if (!supabase) return this.defaults[key];

        if (this.isCollection(key)) {
            const { data, error } = await supabase.from(key).select('*').order('created_at', { ascending: false });
            if (error) { console.error(`Error fetching ${key}:`, error); return []; }
            return data;
        } else {
            const { data, error } = await supabase.from('site_content').select('data').eq('key', key).maybeSingle();
            if (error) { console.error(`Error fetching ${key}:`, error); return this.defaults[key]; }
            return data ? data.data : this.defaults[key];
        }
    },

    async getAll(key) {
        return await this.get(key);
    },

    async getById(key, id) {
        if (!supabase) return null;
        const { data, error } = await supabase.from(key).select('*').eq('id', id).single();
        if (error) { console.error(`Error fetching ${key} by id:`, error); return null; }
        return data;
    },

    async set(key, value) {
        if (!supabase) return;
        if (this.isCollection(key)) {
            // Usually we add/update/delete items individually for collections, 
            // but if we must set the whole array:
            console.warn('Set called on a collection. Use add/update/delete instead.');
        } else {
            const { error } = await supabase.from('site_content').upsert({ key, data: value, updated_at: new Date() });
            if (error) console.error(`Error setting ${key}:`, error);
        }
    },

    async add(key, item) {
        if (!supabase) return null;
        const { data, error } = await supabase.from(key).insert([item]).select();
        if (error) { console.error(`Error adding to ${key}:`, error); return null; }
        return data[0];
    },

    async update(key, id, updatedItem) {
        if (!supabase) return null;
        const { data, error } = await supabase.from(key).update(updatedItem).eq('id', id).select();
        if (error) { console.error(`Error updating ${key}:`, error); return null; }
        return data[0];
    },

    async delete(key, id) {
        if (!supabase) return;
        const { error } = await supabase.from(key).delete().eq('id', id);
        if (error) console.error(`Error deleting from ${key}:`, error);
    },

    async resetAll() {
        if (!supabase) return;
        for (const [key, value] of Object.entries(this.defaults)) {
            await this.set(key, value);
        }
    },

    async exportAll() {
        if (!supabase) return {};
        const keys = ['hero', 'about', 'contact', 'settings', 'music', 'events', 'gallery', 'messages', 'subscribers'];
        const results = await Promise.all(keys.map(k => this.get(k)));
        return keys.reduce((acc, key, i) => {
            acc[key] = results[i];
            return acc;
        }, {});
    },

    async importAll(data) {
        if (!supabase) return;
        for (const [key, value] of Object.entries(data)) {
            if (this.isCollection(key)) {
                // For collections, we clear and then insert
                await supabase.from(key).delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
                if (Array.isArray(value) && value.length > 0) {
                    // Remove IDs from items to allow Supabase to generate new ones, or keep if wanting to preserve
                    const itemsToInsert = value.map(({ id, created_at, updated_at, ...rest }) => rest);
                    await supabase.from(key).insert(itemsToInsert);
                }
            } else {
                await this.set(key, value);
            }
        }
    },

    async migrateFromLocalStorage() {
        const legacyData = {};
        const keys = ['bg_hero', 'bg_about', 'bg_contact', 'bg_settings', 'bg_music', 'bg_events', 'bg_gallery', 'bg_messages', 'bg_subscribers'];

        let hasData = false;
        keys.forEach(k => {
            const val = localStorage.getItem(k);
            if (val) {
                const standardKey = k.replace('bg_', '');
                legacyData[standardKey] = JSON.parse(val);
                hasData = true;
            }
        });

        if (hasData) {
            console.log('Detected legacy localStorage data. Migrating to Supabase...');
            await this.importAll(legacyData);
            // Optionally clear localStorage after migration
            // keys.forEach(k => localStorage.removeItem(k));
            return true;
        }
        return false;
    }
};

export default DB;
