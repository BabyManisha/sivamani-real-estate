// Google Sheets Integration
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');
const contactForm = document.getElementById('contactForm');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Property filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        propertyCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission to Google Sheets
async function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Prepare data for Google Sheets
        const data = {
            timestamp: new Date().toLocaleString('en-IN'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            interest: formData.get('interest'),
            message: formData.get('message')
        };
        
        // Send to Google Sheets (you'll need to set up Google Apps Script)
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!',
            text: 'Thank you for contacting us. We will get back to you within 24 hours.',
            confirmButtonColor: '#667eea',
            confirmButtonText: 'OK'
        });
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error message
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again or contact us directly.',
            confirmButtonColor: '#e74c3c',
            confirmButtonText: 'OK'
        });
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Property viewing functions
function scheduleViewing(propertyName) {
    Swal.fire({
        title: 'Schedule Property Viewing',
        html: `
            <p>You're interested in viewing: <strong>${propertyName}</strong></p>
            <p>Please contact us to schedule a viewing:</p>
            <div style="text-align: left; margin: 20px 0;">
                <p><i class="fas fa-phone"></i> <a href="tel:+919399965595">+91 9399965595</a></p>
                <p><i class="fas fa-phone"></i> <a href="tel:+918143052789">+91 8143052789</a></p>
                <p><i class="fab fa-whatsapp"></i> <a href="https://wa.me/918143052789">WhatsApp Us</a></p>
            </div>
        `,
        icon: 'info',
        confirmButtonColor: '#667eea',
        confirmButtonText: 'Contact Now',
        showCancelButton: true,
        cancelButtonText: 'Close'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('https://wa.me/918143052789?text=Hi, I would like to schedule a viewing for ' + encodeURIComponent(propertyName), '_blank');
        }
    });
}

function getDetails(propertyName) {
    Swal.fire({
        title: 'Property Details Request',
        html: `
            <p>You're requesting details for: <strong>${propertyName}</strong></p>
            <p>We'll send you comprehensive property information including:</p>
            <ul style="text-align: left; margin: 20px 0;">
                <li>Detailed specifications</li>
                <li>High-quality photos</li>
                <li>Location details</li>
                <li>Pricing information</li>
                <li>Legal documentation status</li>
            </ul>
            <p>Please provide your contact details:</p>
            <input id="swal-name" class="swal2-input" placeholder="Your Name" required>
            <input id="swal-phone" class="swal2-input" placeholder="Your Phone Number" required>
        `,
        icon: 'info',
        confirmButtonColor: '#667eea',
        confirmButtonText: 'Send Details',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const phone = document.getElementById('swal-phone').value;
            
            if (!name || !phone) {
                Swal.showValidationMessage('Please fill in all fields');
                return false;
            }
            
            return { name, phone };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Send details request to Google Sheets
            const data = {
                timestamp: new Date().toLocaleString('en-IN'),
                name: result.value.name,
                phone: result.value.phone,
                interest: 'Property Details Request',
                message: `Requesting details for: ${propertyName}`
            };
            
            // You can implement the Google Sheets submission here
            Swal.fire({
                icon: 'success',
                title: 'Request Sent!',
                text: 'We will send you detailed information about this property within 2 hours.',
                confirmButtonColor: '#667eea'
            });
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeInUp');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Property card hover effects
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Service card animations
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial card effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Contact form validation
contactForm.addEventListener('input', (e) => {
    const input = e.target;
    const value = input.value.trim();
    
    if (input.hasAttribute('required') && !value) {
        input.style.borderColor = '#e74c3c';
    } else {
        input.style.borderColor = '#e1e8ed';
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+91 ' + value;
        }
        e.target.value = value;
    });
}

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#e74c3c';
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#f39c12'
            });
        } else {
            e.target.style.borderColor = '#e1e8ed';
        }
    });
}

// WhatsApp float button click tracking
document.querySelector('.whatsapp-float a').addEventListener('click', () => {
    // You can add analytics tracking here
    console.log('WhatsApp button clicked');
});

// Property filter analytics
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        console.log(`Property filter clicked: ${filter}`);
        // Add analytics tracking here
    });
});

// Smooth scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = document.createElement('button');
    scrollTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTop.className = 'scroll-to-top';
    scrollTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    if (window.scrollY > 500) {
        if (!document.querySelector('.scroll-to-top')) {
            document.body.appendChild(scrollTop);
            setTimeout(() => scrollTop.style.opacity = '1', 100);
        }
    } else {
        const existingBtn = document.querySelector('.scroll-to-top');
        if (existingBtn) {
            existingBtn.style.opacity = '0';
            setTimeout(() => existingBtn.remove(), 300);
        }
    }
});

// Add scroll to top functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('scroll-to-top')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Page load animations
window.addEventListener('load', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize any additional features
    console.log('SivaMani Real Estate website loaded successfully!');
});

// SEO and performance optimizations
// Preload critical images
const criticalImages = [
    './Images/smr.jpeg',
    './Images/logo.jpeg',
    './Images/bg.jpeg'
];

criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});

// Lazy loading for property images
const propertyImages = document.querySelectorAll('.property-image img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

propertyImages.forEach(img => {
    img.dataset.src = img.src;
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    img.classList.add('lazy');
    imageObserver.observe(img);
});

// Export functions for global access
window.scheduleViewing = scheduleViewing;
window.getDetails = getDetails;
window.submitForm = submitForm; 