document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var f = e.target;
    var name = f.name.value.trim();
    var email = f.email.value.trim();
    var stage = f.stage.value;
    var interest = f.interest.value;
    var timeline = f.timeline.value;
    var presence = f.presence.value.trim();
    var message = f.message.value.trim();

    var subject = 'New inquiry: ' + name + ' — ' + interest;
    var bodyLines = [
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
    var body = bodyLines.join('\n');
    var mailto = 'mailto:hello@saltwaterbusinessstudio.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
  });
  const navToggle = document.querySelector(".nav-mobile-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", isOpen);
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}