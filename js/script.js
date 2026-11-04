const openConsultationBtn = document.getElementById('openConsultationBtn');
const registerTrainingBtn = document.getElementById('registerTrainingBtn');
const closeConsultationModal = document.getElementById('closeConsultationModal');
const cancelConsultationBtn = document.getElementById('cancelConsultationBtn');
const consultModal = document.getElementById('consultModal');
const consultationForm = document.getElementById('consultationForm');
const consultationStatus = document.getElementById('consultationStatus');
const submitConsultationBtn = document.getElementById('submitConsultationBtn');

const openContactOptionsBtn = document.getElementById('openContactOptionsBtn');
const closeContactOptionsModal = document.getElementById('closeContactOptionsModal');
const contactOptionsModal = document.getElementById('contactOptionsModal');

const consultationEmail = 'magadh.hind@gmail.com';
let requestType = 'consultation';

const openModal = (type = 'consultation') => {
    requestType = type;
    consultModal.classList.add('active');
    consultModal.setAttribute('aria-hidden', 'false');
    consultationStatus.textContent = '';
    consultationStatus.className = 'form-status';
};

const closeModal = () => {
    consultModal.classList.remove('active');
    consultModal.setAttribute('aria-hidden', 'true');
};

const openContactOptions = () => {
    contactOptionsModal.classList.add('active');
    contactOptionsModal.setAttribute('aria-hidden', 'false');
};

const closeContactOptions = () => {
    contactOptionsModal.classList.remove('active');
    contactOptionsModal.setAttribute('aria-hidden', 'true');
};

openConsultationBtn.addEventListener('click', () => openModal('consultation'));
registerTrainingBtn.addEventListener('click', () => openModal('training'));
closeConsultationModal.addEventListener('click', closeModal);
cancelConsultationBtn.addEventListener('click', closeModal);
openContactOptionsBtn.addEventListener('click', openContactOptions);
closeContactOptionsModal.addEventListener('click', closeContactOptions);
consultModal.addEventListener('click', (event) => {
    if (event.target === consultModal) {
        closeModal();
    }
});
contactOptionsModal.addEventListener('click', (event) => {
    if (event.target === contactOptionsModal) {
        closeContactOptions();
    }
});

if (!window.emailjs) {
    console.error('EmailJS library did not load.');
} else {
    emailjs.init({ publicKey: '-9XYATwPvbqzvrCn8' });
}

const showStatus = (message, type, fallbackUrl = '') => {
    consultationStatus.className = `form-status ${type}`;
    consultationStatus.replaceChildren(document.createTextNode(message));

    if (fallbackUrl) {
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.textContent = 'Email us directly';
        consultationStatus.append(' ', link);
    }
};

consultationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const mobile = document.getElementById('consultMobile').value.trim();
    const address = document.getElementById('consultAddress').value.trim();
    const isTrainingRequest = requestType === 'training';
    const requestLabel = isTrainingRequest ? 'Software Training and Internship Registration' : 'Consultation Request';

    const templateParams = {
        title: requestLabel,
        request_type: requestLabel,
        name,
        email,
        mobile,
        address,
        message: `${requestLabel} details:\nMobile: ${mobile}\nAddress: ${address}`,
        to_email: consultationEmail
    };

    const mailtoUrl = `mailto:${consultationEmail}?subject=${encodeURIComponent(requestLabel)}&body=${encodeURIComponent(
        `Request type: ${requestLabel}\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}`
    )}`;

    if (!window.emailjs) {
        showStatus('We could not load the email service.', 'error', mailtoUrl);
        return;
    }

    submitConsultationBtn.disabled = true;
    submitConsultationBtn.textContent = 'Sending…';
    showStatus('Sending your request…', 'pending');

    try {
        await emailjs.send('service_8ciyex8', 'template_pm9a967', templateParams);
        consultationForm.reset();
        showStatus('Thanks for contacting us. We will get in touch soon.', 'success');
    } catch (error) {
        console.error('EmailJS error:', error);
        const reason = error?.text || error?.message || (error?.status ? `Request status: ${error.status}` : 'Unknown error');
        showStatus(`We could not send your request right now: ${reason}`, 'error', mailtoUrl);
    } finally {
        submitConsultationBtn.disabled = false;
        submitConsultationBtn.textContent = 'Submit Request';
    }
});
