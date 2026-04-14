// Bus Seat Booking System - Buses Page JavaScript
 
// Bus Data with Images
const busData = [
  { id: 1, name: "Faisal Movers", from: "Lahore", to: "Karachi", departureTime: "06:00 AM", arrivalTime: "01:00 PM", price: 1400, seatsAvailable: 24, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 2, name: "Daewoo Express", from: "Lahore", to: "Karachi", departureTime: "08:00 AM", arrivalTime: "03:00 PM", price: 1500, seatsAvailable: 30, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 3, name: "Skyways", from: "Lahore", to: "Karachi", departureTime: "10:00 PM", arrivalTime: "05:00 AM", price: 1350, seatsAvailable: 20, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.2, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 4, name: "QConnect", from: "Lahore", to: "Karachi", departureTime: "09:00 PM", arrivalTime: "04:00 AM", price: 1450, seatsAvailable: 22, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket", "Pillow", "USB"], rating: 4.6, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 5, name: "Faisal Movers", from: "Karachi", to: "Lahore", departureTime: "09:00 AM", arrivalTime: "04:00 PM", price: 1500, seatsAvailable: 25, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 6, name: "Daewoo Express", from: "Karachi", to: "Lahore", departureTime: "11:00 AM", arrivalTime: "06:00 PM", price: 1500, seatsAvailable: 30, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 7, name: "Skyways", from: "Karachi", to: "Lahore", departureTime: "01:00 PM", arrivalTime: "07:00 PM", price: 1400, seatsAvailable: 20, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.2, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 8, name: "Niazi Coach", from: "Karachi", to: "Lahore", departureTime: "08:00 PM", arrivalTime: "02:00 AM", price: 1350, seatsAvailable: 18, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB"], rating: 4.4, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 9, name: "Bilal Travels", from: "Islamabad", to: "Peshawar", departureTime: "08:00 AM", arrivalTime: "01:00 PM", price: 1450, seatsAvailable: 22, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.3, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 10, name: "Daewoo Express", from: "Islamabad", to: "Peshawar", departureTime: "10:00 AM", arrivalTime: "03:00 PM", price: 1500, seatsAvailable: 28, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 11, name: "Skyways", from: "Islamabad", to: "Peshawar", departureTime: "02:00 PM", arrivalTime: "07:00 PM", price: 1350, seatsAvailable: 24, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.2, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 12, name: "QConnect", from: "Islamabad", to: "Peshawar", departureTime: "06:00 PM", arrivalTime: "11:00 PM", price: 1400, seatsAvailable: 20, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 13, name: "Daewoo Express", from: "Peshawar", to: "Islamabad", departureTime: "07:00 AM", arrivalTime: "12:00 PM", price: 1500, seatsAvailable: 32, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 14, name: "Skyways", from: "Peshawar", to: "Islamabad", departureTime: "09:00 PM", arrivalTime: "02:00 AM", price: 1499, seatsAvailable: 18, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.2, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 15, name: "Bilal Travels", from: "Peshawar", to: "Islamabad", departureTime: "02:00 PM", arrivalTime: "07:00 PM", price: 1400, seatsAvailable: 24, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.3, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 16, name: "Niazi Coach", from: "Peshawar", to: "Islamabad", departureTime: "05:00 PM", arrivalTime: "10:00 PM", price: 1350, seatsAvailable: 22, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB"], rating: 4.4, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 17, name: "Manthar Transport", from: "Multan", to: "Lahore", departureTime: "10:00 AM", arrivalTime: "02:00 PM", price: 1200, seatsAvailable: 28, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water"], rating: 4.1, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 18, name: "Daewoo Express", from: "Multan", to: "Lahore", departureTime: "02:00 PM", arrivalTime: "06:00 PM", price: 1300, seatsAvailable: 26, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 19, name: "Bilal Travels", from: "Lahore", to: "Multan", departureTime: "09:00 AM", arrivalTime: "12:00 PM", price: 1100, seatsAvailable: 26, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water"], rating: 4.3, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 20, name: "Manthar Transport", from: "Lahore", to: "Multan", departureTime: "01:00 PM", arrivalTime: "04:00 PM", price: 1150, seatsAvailable: 22, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.1, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 21, name: "QConnect", from: "Lahore", to: "Multan", departureTime: "11:00 PM", arrivalTime: "02:00 AM", price: 1250, seatsAvailable: 20, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 22, name: "Daewoo Express", from: "Quetta", to: "Lahore", departureTime: "06:00 AM", arrivalTime: "10:00 PM", price: 2500, seatsAvailable: 20, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB", "Blanket"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 23, name: "Faisal Movers", from: "Quetta", to: "Lahore", departureTime: "08:00 AM", arrivalTime: "12:00 AM", price: 2400, seatsAvailable: 18, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket", "Pillow", "TV"], rating: 4.6, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 24, name: "Daewoo Express", from: "Lahore", to: "Quetta", departureTime: "05:00 AM", arrivalTime: "09:00 PM", price: 2500, seatsAvailable: 20, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB", "Blanket"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 25, name: "Skyways", from: "Lahore", to: "Quetta", departureTime: "07:00 AM", arrivalTime: "11:00 PM", price: 2450, seatsAvailable: 16, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.4, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 26, name: "Faisal Movers", from: "Karachi", to: "Islamabad", departureTime: "06:00 PM", arrivalTime: "06:00 AM", price: 2200, seatsAvailable: 24, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket", "Pillow", "TV"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 27, name: "Daewoo Express", from: "Karachi", to: "Islamabad", departureTime: "08:00 PM", arrivalTime: "08:00 AM", price: 2300, seatsAvailable: 28, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB", "Blanket"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 28, name: "Skyways", from: "Islamabad", to: "Karachi", departureTime: "06:00 PM", arrivalTime: "06:00 AM", price: 2150, seatsAvailable: 22, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.3, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 29, name: "Bilal Travels", from: "Islamabad", to: "Karachi", departureTime: "07:00 PM", arrivalTime: "07:00 AM", price: 2100, seatsAvailable: 20, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB", "TV"], rating: 4.5, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 30, name: "Manthar Transport", from: "Multan", to: "Karachi", departureTime: "08:00 PM", arrivalTime: "06:00 AM", price: 1800, seatsAvailable: 18, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.1, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 31, name: "Daewoo Express", from: "Multan", to: "Karachi", departureTime: "09:00 PM", arrivalTime: "07:00 AM", price: 1900, seatsAvailable: 22, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 32, name: "Faisal Movers", from: "Karachi", to: "Multan", departureTime: "07:00 PM", arrivalTime: "04:00 AM", price: 1750, seatsAvailable: 20, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket", "Pillow"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 33, name: "Skyways", from: "Karachi", to: "Multan", departureTime: "08:00 PM", arrivalTime: "05:00 AM", price: 1700, seatsAvailable: 16, type: "Non-AC", amenities: ["Water", "Pillow"], rating: 4.2, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 34, name: "Daewoo Express", from: "Peshawar", to: "Karachi", departureTime: "06:00 PM", arrivalTime: "08:00 AM", price: 2400, seatsAvailable: 24, type: "Business", amenities: ["WiFi", "Charger", "AC", "Water", "TV", "USB", "Blanket"], rating: 4.8, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 35, name: "Bilal Travels", from: "Peshawar", to: "Karachi", departureTime: "07:00 PM", arrivalTime: "09:00 AM", price: 2300, seatsAvailable: 20, type: "Executive", amenities: ["WiFi", "Charger", "AC", "Water", "USB", "TV"], rating: 4.5, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] },
  { id: 36, name: "Faisal Movers", from: "Karachi", to: "Peshawar", departureTime: "05:00 PM", arrivalTime: "07:00 AM", price: 2350, seatsAvailable: 22, type: "Luxury", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket", "Pillow", "TV"], rating: 4.5, femaleFriendly: true, images: ["images/bus-exterior-1.svg"] },
  { id: 37, name: "Skyways", from: "Karachi", to: "Peshawar", departureTime: "06:00 PM", arrivalTime: "08:00 AM", price: 2400, seatsAvailable: 18, type: "AC", amenities: ["WiFi", "Charger", "AC", "Water", "Blanket"], rating: 4.3, femaleFriendly: false, images: ["images/bus-exterior-1.svg"] }
];

