/* ================= MAIN ================= */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('done'), 900);
  });
  // Fallback in case load fires before DOMContentLoaded listener attached
  setTimeout(() => preloader && preloader.classList.add('done'), 2500);

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const scrollBar = document.getElementById('scrollProgressBar');
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

    // Active link highlighting
    let current = sections[0]?.id;
    for (const s of sections) {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    })
  );

  /* ---------- Typewriter ---------- */
  const phrases = [
    'Machine Learning Engineer',
    'Explainable AI (XAI) Practitioner',
    'Full-Stack ML Deployer',
    'Data Storyteller',
    'Problem Solver'
  ];
  const typeEl = document.getElementById('typewriter');
  let pi = 0, ci = 0, deleting = false;
  (function type() {
    const word = phrases[pi];
    typeEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 85;
    if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    else ci += deleting ? -1 : 1;
    setTimeout(type, delay);
  })();

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFloat = !Number.isInteger(target);
      const dur = 1600; const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ---------- 3D tilt ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-tilt], input').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ---------- Contact form (FormSubmit.co + mailto fallback) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('formStatus');
    const submitBtn = document.getElementById('cfSubmit');
    const btnLabel = submitBtn.querySelector('.btn-label');
    const ENDPOINT = contactForm.getAttribute('action');
    // formsubmit.co/<email> endpoints are always "configured" — no form ID needed
    const isConfigured = /formsubmit\.co\/.+@/.test(ENDPOINT) || !ENDPOINT.includes('YOUR_FORM_ID');

    const setStatus = (text, cls) => {
      statusEl.textContent = text;
      statusEl.className = 'form-status ' + (cls || '');
    };

    const mailtoFallback = () => {
      const d = new FormData(contactForm);
      const subject = encodeURIComponent(d.get('_subject') || 'Portfolio contact');
      const body = encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`);
      window.location.href = `mailto:rnegilxm16@gmail.com?subject=${subject}&body=${body}`;
    };

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!isConfigured) {
        setStatus('Opening your email app — just hit send! ✉️', 'sending');
        mailtoFallback();
        return;
      }
      submitBtn.disabled = true;
      btnLabel.textContent = 'Sending...';
      setStatus('Sending your message...', 'sending');
      try {
        const payload = {};
        new FormData(contactForm).forEach((v, k) => { payload[k] = v; });
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === 'true' || data.success === true || !('success' in data))) {
          contactForm.reset();
          setStatus('✅ Message sent! Rohit will get back to you soon.', 'success');
        } else {
          setStatus('⚠️ Could not send — opening your email app instead.', 'error');
          mailtoFallback();
        }
      } catch {
        setStatus('⚠️ Network error — opening your email app instead.', 'error');
        mailtoFallback();
      } finally {
        submitBtn.disabled = false;
        btnLabel.textContent = 'Send Message 🚀';
      }
    });
  }

  /* ---------- Particle network ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], rafId;
  const COUNT = () => Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000));

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  function initParticles() {
    particles = Array.from({ length: COUNT() }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
      r: Math.random() * 1.8 + 0.6
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 210, 255, 0.55)';
      ctx.fill();
    }
    // connective lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const a = (1 - Math.sqrt(d2) / 140) * 0.18;
          ctx.strokeStyle = `rgba(108, 92, 231, ${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(tick);
  }
  // Respect reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resize(); initParticles(); tick();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else tick();
    });
  }
});
