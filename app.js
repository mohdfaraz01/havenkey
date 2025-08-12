// HavenKey PWA - Complete JavaScript Implementation
// Version 3.0 - All Features Working

// Configuration
const APP_CONFIG = {
    name: 'HavenKey',
    version: '3.0.0',
    minBudget: 20000,
    maxBudget: 100000000,
    maxImages: 10,
    maxImageSize: 10 * 1024 * 1024, // 10MB
    toastDuration: 3000
};

// Sample Properties Database
const sampleProperties = [
    {
        id: 1,
        title: "Spacious 2BHK Apartment in Gurgaon",
        price: 8500000,
        rentPrice: 25000,
        priceDisplay: "₹85,00,000",
        location: "Sector 14, Gurgaon",
        latitude: 28.4667,
        longitude: 77.0333,
        areaSqft: 1200,
        bhk: 2,
        bathrooms: 2,
        facingDirection: "East",
        carParking: true,
        propertyType: "Apartment",
        furnishingStatus: "Semi-Furnished",
        projectStatus: "Ready to Move",
        pricePerSqft: 7083,
        listedBy: "Owner",
        propertyAge: 2,
        floor: "3rd Floor",
        totalFloors: 12,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop"
        ],
        amenities: ["Parking", "Gym", "Security", "Power Backup", "Swimming Pool"],
        description: "Beautiful 2BHK apartment with modern amenities in prime location of Gurgaon.",
        ownerName: "Rajesh Kumar",
        ownerEmail: "owner1@example.com",
        datePublished: "2025-08-10",
        verified: true,
        views: 156,
        inquiries: 12,
        available: true
    },
    {
        id: 2,
        title: "Affordable 1BHK in Faridabad",
        price: 3500000,
        rentPrice: 15000,
        priceDisplay: "₹35,00,000",
        location: "Sector 21, Faridabad",
        latitude: 28.3778,
        longitude: 77.3130,
        areaSqft: 600,
        bhk: 1,
        bathrooms: 1,
        facingDirection: "South-East",
        carParking: false,
        propertyType: "Apartment",
        furnishingStatus: "Semi-Furnished",
        projectStatus: "Ready to Move",
        pricePerSqft: 5833,
        listedBy: "Owner",
        propertyAge: 5,
        floor: "4th Floor",
        totalFloors: 6,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
        ],
        amenities: ["Security", "Lift", "Power Backup"],
        description: "Budget-friendly 1BHK apartment perfect for first-time buyers.",
        ownerName: "Meera Jain",
        ownerEmail: "owner2@example.com",
        datePublished: "2025-08-06",
        verified: true,
        views: 76,
        inquiries: 4,
        available: true
    },
    {
        id: 3,
        title: "Boys PG Near Metro Station",
        rentPrice: 12000,
        priceDisplay: "₹12,000/month",
        location: "Lajpat Nagar, Delhi",
        latitude: 28.5626,
        longitude: 77.2431,
        areaSqft: 150,
        bhk: 1,
        bathrooms: 1,
        facingDirection: "North",
        carParking: false,
        propertyType: "PG",
        roomType: "Single",
        pgGender: "Boys",
        furnishingStatus: "Fully-Furnished",
        projectStatus: "Ready to Move",
        pricePerSqft: 80,
        listedBy: "Owner",
        floor: "2nd Floor",
        images: [
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop"
        ],
        amenities: ["Wi-Fi", "Food", "Laundry", "AC", "Security"],
        description: "Comfortable PG for working professionals and students.",
        ownerName: "Amit Singh",
        ownerEmail: "owner3@example.com",
        datePublished: "2025-08-08",
        verified: true,
        views: 89,
        inquiries: 6,
        available: true
    }
];

