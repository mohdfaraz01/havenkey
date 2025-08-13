// PropLink Delhi - Main Application JavaScript

// Sample data from the provided JSON
const sampleProperties = [
    {
        id: 1,
        title: "Spacious 2BHK Apartment in Gurgaon",
        price: "₹85,00,000",
        rentPrice: "₹25,000/month",
        location: "Sector 14, Gurgaon",
        area: "1,200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
        propertyType: "Apartment",
        furnishingStatus: "Semi-Furnished",
        possession: "Ready to Move",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        amenities: ["Parking", "Gym", "Security", "Power Backup"],
        description: "Beautiful 2BHK apartment with modern amenities in prime location of Gurgaon. Close to metro station and shopping centers.",
        ownerName: "Rajesh Kumar",
        ownerPhone: "+91 98765 43210",
        postedDate: "2025-08-10",
        verified: true
    },
    {
        id: 2,
        title: "Luxurious 3BHK Villa in Noida",
        price: "₹1,25,00,000",
        location: "Sector 62, Noida",
        area: "1,800 sq ft",
        bedrooms: 3,
        bathrooms: 3,
        propertyType: "Villa",
        furnishingStatus: "Fully-Furnished",
        possession: "Ready to Move",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        amenities: ["Parking", "Garden", "Security", "Swimming Pool", "Clubhouse"],
        description: "Premium 3BHK independent villa with private garden and modern amenities. Perfect for families.",
        ownerName: "Priya Sharma",
        ownerPhone: "+91 87654 32109",
        postedDate: "2025-08-09",
        verified: true
    },
    {
        id: 3,
        title: "Boys PG Near Metro Station",
        price: "₹12,000/month",
        location: "Lajpat Nagar, Delhi",
        area: "Single Room",
        propertyType: "PG",
        furnishingStatus: "Fully-Furnished",
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop",
        amenities: ["Wi-Fi", "Food", "Laundry", "AC", "Security"],
        description: "Comfortable PG for working professionals and students. All meals included with modern facilities.",
        ownerName: "Amit Singh",
        ownerPhone: "+91 76543 21098",
        postedDate: "2025-08-08",
        verified: true,
        pgType: "Boys",
        roomType: "Single",
        food: "Veg & Non-Veg"
    },
    {
        id: 4,
        title: "Commercial Space in Connaught Place",
        price: "₹2,50,00,000",
        rentPrice: "₹75,000/month",
        location: "Connaught Place, Delhi",
        area: "2,500 sq ft",
        propertyType: "Commercial",
        furnishingStatus: "Unfurnished",
        possession: "Ready to Move",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        amenities: ["Parking", "Elevator", "Security", "Power Backup"],
        description: "Prime commercial space in the heart of Delhi. Perfect for offices, showrooms, or retail business.",
        ownerName: "Sunil Gupta",
        ownerPhone: "+91 65432 10987",
        postedDate: "2025-08-07",
        verified: true
    },
    {
        id: 5,
        title: "Affordable 1BHK in Faridabad",
        price: "₹35,00,000",
        rentPrice: "₹15,000/month",
        location: "Sector 21, Faridabad",
        area: "600 sq ft",
        bedrooms: 1,
        bathrooms: 1,
        propertyType: "Apartment",
        furnishingStatus: "Semi-Furnished",
        possession: "Ready to Move",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        amenities: ["Parking", "Security", "Lift"],
        description: "Budget-friendly 1BHK apartment perfect for first-time buyers or young professionals.",
        ownerName: "Meera Jain",
        ownerPhone: "+91 54321 09876",
        postedDate: "2025-08-06",
        verified: true
    },
    {
        id: 6,
        title: "Girls Hostel in Greater Noida",
        price: "₹8,000/month",
        location: "Greater Noida West",
        area: "Sharing Room",
        propertyType: "PG",
        furnishingStatus: "Fully-Furnished",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
        amenities: ["Wi-Fi", "Food", "Laundry", "Security", "Study Room"],
        description: "Safe and comfortable hostel for girls with all modern amenities and nutritious meals.",
        ownerName: "Sunita Devi",
        ownerPhone: "+91 43210 98765",
        postedDate: "2025-08-05",
        verified: true,
        pgType: "Girls",
        roomType: "Double Sharing",
        food: "Pure Veg"
    }
];

