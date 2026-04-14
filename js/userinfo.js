// Userinfo.js - Booking Confirmation & Save Logic
// Triggered from Selection.html confirm booking

let bookingData = {};
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
  parseURLParams();
  loadCurrentUser();
  populateSummary();
  bindFormEvents();
  updateTODO();
});

function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const hasValidParams = params.get('from') && params.get('to') && params.get('bus');
  if (!hasValidParams) {
    document.querySelector('.booking-container').innerHTML = '<div style="text-align:center; padding: 4rem; max-width: 500px; margin: 0 auto;"><h2>No booking data found</h2><p>Please complete seat selection from the previous page first.</p><a href="Selection.html" class="btn-primary" style="display:inline-block; margin-top:1rem;">← Back to Seat Selection</a></div>';
    return;
  }
  bookingData = {
    from: decodeURIComponent(params.get('from')),
    to: decodeURIComponent(params.get('to')),
    bus: decodeURIComponent(params.get('bus')),
    time: decodeURIComponent(params.get('time')),
    date: decodeURIComponent(params.get('date')),
    price: parseInt(params.get('price')) || 1500,
    seats: params.get('seats') ? params.get('seats').split(',') : [],
    total: parseInt(params.get('total')) || 0,
    gender: params.get('gender') || 'male'
  };
}

function loadCurrentUser() {
  try {
    const session = localStorage.getItem('movenco_session');
    if (session) {
      currentUser = JSON.parse(session);
      // Prefill form
      document.getElementById('passengerName').value = currentUser.name || '';
      document.getElementById('passengerPhone').value = currentUser.phone || '';
      document.getElementById('passengerEmail').value = currentUser.email || '';
    }
  } catch (e) {
    console.error('Session load error:', e);
  }
}

function populateSummary() {
  if (!bookingData.from) {
    document.querySelector('.summary-card').innerHTML = '<div style="text-align:center; padding: 2rem;"><h3>No booking summary available</h3><p>Please select seats first.</p></div>';
    return;
  }
  document.getElementById('summaryFrom').textContent = bookingData.from;
  document.getElementById('summaryTo').textContent = bookingData.to;
  document.getElementById('summaryBus').textContent = bookingData.bus;
  document.getElementById('summaryTime').textContent = bookingData.time;
  document.getElementById('summaryDate').textContent = bookingData.date;
  
  const seatsList = document.getElementById('seatsList');
  if (bookingData.seats.length > 0) {
    seatsList.innerHTML = bookingData.seats.map(seat => `<span class="seat-chip">L${seat}</span>`).join('');
  } else {
    seatsList.innerHTML = '<p>No seats selected</p>';
  }
  
  document.getElementById('summaryTotal').textContent = `Rs. ${bookingData.total.toLocaleString()}`;
}

function bindFormEvents() {
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', handleBookingSubmit);
  
  // CNIC input formatting
  const cnicInput = document.getElementById('passengerCnic');
  cnicInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9-]/g, '');
    if (value.length >= 5 && !value.includes('-')) value = value.slice(0,5) + '-' + value.slice(5);
    if (value.length >= 13 && value[12] !== '-') value = value.slice(0,12) + '-' + value.slice(12);
    e.target.value = value.slice(0,15);
  });
}

function handleBookingSubmit(e) {
  e.preventDefault();
  
  if (!bookingData.from) {
    alert('No booking data available. Please go back to seat selection.');
    return;
  }
  
  // Validation disabled per requirements - always proceed
  const name = document.getElementById('passengerName').value.trim();
  const phone = document.getElementById('passengerPhone').value.trim();
  const cnic = document.getElementById('passengerCnic').value.trim();
  // Fields can be empty or invalid; booking proceeds anyway
  
  // Create booking
  const booking = {
    id: Date.now(),
    bookingRef: 'MOV' + Date.now().toString().slice(-6),
    user: currentUser ? { ...currentUser, name, phone, email: document.getElementById('passengerEmail').value } : { name, phone, cnic, email: '' },
    route: { from: bookingData.from, to: bookingData.to },
    bus: bookingData.bus,
    time: bookingData.time,
    date: bookingData.date,
    seats: bookingData.seats,
    total: bookingData.total,
    status: 'reserved',
    expires: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min hold
    created: new Date().toISOString()
  };
  
  // Save to localStorage
  let bookings = JSON.parse(localStorage.getItem('movenco_bookings') || '[]');
  bookings.unshift(booking); // Add to front
  localStorage.setItem('movenco_bookings', JSON.stringify(bookings.slice(0,100))); // Limit to 100
  
  // Mark seats as reserved globally
  saveReservedSeats(bookingData.seats);
  
  // Show success
  showSuccessModal(booking);
}

function saveReservedSeats(seats) {
  let reserved = JSON.parse(localStorage.getItem('reserved_seats') || '{}');
  const busKey = `${bookingData.bus}_${bookingData.date}`;
  reserved[busKey] = seats;
  localStorage.setItem('reserved_seats', JSON.stringify(reserved));
}

function showSuccessModal(booking) {
  // Redirect to success page instead of modal
  window.location.href = 'success.html';
}

function printBooking() {
  window.print();
}

function updateTODO() {
  // Update TODO.md via message (handled externally)
  console.log('Userinfo page implemented. Update TODO.md Step 1 complete.');
}

// Global functions
window.printBooking = printBooking;

