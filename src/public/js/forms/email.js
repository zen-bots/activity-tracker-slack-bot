/**
* Email Form Functionality
*/

// Containers
const emailForm = document.getElementById('email');
const loading = document.getElementById('loading');
const success = document.getElementById('success');
const errorEl = document.getElementById('error');

// Hide Container Function
const hideAllContainers = () => {
    emailForm.style.display = 'none';
    loading.style.display = 'none';
    success.style.display = 'none';
    errorEl.style.display = 'none';
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
        console.log("email.value: " + email.value)
        const response = await fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.status !== 200) throw response;
        hideAllContainers();        
        emailForm.classList.remove('animate-pulse');
        success.style.display = 'block';
    } catch (error) {
        hideAllContainers();
        errorEl.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hideAllContainers();
    emailForm.style.display = 'flex';
    emailForm.addEventListener("submit", handleEmailFormSubmit);
});
