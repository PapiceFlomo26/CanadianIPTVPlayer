const express = require('express');
const router = express.Router();
const epgManager = require('../epg/epgManager');

// Get available years
router.get('/years/available', (req, res) => {
  try {
    const years = epgManager.getAvailableYears();
    res.json({
      success: true,
      ...years
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get guide info
router.get('/info', (req, res) => {
  try {
    const years = epgManager.getAvailableYears();
    res.json({
      success: true,
      service: 'Canadian IPTV Player EPG Guide',
      features: [
        'Legal Canadian TV Networks',
        'Complete EPG Timeline (2005-2013)',
        'EPG Filtering by Year',
        'Channel Category Browsing',
        'Program Search and Discovery',
        'IPTV-org Integration'
      ],
      yearRange: years,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;