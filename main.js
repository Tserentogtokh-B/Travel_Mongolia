/* ===============================
  MONGOLIA TRAVEL — MAIN SCRIPT
  =============================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  const animateCursor = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll('a, button, .tour-card, .gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });

  /* ── Navbar Scroll ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 200);
  });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  /* ── Staggered Reveal for groups ── */
  document.querySelectorAll('[data-stagger]').forEach((group, gi) => {
    group.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current = Math.min(current + step, target);
          entry.target.textContent = Math.floor(current).toLocaleString() + (entry.target.dataset.suffix || '');
          if (current < target) requestAnimationFrame(update);
        };
        update();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ── Testimonials Slider ── */
  const testimonials = [
    {
      quote: "Тал нутгийн нар мандахыг харах мөч насан туршийн дурсамж боллоо. Багийн зохион байгуулалт үнэхээр сайн.",
      author: "Номин Б. — Сөүл",
      stars: 5
    },
    {
      quote: "Говийн аяллын одтой шөнө, манхан дээрх салхи мартагдашгүй. Удирдагч маш мэргэжлийн байлаа.",
      author: "Бат Э. — Берлин",
      stars: 5
    },
    {
      quote: "Хөвсгөл нуурын тунгалаг ус, тайгын үнэр үнэхээр гайхалтай. Дахин очих хүсэл төрсөн.",
      author: "Саран Т. — Сингапур",
      stars: 5
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.querySelector('.testimonial-quote');
  const authorEl = document.querySelector('.testimonial-author');
  const dotsEl = document.querySelectorAll('.t-dot');

  const updateTestimonial = (idx) => {
    if (!quoteEl) return;
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = testimonials[idx].quote;
      authorEl.textContent = '— ' + testimonials[idx].author;
      quoteEl.style.opacity = '1';
      dotsEl.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 300);
  };

  dotsEl.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      updateTestimonial(i);
    });
  });

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  }, 5000);

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0'; navLinks.style.right = '0';
    navLinks.style.background = 'rgba(13,13,13,0.98)';
    navLinks.style.padding = '1.5rem 3rem';
    navLinks.style.gap = '1.25rem';
  });

  /* ── Video Modal Placeholder ── */
  const playBtn = document.querySelector('.video-play-btn');
  playBtn?.addEventListener('click', () => {
    alert('🎬 Энд видео тоглогч нээгдэнэ. Бодит орчинд YouTube/Vimeo-ийн холбоосоо src-д тохируулаарай.');
  });

  /* ── Parallax Hero Text ── */
  const heroTitle = document.querySelector('.hero-title');
  window.addEventListener('scroll', () => {
    if (!heroTitle) return;
    const scrolled = window.scrollY;
    heroTitle.style.transform = `translateY(${scrolled * 0.25}px)`;
  });

  /* ── Tour Card Hover tilt ── */
  document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Form Submit ── */
  const form = document.querySelector('.book-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    btn.textContent = '✓ Хүсэлт илгээлээ!';
    btn.style.background = '#1C7C3A';
    setTimeout(() => {
      btn.textContent = 'Захиалах';
      btn.style.background = '';
    }, 3000);
  });

});
