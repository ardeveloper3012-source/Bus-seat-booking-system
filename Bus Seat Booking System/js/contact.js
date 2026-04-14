// Contact Form Validation and Submission

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      // Prevent default form submission
      event.preventDefault();
      
      // Get form fields
      const fullName = document.getElementById('fullName');
      const emailAddress = document.getElementById('emailAddress');
      const message = document.getElementById('message');
      
      // Remove any existing error messages
      removeErrorMessages();
      
      // Validation flag
      let isValid = true;
      
      // Validate Full Name
      if (!fullName.value.trim()) {
        showError(fullName, 'Please enter your full name');
        isValid = false;
      }
      
      // Validate Email Address
      if (!emailAddress.value.trim()) {
        showError(emailAddress, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailAddress.value.trim())) {
        showError(emailAddress, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate Message
      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      }
      
      // If form is valid, show success message
      if (isValid) {
        showSuccess();
        
        // Log form data to console (for backend integration)
        const formData = {
          fullName: fullName.value.trim(),
          emailAddress: emailAddress.value.trim(),
          message: message.value.trim(),
          submittedAt: new Date().toISOString()
        };
        
        console.log('Form Data Submitted:', formData);
        
        // Reset the form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          hideSuccess();
        }, 5000);
      }
    });
  }
  
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Function to show error message
  function showError(inputElement, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    // Add error class to input
    inputElement.style.borderColor = '#dc3545';
    
    // Insert error message after input
    inputElement.parentNode.appendChild(errorDiv);
  }
  
  // Function to remove all error messages
  function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(function(error) {
      error.remove();
    });
    
    // Reset input border colors
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(function(input) {
      input.style.borderColor = '#e0e0e0';
    });
  }
  
  // Function to show success message
  function showSuccess() {
    // Check if success message already exists
    let successDiv = document.querySelector('.success-message');
    
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
      
      // Insert before the form
      const form = document.getElementById('contactForm');
      form.parentNode.insertBefore(successDiv, form);
    }
    
    successDiv.classList.add('show');
  }
  
  // Function to hide success message
  function hideSuccess() {
    const successDiv = document.querySelector('.success-message');
    if (successDiv) {
      successDiv.classList.remove('show');
    }
  }
  
  // Add real-time validation on input
  const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      // Remove error when user starts typing
      this.style.borderColor = '#e0e0e0';
      const errorDiv = this.parentNode.querySelector('.field-error');
      if (errorDiv) {
        errorDiv.remove();
      }
    });
  });
});

