const fs = require('fs');
const path = require('path');
const moment = require('moment');

class EPGManager {
  constructor() {
    this.epgData = {};
    this.epgPath = path.join(__dirname, '../../data/epg');
    this.ensureDataDirectory();
    this.yearRange = { start: 2005, end: 2013 };
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.epgPath)) {
      fs.mkdirSync(this.epgPath, { recursive: true });
    }
  }

  async initialize() {
    try {
      // Generate sample EPG data for demo
      this.generateSampleEPG();
      console.log('✓ EPG data initialized (2005-2013)');
      return true;
    } catch (error) {
      console.error('Error initializing EPG:', error);
      return false;
    }
  }

  generateSampleEPG() {
    const channels = [
      'CBC', 'CTV', 'Global', 'Citytv', 'TSN', 
      'Sportsnet', 'Space', 'CityNews', 'BNN Bloomberg', 'Discovery Canada'
    ];

    const programs = [
      { title: 'News Tonight', duration: 60, type: 'News' },
      { title: 'Sports Hour', duration: 120, type: 'Sports' },
      { title: 'Documentary', duration: 90, type: 'Documentary' },
      { title: 'Movie Night', duration: 120, type: 'Movie' },
      { title: 'Local News', duration: 30, type: 'News' },
      { title: 'Game Show', duration: 60, type: 'Entertainment' },
      { title: 'Drama Series', duration: 45, type: 'Drama' },
      { title: 'Science Show', duration: 60, type: 'Documentary' }
    ];

    // Generate EPG for each year in range
    for (let year = this.yearRange.start; year <= this.yearRange.end; year++) {
      channels.forEach(channel => {
        const channelId = channel.toLowerCase();
        const key = `${year}-${channelId}`;
        
        this.epgData[key] = this.generateDailySchedule(year, channel, programs);
      });
    }
  }

  generateDailySchedule(year, channel, programs) {
    const schedule = [];
    const daysInYear = moment(`${year}-12-31`, 'YYYY-MM-DD').dayOfYear();

    for (let day = 1; day <= daysInYear; day += 7) { // Sample every 7 days
      const date = moment(`${year}-01-01`, 'YYYY-MM-DD').add(day, 'days');
      let startTime = moment(date).hour(6).minute(0);

      programs.forEach(program => {
        schedule.push({
          title: program.title,
          startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
          endTime: startTime.clone().add(program.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          duration: program.duration,
          type: program.type,
          channel: channel,
          year: year,
          description: `${program.title} on ${channel}`,
          rating: 'PG'
        });

        startTime.add(program.duration, 'minutes');
      });
    }

    return schedule;
  }

  getEPGByChannelAndYear(channel, year) {
    if (year < this.yearRange.start || year > this.yearRange.end) {
      throw new Error(`Year ${year} not available. Range: ${this.yearRange.start}-${this.yearRange.end}`);
    }

    const channelId = channel.toLowerCase();
    const key = `${year}-${channelId}`;
    return this.epgData[key] || [];
  }

  getEPGByDateRangeAndYear(channel, startDate, endDate, year) {
    const schedule = this.getEPGByChannelAndYear(channel, year);
    const start = moment(startDate);
    const end = moment(endDate);

    return schedule.filter(program => {
      const progTime = moment(program.startTime);
      return progTime.isBetween(start, end, null, '[]');
    });
  }

  filterEPGByType(channel, year, type) {
    const schedule = this.getEPGByChannelAndYear(channel, year);
    return schedule.filter(program => program.type === type);
  }

  getAvailableYears() {
    return {
      start: this.yearRange.start,
      end: this.yearRange.end,
      years: Array.from(
        { length: this.yearRange.end - this.yearRange.start + 1 },
        (_, i) => this.yearRange.start + i
      )
    };
  }

  searchEPG(channel, year, query) {
    const schedule = this.getEPGByChannelAndYear(channel, year);
    const lowerQuery = query.toLowerCase();
    return schedule.filter(program => 
      program.title.toLowerCase().includes(lowerQuery) ||
      program.description.toLowerCase().includes(lowerQuery)
    );
  }
}

module.exports = new EPGManager();