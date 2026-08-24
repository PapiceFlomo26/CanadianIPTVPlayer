// Load channels on page load
document.addEventListener('DOMContentLoaded', () => {
    loadChannels();
    checkHealth();
});

// Check API health
async function checkHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('✓ Service Status:', data.status);
    } catch (error) {
        console.error('Health check failed:', error);
    }
}

// Load all channels
async function loadChannels() {
    try {
        const response = await fetch('/api/channels');
        const data = await response.json();
        
        if (data.success) {
            displayChannels(data.channels);
        }
    } catch (error) {
        console.error('Error loading channels:', error);
        document.getElementById('channels-list').innerHTML = '<p class="error">Error loading channels</p>';
    }
}

// Display channels
function displayChannels(channels) {
    const container = document.getElementById('channels-list');
    container.innerHTML = '';
    
    channels.forEach(channel => {
        const card = document.createElement('div');
        card.className = 'channel-card';
        card.innerHTML = `
            <div class="channel-header">
                <h3>${channel.name}</h3>
                <span class="category-badge">${channel.category}</span>
            </div>
            <div class="channel-details">
                <p><strong>Country:</strong> ${channel.country}</p>
                <button onclick="selectChannel('${channel.name}')">View EPG</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter channels by category
async function filterChannels() {
    const category = document.getElementById('category-filter').value;
    
    try {
        let url = '/api/channels';
        if (category) {
            url = `/api/channels/category/${category}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayChannels(data.channels);
        }
    } catch (error) {
        console.error('Error filtering channels:', error);
    }
}

// Select channel and show EPG section
function selectChannel(channelName) {
    document.getElementById('epg-channel').value = channelName;
    showSection('epg');
}

// Load EPG data
async function loadEPG() {
    const channel = document.getElementById('epg-channel').value;
    const year = document.getElementById('epg-year').value;
    
    if (!channel || !year) {
        alert('Please select both channel and year');
        return;
    }
    
    try {
        const response = await fetch(`/api/epg/${channel}/${year}`);
        const data = await response.json();
        
        if (data.success) {
            displayEPG(data.programs);
        } else {
            document.getElementById('epg-list').innerHTML = `<p class="error">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error loading EPG:', error);
        document.getElementById('epg-list').innerHTML = '<p class="error">Error loading EPG data</p>';
    }
}

// Display EPG programs
function displayEPG(programs) {
    const container = document.getElementById('epg-list');
    
    if (programs.length === 0) {
        container.innerHTML = '<p class="no-results">No programs found for this selection</p>';
        return;
    }
    
    container.innerHTML = '';
    
    programs.forEach(program => {
        const programCard = document.createElement('div');
        programCard.className = 'program-card';
        programCard.innerHTML = `
            <div class="program-time">
                <strong>${program.startTime.split(' ')[1]} - ${program.endTime.split(' ')[1]}</strong>
            </div>
            <div class="program-info">
                <h4>${program.title}</h4>
                <p class="program-description">${program.description}</p>
                <div class="program-meta">
                    <span class="badge type-badge">${program.type}</span>
                    <span class="badge rating-badge">${program.rating}</span>
                    <span class="badge duration-badge">${program.duration} min</span>
                </div>
            </div>
        `;
        container.appendChild(programCard);
    });
}

// Filter EPG by type
async function filterEPGByType() {
    const channel = document.getElementById('epg-channel').value;
    const year = document.getElementById('epg-year').value;
    const type = document.getElementById('program-type').value;
    
    if (!channel || !year) {
        alert('Please select both channel and year first');
        return;
    }
    
    try {
        let url = `/api/epg/${channel}/${year}`;
        if (type) {
            url = `/api/epg/${channel}/${year}/type/${type}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayEPG(data.programs);
        }
    } catch (error) {
        console.error('Error filtering EPG:', error);
    }
}

// Search programs
async function searchPrograms() {
    const channel = document.getElementById('search-channel').value;
    const year = document.getElementById('search-year').value;
    const query = document.getElementById('search-query').value;
    
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        const response = await fetch(`/api/epg/${channel}/${year}/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            displaySearchResults(data.programs, data.count);
        } else {
            document.getElementById('search-results').innerHTML = `<p class="error">${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error searching programs:', error);
        document.getElementById('search-results').innerHTML = '<p class="error">Error searching programs</p>';
    }
}

// Display search results
function displaySearchResults(programs, count) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    
    if (count === 0) {
        container.innerHTML = '<p class="no-results">No programs found matching your search</p>';
        return;
    }
    
    const resultHeader = document.createElement('p');
    resultHeader.className = 'result-count';
    resultHeader.textContent = `Found ${count} program(s)`;
    container.appendChild(resultHeader);
    
    programs.forEach(program => {
        const programCard = document.createElement('div');
        programCard.className = 'program-card';
        programCard.innerHTML = `
            <div class="program-time">
                <strong>${program.startTime}</strong>
            </div>
            <div class="program-info">
                <h4>${program.title}</h4>
                <p class="program-channel"><strong>Channel:</strong> ${program.channel}</p>
                <p class="program-description">${program.description}</p>
                <div class="program-meta">
                    <span class="badge type-badge">${program.type}</span>
                    <span class="badge year-badge">${program.year}</span>
                </div>
            </div>
        `;
        container.appendChild(programCard);
    });
}

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const selected = document.getElementById(sectionId);
    if (selected) {
        selected.classList.add('active');
    }
}
