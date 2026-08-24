const express = require('express');
const router = express.Router();
const epgManager = require('../epg/epgManager');

// Get EPG by channel and year
router.get('/:channel/:year', (req, res) => {
  try {
    const { channel, year } = req.params;
    const yearNum = parseInt(year);
    
    const epg = epgManager.getEPGByChannelAndYear(channel, yearNum);
    res.json({
      success: true,
      channel: channel,
      year: yearNum,
      count: epg.length,
      programs: epg
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get EPG by date range and year
router.get('/:channel/:year/range', (req, res) => {
  try {
    const { channel, year } = req.params;
    const { startDate, endDate } = req.query;
    const yearNum = parseInt(year);

    if (!startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'startDate and endDate query parameters required' 
      });
    }

    const epg = epgManager.getEPGByDateRangeAndYear(channel, startDate, endDate, yearNum);
    res.json({
      success: true,
      channel: channel,
      year: yearNum,
      startDate: startDate,
      endDate: endDate,
      count: epg.length,
      programs: epg
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Filter EPG by type
router.get('/:channel/:year/type/:type', (req, res) => {
  try {
    const { channel, year, type } = req.params;
    const yearNum = parseInt(year);

    const epg = epgManager.filterEPGByType(channel, yearNum, type);
    res.json({
      success: true,
      channel: channel,
      year: yearNum,
      type: type,
      count: epg.length,
      programs: epg
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Search EPG
router.get('/:channel/:year/search', (req, res) => {
  try {
    const { channel, year } = req.params;
    const { query } = req.query;
    const yearNum = parseInt(year);

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: 'query parameter required' 
      });
    }

    const epg = epgManager.searchEPG(channel, yearNum, query);
    res.json({
      success: true,
      channel: channel,
      year: yearNum,
      query: query,
      count: epg.length,
      programs: epg
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;