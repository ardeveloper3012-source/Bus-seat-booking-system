// Success.js - Booking Success Page Logic

document.addEventListener('DOMContentLoaded', function() {
  populateBookingDetails();
  startCountdown();
  bindEvents();
});

function populateBookingDetails() {
  try {
    // Get latest booking from localStorage
    const bookings = JSON.parse(localStorage.getItem('movenco_bookings') || '[]');
    const booking = bookings[0]; // Latest booking
    
    if (!booking || !booking.route?.from) {
      showNoBookingPlaceholder();
      return;
    }

    function showNoBookingPlaceholder() {
      document.getElementById('bookingRef').textContent = 'No Active Booking';
      document.getElementById('successFrom').textContent = 'N/A';
      document.getElementById('successTo').textContent = 'N/A';
      document.getElementById('successBus').textContent = 'N/A';
      document.getElementById('successTime').textContent = 'N/A';
      document.getElementById('successDate').textContent = 'N/A';
      document.getElementById('successSeats').textContent = 'No seats';
      document.getElementById('passengerName').textContent = 'N/A';
      document.getElementById('passengerPhone').textContent = 'N/A';
      document.getElementById('passengerCnic').textContent = 'N/A';
      document.getElementById('passengerEmail').textContent = 'N/A';
      document.getElementById('successTotal').textContent = 'Rs. 0';
      document.querySelector('.expiry-notice').textContent = 'No active booking found.';
      return;
    }

    // Populate booking ref
    document.getElementById('bookingRef').textContent = booking.bookingRef;
    
// Route - Outbound
    document.getElementById('successFrom').style.opacity = '1';
    document.getElementById('successTo').style.opacity = '1';
    document.getElementById('successFrom').textContent = booking.route ? booking.route.from : 'N/A';
    document.getElementById('successTo').textContent = booking.route ? booking.route.to : 'N/A';

    // Check for return journey (round trip)
    if (booking.returnRoute) {
      const returnSection = document.getElementById('returnRouteSection');
      if (returnSection) {
        returnSection.style.display = 'block';
        document.getElementById('returnFrom').style.opacity = '1';
        document.getElementById('returnTo').style.opacity = '1';
        document.getElementById('returnFrom').textContent = booking.returnRoute.from;
        document.getElementById('returnTo').textContent = booking.returnRoute.to;
      }
    }
    
    // Bus details
    document.getElementById('successBus').textContent = booking.bus;
    document.getElementById('successTime').textContent = booking.time.split(' - ')[0]; // Departure only
    document.getElementById('successDate').textContent = new Date(booking.date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
    document.getElementById('successSeats').textContent = booking.seats.join(', ');
    
    // Passenger
    document.getElementById('passengerName').textContent = booking.user.name;
    document.getElementById('passengerPhone').textContent = booking.user.phone;
    document.getElementById('passengerCnic').textContent = booking.user.cnic || 'N/A';
    document.getElementById('passengerEmail').textContent = booking.user.email || 'N/A';
    
    // Total
    document.getElementById('successTotal').textContent = `Rs. ${booking.total.toLocaleString()}`;
    
  } catch (e) {
    console.error('Error populating booking:', e);
    alert('Error loading booking details');
  }
}

function startCountdown() {
  const bookings = JSON.parse(localStorage.getItem('movenco_bookings') || '[]');
  const booking = bookings[0];
  
  if (booking && booking.expires) {
    const expiryTime = new Date(booking.expires).getTime();
    const countdownEl = document.getElementById('countdown');
    
    const timer = setInterval(() => {
      const now = Date.now();
      const timeLeft = expiryTime - now;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        countdownEl.textContent = 'EXPIRED';
        document.querySelector('.action-buttons').innerHTML = '<button class="btn-primary btn-large" onclick="window.location.href=\'index.html\'">Book Again</button>';
        return;
      }
      
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
}

function cancelBooking() {
  if (confirm('Cancel this booking? Seats will be released.')) {
    const bookings = JSON.parse(localStorage.getItem('movenco_bookings') || '[]');
    bookings.shift(); // Remove latest booking
    localStorage.setItem('movenco_bookings', JSON.stringify(bookings));
    
    // Release seats
    const booking = bookings[0];
    if (booking && booking.seats) {
      let reserved = JSON.parse(localStorage.getItem('reserved_seats') || '{}');
      const busKey = `${booking.bus}_${booking.date}`;
      delete reserved[busKey];
      localStorage.setItem('reserved_seats', JSON.stringify(reserved));
    }
    
    alert('Booking cancelled successfully.');
    window.location.href = 'index.html';
  }
}

function printBooking() {
  window.print();
}

// Global functions
window.cancelBooking = cancelBooking;
window.printBooking = printBooking;