const locations = [
    "Delhi Central", "Delhi East", "Delhi North", "Delhi South", "Delhi West",
    "Gurgaon Sector 14", "Gurgaon Sector 29", "Gurgaon DLF Phase 1", "Gurgaon DLF Phase 2",
    "Noida Sector 18", "Noida Sector 62", "Noida Sector 76", "Greater Noida West",
    "Faridabad Sector 21", "Faridabad NIT", "Ghaziabad Crossing Republik"
];

const amenities = [
    "Parking", "Gym", "Swimming Pool", "Security", "Power Backup", 
    "Lift", "Garden", "Clubhouse", "Wi-Fi", "Food", "Laundry", 
    "AC", "Study Room", "CCTV", "Intercom", "Playground"
];

const propertyTypes = ["Apartment", "Villa", "Plot", "Commercial", "PG"];

// Application state
let currentPage = 'home';
let filteredProperties = [...sampleProperties];
let savedProperties = [];
let currentProperty = null;
let currentStep = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing PropLink Delhi App...');
    initializeApp();
});

function initializeApp() {
    try {
        setupNavigation();
        setupSearch();
        setupFilters();
        setupPostPropertyForm();
        setupProfile();
        loadFeaturedProperties();
        populateDropdowns();
        loadSavedProperties();
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Navigation functionality
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Navigation menu toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }

    // Page navigation - Main nav links
    const navLinks = document.querySelectorAll('.nav__link[data-page]');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            console.log('Navigating to:', targetPage);
            navigateToPage(targetPage);
        });
    });

    // Footer navigation
    const footerLinks = document.querySelectorAll('a[data-page]');
    console.log('Found footer links:', footerLinks.length);
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            console.log('Footer navigation to:', targetPage);
            navigateToPage(targetPage);
        });
    });

    // Hero action buttons
    const heroActionButtons = document.querySelectorAll('.hero__actions button[data-page]');
    console.log('Found hero action buttons:', heroActionButtons.length);
    
    heroActionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = button.getAttribute('data-page');
            console.log('Hero button clicked:', targetPage);
            navigateToPage(targetPage);
        });
    });
}

function navigateToPage(pageName) {
    console.log('Navigating to page:', pageName);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPageId = pageName + 'Page';
    const targetPage = document.getElementById(targetPageId);
    
    console.log('Looking for page with ID:', targetPageId);
    console.log('Target page found:', !!targetPage);
    
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.nav__link[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        // Load page-specific content
        switch(pageName) {
            case 'buy':
                loadPropertiesPage('Buy Properties', 'sale');
                break;
            case 'rent':
                loadPropertiesPage('Rent Properties', 'rent');
                break;
            case 'pg':
                loadPropertiesPage('PG & Hostels', 'pg');
                break;
            case 'saved':
                loadSavedPropertiesPage();
                break;
            case 'profile':
                loadMyProperties();
                break;
        }
        
        console.log('Successfully navigated to:', pageName);
    } else {
        console.error('Page not found:', targetPageId);
    }
}

// Search functionality
function setupSearch() {
    console.log('Setting up search...');
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const heroSearchBtn = document.getElementById('heroSearchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Search button clicked');
            performSearch();
        });
    }

    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hero search button clicked');
            performHeroSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    console.log('Performing search for:', searchTerm);
    
    if (searchTerm.trim()) {
        filteredProperties = sampleProperties.filter(property => 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.description.toLowerCase().includes(searchTerm)
        );
        console.log('Search results:', filteredProperties.length);
        loadPropertiesPage('Search Results', 'search');
    }
}

