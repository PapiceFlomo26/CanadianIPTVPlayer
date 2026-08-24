const express = require('express');
const router = express.Router();
const iptvManager = require('../iptv/iptvManager');

// Get all channels
router.get('/', (req, res) => {
  try {
    const channels = iptvManager.getChannels();
    res.json({
      success: true,
      count: channels.length,
      channels: channels
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get channels by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const channels = iptvManager.getChannelsByCategory(category);
    res.json({
      success: true,
      category: category,
      count: channels.length,
      channels: channels
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get channel by name
router.get('/name/:name', (req, res) => {
  try {
    const { name } = req.params;
    const channel = iptvManager.getChannelByName(name);
    
    if (!channel) {
      return res.status(404).json({ 
        success: false, 
        error: `Channel "${name}" not found` 
      });
    }

    res.json({
      success: true,
      channel: channel
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all categories
router.get('/categories/all', (req, res) => {
  try {
    const categories = iptvManager.getAllCategories();
    res.json({
      success: true,
      count: categories.length,
      categories: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;