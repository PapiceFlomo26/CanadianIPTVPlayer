# Canadian IPTV Player - API Documentation

## Overview

The Canadian IPTV Player provides a comprehensive RESTful API for accessing legal Canadian TV channels and their Electronic Program Guide (EPG) data from 2005-2013.

## Base URL

```
http://localhost:3000/api
```

## Authentication

No authentication is required. All endpoints are publicly accessible.

## Response Format

All responses are in JSON format:

```json
{
  "success": true,
  "data": {}
}
```

## Channels API

### Get All Channels

**Endpoint:** `GET /channels`

**Description:** Retrieve all available Canadian TV channels

**Response:**
```json
{
  "success": true,
  "count": 10,
  "channels": [
    {
      "name": "CBC",
      "category": "Broadcast",
      "country": "CA",
      "url": "#EXTINF:-1,CBC\nhttp://stream-url"
    }
  ]
}
```

**Status Codes:**
- `200` OK
- `500` Internal Server Error

---

### Get Channels by Category

**Endpoint:** `GET /channels/category/:category`

**Description:** Filter channels by category

**Parameters:**
- `category` (string): Broadcast, Sports, Specialty, News

**Example:**
```bash
curl http://localhost:3000/api/channels/category/Sports
```

**Response:**
```json
{
  "success": true,
  "category": "Sports",
  "count": 2,
  "channels": [
    {
      "name": "TSN",
      "category": "Sports",
      "country": "CA"
    },
    {
      "name": "Sportsnet",
      "category": "Sports",
      "country": "CA"
    }
  ]
}
```

---

### Get Channel by Name

**Endpoint:** `GET /channels/name/:name`

**Description:** Retrieve a specific channel by name

**Parameters:**
- `name` (string): Channel name (e.g., CBC, CTV, Global)

**Example:**
```bash
curl http://localhost:3000/api/channels/name/CBC
```

**Response:**
```json
{
  "success": true,
  "channel": {
    "name": "CBC",
    "category": "Broadcast",
    "country": "CA",
    "url": "..."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Channel \"XYZ\" not found"
}
```

---

### Get All Categories

**Endpoint:** `GET /channels/categories/all`

**Description:** Retrieve all available channel categories

**Response:**
```json
{
  "success": true,
  "count": 4,
  "categories": [
    "Broadcast",
    "Sports",
    "Specialty",
    "News"
  ]
}
```

---

## EPG API

### Get EPG by Channel and Year

**Endpoint:** `GET /epg/:channel/:year`

**Description:** Retrieve complete EPG for a channel in a specific year

**Parameters:**
- `channel` (string): Channel name (CBC, CTV, Global, Citytv, TSN, Sportsnet, Space, CityNews, BNN Bloomberg, Discovery Canada)
- `year` (integer): Year from 2005 to 2013

**Example:**
```bash
curl http://localhost:3000/api/epg/CBC/2010
```

**Response:**
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

**Error Response:**
```json
{
  "success": false,
  "error": "Year 2000 not available. Range: 2005-2013"
}
```

---

### Get EPG by Date Range and Year

**Endpoint:** `GET /epg/:channel/:year/range`

**Description:** Retrieve EPG for a specific date range within a year

**Parameters:**
- `channel` (string): Channel name
- `year` (integer): Year from 2005 to 2013
- `startDate` (string, query): Start date in YYYY-MM-DD format
- `endDate` (string, query): End date in YYYY-MM-DD format

**Example:**
```bash
curl 'http://localhost:3000/api/epg/CBC/2010/range?startDate=2010-01-01&endDate=2010-01-31'
```

**Response:**
```json
{
  "success": true,
  "channel": "CBC",
  "year": 2010,
  "startDate": "2010-01-01",
  "endDate": "2010-01-31",
  "count": 10,
  "programs": [...]
}
```

---

### Filter EPG by Type

**Endpoint:** `GET /epg/:channel/:year/type/:type`

**Description:** Filter EPG programs by type

**Parameters:**
- `channel` (string): Channel name
- `year` (integer): Year from 2005 to 2013
- `type` (string): Program type (News, Sports, Movie, Drama, Documentary, Entertainment)

**Example:**
```bash
curl http://localhost:3000/api/epg/TSN/2010/type/Sports
```

**Response:**
```json
{
  "success": true,
  "channel": "TSN",
  "year": 2010,
  "type": "Sports",
  "count": 26,
  "programs": [...]
}
```

---

### Search EPG Programs

**Endpoint:** `GET /epg/:channel/:year/search`

**Description:** Search for programs by title or description

**Parameters:**
- `channel` (string): Channel name
- `year` (integer): Year from 2005 to 2013
- `query` (string, query): Search query

**Example:**
```bash
curl 'http://localhost:3000/api/epg/CBC/2010/search?query=news'
```

**Response:**
```json
{
  "success": true,
  "channel": "CBC",
  "year": 2010,
  "query": "news",
  "count": 15,
  "programs": [...]
}
```

---

## Guide API

### Get Available Years

**Endpoint:** `GET /guide/years/available`

**Description:** Retrieve available EPG years

**Response:**
```json
{
  "success": true,
  "start": 2005,
  "end": 2013,
  "years": [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013]
}
```

---

### Get Guide Information

**Endpoint:** `GET /guide/info`

**Description:** Retrieve service information and features

**Response:**
```json
{
  "success": true,
  "service": "Canadian IPTV Player EPG Guide",
  "features": [
    "Legal Canadian TV Networks",
    "Complete EPG Timeline (2005-2013)",
    "EPG Filtering by Year",
    "Channel Category Browsing",
    "Program Search and Discovery",
    "IPTV-org Integration"
  ],
  "yearRange": {
    "start": 2005,
    "end": 2013,
    "years": [...]
  },
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

---

## Health Check

### Health Status

**Endpoint:** `GET /api/health`

**Description:** Check service health status

**Response:**
```json
{
  "status": "active",
  "service": "Canadian IPTV Player",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400  | Bad Request | Invalid parameters or missing required fields |
| 404  | Not Found | Channel or program not found |
| 500  | Internal Server Error | Server-side error |

---

## Rate Limiting

No rate limiting is currently implemented. All endpoints are freely accessible.

## CORS

CORS is enabled for all origins. Requests from any domain are accepted.

## Data Format

### Program Object

```typescript
interface Program {
  title: string;           // Program title
  startTime: string;       // Start time (YYYY-MM-DD HH:mm:ss)
  endTime: string;         // End time (YYYY-MM-DD HH:mm:ss)
  duration: number;        // Duration in minutes
  type: string;            // Program type
  channel: string;         // Channel name
  year: number;            // Year (2005-2013)
  description: string;     // Program description
  rating: string;          // Content rating (PG, 14+, 18+, etc.)
}
```

### Channel Object

```typescript
interface Channel {
  name: string;            // Channel name
  category: string;        // Broadcast, Sports, Specialty, News
  country: string;         // Country code (CA)
  url: string;             // Stream URL (M3U format)
}
```

---

## Examples

### Get All Sports Channels

```bash
curl http://localhost:3000/api/channels/category/Sports | jq
```

### Get News Programs on CBC in 2010

```bash
curl http://localhost:3000/api/epg/CBC/2010/type/News | jq
```

### Search for Movies on CTV in 2012

```bash
curl 'http://localhost:3000/api/epg/CTV/2012/search?query=movie' | jq
```

### Get Programs for January 2010 on Global

```bash
curl 'http://localhost:3000/api/epg/Global/2010/range?startDate=2010-01-01&endDate=2010-01-31' | jq
```

---

## Support

For API issues or feature requests, please open an issue on GitHub.
