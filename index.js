document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('contactForm');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
        
                    const name = document.getElementById('name').value.trim();
                    const service = document.getElementById('service').value;
                    const message = document.getElementById('message').value.trim();
        
                    // Replace with your WhatsApp number (in international format, no + or spaces)
                    const phoneNumber = '2348022550250';
        
                    // Build the WhatsApp message
                    const text = `Hello, my name is ${name}. I'm interested in your "${service}" service. ${message}`;
        
                    // Encode the message for URL
                    const encodedText = encodeURIComponent(text);
        
                    // WhatsApp API URL
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        
                    // Open WhatsApp in a new tab
                    window.open(whatsappUrl, '_blank');
                });
            }
        });