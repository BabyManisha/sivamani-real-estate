// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    document.querySelectorAll('.property-card, .service-card, .testimonial-card, .blog-card, .stat-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        
        // Clear previous status
        formStatus.innerHTML = '';
        
        try {
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Add timestamp and source
            formData.append('timestamp', new Date().toISOString());
            formData.append('source', 'Website Contact Form');
            
            // Replace with your actual Google Apps Script URL
            const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
            
            // For demo purposes, we'll simulate a successful submission
            // In production, replace this with actual fetch to Google Sheets
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
            
            // Uncomment the following lines and replace with your actual script URL
            /*
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            */
            
            // Show success message
            formStatus.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <span>Thank you! Your message has been sent successfully. We'll contact you soon.</span>
                </div>
            `;
            
            // Reset form
            contactForm.reset();
            
            // Send WhatsApp message (optional)
            const name = formData.get('name');
            const phone = formData.get('phone');
            const propertyType = formData.get('propertyType');
            const message = `Hi! I'm ${name} and I'm interested in ${propertyType || 'properties'}. My phone: ${phone}. Please contact me.`;
            
            // Auto-redirect to WhatsApp after 3 seconds
            setTimeout(() => {
                const whatsappURL = `https://wa.me/918143052789?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            formStatus.innerHTML = `
                <div class="form-error">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                </div>
            `;
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
    });

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 50);
        });
    }

    // Trigger stats animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add click tracking for analytics (optional)
    document.querySelectorAll('a[href^="https://wa.me"], a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            const action = this.href.includes('wa.me') ? 'WhatsApp Click' : 
                          this.href.includes('tel:') ? 'Phone Click' : 'Email Click';
            
            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    'event_category': 'Contact',
                    'event_label': this.href
                });
            }
            
            console.log(`${action}: ${this.href}`);
        });
    });

    // Form validation
    const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Validate email
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Validate phone
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const fieldGroup = field.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        fieldGroup.appendChild(errorDiv);
    }

    // Add error styles
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// Google Sheets Integration Setup Instructions
/*
To set up Google Sheets integration:

1. Create a new Google Sheet
2. Go to Extensions > Apps Script
3. Replace the default code with:

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = e.parameter;
  
  // Add headers if this is the first row
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 10).setValues([[
      'Timestamp', 'Name', 'Phone', 'Email', 'Property Type', 
      'Budget', 'Location', 'Message', 'Lead Type', 'Source'
    ]]);
  }
  
  // Add the form data
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.phone,
    data.email,
    data.propertyType,
    data.budget,
    data.location,
    data.message,
    data.leadType,
    data.source
  ]);
  
  return ContentService.createTextOutput('Success');
}

4. Save and deploy as web app
5. Copy the web app URL and replace 'YOUR_SCRIPT_ID_HERE' in the JavaScript above
6. Make sure to set permissions to "Anyone" for the web app
*/