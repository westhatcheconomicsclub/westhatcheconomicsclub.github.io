document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset previous error states
            resetErrors();
            
            // Validate fields
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    showSuccess();
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('div');
        error.className = 'invalid-feedback';
        error.innerText = message;
        input.classList.add('is-invalid');
        formGroup.appendChild(error);
    }
    
    function resetErrors() {
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            const error = input.parentElement.querySelector('.invalid-feedback');
            if (error) {
                error.remove();
            }
        });
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showSuccess() {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show mt-3';
        alert.innerHTML = `
            Message sent successfully!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        contactForm.insertAdjacentElement('beforebegin', alert);
        
        // Auto-dismiss alert after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});
