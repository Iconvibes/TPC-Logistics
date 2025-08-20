document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const serviceSelect = document.getElementById('service');
    const cowOptionsDiv = document.getElementById('cowOptions');
    const cowTypeSelect = document.getElementById('cowType');

    if (serviceSelect) {
        serviceSelect.addEventListener('change', function () {
            if (serviceSelect.value === 'Cow Sales') {
                cowOptionsDiv.style.display = 'block';
                cowTypeSelect.required = true;
            } else {
                cowOptionsDiv.style.display = 'none';
                cowTypeSelect.required = false;
                cowTypeSelect.value = '';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const service = serviceSelect.value;
            const message = document.getElementById('message').value.trim();
            let cowType = '';

            if (service === 'Cow Sales') {
                cowType = cowTypeSelect.value;
            }

            const phoneNumber = '2348022550250';
            let text = `Hello, my name is ${name}. I need "${service}".`;

            if (service === 'Cow Sales' && cowType) {
                text += ` Cow Option: ${cowType}.`;
            }

            text += ` Message: ${message}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});