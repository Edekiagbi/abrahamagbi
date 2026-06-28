/* =====================================================
   FORM VALIDATION — Abraham Portfolio
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
});

function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectInput.addEventListener('blur', () => validateSubject());
    messageInput.addEventListener('blur', () => validateMessage());

    // Clear errors on focus
    nameInput.addEventListener('focus', () => clearError(nameInput, nameError));
    emailInput.addEventListener('focus', () => clearError(emailInput, emailError));
    subjectInput.addEventListener('focus', () => clearError(subjectInput, subjectError));
    messageInput.addEventListener('focus', () => clearError(messageInput, messageError));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.classList.remove('show', 'success', 'error');

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            await submitForm();
        }
    });

    /* ==================== VALIDATION FUNCTIONS ==================== */

    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            showError(nameInput, nameError, 'Please enter your name');
            return false;
        }
        if (value.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            showError(emailInput, emailError, 'Please enter your email');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }

    function validateSubject() {
        const value = subjectInput.value.trim();
        if (!value) {
            showError(subjectInput, subjectError, 'Please enter a subject');
            return false;
        }
        if (value.length < 3) {
            showError(subjectInput, subjectError, 'Subject must be at least 3 characters');
            return false;
        }
        clearError(subjectInput, subjectError);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (!value) {
            showError(messageInput, messageError, 'Please enter your message');
            return false;
        }
        if (value.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        }
        clearError(messageInput, messageError);
        return true;
    }

    function showError(input, errorEl, message) {
        input.classList.add('is-invalid');
        errorEl.textContent = message;
    }

    function clearError(input, errorEl) {
        input.classList.remove('is-invalid');
        errorEl.textContent = '';
    }

    /* ==================== FORM SUBMISSION ==================== */

    async function submitForm() {
        // Show loading state
        btnText.classList.add('d-none');
        btnIcon.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        try {
            // Simulate API call (replace with actual endpoint)
            await simulateApiCall(formData);

            showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        } catch (error) {
            showFormStatus('error', 'Something went wrong. Please try again later.');
        } finally {
            btnText.classList.remove('d-none');
            btnIcon.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            submitBtn.disabled = false;
        }
    }

    function simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data submitted:', data);
                resolve();
            }, 1500);
        });
    }

    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = `form-status show ${type}`;
        formStatus.style.display = 'block';

        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}
