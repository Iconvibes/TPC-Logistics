 document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            const whatsappMessage = `Hello! My name is ${name}. I'm interested in your ${service} services. ${message}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp number
            const phoneNumber = "+2348022550250";
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset the form after submission
            this.reset();
        });