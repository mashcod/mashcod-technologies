const siteHeader = document.querySelector('header');
const updateHeaderHeight = () => {
    if (siteHeader) {
        document.documentElement.style.setProperty('--header-height', `${siteHeader.getBoundingClientRect().height}px`);
    }
};

updateHeaderHeight();
if (siteHeader && 'ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(siteHeader);
} else {
    window.addEventListener('resize', updateHeaderHeight);
}

const languageToggleBtn = document.getElementById('languageToggleBtn');
const hindiText = {
    '.pricing-offer span': ['ऑफ़र'],
    '.pricing-announcement-copy > div:first-child': ['अपने व्यवसाय के लिए वेबसाइट/सॉफ्टवेयर पैकेज केवल ₹5,000 से शुरू होने वाली कीमतों पर पाएं और जीवनभर निःशुल्क उपयोग करें।'],
    '.pricing-call-button': ['कॉल'],
    'header nav a': ['होम', 'हमारे बारे में', 'सेवाएँ', 'प्रोजेक्ट', 'गैलरी', 'संपर्क'],
    '.hero-panel:first-child .badge': ['विश्वसनीय सॉफ्टवेयर सलाहकार'],
    '.hero-panel:first-child h1': ['अपने संस्थान या व्यवसाय के लिए वेबसाइट और सॉफ्टवेयर बनवाएँ'],
    '.hero-panel:first-child p': ['हम ऐसे नए सॉफ्टवेयर परामर्श और तकनीकी समाधान देते हैं जो व्यवसायों के विचारों को प्रभावशाली डिजिटल उत्पादों में बदलते हैं। हमारी अनुभवी टीम कस्टम सॉफ्टवेयर डेवलपमेंट, एआई आधारित समाधान, क्लाउड परामर्श और ऑटोमेशन के साथ आपके लिए विस्तार योग्य और भविष्य के लिए तैयार सिस्टम बनाती है।'],
    '#openConsultationBtn': ['परामर्श बुक करें'],
    '.training-panel .badge': ['रोज़गार के लिए तैयार कौशल सीखें'],
    '.training-panel h2': ['विद्यार्थियों के लिए सॉफ्टवेयर प्रशिक्षण और इंटर्नशिप'],
    '.training-panel p': ['सॉफ्टवेयर उद्योग के अनुभवी विशेषज्ञों से प्रशिक्षण लें। Java, Spring Boot, SQL, React, HTML, CSS, JavaScript, Salesforce, IntelliJ, Maven, Gradle, Git, GitHub, डेटाबेस, बैकएंड, फ्रंटएंड और फुल स्टैक विकास में विशेष प्रशिक्षण उपलब्ध है। समर और विंटर की इंटर्नशिप, नौकरी के लिए तैयार कौशल, प्लेसमेंट सहायता तथा एआई और एमएल का प्रशिक्षण भी उपलब्ध है।'],
    '#registerTrainingBtn': ['रजिस्टर करें'],
    '.hero-buttons .openContactOptionsBtn': ['पूछताछ', 'पूछताछ'],
    '#about .container > h2': ['हमारे बारे में'],
    '#about .section-text': ['अनुभवी उद्योग विशेषज्ञों वाला सॉफ्टवेयर परामर्श और प्रशिक्षण संस्थान। हम आपके व्यवसाय को वैश्विक बनाने के लिए सॉफ्टवेयर समाधान और सॉफ्टवेयर इंजीनियरों तथा विद्यार्थियों के लिए उद्योग आधारित प्रशिक्षण प्रदान करते हैं।'],
    '.experts-section > h3': ['हमारे विशेषज्ञों से मिलें'],
    '.expert-card .expert-role': ['क्यूए प्रमुख · टेस्टिंग प्रमुख', 'जावा डेवलपर', 'रिएक्ट डेवलपर · सेल्सफोर्स डेवलपर', 'सलाहकार · प्रोफेसर', 'सलाहकार · प्रशिक्षक', 'विशेषज्ञ प्रोग्रामर', 'परामर्शदाता और प्रशिक्षक'],
    '.expert-card ul li': [
        '10 वर्षों का अनुभव (Accenture, Impetus)', 'बी.टेक, KIIT Odisha',
        '8 वर्षों का अनुभव (TCS, Capgemini, Accenture, Infosys)', 'एम.टेक, BITS Pilani, Rajasthan', 'एआई और एमएल',
        '5 वर्षों का अनुभव (Accenture, Infosys)', 'बी.टेक, LPU, Punjab', 'कंप्यूटर विज्ञान',
        '5 वर्षों का अनुभव (BCA/B.Tech/MCA प्रोफेसर, NIMT Noida, Janhit Institute Noida)', 'पीएच.डी., IGNOU, New Delhi',
        '5 वर्षों का अनुभव (DAV, Patna)', 'एम.ए., Nalanda University, Bihar',
        '5 वर्षों का अनुभव (विशेषज्ञ प्रोग्रामर)', 'बी.टेक, IEM Kolkata', 'कंप्यूटर विज्ञान',
        '5 वर्षों का अनुभव (परामर्शदाता)', 'बी.ए., Patliputra University'
    ],
    '#services .container > h2': ['हमारी सेवाएँ'],
    '#services .card h3': ['वेबसाइट और सॉफ्टवेयर विकास', 'प्रशिक्षण', 'व्यवसाय योजना', 'मार्केटिंग सहायता'],
    '#services .card p': [
        'वेबसाइट, ऐप और सॉफ्टवेयर के साथ अपने व्यवसाय को वैश्विक बनाएँ। रोज़मर्रा के कागज़ी कामों को डिजिटल करें।',
        'सॉफ्टवेयर उद्योग के अनुभवी पेशेवरों से सॉफ्टवेयर प्रशिक्षण और इंटर्नशिप।',
        'अपने व्यवसाय की डिजिटल उपस्थिति की योजना बनाने और रोज़मर्रा के कागज़ी काम को स्वचालित करने में सहायता।',
        'SEO, डिजिटल मार्केटिंग और सोशल मीडिया मार्केटिंग से दुनिया भर के ग्राहक पाएँ।'
    ],
    '.stats-grid p': ['उद्योग की ज़रूरतों के अनुसार तैयार प्रशिक्षण पाठ्यक्रम', 'प्रोजेक्ट', 'वर्षों का अनुभव', 'ग्राहक संतुष्टि'],
    '#projects .container > h2': ['प्रमुख प्रोजेक्ट'],
    '#projects .project h3': ['वेबसाइट', 'प्रशिक्षण केंद्र', 'सॉफ्टवेयर ऐप'],
    '#projects .project p': ['स्कूल, कॉलेज और व्यवसायों के लिए वेबसाइट।', 'Bihta, Noida और Kolkata।', 'स्कूल और कॉलेज के लिए ERP तथा व्यवसायों के लिए वेबसाइट।'],
    '#gallery .container > h2': ['गैलरी'],
    '.gallery-grid img': ['गैलरी फ़ोटो 1', 'गैलरी फ़ोटो 2', 'गैलरी फ़ोटो 3', 'गैलरी फ़ोटो 4', 'गैलरी फ़ोटो 5', 'गैलरी फ़ोटो 7'],
    '.testimonial h2': ['ग्राहक की समीक्षा'],
    '.testimonial blockquote': ['"वेबसाइट की मदद से घर बैठे दुनिया भर से ग्राहक मिले।"'],
    '.cta h2': ['अपने व्यवसाय को वैश्विक बनाने के लिए तैयार हैं?'],
    '.cta p': ['आज ही हमारे विशेषज्ञों से संपर्क करें और अपने व्यवसाय को आगे बढ़ाएँ।'],
    '#openContactOptionsBtn': ['संपर्क करें'],
    '#contactOptionsTitle': ['संपर्क करें'],
    '.contact-options-content > p': ['हमारी टीम से जुड़ने का तरीका चुनें।'],
    '.contact-options-actions a': ['ईमेल', 'व्हाट्सऐप', 'कॉल'],
    '#closeContactOptionsModal': ['×'],
    '#closeConsultationModal': ['×'],
    '#consultModal h3': ['परामर्श बुक करें'],
    '#consultModal .modal-content > p': ['अपनी जानकारी साझा करें, हम जल्द ही आपसे संपर्क करेंगे।'],
    'label[for="consultName"]': ['नाम'],
    'label[for="consultEmail"]': ['ईमेल'],
    'label[for="consultMobile"]': ['मोबाइल नंबर'],
    'label[for="consultAddress"]': ['पता'],
    '#cancelConsultationBtn': ['रद्द करें'],
    '#submitConsultationBtn': ['अनुरोध भेजें'],
    '.footer-grid > div:nth-child(1) p': ['सॉफ्टवेयर कंपनी और प्रशिक्षण'],
    '.footer-grid > div:nth-child(2) h3': ['त्वरित लिंक'],
    '.footer-grid > div:nth-child(2) a': ['होम', 'हमारे बारे में', 'सेवाएँ', 'गैलरी'],
    '.footer-grid > div:nth-child(3) h3': ['संपर्क'],
    '.copyright': ['© 2026 SoftwareCo. सर्वाधिकार सुरक्षित।']
};