function performHeroSearch() {
    const locationFilter = document.getElementById('locationFilter');
    const propertyTypeFilter = document.getElementById('propertyTypeFilter');
    
    const locationValue = locationFilter ? locationFilter.value : '';
    const propertyTypeValue = propertyTypeFilter ? propertyTypeFilter.value : '';
    
    console.log('Hero search - Location:', locationValue, 'Type:', propertyTypeValue);
    
    filteredProperties = sampleProperties.filter(property => {
        let matches = true;
        if (locationValue && !property.location.includes(locationValue)) {
            matches = false;
        }
        if (propertyTypeValue && property.propertyType !== propertyTypeValue) {
            matches = false;
        }
        return matches;
    });
    
    console.log('Hero search results:', filteredProperties.length);
    loadPropertiesPage('Search Results', 'search');
}

// Properties listing functionality
function loadPropertiesPage(title, type) {
    console.log('Loading properties page:', title, type);
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    
    if (type === 'pg') {
        filteredProperties = sampleProperties.filter(p => p.propertyType === 'PG');
    } else if (type !== 'search') {
        filteredProperties = [...sampleProperties];
    }
    
    displayProperties(filteredProperties, 'propertiesList');
    updateResultsCount();
    navigateToPage('properties');
}

function displayProperties(properties, containerId) {
    const container = document.getElementById(containerId);
    console.log('Displaying properties in container:', containerId, 'Properties count:', properties.length);
    
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    if (properties.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = properties.map(property => createPropertyCard(property)).join('');
    
    // Add event listeners to property cards
    const propertyCards = container.querySelectorAll('.property-card');
    console.log('Adding listeners to', propertyCards.length, 'property cards');
    
    propertyCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.property-card__favorite') || e.target.closest('.property-card__contact')) {
                return;
            }
            
            const propertyId = parseInt(card.dataset.id);
            console.log('Property card clicked, ID:', propertyId);
            showPropertyDetails(propertyId);
        });
    });

    // Add event listeners to favorite buttons
    container.querySelectorAll('.property-card__favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = parseInt(btn.closest('.property-card').dataset.id);
            console.log('Favorite clicked for property:', propertyId);
            toggleFavorite(propertyId);
        });
    });

    // Add event listeners to contact buttons
    container.querySelectorAll('.property-card__contact').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = parseInt(btn.closest('.property-card').dataset.id);
            const property = sampleProperties.find(p => p.id === propertyId);
            console.log('Contact clicked for property:', propertyId);
            contactOwner(property);
        });
    });
}

function createPropertyCard(property) {
    const isSaved = savedProperties.includes(property.id);
    const isPG = property.propertyType === 'PG';
    
    return `
        <div class="property-card" data-id="${property.id}">
            <img src="${property.image}" alt="${property.title}" class="property-card__image">
            <div class="property-card__content">
                <div class="property-card__header">
                    <div class="property-card__price">${property.price}</div>
                    <button class="property-card__favorite ${isSaved ? 'active' : ''}" title="Save to favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <h3 class="property-card__title">${property.title}</h3>
                <div class="property-card__location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                ${isPG ? `
                    <div class="pg-specific">
                        <span class="pg-type">
                            <i class="fas fa-user"></i>
                            ${property.pgType || 'Co-ed'}
                        </span>
                        <span class="pg-type">
                            <i class="fas fa-bed"></i>
                            ${property.roomType || 'Single'}
                        </span>
                        <span class="pg-type">
                            <i class="fas fa-utensils"></i>
                            ${property.food || 'Food Available'}
                        </span>
                    </div>
                ` : `
                    <div class="property-card__details">
                        <div class="property-card__detail">
                            <i class="fas fa-home"></i>
                            ${property.area}
                        </div>
                        ${property.bedrooms ? `
                            <div class="property-card__detail">
                                <i class="fas fa-bed"></i>
                                ${property.bedrooms} Beds
                            </div>
                        ` : ''}
                        ${property.bathrooms ? `
                            <div class="property-card__detail">
                                <i class="fas fa-bath"></i>
                                ${property.bathrooms} Baths
                            </div>
                        ` : ''}
                    </div>
                `}
                <div class="property-card__footer">
                    ${property.verified ? `
                        <div class="property-card__verified">
                            <i class="fas fa-check-circle"></i>
                            Verified
                        </div>
                    ` : ''}
                    <button class="btn btn--primary btn--sm property-card__contact">Contact Owner</button>
                </div>
            </div>
        </div>
    `;
}