// Global Variables
let currentFilters = { busServices: [], busTypes: [], priceMax: 7000 };
let currentSort = "cheapest";
let isRoundTrip = false;
let selectedBus = null;

// Helper Functions
function calculateDuration(dep, arr) {
  const parseTime = function(t) {
    var parts = t.split(' ');
    var timeParts = parts[0].split(':');
    var h = parseInt(timeParts[0]);
    var m = parseInt(timeParts[1]);
    var p = parts[1];
    if (p === 'PM' && h !== 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };
  var dm = parseTime(dep);
  var am = parseTime(arr);
  if (am < dm) am += 24 * 60;
  var total = am - dm;
  return Math.floor(total / 60) + 'h ' + (total % 60) + 'm';
}

function getAmenityIcon(a) {
  var icons = { 'WiFi': 'fa-wifi', 'Charger': 'fa-charging-station', 'AC': 'fa-snowflake', 'Water': 'fa-glass-water', 'Blanket': 'fa-bed', 'Pillow': 'fa-couch', 'TV': 'fa-tv', 'USB': 'fa-usb' };
  return icons[a] || 'fa-check';
}

function getDepartureMinutes(t) {
  var parts = t.split(' ');
  var timeParts = parts[0].split(':');
  var h = parseInt(timeParts[0]);
  var m = parseInt(timeParts[1]);
  var p = parts[1];
  if (p === 'PM' && h !== 12) h += 12;
  if (p === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

// Dynamic Filter Functions
function getAvailableServices(buses) {
  var services = buses.map(function(b) { return b.name; });
  return [...new Set(services)].sort();
}

function getAvailableTypes(buses) {
  var types = buses.map(function(b) { return b.type; });
  return [...new Set(types)].sort();
}

function getPriceRange(buses) {
  if (buses.length === 0) return { min: 1000, max: 7000 };
  var prices = buses.map(function(b) { return b.price; });
  return { min: Math.floor(Math.min.apply(null, prices) / 100) * 100, max: Math.ceil(Math.max.apply(null, prices) / 100) * 100 };
}

function renderBusServiceFilters(services) {
  var container = document.getElementById('busServiceFilters');
  if (!container) return;
  if (services.length === 0) { container.innerHTML = '<p class="no-filters">No services available</p>'; return; }
  var html = '';
  services.forEach(function(s) {
    var checked = currentFilters.busServices.indexOf(s) > -1 ? 'checked' : '';
    html += '<label class="checkbox-label"><input type="checkbox" name="busService" value="' + s + '" ' + checked + '><span class="checkmark"></span>' + s + '</label>';
  });
  container.innerHTML = html;
  var checkboxes = container.querySelectorAll('input[name="busService"]');
  checkboxes.forEach(function(cb) {
    cb.addEventListener('change', function() {
      currentFilters.busServices = Array.from(checkboxes).filter(function(c) { return c.checked; }).map(function(c) { return c.value; });
      updateDisplay();
    });
  });
}

function renderBusTypeFilters(types) {
  var container = document.getElementById('busTypeFilters');
  if (!container) return;
  if (types.length === 0) { container.innerHTML = '<p class="no-filters">No types available</p>'; return; }
  var html = '';
  types.forEach(function(t) {
    var checked = currentFilters.busTypes.indexOf(t) > -1 ? 'checked' : '';
    html += '<label class="checkbox-label"><input type="checkbox" name="busType" value="' + t + '" ' + checked + '><span class="checkmark"></span>' + t + '</label>';
  });
  container.innerHTML = html;
  var checkboxes = container.querySelectorAll('input[name="busType"]');
  checkboxes.forEach(function(cb) {
    cb.addEventListener('change', function() {
      currentFilters.busTypes = Array.from(checkboxes).filter(function(c) { return c.checked; }).map(function(c) { return c.value; });
      updateDisplay();
    });
  });
}

function updatePriceSlider(range) {
  var slider = document.getElementById('priceRange');
  var label = document.getElementById('priceValue');
  if (!slider || !label) return;
  var min = Math.max(1000, Math.floor(range.min / 100) * 100);
  var max = Math.ceil(range.max / 100) * 100;
  slider.min = min;
  slider.max = max;
  slider.value = max;
  label.textContent = max >= 1000 ? Math.round(max/1000) + 'k' : max;
  currentFilters.priceMax = max;
}

// Filter and Sort Functions
function filterBuses(buses) {
  return buses.filter(function(b) {
    if (currentFilters.busServices.length > 0 && currentFilters.busServices.indexOf(b.name) === -1) return false;
    if (currentFilters.busTypes.length > 0 && !currentFilters.busTypes.some(function(t) { return b.type.toLowerCase() === t.toLowerCase(); })) return false;
    if (currentFilters.priceMax && b.price > currentFilters.priceMax) return false;
    return true;
  });
}

function sortBuses(buses, type) {
  var sorted = buses.slice();
  if (type === 'cheapest') sorted.sort(function(a, b) { return a.price - b.price; });
  else if (type === 'earliest') sorted.sort(function(a, b) { return getDepartureMinutes(a.departureTime) - getDepartureMinutes(b.departureTime); });
  else if (type === 'recommended') sorted.sort(function(a, b) { return b.rating - a.rating; });
  return sorted;
}

// Render Functions
function renderBusCard(bus, isReturn) {
  isReturn = isReturn || false;
  var duration = calculateDuration(bus.departureTime, bus.arrivalTime);
  var typeClass = bus.type.toLowerCase().replace(' ', '-');
  var seatsClass = bus.seatsAvailable > 10 ? 'available' : 'limited';
  var amenitiesHtml = bus.amenities.map(function(a) { return '<span class="amenity"><i class="fas ' + getAmenityIcon(a) + '"></i> ' + a + '</span>'; }).join('');
  var returnBadge = isReturn ? '<span class="return-badge">Return</span>' : '';
  var femaleBadge = bus.femaleFriendly ? '<span class="female-friendly-badge">Female Friendly</span>' : '';
  
  return '<div class="bus-card"><div class="bus-card-top"><div class="bus-operator"><div class="bus-logo"><i class="fas fa-bus"></i></div><div class="bus-operator-name">' + bus.name + '</div>' + returnBadge + femaleBadge + '<span class="bus-type-badge ' + typeClass + '">' + bus.type + '</span></div><div class="bus-times"><div class="time-row"><div class="time-point"><div class="departure-time">' + bus.departureTime + '</div><div class="location-code">' + bus.from + '</div></div><div class="time-arrow"><div class="arrow-line"></div><div class="duration">' + duration + '</div></div><div class="time-point"><div class="arrival-time">' + bus.arrivalTime + '</div><div class="location-code">' + bus.to + '</div></div></div><div class="bus-amenities">' + amenitiesHtml + '</div></div><div class="bus-price-section"><div class="price-label">Per Person</div><div class="price-amount"><span>Rs.</span> ' + bus.price + '</div><div class="seats-info ' + seatsClass + '">' + bus.seatsAvailable + ' seats left</div><button class="book-btn" data-id="' + bus.id + '" data-return="' + isReturn + '">' + (isReturn ? 'Select Return' : 'Select Bus') + '</button></div></div><div class="bus-card-bottom"><div class="bus-rating"><i class="fas fa-star"></i> ' + bus.rating + ' Rating</div><div class="boarding-point"><i class="fas fa-map-marker-alt"></i> Boarding: ' + bus.from + '</div><div class="dropping-point"><i class="fas fa-map-marker"></i> Dropping: ' + bus.to + '</div></div></div>';
}

function renderBusCards(outbound, returnBuses) {
  returnBuses = returnBuses || [];
  var container = document.getElementById('busListings');
  var count = document.getElementById('busCount');
  if (!container) return;
  
  var total = isRoundTrip ? outbound.length + returnBuses.length : outbound.length;
  if (count) count.textContent = total;
  
  if (total === 0) { container.innerHTML = '<div class="no-buses-found"><i class="fas fa-bus"></i><h3>No Buses Found</h3><p>Try adjusting your filters to see more results.</p></div>'; return; }
  
  var html = '';
  if (outbound.length > 0) {
    html += '<div class="bus-section"><h2 class="section-title">' + (isRoundTrip ? 'Outbound' : 'Available') + ' Buses: ' + outbound[0].from + ' to ' + outbound[0].to + '</h2>';
    outbound.forEach(function(b) { html += renderBusCard(b, false); });
    html += '</div>';
  }
  if (isRoundTrip && returnBuses.length > 0) {
    html += '<div class="bus-section return-section"><h2 class="section-title">Return Buses: ' + returnBuses[0].from + ' to ' + returnBuses[0].to + '</h2>';
    returnBuses.forEach(function(b) { html += renderBusCard(b, true); });
    html += '</div>';
  }
  
  container.innerHTML = html;
}

function updateDisplay() {
  var urlParams = new URLSearchParams(window.location.search);
  var fromParam = urlParams.get('from');
  var toParam = urlParams.get('to');
  var tripParam = urlParams.get('trip');
  var returnDate = urlParams.get('arrival');
  
  isRoundTrip = (tripParam === 'roundtrip') || (returnDate && returnDate.trim() !== '');
  
  var outbound = busData.slice();
  var returnBuses = [];
  
  if (fromParam && toParam) {
    outbound = busData.filter(function(b) { return b.from.toLowerCase() === fromParam.toLowerCase() && b.to.toLowerCase() === toParam.toLowerCase(); });
    if (isRoundTrip) {
      returnBuses = busData.filter(function(b) { return b.from.toLowerCase() === toParam.toLowerCase() && b.to.toLowerCase() === fromParam.toLowerCase(); });
    }
  }
  
  // Update dynamic filters
  var allRouteBuses = outbound.slice();
  if (allRouteBuses.length > 0) {
    renderBusServiceFilters(getAvailableServices(allRouteBuses));
    renderBusTypeFilters(getAvailableTypes(allRouteBuses));
  }
  
  outbound = filterBuses(outbound);
  outbound = sortBuses(outbound, currentSort);
  returnBuses = filterBuses(returnBuses);
  returnBuses = sortBuses(returnBuses, currentSort);
  
  renderBusCards(outbound, returnBuses);
  
  var routeFrom = document.getElementById('routeFrom');
  var routeTo = document.getElementById('routeTo');
  if (routeFrom) routeFrom.textContent = fromParam || 'From';
  if (routeTo) routeTo.textContent = toParam || 'To';
}

// Bus Details Modal Functions (specific to this page)
function selectBus(busId, isReturn) {
  var bus = busData.find(function(b) { return b.id === busId; });
  if (!bus) return;
  
  selectedBus = bus;
  
  var depInput = document.getElementById('departure');
  var depDate = new Date();
  if (depInput && depInput.value) depDate = new Date(depInput.value);
  
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var fmtDate = days[depDate.getDay()] + ', ' + depDate.getDate() + ' ' + months[depDate.getMonth()];
  
  document.getElementById('modalDepartureTime').textContent = bus.departureTime;
  document.getElementById('modalDepartureDate').textContent = fmtDate;
  document.getElementById('modalDepartureCity').textContent = bus.from;
  document.getElementById('modalArrivalTime').textContent = bus.arrivalTime;
  document.getElementById('modalArrivalDate').textContent = fmtDate;
  document.getElementById('modalArrivalCity').textContent = bus.to;
  document.getElementById('modalDuration').textContent = calculateDuration(bus.departureTime, bus.arrivalTime);
  document.getElementById('modalOperatorName').textContent = bus.name;
  document.getElementById('modalBusType').textContent = bus.type;
  
  // Update amenities chips
  var chipsContainer = document.querySelector('.amenities-chips');
  if (chipsContainer) {
    var chipsHtml = '';
    bus.amenities.forEach(function(a) {
      var icon = getAmenityIcon(a);
      chipsHtml += '<span class="amenity-chip"><i class="fas ' + icon + '"></i> ' + a + '</span>';
    });
    chipsContainer.innerHTML = chipsHtml;
  }
  
  // Update image gallery with bus images
  var galleryThumbs = document.querySelector('.gallery-thumbs');
  if (galleryThumbs && bus.images && bus.images.length > 0) {
    var thumbsHtml = '';
    bus.images.forEach(function(img, index) {
      thumbsHtml += '<div class="gallery-thumb" onclick="openLightbox(' + index + ')"><i class="fas fa-bus"></i></div>';
    });
    galleryThumbs.innerHTML = thumbsHtml;
  }
  
  var modal = document.getElementById('busDetailsModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Scroll to top when modal opens
    window.scrollTo(0, 0);
  }
}

function closeBusModal() {
  var modal = document.getElementById('busDetailsModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function goToSeatSelection() {
  if (selectedBus) {
    alert('Proceeding to seat selection!\n\nBus: ' + selectedBus.name + '\nRoute: ' + selectedBus.from + ' to ' + selectedBus.to + '\nPrice: Rs. ' + selectedBus.price + '\n\nSeat selection feature coming soon!');
    closeBusModal();
  }
}

// Search Suggestions
function setupSuggestions(inputId, suggestionsId, radioName) {
  var input = document.getElementById(inputId);
  var dropdown = document.getElementById(suggestionsId);
  if (!input || !dropdown) return;
  
  var items = dropdown.querySelectorAll('.suggestion-item');
  var radios = dropdown.querySelectorAll('input[name="' + radioName + '"]');
  
  input.addEventListener('focus', function() { dropdown.classList.add('show'); });
  input.addEventListener('input', function(e) {
    var filter = e.target.value.toLowerCase();
    items.forEach(function(item) { item.style.display = item.textContent.toLowerCase().indexOf(filter) > -1 ? 'flex' : 'none'; });
    if (filter === '') dropdown.classList.add('show');
  });
  radios.forEach(function(r) {
    r.addEventListener('change', function(e) { input.value = e.target.value; dropdown.classList.remove('show'); });
  });
  items.forEach(function(item) {
    item.addEventListener('click', function() {
      var r = item.querySelector('input[type="radio"]');
      if (r) { r.checked = true; input.value = r.value; dropdown.classList.remove('show'); }
    });
  });
  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.remove('show');
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set default date
  var depInput = document.getElementById('departure');
  if (depInput && !depInput.value) {
    depInput.value = new Date().toISOString().split('T')[0];
  }
  
  // Load params
  var urlParams = new URLSearchParams(window.location.search);
  var from = urlParams.get('from');
  var to = urlParams.get('to');
  var date = urlParams.get('departure');
  
  if (from && to && date) {
    var f = document.getElementById('fromInput');
    var t = document.getElementById('toInput');
    var d = document.getElementById('departure');
    if (f) f.value = decodeURIComponent(from);
    if (t) t.value = decodeURIComponent(to);
    if (d) d.value = decodeURIComponent(date);
  }
  
  // Trip toggle
  var toggles = document.querySelectorAll('.toggle-btn');
  var arrival = document.getElementById('arrival');
  toggles.forEach(function(btn) {
    btn.addEventListener('click', function() {
      toggles.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (arrival) arrival.style.display = btn.dataset.trip === 'roundtrip' ? 'inline-block' : 'none';
    });
  });
  
  // Setup suggestions
  setupSuggestions('fromInput', 'fromSuggestions', 'from-options');
  setupSuggestions('toInput', 'toSuggestions', 'to-options');
  
  // Sort tabs
  var sortTabs = document.querySelectorAll('.sort-tab');
  sortTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      sortTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentSort = tab.dataset.sort;
      updateDisplay();
    });
  });
  
  // Reset button
  var resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      currentFilters = { busServices: [], busTypes: [], priceMax: 7000 };
      sortTabs.forEach(function(t) { t.classList.remove('active'); });
      var cheapest = document.querySelector('[data-sort="cheapest"]');
      if (cheapest) cheapest.classList.add('active');
      currentSort = 'cheapest';
      
      // Reset price slider
      var slider = document.getElementById('priceRange');
      var priceLabel = document.getElementById('priceValue');
      if (slider) slider.value = slider.max;
      if (priceLabel) priceLabel.textContent = slider.max >= 1000 ? Math.round(slider.max/1000) + 'k' : slider.max;
      
      updateDisplay();
    });
  }
  
  // Price slider event listener
  var priceSlider = document.getElementById('priceRange');
  if (priceSlider) {
    priceSlider.addEventListener('input', function() {
      var label = document.getElementById('priceValue');
      if (label) {
        var val = parseInt(priceSlider.value);
        label.textContent = val >= 1000 ? Math.round(val/1000) + 'k' : val;
      }
      currentFilters.priceMax = parseInt(priceSlider.value);
      updateDisplay();
    });
  }
  
  // Bus modal close handlers - specific to bus details modal
  document.addEventListener('click', function(e) {
    var modal = document.getElementById('busDetailsModal');
    var container = modal ? modal.querySelector('.modal-container') : null;
    if (modal && modal.classList.contains('active') && container && !container.contains(e.target)) {
      closeBusModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var busModal = document.getElementById('busDetailsModal');
      if (busModal && busModal.classList.contains('active')) {
        closeBusModal();
      }
    }
  });
  
  // Event delegation for book buttons - handles dynamically created buttons
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.book-btn');
    if (btn) {
      var id = parseInt(btn.getAttribute('data-id'));
      var isRet = btn.getAttribute('data-return') === 'true';
      selectBus(id, isRet);
    }
  });
  
  // Initial display
  updateDisplay();
});

// goToSeatSelection - core update per TODO
function goToSeatSelection() {
  if (selectedBus) {
    const depInput = document.getElementById('departure');
    const travelDate = depInput ? depInput.value : new Date().toISOString().split('T')[0];
    
    const params = new URLSearchParams({
      from: selectedBus.from,
      to: selectedBus.to,
      bus: selectedBus.name,
      time: selectedBus.departureTime,
      date: travelDate,
      price: selectedBus.price
    });
    
    closeBusModal();
    window.location.href = 'Selection.html?' + params.toString();
  }
}
// Make functions globally available for inline onclick handlers
window.closeBusModal = closeBusModal;
window.goToSeatSelection = goToSeatSelection;