const originalTranslations = new Map();
const originalAttributes = new Map();
const originalTitle = document.title;
const originalDescription = document.querySelector('meta[name="description"]')?.content || '';
const hindiPlaceholders = {
    '#consultName': 'अपना पूरा नाम लिखें',
    '#consultEmail': 'you@example.com',
    '#consultMobile': '+91 98765 43210',
    '#consultAddress': 'अपना पता लिखें'
};

let currentLanguage = 'en';
let lastStatus = null;
const setLanguage = (language) => {
    currentLanguage = language;
    Object.entries(hindiText).forEach(([selector, translations]) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (!originalTranslations.has(element)) originalTranslations.set(element, element.textContent);
            if (language === 'hi' && translations[index] !== undefined) element.textContent = translations[index];
            else if (language === 'en') element.textContent = originalTranslations.get(element);
        });
    });
    Object.entries(hindiPlaceholders).forEach(([selector, translation]) => {
        const element = document.querySelector(selector);
        if (!element) return;
        if (!originalAttributes.has(element)) originalAttributes.set(element, element.getAttribute('placeholder'));
        element.setAttribute('placeholder', language === 'hi' ? translation : originalAttributes.get(element));
    });
    document.documentElement.lang = language;
    document.body.classList.toggle('lang-hi', language === 'hi');
    document.title = language === 'hi' ? 'मैशकॉड टेक्नोलॉजीज़ और प्रशिक्षण' : originalTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = language === 'hi'
        ? 'सॉफ्टवेयर परामर्श, प्रशिक्षण और विकास सेवाएँ'
        : originalDescription;
    languageToggleBtn.textContent = language === 'hi' ? 'English' : 'हिन्दी';
    languageToggleBtn.setAttribute('aria-label', language === 'hi' ? 'भाषा को अंग्रेज़ी में बदलें' : 'वेबसाइट की भाषा हिंदी में बदलें');
    document.querySelector('.pricing-offer')?.setAttribute('aria-label', language === 'hi' ? 'ऑफ़र' : 'Offer');
    if (lastStatus) showStatus(...lastStatus);
    updateHeaderHeight();
};

