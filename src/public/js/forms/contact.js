/**
* Contact Form Functionality
*/

// Containers
const contactForm = document.getElementById('contact')
const success = document.getElementById('success')
const errorEl = document.getElementById('error')
const submitButton = document.getElementById('submit')

// Hide Container Function
const hideAllContainers = () => {
    success.style.display = 'none'
    errorEl.style.display = 'none'
}

// Contact Form Submit Handler
const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
        submitButton.classList.add('loading');
        contact.classList.add('animate-pulse');

        const { name, email, message } = e.target;
        const body = {
            name: name.value,
            email: email.value,
            message: message.value,
        }
        console.log("email.value: " + email.value)
        const response = await fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) throw response;
        hideAllContainers()
        submitButton.style.display = 'none'
        contactForm.classList.remove('animate-pulse');
        success.style.display = 'block';
    } catch (error) {
        hideAllContainers()
        submitButton.style.display = 'none'
        errorEl.style.display = 'flex'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hideAllContainers();
    contactForm.style.display = 'flex';
    contactForm.addEventListener("submit", handleContactFormSubmit);
});