// Application State
let currentUser = null;
let currentPage = 'home';
let currentFilters = {};
let favourites = [];
let uploadedImages = [];
let currentStep = 1;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadUserData();
    setupEventListeners();
    loadFeaturedProperties();
    updateUI();
    initializeBudgetSliders();
    setupPWA();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Near Me
    document.getElementById('nearMeBtn').addEventListener('click', handleNearMe);

    // Auth buttons
    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Modal switches
    document.getElementById('switchToSignup').addEventListener('click', () => {
        closeModal('loginModal');
        openModal('signupModal');
    });
    document.getElementById('switchToLogin').addEventListener('click', () => {
        closeModal('signupModal');
        openModal('loginModal');
    });

    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('postPropertyForm').addEventListener('submit', handlePropertySubmit);

    // Wizard navigation
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);

    // Image upload
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
    document.getElementById('uploadZone').addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });

    // Drag and drop
    const uploadZone = document.getElementById('uploadZone');
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('drop', handleDrop);

    // Modal close buttons
    document.querySelectorAll('.modal__close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Terms links
    document.getElementById('termsLink').addEventListener('click', () => openModal('termsModal'));
    document.getElementById('termsFooter').addEventListener('click', () => openModal('termsModal'));

    // Mobile menu toggle
    document.getElementById('navToggle').addEventListener('click', function() {
        document.getElementById('navMenu').classList.toggle('active');
    });

    // Filters
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.getElementById('sortBy').addEventListener('change', handleSort);

    // Filter inputs
    document.querySelectorAll('.filters input, .filters select').forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    if (page) {
        navigateToPage(page);
    }
}

function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
        
        // Update active nav link
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

        // Load page content
        switch(page) {
            case 'buy':
            case 'rent':
                loadSearchResults(page);
                break;
            case 'favourites':
                loadFavourites();
                break;
            case 'profile':
                loadProfile();
                break;
        }
    }
}

// Search functionality
function handleSearch() {
    const query = document.getElementById('searchInput').value;
    currentFilters.query = query;
    loadSearchResults('buy');
    navigateToPage('buy');
}

function handleNearMe() {
    if (navigator.geolocation) {
        showToast('Getting your location...', 'info');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                searchNearbyProperties(lat, lng);
            },
            function(error) {
                showToast('Unable to get your location. Please search manually.', 'error');
                navigateToPage('buy');
            }
        );
    } else {
        showToast('Geolocation is not supported by this browser.', 'error');
        navigateToPage('buy');
    }
}

