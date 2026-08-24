const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Legal Canadian IPTV sources
const CANADIAN_IPTV_SOURCES = [
  {
    name: 'CBC',
    url: '#EXTINF:-1,CBC\nhttp://cbc-stream.example.com/live.m3u8',
    category: 'Broadcast',
    country: 'CA'
  },
  {
    name: 'CTV',
    url: '#EXTINF:-1,CTV\nhttp://ctv-stream.example.com/live.m3u8',
    category: 'Broadcast',
    country: 'CA'
  },
  {
    name: 'Global',
    url: '#EXTINF:-1,Global\nhttp://global-stream.example.com/live.m3u8',
    category: 'Broadcast',
    country: 'CA'
  },
  {
    name: 'Citytv',
    url: '#EXTINF:-1,Citytv\nhttp://citytv-stream.example.com/live.m3u8',
    category: 'Broadcast',
    country: 'CA'
  },
  {
    name: 'TSN',
    url: '#EXTINF:-1,TSN\nhttp://tsn-stream.example.com/live.m3u8',
    category: 'Sports',
    country: 'CA'
  },
  {
    name: 'Sportsnet',
    url: '#EXTINF:-1,Sportsnet\nhttp://sportsnet-stream.example.com/live.m3u8',
    category: 'Sports',
    country: 'CA'
  },
  {
    name: 'Space',
    url: '#EXTINF:-1,Space\nhttp://space-stream.example.com/live.m3u8',
    category: 'Specialty',
    country: 'CA'
  },
  {
    name: 'CityNews',
    url: '#EXTINF:-1,CityNews\nhttp://citynews-stream.example.com/live.m3u8',
    category: 'News',
    country: 'CA'
  },
  {
    name: 'BNN Bloomberg',
    url: '#EXTINF:-1,BNN Bloomberg\nhttp://bnn-stream.example.com/live.m3u8',
    category: 'News',
    country: 'CA'
  },
  {
    name: 'Discovery Canada',
    url: '#EXTINF:-1,Discovery Canada\nhttp://discovery-stream.example.com/live.m3u8',
    category: 'Specialty',
    country: 'CA'
  }
];

class IPTVManager {
  constructor() {
    this.channels = [];
    this.playlistPath = path.join(__dirname, '../../data/playlists');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.playlistPath)) {
      fs.mkdirSync(this.playlistPath, { recursive: true });
    }
  }

  async initialize() {
    try {
      this.channels = CANADIAN_IPTV_SOURCES;
      await this.generateM3UPlaylist();
      console.log(`✓ Loaded ${this.channels.length} Canadian channels`);
      return true;
    } catch (error) {
      console.error('Error initializing IPTV:', error);
      return false;
    }
  }

  async generateM3UPlaylist() {
    let m3uContent = '#EXTM3U\n';
    
    this.channels.forEach(channel => {
      m3uContent += `#EXTINF:-1 tvg-id="${channel.name.toLowerCase()}" tvg-name="${channel.name}" group-title="${channel.category}",${channel.name}\n`;
      m3uContent += channel.url.split('\n')[1] + '\n';
    });

    const playlistFile = path.join(this.playlistPath, 'canadian.m3u');
    fs.writeFileSync(playlistFile, m3uContent);
    console.log(`✓ Generated M3U playlist: ${playlistFile}`);
  }

  getChannels() {
    return this.channels;
  }

  getChannelsByCategory(category) {
    return this.channels.filter(ch => ch.category === category);
  }

  getChannelByName(name) {
    return this.channels.find(ch => ch.name.toLowerCase() === name.toLowerCase());
  }

  getAllCategories() {
    return [...new Set(this.channels.map(ch => ch.category))];
  }
}

module.exports = new IPTVManager();