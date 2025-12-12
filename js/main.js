// main.js — updated flip + interactions
document.addEventListener('DOMContentLoaded', () => {

  /* YEAR ---------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* MOBILE NAV ----------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');

      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '8px';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
      }
    });
  }


  /* SMOOTH SCROLL + ACTIVE NAV -------- */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const section = document.querySelector(href);

      if (section) section.scrollIntoView({ behavior: 'smooth' });

      document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
      link.classList.add('active');

      if (window.innerWidth <= 900 && navLinks) navLinks.style.display = '';
    });
  });


  /* TYPING EFFECT ---------------------- */
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const fullText = typingEl.textContent.trim();
    typingEl.textContent = "";
    let i = 0;

    const type = setInterval(() => {
      typingEl.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(type);
    }, 45);
  }


  /* ROTATING ROLES --------------------- */
  const roles = [
    "Aspiring Software Engineer",
    "Full-Stack Developer",
    "Data Science Enthusiast",
    "Coder and Problem Solver",
    "Tech Explorer"
  ];

  let roleIndex = 0;
  const roleEl = document.getElementById("roleText");

  function rotateRole() {
    if (!roleEl) return;
    roleEl.classList.add("fade-out");
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.textContent = roles[roleIndex];
      roleEl.classList.remove("fade-out");
    }, 480);
  }

  setInterval(rotateRole, 2500);


  /* REVEAL ELEMENTS ON SCROLL ---------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('revealed');
        observer.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* FLIP CARD LOGIC (desktop hover + mobile tap + keyboard) */
  function toggleFlip(card, forceState) {
    // forceState: true = flip, false = unflip, undefined = toggle
    if (typeof forceState === 'boolean') {
      if (forceState) card.classList.add('is-flipped');
      else card.classList.remove('is-flipped');
      return;
    }
    card.classList.toggle('is-flipped');
  }

  document.querySelectorAll('.project-card, .intern-card').forEach(card => {
    // enable keyboard activation
    card.setAttribute('tabindex', card.getAttribute('tabindex') || '0');

    // mobile / click: toggle flip
    card.addEventListener('click', (e) => {
      // if clicked on a link inside, don't toggle
      if (e.target.closest('a')) return;
      if (window.innerWidth <= 900) {
        toggleFlip(card);
      }
    });

    // keyboard: Enter / Space toggles
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip(card);
      } else if (e.key === 'Escape') {
        toggleFlip(card, false);
      }
    });

    // prevent hover conflict on touch devices: remove hover flip
    card.addEventListener('touchstart', () => {
      // small delay to allow tap to register
      setTimeout(()=> { card.classList.remove('is-flipped'); }, 1200);
    });

    // ensure a click outside unflips any flipped card (mobile)
    document.addEventListener('click', (ev) => {
      if (window.innerWidth <= 900) {
        if (!ev.target.closest('.project-card') && !ev.target.closest('.intern-card')) {
          document.querySelectorAll('.project-card.is-flipped, .intern-card.is-flipped')
            .forEach(c => c.classList.remove('is-flipped'));
        }
      }
    });
  });


  /* CONTACT FORM (SIMULATION) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (status) status.textContent = "Sending...";
      setTimeout(() => {
        if (status) status.textContent = "Message sent — Thank you!";
        form.reset();
        setTimeout(() => { if (status) status.textContent = ""; }, 2500);
      }, 900);
    });
  }

});
