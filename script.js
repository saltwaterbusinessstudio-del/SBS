
const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Lead form handler
const sbsLeadForm = document.getElementById('leadForm');

if (sbsLeadForm) {
    sbsLeadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const f = e.target;
        const name = f.name.value.trim();
        const email = f.email.value.trim();
        const stage = f.stage.value;
        const interest = f.interest.value;
        const timeline = f.timeline.value;
        const presence = f.presence.value.trim();
        const message = f.message.value.trim();

        const subject = 'New inquiry: ' + name + ' — ' + interest;
        const bodyLines = [
            'Name: ' + name,
            'Email: ' + email,
            'Describes them as: ' + stage,
            'Interested in: ' + interest,
            'Timeline: ' + timeline,
            'Current online presence: ' + (presence || 'Not provided'),
            '',
            'Message:',
            message || '(none)'
        ];

        const mailto =
            'mailto:hello@saltwaterbusinessstudio.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(bodyLines.join('\n'));

        window.location.href = mailto;
    });
}

// Mobile navigation
const navToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');

        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation');
        });
    });
}
