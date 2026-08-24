# Canadian IPTV Player

🍁 A professional **legal** Canadian live IPTV player with public IPTV streams, comprehensive EPG guide (2005-2013), and IPTV-org integration.

## ✨ Features

- ✅ **100% Legal Canadian IPTV Streams** - Only public, legal Canadian TV networks
- 📺 **Premium Canadian TV Networks**
  - Broadcast: CBC, CTV, Global, Citytv
  - Sports: TSN, Sportsnet
  - Specialty: Space, Discovery Canada
  - News: CityNews, BNN Bloomberg
- 📅 **Complete EPG Timeline (2005-2013)** - Historical programming guide
- 🔍 **Filter by Year & Category** - Advanced filtering and search capabilities
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎯 **Program Search & Discovery** - Find shows by title or type
- 🔗 **IPTV-org Integration** - Compatible with IPTV standards
- 📄 **M3U Playlist Support** - Standard IPTV playlist format
- 🌐 **RESTful API** - Full API for third-party integrations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PapiceFlomo26/CanadianIPTVPlayer.git
cd CanadianIPTVPlayer

# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

### Development Mode

```bash
npm run dev
```

This starts the server with automatic restart on file changes.

## 📖 Usage

### Web Interface

1. **Channels Tab** - Browse all Canadian TV channels
   - Filter by category (Broadcast, Sports, Specialty, News)
   - View channel details
   - Direct access to EPG

2. **EPG Guide Tab** - Electronic Program Guide
   - Select channel and year (2005-2013)
   - View complete program schedule
   - Filter programs by type
   - See program details (time, duration, rating)

3. **Search Tab** - Find specific programs
   - Search by program name
   - Filter by channel and year
   - Instant results with program details

4. **About Tab** - Service information and API documentation

### API Endpoints

#### Channels

```bash
# Get all channels
GET /api/channels

# Get channels by category
GET /api/channels/category/:category
# Categories: Broadcast, Sports, Specialty, News

# Get specific channel
GET /api/channels/name/:name

# Get all available categories
GET /api/channels/categories/all
```

#### EPG Guide

```bash
# Get EPG by channel and year
GET /api/epg/:channel/:year
# Example: GET /api/epg/CBC/2010

# Get EPG by date range and year
GET /api/epg/:channel/:year/range?startDate=2010-01-01&endDate=2010-12-31

# Filter EPG by program type
GET /api/epg/:channel/:year/type/:type
# Types: News, Sports, Movie, Drama, Documentary, Entertainment

# Search EPG programs
GET /api/epg/:channel/:year/search?query=program_name
```

#### Guide Information

```bash
# Get available years
GET /api/guide/years/available

# Get guide information
GET /api/guide/info

# Health check
GET /api/health
```

## 📁 Project Structure

```
CanadianIPTVPlayer/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── public/                  # Frontend files
│   ├── index.html          # Main HTML page
│   ├── app.js              # Frontend JavaScript
│   └── styles.css          # Styling
├── src/
│   ├── iptv/
│   │   └── iptvManager.js  # IPTV channel management
│   ├── epg/
│   │   └── epgManager.js   # EPG database and queries
│   └── routes/
│       ├── channels.js     # Channel API routes
│       ├── epg.js          # EPG API routes
│       └── guide.js        # Guide API routes
├── data/
│   ├── epg/                # EPG data storage
│   └── playlists/          # M3U playlists
└── README.md
```

## 🎯 Canadian TV Networks

### Broadcast Networks
- **CBC** - Canadian Broadcasting Corporation
- **CTV** - Canada's largest private broadcaster
- **Global** - Global News and entertainment
- **Citytv** - City television network

### Sports Networks
- **TSN** - The Sports Network
- **Sportsnet** - National sports channel

### Specialty Networks
- **Space** - Science fiction and entertainment
- **Discovery Canada** - Educational and documentary content

### News Networks
- **CityNews** - Local and national news
- **BNN Bloomberg** - Business and financial news

## 📊 EPG Database

- **Coverage Period**: 2005-2013 (9 years)
- **Channels**: 10 major Canadian networks
- **Programs**: Comprehensive daily schedules
- **Search Capability**: Full-text program search
- **Filtering Options**:
  - By channel
  - By year
  - By program type (News, Sports, Movies, Drama, Documentary, Entertainment)
  - By date range

## 🔗 IPTV-org Integration

This project integrates with the IPTV-org standards:
- M3U/M3U8 playlist support
- TVG (TV Guide) metadata format
- Standard IPTV channel definitions
- EPG XML compatibility

Generated playlists available at: `data/playlists/canadian.m3u`

## 🛡️ Legal & Compliance

✅ **100% Legal**
- All channels are publicly available Canadian networks
- No pirated or unauthorized content
- Complies with CRTC regulations
- Educational and archival purposes
- Historical EPG data for research and reference

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=production
```

## 📦 Dependencies

- **express** - Web framework
- **axios** - HTTP client
- **cors** - Cross-origin resource sharing
- **hls.js** - HLS streaming support
- **xml2js** - XML parsing for EPG
- **sqlite3** - Database support
- **moment** - Date/time utilities

## 🧪 Testing

```bash
# Run tests
npm test

# Check health
curl http://localhost:3000/api/health

# Get all channels
curl http://localhost:3000/api/channels

# Get EPG for specific channel/year
curl http://localhost:3000/api/epg/CBC/2010
```

## 📜 API Response Examples

### Get Channels

```json
{
  "success": true,
  "count": 10,
  "channels": [
    {
      "name": "CBC",
      "category": "Broadcast",
      "country": "CA",
      "url": "#EXTINF:-1,CBC\nhttp://cbc-stream.example.com/live.m3u8"
    }
  ]
}
```

### Get EPG

```json
{
  "success": true,
  "channel": "CBC",
  "year": 2010,
  "count": 52,
  "programs": [
    {
      "title": "News Tonight",
      "startTime": "2010-01-01 18:00:00",
      "endTime": "2010-01-01 19:00:00",
      "duration": 60,
      "type": "News",
      "channel": "CBC",
      "year": 2010,
      "description": "News Tonight on CBC",
      "rating": "PG"
    }
  ]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing documentation
- Review API examples

## 🙏 Acknowledgments

- IPTV-org for standards and specifications
- Canadian TV networks for their public streams
- Node.js and JavaScript community

## 📈 Roadmap

- [ ] Add more historical EPG data (2000-2004, 2014-2024)
- [ ] Database optimization with SQLite
- [ ] Advanced filtering and recommendations
- [ ] User accounts and favorites
- [ ] Mobile app development
- [ ] Real-time stream status monitoring
- [ ] Multi-language support
- [ ] Automated EPG updates

---

**Made with ❤️ in Canada** 🇨🇦