languageToggleBtn.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'hi' : 'en'));

const openConsultationBtn = document.getElementById('openConsultationBtn');
const registerTrainingBtn = document.getElementById('registerTrainingBtn');
const closeConsultationModal = document.getElementById('closeConsultationModal');
const cancelConsultationBtn = document.getElementById('cancelConsultationBtn');
const consultModal = document.getElementById('consultModal');
const consultationForm = document.getElementById('consultationForm');
const consultationStatus = document.getElementById('consultationStatus');
const submitConsultationBtn = document.getElementById('submitConsultationBtn');

const openContactOptionsBtns = document.querySelectorAll('.openContactOptionsBtn');
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
openContactOptionsBtns.forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    openContactOptions();
}));
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
    lastStatus = [message, type, fallbackUrl];
    consultationStatus.className = `form-status ${type}`;
    const statusTranslations = {
        'We could not load the email service.': 'ईमेल सेवा लोड नहीं हो सकी।',
        'Sending your request…': 'आपका अनुरोध भेजा जा रहा है…',
        'Thanks for contacting us. We will get in touch soon.': 'संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।'
    };
    let displayMessage = currentLanguage === 'hi' ? (statusTranslations[message] || message) : message;
    if (currentLanguage === 'hi' && message.startsWith('We could not send your request right now:')) {
        displayMessage = `अभी आपका अनुरोध नहीं भेजा जा सका: ${message.slice('We could not send your request right now:'.length).trim()}`;
    }
    consultationStatus.replaceChildren(document.createTextNode(displayMessage));

    if (fallbackUrl) {
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.textContent = currentLanguage === 'hi' ? 'हमें सीधे ईमेल करें' : 'Email us directly';
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
    submitConsultationBtn.textContent = currentLanguage === 'hi' ? 'भेजा जा रहा है…' : 'Sending…';
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
        submitConsultationBtn.textContent = currentLanguage === 'hi' ? 'अनुरोध भेजें' : 'Submit Request';
    }
});
