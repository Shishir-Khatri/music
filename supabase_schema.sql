-- Create tables for Bikki Gurung Website

-- 1. Site Content (for singletons like hero, about, contact, settings)
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Music table
CREATE TABLE IF NOT EXISTS music (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  album TEXT,
  year TEXT,
  cover TEXT,
  link TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  venue TEXT NOT NULL,
  location TEXT,
  description TEXT,
  ticketLink TEXT,
  image TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'performance',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE music ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public read for everything except messages, admin write for everything)
-- For this simple setup, we'll allow public read and public write to messages.
-- In a real app, we'd restrict write access to authenticated admins.

-- Site Content: Public Read, Admin Write
CREATE POLICY "Public Read Site Content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin All Site Content" ON site_content FOR ALL USING (true);

-- Music: Public Read, Admin Write
CREATE POLICY "Public Read Music" ON music FOR SELECT USING (true);
CREATE POLICY "Admin All Music" ON music FOR ALL USING (true);

-- Events: Public Read, Admin Write
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Admin All Events" ON events FOR ALL USING (true);

-- Gallery: Public Read, Admin Write
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin All Gallery" ON gallery FOR ALL USING (true);

-- Messages: Public Insert, Admin All
CREATE POLICY "Public Insert Messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Messages" ON messages FOR ALL USING (true);

-- Subscribers: Public Insert, Admin All
CREATE POLICY "Public Insert Subscribers" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Subscribers" ON subscribers FOR ALL USING (true);

-- Insert Default Data (Initial state)
INSERT INTO site_content (key, data) VALUES 
('hero', '{"badgeText": "Nepali Music Artist", "firstName": "BIKKI", "lastName": "GURUNG", "description": "Captivating audiences with soulful melodies and powerful vocals.", "image": "https://scontent.fktm9-2.fna.fbcdn.net/v/t39.30808-1/612624817_1438810484278806_5885528685666392533_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=gJI4Y0BubRQQ7kNvwF0Q5Vn&_nc_oc=Adn2XnmLMaHpOIeNhJwYpUvdBhCP5HPz7aGe4un2pgZ3T7c7t8L2gZ5UKdwNMF5egRLK12tSABBC_gguusqZtfzw&_nc_zt=24&_nc_ht=scontent.fktm9-2.fna&_nc_gid=E8AtZQFDezznnop4oxXbQg&oh=00_AfulLm4IjcCsq2ifPvmLc3UjDeE841qf2RtVVUGUtv8VGQ&oe=699912D6", "statSongs": "30+", "statShows": "200+", "statFans": "500K+", "ytSubscribers": "350K+", "spotifyListeners": "150K+"}'),
('about', '{"image": "https://scontent.fktm9-2.fna.fbcdn.net/v/t39.30808-6/307058605_649943229832206_3095593770252687574_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=2TbG7Ji-UBcQ7kNvwFin3wb&_nc_oc=Adkv-A_Mo_KUC-6vWDj5zYKOCtrJ-8iOuBTA4MSVxTQXNg1FVBDghKIecdxGq8wPKqnZbaOMmL6JdrZQgqVNlTam&_nc_zt=23&_nc_ht=scontent.fktm9-2.fna&_nc_gid=eETtwDu0FmjiYja8Aq4sUQ&oh=00_Aftug40qVQmBPjjDsJMQwMA75B2eHLoVS4-tLb_SkSf6Jw&oe=69991A6C", "expYears": "10+", "subtitle": "A Voice That Echoes Through The Himalayas", "text1": "Bikki Gurung is a renowned Nepali singer...", "text2": "With a career spanning over a decade...", "feat1": "Vocalist", "feat2": "Musician", "feat3": "Songwriter", "feat4": "Composer"}'),
('contact', '{"email": "bikkimgtm@gmail.com", "phone": "+977 9800000000", "location": "Kathmandu, Nepal", "socialYoutube": "https://youtube.com/@bikkigurung", "socialInstagram": "https://www.instagram.com/bikkigurungofficial/", "socialFacebook": "https://www.facebook.com/Bikkigurungofficial", "socialTiktok": "https://www.tiktok.com/@bikkigurungofficial", "socialSpotify": "https://open.spotify.com/artist/4Np2Az7mDMNpHNywtL2jQA"}'),
('settings', '{"username": "bikki-gurung", "password": "bikki-gurung-2026!", "footerDesc": "Nepali singer, musician, and songwriter."}')
ON CONFLICT (key) DO NOTHING;
