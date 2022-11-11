/**
* Form Functionality
*/

// Containers
const contactForm = document.getElementById('contact');
const emailForm = document.getElementById('email');
const loading = document.getElementById('loading');
const success = document.getElementById('success');
const errorEl = document.getElementById('error');

// Hide Container Function
const hideAllContainers = () => {
    contactForm.style.display = 'none';
    emailForm.style.display = 'none';
    loading.style.display = 'none';
    success.style.display = 'none';
    errorEl.style.display = 'none';
}

// Contact Form Submit Handler
const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
        contactForm.classList.add('animate-pulse');
        loading.style.display = 'block';
        const { name, email, message } = e.target;
        const body = {
            name: name.value,
            email: email.value,
            message: message.value,
        }
        const response = await fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) throw response;
        hideAllContainers();
        contactForm.classList.remove('animate-pulse');
        success.style.display = 'block';
    } catch (error) {
        hideAllContainers();
        errorEl.style.display = 'flex';
    }
}

// Email Form Submit Handler
const handleEmailFormSubmit = async (e) => {
    e.preventDefault();
    try {
        emailForm.classList.add('animate-pulse');
        loading.style.display = 'block';
        const { email } = e.target;
        const body = {
            email: email.value,
        }
        const response = await fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) throw response;
        //hideAllContainers();
        emailForm.classList.remove('animate-pulse');
        success.style.display = 'block';
    } catch (error) {
        //hideAllContainers();
        errorEl.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //hideAllContainers();
    //contactForm.style.display = 'flex';
    emailForm.style.display = 'flex';
    //contactForm.addEventListener("submit", handleContactFormSubmit);
    emailForm.addEventListener("submit", handleEmailFormSubmit);
});