function toggleFavorite(propertyId) {
    console.log('Toggling favorite for property:', propertyId);
    
    const index = savedProperties.indexOf(propertyId);
    if (index > -1) {
        savedProperties.splice(index, 1);
        console.log('Removed from favorites');
    } else {
        savedProperties.push(propertyId);
        console.log('Added to favorites');
    }
    
    // Update favorite button state
    const favoriteBtn = document.querySelector(`[data-id="${propertyId}"] .property-card__favorite`);
    if (favoriteBtn) {
        favoriteBtn.classList.toggle('active');
    }
    
    // Save to localStorage simulation (removed since localStorage not available)
    console.log('Current saved properties:', savedProperties);
}

// Property details functionality
function showPropertyDetails(propertyId) {
    console.log('Showing details for property ID:', propertyId);
    
    currentProperty = sampleProperties.find(p => p.id === propertyId);
    if (currentProperty) {
        displayPropertyDetails();
        navigateToPage('propertyDetails');
    } else {
        console.error('Property not found:', propertyId);
    }
}

function displayPropertyDetails() {
    const container = document.getElementById('propertyDetailsContent');
    if (!container) {
        console.error('Property details container not found');
        return;
    }
    
    const property = currentProperty;
    const isSaved = savedProperties.includes(property.id);
    const isPG = property.propertyType === 'PG';
    
    console.log('Displaying details for:', property.title);
    
    container.innerHTML = `
        <div class="property-gallery">
            <img src="${property.image}" alt="${property.title}">
        </div>
        
        <div class="property-info">
            <div class="property-main">
                <div class="property-price">${property.price}</div>
                <h1 class="property-title">${property.title}</h1>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                
                ${!isPG ? `
                    <div class="property-specs">
                        <div class="spec-item">
                            <div class="spec-value">${property.area}</div>
                            <div class="spec-label">Area</div>
                        </div>
                        ${property.bedrooms ? `
                            <div class="spec-item">
                                <div class="spec-value">${property.bedrooms}</div>
                                <div class="spec-label">Bedrooms</div>
                            </div>
                        ` : ''}
                        ${property.bathrooms ? `
                            <div class="spec-item">
                                <div class="spec-value">${property.bathrooms}</div>
                                <div class="spec-label">Bathrooms</div>
                            </div>
                        ` : ''}
                        <div class="spec-item">
                            <div class="spec-value">${property.furnishingStatus.split('-')[0]}</div>
                            <div class="spec-label">Furnishing</div>
                        </div>
                    </div>
                ` : `
                    <div class="property-specs">
                        <div class="spec-item">
                            <div class="spec-value">${property.pgType || 'Co-ed'}</div>
                            <div class="spec-label">PG Type</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-value">${property.roomType || 'Single'}</div>
                            <div class="spec-label">Room Type</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-value">${property.food || 'Available'}</div>
                            <div class="spec-label">Food</div>
                        </div>
                    </div>
                `}
                
                <div>
                    <h3>Description</h3>
                    <p>${property.description}</p>
                </div>
                
                <div>
                    <h3>Amenities</h3>
                    <div class="amenities-grid">
                        ${property.amenities.map(amenity => `
                            <div class="amenity-tag">
                                <i class="fas fa-check"></i>
                                ${amenity}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="property-sidebar">
                <div class="contact-section">
                    <h3>Contact Information</h3>
                    <div class="contact-info">
                        <div class="contact-detail">
                            <i class="fas fa-user"></i>
                            <span>${property.ownerName}</span>
                        </div>
                        <div class="contact-detail">
                            <i class="fas fa-phone"></i>
                            <span>${property.ownerPhone}</span>
                        </div>
                    </div>
                    
                    <div class="contact-actions">
                        <button class="btn btn--primary btn--full-width" onclick="contactOwner(currentProperty)">
                            <i class="fas fa-phone"></i> Call Now
                        </button>
                        <button class="btn btn--outline btn--full-width" onclick="scheduleVisit()">
                            <i class="fas fa-calendar"></i> Schedule Visit
                        </button>
                        <button class="btn btn--outline btn--full-width" onclick="toggleFavorite(${property.id})">
                            <i class="fas fa-heart ${isSaved ? 'active' : ''}"></i> 
                            ${isSaved ? 'Remove from Favorites' : 'Save to Favorites'}
                        </button>
                    </div>
                </div>
                
                <div style="margin-top: var(--space-20); padding-top: var(--space-20); border-top: 1px solid var(--color-card-border-inner);">
                    <div style="background: var(--color-bg-2); padding: var(--space-16); border-radius: var(--radius-base); text-align: center;">
                        <i class="fas fa-map-marker-alt" style="font-size: var(--font-size-2xl); color: var(--color-primary); margin-bottom: var(--space-8);"></i>
                        <p style="margin: 0; color: var(--color-text); font-weight: var(--font-weight-medium);">Property Location</p>
                        <p style="margin: var(--space-4) 0 0 0; color: var(--color-text-secondary); font-size: var(--font-size-sm);">${property.location}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function contactOwner(property) {
    if (property) {
        console.log('Contacting owner:', property.ownerName);
        alert(`Calling ${property.ownerName} at ${property.ownerPhone}`);
    }
}

function scheduleVisit() {
    if (currentProperty) {
        console.log('Scheduling visit for:', currentProperty.title);
        alert(`Visit scheduled for ${currentProperty.title}. You will receive a confirmation call soon.`);
    }
}

// Post Property Form and other utility functions
function setupFilters() {
    // Basic filter setup - can be expanded
    console.log('Setting up filters...');
    populateAmenitiesFilter();
}

function setupPostPropertyForm() {
    console.log('Setting up post property form...');
    // Basic form setup - can be expanded
}

function setupProfile() {
    console.log('Setting up profile...');
    // Basic profile setup - can be expanded
}

function populateDropdowns() {
    console.log('Populating dropdowns...');
    
    // Populate hero section dropdowns
    const locationFilter = document.getElementById('locationFilter');
    const propertyTypeFilter = document.getElementById('propertyTypeFilter');
    
    if (locationFilter) {
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }
    
    if (propertyTypeFilter) {
        propertyTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            propertyTypeFilter.appendChild(option);
        });
    }
    
    console.log('Dropdowns populated');
}

function populateAmenitiesFilter() {
    // Placeholder for amenities filter population
    console.log('Amenities filter setup');
}

function loadFeaturedProperties() {
    console.log('Loading featured properties...');
    const featuredProperties = sampleProperties.slice(0, 3);
    displayProperties(featuredProperties, 'featuredProperties');
}

function loadSavedPropertiesPage() {
    console.log('Loading saved properties page...');
    const saved = sampleProperties.filter(p => savedProperties.includes(p.id));
    displayProperties(saved, 'savedProperties');
}

function loadMyProperties() {
    console.log('Loading my properties...');
    // Simulate user's posted properties (showing first 2 as examples)
    const myProps = sampleProperties.slice(0, 2);
    displayProperties(myProps, 'myProperties');
}

function loadSavedProperties() {
    console.log('Loading saved properties from storage...');
    // Initialize empty saved properties array since localStorage not available
    savedProperties = [];
}

function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = `${filteredProperties.length} properties found`;
    }
}