function searchNearbyProperties(lat, lng) {
    // Filter properties within 5km radius
    const nearbyProperties = sampleProperties.filter(property => {
        const distance = calculateDistance(lat, lng, property.latitude, property.longitude);
        return distance <= 5;
    });

    displayProperties(nearbyProperties, 'searchResults');
    document.getElementById('resultCount').textContent = `${nearbyProperties.length} properties found near you`;
    navigateToPage('buy');
    showToast(`Found ${nearbyProperties.length} properties near you!`, 'success');
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (in real app, this would be server-side)
    const users = JSON.parse(localStorage.getItem('havenkey_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('havenkey_current_user', JSON.stringify(user));
        closeModal('loginModal');
        updateUI();
        showToast('Welcome back!', 'success');
    } else {
        showToast('Invalid email or password', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('havenkey_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showToast('Email already exists', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        joinDate: new Date().toISOString(),
        verified: true
    };

    users.push(newUser);
    localStorage.setItem('havenkey_users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('havenkey_current_user', JSON.stringify(newUser));
    
    closeModal('signupModal');
    updateUI();
    showToast('Account created successfully!', 'success');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('havenkey_current_user');
    updateUI();
    navigateToPage('home');
    showToast('Logged out successfully', 'success');
}

// Property Management
function loadFeaturedProperties() {
    displayProperties(sampleProperties.slice(0, 6), 'featuredProperties');
}

function loadSearchResults(type) {
    let properties = [...sampleProperties];
    
    // Apply filters
    if (type === 'rent') {
        properties = properties.filter(p => p.rentPrice);
    }

    properties = applyCurrentFilters(properties);
    
    displayProperties(properties, 'searchResults');
    document.getElementById('resultCount').textContent = `${properties.length} properties found`;
}

function applyCurrentFilters(properties) {
    let filtered = [...properties];

    // Budget filter
    const minBudget = parseInt(document.getElementById('minBudget')?.value || APP_CONFIG.minBudget);
    const maxBudget = parseInt(document.getElementById('maxBudget')?.value || APP_CONFIG.maxBudget);
    
    filtered = filtered.filter(p => {
        const price = p.price || p.rentPrice || 0;
        return price >= minBudget && price <= maxBudget;
    });

    // Property type filter
    const propertyType = document.getElementById('propertyType')?.value;
    if (propertyType) {
        filtered = filtered.filter(p => p.propertyType === propertyType);
    }

    // BHK filter
    const bhkCheckboxes = document.querySelectorAll('input[name="bhk"]:checked');
    const selectedBHKs = Array.from(bhkCheckboxes).map(cb => parseInt(cb.value));
    if (selectedBHKs.length > 0) {
        filtered = filtered.filter(p => selectedBHKs.includes(p.bhk));
    }

    // Furnishing filter
    const furnishing = document.getElementById('furnishing')?.value;
    if (furnishing) {
        filtered = filtered.filter(p => p.furnishingStatus === furnishing);
    }

    return filtered;
}

function displayProperties(properties, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = properties.map(property => `
        <div class="property-card" onclick="viewPropertyDetails(${property.id})">
            <div class="property-card__image">
                <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                <button class="property-card__favorite ${favourites.includes(property.id) ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleFavourite(${property.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="property-card__content">
                <div class="property-card__price">${property.priceDisplay}</div>
                <h3 class="property-card__title">${property.title}</h3>
                <div class="property-card__location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                <div class="property-card__details">
                    ${property.bhk ? `<span>${property.bhk} BHK</span>` : ''}
                    <span>${property.areaSqft} sq ft</span>
                    ${property.bathrooms ? `<span>${property.bathrooms} Bathrooms</span>` : ''}
                </div>
                <div class="property-card__actions">
                    <button class="btn btn--primary btn--sm" onclick="event.stopPropagation(); contactOwner(${property.id})">
                        Contact Owner
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="event.stopPropagation(); shareProperty(${property.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function viewPropertyDetails(propertyId) {
    const property = sampleProperties.find(p => p.id === propertyId);
    if (!property) return;

    // Increment view count
    property.views = (property.views || 0) + 1;

    const detailsContainer = document.getElementById('propertyDetails');
    detailsContainer.innerHTML = `
        <div class="property-details">
            <div class="property-details__gallery">
                <div class="main-image">
                    <img src="${property.images[0]}" alt="${property.title}">
                </div>
                <div class="image-thumbnails">
                    ${property.images.map((img, index) => `
                        <img src="${img}" alt="Property image ${index + 1}" 
                             onclick="changeMainImage('${img}')">
                    `).join('')}
                </div>
            </div>
            
            <div class="property-details__content">
                <div class="property-details__header">
                    <h1>${property.title}</h1>
                    <div class="price">${property.priceDisplay}</div>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                </div>

                <div class="property-details__info">
                    <div class="info-grid">
                        ${property.bhk ? `<div class="info-item">
                            <label>BHK:</label>
                            <span>${property.bhk}</span>
                        </div>` : ''}
                        <div class="info-item">
                            <label>Area:</label>
                            <span>${property.areaSqft} sq ft</span>
                        </div>
                        ${property.bathrooms ? `<div class="info-item">
                            <label>Bathrooms:</label>
                            <span>${property.bathrooms}</span>
                        </div>` : ''}
                        <div class="info-item">
                            <label>Facing:</label>
                            <span>${property.facingDirection}</span>
                        </div>
                        <div class="info-item">
                            <label>Furnishing:</label>
                            <span>${property.furnishingStatus}</span>
                        </div>
                        <div class="info-item">
                            <label>Listed by:</label>
                            <span>${property.listedBy}</span>
                        </div>
                    </div>
                </div>

                <div class="property-details__description">
                    <h3>Description</h3>
                    <p>${property.description}</p>
                </div>

                <div class="property-details__amenities">
                    <h3>Amenities</h3>
                    <div class="amenities-list">
                        ${property.amenities.map(amenity => `
                            <span class="amenity-tag">${amenity}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="property-details__actions">
                    <button class="btn btn--primary btn--lg" onclick="contactOwner(${property.id})">
                        <i class="fas fa-phone"></i>
                        Contact Owner
                    </button>
                    <button class="btn btn--outline btn--lg" onclick="toggleFavourite(${property.id})">
                        <i class="fas fa-heart ${favourites.includes(property.id) ? 'active' : ''}"></i>
                        ${favourites.includes(property.id) ? 'Saved' : 'Save'}
                    </button>
                    <button class="btn btn--outline btn--lg" onclick="shareProperty(${property.id})">
                        <i class="fas fa-share"></i>
                        Share
                    </button>
                </div>
            </div>
        </div>
    `;

    navigateToPage('propertyDetails');
}

// Image Upload
function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function processFiles(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            if (file.size > APP_CONFIG.maxImageSize) {
                showToast('Image too large. Maximum size is 10MB.', 'error');
                return;
            }

            if (uploadedImages.length >= APP_CONFIG.maxImages) {
                showToast('Maximum 10 images allowed.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name
                };
                uploadedImages.push(imageData);
                displayImagePreviews();
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayImagePreviews() {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = uploadedImages.map(img => `
        <div class="image-preview-item">
            <img src="${img.src}" alt="${img.name}">
            <button type="button" onclick="removeImage('${img.id}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeImage(imageId) {
    uploadedImages = uploadedImages.filter(img => img.id !== imageId);
    displayImagePreviews();
}

// Property Posting Wizard
function nextStep() {
    if (currentStep < 4) {
        if (validateCurrentStep()) {
            currentStep++;
            updateWizardStep();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizardStep();
    }
}

function updateWizardStep() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });

    // Show/hide wizard steps
    document.querySelectorAll('.wizard-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });

    // Update buttons
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = currentStep === 4 ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = currentStep === 4 ? 'block' : 'none';
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            showToast('Please fill in all required fields', 'error');
            input.focus();
            return false;
        }
    }

    return true;
}

function handlePropertySubmit(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to post a property', 'error');
        openModal('loginModal');
        return;
    }

    const formData = new FormData(e.target);
    const property = {
        id: Date.now(),
        title: formData.get('title'),
        price: parseInt(formData.get('price')) || null,
        rentPrice: parseInt(formData.get('rentPrice')) || null,
        location: formData.get('location'),
        areaSqft: parseInt(formData.get('areaSqft')),
        bhk: parseInt(formData.get('bhk')),
        bathrooms: parseInt(formData.get('bathrooms')),
        facingDirection: formData.get('facingDirection'),
        propertyType: formData.get('propertyType'),
        furnishingStatus: formData.get('furnishingStatus'),
        description: formData.get('description'),
        ownerName: formData.get('ownerName'),
        ownerEmail: formData.get('ownerEmail'),
        ownerPhone: formData.get('ownerPhone'),
        images: uploadedImages.map(img => img.src),
        datePublished: new Date().toISOString().split('T')[0],
        verified: false,
        views: 0,
        inquiries: 0,
        available: true,
        userId: currentUser.id
    };

    // Add price display
    if (property.price) {
        property.priceDisplay = formatPrice(property.price);
    } else if (property.rentPrice) {
        property.priceDisplay = formatPrice(property.rentPrice) + '/month';
    }

    // Save to local storage (in real app, this would go to server)
    const userProperties = JSON.parse(localStorage.getItem('havenkey_user_properties') || '[]');
    userProperties.push(property);
    localStorage.setItem('havenkey_user_properties', JSON.stringify(userProperties));

    // Add to sample properties for immediate display
    sampleProperties.unshift(property);

    showToast('Property posted successfully!', 'success');
    resetPropertyForm();
    navigateToPage('profile');
}

function resetPropertyForm() {
    document.getElementById('postPropertyForm').reset();
    uploadedImages = [];
    displayImagePreviews();
    currentStep = 1;
    updateWizardStep();
}

// Favourites
function toggleFavourite(propertyId) {
    if (!currentUser) {
        showToast('Please login to save properties', 'error');
        openModal('loginModal');
        return;
    }

    const index = favourites.indexOf(propertyId);
    if (index > -1) {
        favourites.splice(index, 1);
        showToast('Property removed from favourites', 'success');
    } else {
        favourites.push(propertyId);
        showToast('Property added to favourites', 'success');
    }

    localStorage.setItem('havenkey_favourites', JSON.stringify(favourites));
    
    // Update heart icons
    document.querySelectorAll(`.property-card__favorite`).forEach(btn => {
        const propertyCard = btn.closest('.property-card');
        if (propertyCard) {
            btn.classList.toggle('active', favourites.includes(propertyId));
        }
    });
}

function loadFavourites() {
    const favouriteProperties = sampleProperties.filter(p => favourites.includes(p.id));
    displayProperties(favouriteProperties, 'favouritesList');
    
    if (favouriteProperties.length === 0) {
        document.getElementById('favouritesList').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>No favourite properties yet</h3>
                <p>Start browsing and save properties you like!</p>
                <button class="btn btn--primary" onclick="navigateToPage('buy')">Browse Properties</button>
            </div>
        `;
    }
}

// Utility Functions
function formatPrice(price) {
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)}L`;
    } else {
        return `₹${price.toLocaleString()}`;
    }
}

function initializeBudgetSliders() {
    const minSlider = document.getElementById('minBudget');
    const maxSlider = document.getElementById('maxBudget');
    const minValue = document.getElementById('minBudgetValue');
    const maxValue = document.getElementById('maxBudgetValue');

    if (minSlider && maxSlider) {
        minSlider.addEventListener('input', function() {
            const min = parseInt(this.value);
            const max = parseInt(maxSlider.value);
            
            if (min >= max) {
                this.value = max - 100000;
            }
            
            minValue.textContent = formatPrice(parseInt(this.value));
        });

        maxSlider.addEventListener('input', function() {
            const min = parseInt(minSlider.value);
            const max = parseInt(this.value);
            
            if (max <= min) {
                this.value = min + 100000;
            }
            
            maxValue.textContent = formatPrice(parseInt(this.value));
        });

        // Initialize values
        minValue.textContent = formatPrice(APP_CONFIG.minBudget);
        maxValue.textContent = formatPrice(APP_CONFIG.maxBudget);
    }
}

function clearFilters() {
    document.querySelectorAll('.filters input, .filters select').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else if (input.type === 'range') {
            if (input.id === 'minBudget') {
                input.value = APP_CONFIG.minBudget;
            } else if (input.id === 'maxBudget') {
                input.value = APP_CONFIG.maxBudget;
            }
        } else {
            input.value = '';
        }
    });

    initializeBudgetSliders();
    applyFilters();
}

function applyFilters() {
    if (currentPage === 'buy' || currentPage === 'rent') {
        loadSearchResults(currentPage);
    }
}

function handleSort() {
    const sortBy = document.getElementById('sortBy').value;
    let properties = applyCurrentFilters(sampleProperties);

    switch(sortBy) {
        case 'price-low':
            properties.sort((a, b) => (a.price || a.rentPrice || 0) - (b.price || b.rentPrice || 0));
            break;
        case 'price-high':
            properties.sort((a, b) => (b.price || b.rentPrice || 0) - (a.price || a.rentPrice || 0));
            break;
        case 'area':
            properties.sort((a, b) => b.areaSqft - a.areaSqft);
            break;
        default: // date
            properties.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
    }

    displayProperties(properties, 'searchResults');
}

function contactOwner(propertyId) {
    if (!currentUser) {
        showToast('Please login to contact property owners', 'error');
        openModal('loginModal');
        return;
    }

    showToast('Contact details will be available after verification', 'info');
}

function shareProperty(propertyId) {
    if (navigator.share) {
        const property = sampleProperties.find(p => p.id === propertyId);
        navigator.share({
            title: property.title,
            text: `Check out this property: ${property.title} for ${property.priceDisplay}`,
            url: window.location.href
        });
    } else {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        showToast('Property link copied to clipboard', 'success');
    }
}

function changeMainImage(imageSrc) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast__content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, APP_CONFIG.toastDuration);
}

// PWA Functions
function setupPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    // Handle install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        const installBtn = document.createElement('button');
        installBtn.className = 'btn btn--primary';
        installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
        installBtn.onclick = () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    showToast('App installed successfully!', 'success');
                }
                deferredPrompt = null;
                installBtn.remove();
            });
        };
        
        document.querySelector('.hero__actions').appendChild(installBtn);
    });
}

// Data Management
function loadUserData() {
    // Load current user
    const userData = localStorage.getItem('havenkey_current_user');
    if (userData) {
        currentUser = JSON.parse(userData);
    }

    // Load favourites
    const favouritesData = localStorage.getItem('havenkey_favourites');
    if (favouritesData) {
        favourites = JSON.parse(favouritesData);
    }
}

function updateUI() {
    const authLinks = document.getElementById('authLinks');
    const userLinks = document.getElementById('userLinks');

    if (currentUser) {
        authLinks.classList.add('hidden');
        userLinks.classList.remove('hidden');
        
        // Update user name in profile
        const userName = userLinks.querySelector('.nav__link[data-page="profile"]');
        if (userName) {
            userName.textContent = currentUser.name.split(' ')[0];
        }
    } else {
        authLinks.classList.remove('hidden');
        userLinks.classList.add('hidden');
    }
}

function loadProfile() {
    if (!currentUser) {
        navigateToPage('home');
        return;
    }

    const userProperties = JSON.parse(localStorage.getItem('havenkey_user_properties') || '[]')
        .filter(p => p.userId === currentUser.id);

    document.getElementById('profileContent').innerHTML = `
        <div class="profile-info">
            <h3>Welcome, ${currentUser.name}!</h3>
            <p>Member since: ${new Date(currentUser.joinDate).toLocaleDateString()}</p>
        </div>
        
        <div class="profile-stats">
            <div class="stat">
                <span class="stat__number">${userProperties.length}</span>
                <span class="stat__label">Properties Posted</span>
            </div>
            <div class="stat">
                <span class="stat__number">${favourites.length}</span>
                <span class="stat__label">Saved Properties</span>
            </div>
        </div>

        <div class="profile-properties">
            <h3>Your Properties</h3>
            ${userProperties.length > 0 ? 
                `<div class="properties-grid">${userProperties.map(property => `
                    <div class="property-card">
                        <div class="property-card__image">
                            <img src="${property.images[0] || 'https://via.placeholder.com/300x200'}" alt="${property.title}">
                        </div>
                        <div class="property-card__content">
                            <div class="property-card__price">${property.priceDisplay}</div>
                            <h4>${property.title}</h4>
                            <p class="property-card__location">${property.location}</p>
                            <div class="property-card__stats">
                                <span>${property.views || 0} views</span>
                                <span>${property.inquiries || 0} inquiries</span>
                            </div>
                        </div>
                    </div>
                `).join('')}</div>` :
                '<p>No properties posted yet. <a href="#" onclick="navigateToPage(\'post\')">Post your first property</a></p>'
            }
        </div>
    `;
}

// Click outside modal to close
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Initialize budget sliders on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeBudgetSliders, 100);
});
