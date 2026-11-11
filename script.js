/**
 * ===================================================================
 * HASINI SURESH - PERSONAL PORTFOLIO INTERACTIVITY
 * Responsive, Accessible, and Futuristic Interactions
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. HERO TYPING ANIMATION
  initHeroTyping();

  // 3. BACKGROUND CONSTELLATION CANVAS
  initBackgroundCanvas();

  // 4. NAVIGATION BAR SCROLL & SCROLLSPY
  initNavigation();

  // 5. PROJECT DETAILS MODAL & FILTERING
  initProjectFeatures();

  // 6. CERTIFICATION FILTERING
  initCertificationFilters();

  // 7. FEATURED VIDEO & SENSOR SIMULATION
  initFeaturedVideoSimulation();

  // 8. AI PORTFOLIO CHATBOT
  initPortfolioChat();

  // 9. CONTACT FORM VALIDATION & MAILTO FALLBACK
  initContactForm();

  // 10. BACK TO TOP
  initBackToTop();
});

/* ===================================================================
   HERO TYPING ANIMATION
   =================================================================== */
function initHeroTyping() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const roles = [
    'Data Science Student',
    'Aspiring Software Developer',
    'Technology Enthusiast',
    'Lifelong Learner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at end of word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ===================================================================
   BACKGROUND CANVAS (Data Science & Cyber Constellation Nodes)
   =================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  const mouse = { x: null, y: null, radius: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 55);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}

/* ===================================================================
   NAVIGATION & SCROLLSPY
   =================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ===================================================================
   PROJECTS MODAL & FILTERING
   =================================================================== */
function initProjectFeatures() {
  const filterBtns = document.querySelectorAll('.projects-filter-bar .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Setup
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  const projectDetails = {
    irrigation: {
      title: 'Smart Irrigation Monitoring System Using Sensors',
      badge: 'Hardware Prototype / Concept',
      category: 'Embedded Systems & Sensor Telemetry',
      summary:
        'An engineering project concept focused on monitoring garbage levels, soil conditions, and environmental parameters using sensors and a dedicated hardware-based system.',
      components: [
        { name: 'Arduino UNO', desc: 'Central microcontroller coordinating sensor polling and actuation signals.' },
        { name: 'HC-SR04 Ultrasonic Sensor', desc: 'Calculates distances via soundwave echo timing for capacity & soil-water levels.' },
        { name: 'L298N Motor Driver', desc: 'Dual H-bridge driver delivering regulated current to motors/pumps.' },
        { name: 'DC Geared Motors & Wheels', desc: 'Provides robotic mobility and motorized valve actuation.' },
        { name: 'Rechargeable Battery Pack', desc: 'Supplies stable 9V/12V dual-rail power to logic and drive units.' }
      ],
      flow: [
        '1. Sensor Emits Ultrasonic Pulses at 40 kHz.',
        '2. Echo reflections are captured and distance is computed via speed of sound.',
        '3. Microcontroller triggers alerts or automated valve control when thresholds are crossed.',
        '4. Actuation via L298N driver opens irrigation valves or advances the robotic unit.'
      ],
      practicality:
        'Prevents water waste in agricultural plots and eliminates overflowing garbage bins in campus municipal setups by utilizing reliable, cost-effective micro-hardware.',
      githubLink: 'https://github.com/hasinisuresh29'
    },
    nexttrip: {
      title: 'Next Trip — Tourism Promotion Platform',
      badge: 'Digital Campaign & Web Concept',
      category: 'Web Experience & Omnichannel Promotion',
      summary:
        'A comprehensive tourism-promotion project concept combining online web portals with physical and traditional promotional assets to boost regional tourism discovery.',
      components: [
        { name: 'Responsive Tourism Website', desc: 'Fast, responsive interface showcasing destination guides, local food, and cultural highlights.' },
        { name: 'Scannable Dynamic QR Codes', desc: 'Directs physical poster viewers instantly to digital destination guides and booking contacts.' },
        { name: 'Social Media Campaign Assets', desc: 'Curated visual posts, reels, and stories highlighting hidden travel gems.' },
        { name: 'Physical Marketing Collateral', desc: 'Posters and banners deployed in transit hubs, tourist information desks, and cultural centers.' }
      ],
      flow: [
        '1. Offline traveler encounters promotional poster or banner in city hubs.',
        '2. Instant smartphone scan of high-contrast QR code redirects to Next Trip landing page.',
        '3. Clean UI presents curated itineraries, budget guides, and verified local contact points.',
        '4. Social media integration enables visitor sharing and community word-of-mouth.'
      ],
      practicality:
        'Bridges the gap between traditional tourism outreach and modern web interactivity, ensuring accessibility for both tech-savvy backpackers and local travelers.',
      githubLink: 'https://github.com/hasinisuresh29'
    }
  };

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = projectDetails[pKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 18px;">
          <span class="project-status-pill status-prototype" style="position:static; display:inline-block; margin-bottom:8px;">${data.badge}</span>
          <p style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan); text-transform:uppercase;">${data.category}</p>
          <h2 id="modal-project-title" style="font-size:1.6rem; margin-top:4px;">${data.title}</h2>
        </div>

        <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:24px;">${data.summary}</p>

        <h4 style="font-size:1.05rem; margin-bottom:12px; color:var(--accent-purple-bright);">System Components & Hardware Setup:</h4>
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
          ${data.components
            .map(
              (c) => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:8px; padding:10px 14px;">
              <strong style="color:var(--text-primary);">${c.name}:</strong> 
              <span style="color:var(--text-muted); font-size:0.88rem;">${c.desc}</span>
            </div>
          `
            )
            .join('')}
        </div>

        <h4 style="font-size:1.05rem; margin-bottom:12px; color:var(--accent-cyan);">Execution Logic & Operational Flow:</h4>
        <ul style="list-style:none; padding:0; margin-bottom:24px; display:flex; flex-direction:column; gap:8px;">
          ${data.flow
            .map(
              (f) => `
            <li style="display:flex; align-items:flex-start; gap:8px; font-size:0.9rem; color:var(--text-secondary);">
              <svg style="width:16px; height:16px; color:var(--accent-cyan); flex-shrink:0; margin-top:3px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${f}</span>
            </li>
          `
            )
            .join('')}
        </ul>

        <h4 style="font-size:1.05rem; margin-bottom:8px; color:var(--text-primary);">Impact & Practical Feasibility:</h4>
        <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65; margin-bottom:26px;">${data.practicality}</p>

        <div style="display:flex; align-items:center; gap:12px; border-top:1px solid var(--border-subtle); padding-top:18px;">
          <a href="${data.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>View on GitHub</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('project-modal').classList.remove('active')">
            Close Panel
          </button>
        </div>
      `;

      modal.classList.add('active');
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/* ===================================================================
   CERTIFICATION FILTERING
   =================================================================== */
function initCertificationFilters() {
  const certFilterBtns = document.querySelectorAll('.certs-filter-bar .filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-cert-filter');

      certCards.forEach((card) => {
        const cat = card.getAttribute('data-cert-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   FEATURED VIDEO & SENSOR SIMULATION
   =================================================================== */
function initFeaturedVideoSimulation() {
  const trigger = document.getElementById('video-play-trigger');
  const overlay = document.getElementById('video-overlay');
  const simCanvas = document.getElementById('simulation-canvas');
  if (!trigger || !simCanvas) return;

  let animId = null;

  trigger.addEventListener('click', () => {
    overlay.style.display = 'none';
    simCanvas.style.display = 'block';

    startSimulation();
  });

  function startSimulation() {
    const ctx = simCanvas.getContext('2d');
    const w = (simCanvas.width = simCanvas.parentElement.clientWidth);
    const h = (simCanvas.height = simCanvas.parentElement.clientHeight);

    let distance = 35; // cm
    let direction = -0.4;
    let waveRadius = 0;
    let motorActive = false;

    function draw() {
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Title & Telemetry Header
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('ARDUINO UNO + HC-SR04 SENSOR TELEMETRY SIMULATION', 30, 40);

      // Update distance oscillation
      distance += direction;
      if (distance <= 8) {
        direction = 0.3;
        motorActive = true;
      } else if (distance >= 45) {
        direction = -0.3;
        motorActive = false;
      }

      if (distance < 15) motorActive = true;
      else motorActive = false;

      // Draw Sensor Unit (HC-SR04)
      const sensorX = 100;
      const sensorY = h / 2 - 20;

      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.fillRect(sensorX - 40, sensorY - 20, 80, 50);
      ctx.strokeRect(sensorX - 40, sensorY - 20, 80, 50);

      // Transducer eyes
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.arc(sensorX - 20, sensorY + 5, 12, 0, Math.PI * 2);
      ctx.arc(sensorX + 20, sensorY + 5, 12, 0, Math.PI * 2);
      ctx.fill();

      // Emitted Ultrasonic Waves
      waveRadius = (waveRadius + 3) % (distance * 7 + 40);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sensorX + 20, sensorY + 5, waveRadius, -Math.PI / 4, Math.PI / 4);
      ctx.stroke();

      // Target Object (Water / Soil / Waste Level)
      const targetX = sensorX + distance * 7 + 30;
      ctx.fillStyle = motorActive ? 'rgba(239, 68, 68, 0.35)' : 'rgba(16, 185, 129, 0.3)';
      ctx.strokeStyle = motorActive ? '#ef4444' : '#10b981';
      ctx.lineWidth = 3;
      ctx.fillRect(targetX, 80, 40, h - 160);
      ctx.strokeRect(targetX, 80, 40, h - 160);

      // Telemetry Data Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(w - 280, 70, 250, 180);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.strokeRect(w - 280, 70, 250, 180);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '14px sans-serif';
      ctx.fillText('Live Sensor Metrics:', w - 260, 95);

      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Target Distance: ${distance.toFixed(1)} cm`, w - 260, 125);

      ctx.fillStyle = '#a78bfa';
      ctx.fillText(`Threshold Limit: 15.0 cm`, w - 260, 150);

      ctx.fillStyle = motorActive ? '#f87171' : '#34d399';
      ctx.fillText(`L298N Motor: ${motorActive ? 'ACTIVE (Pumping)' : 'IDLE (Holding)'}`, w - 260, 178);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Click to return to overview', w - 260, 225);

      animId = requestAnimationFrame(draw);
    }

    draw();

    simCanvas.onclick = () => {
      cancelAnimationFrame(animId);
      simCanvas.style.display = 'none';
      overlay.style.display = 'flex';
    };
  }
}

/* ===================================================================
   AI PORTFOLIO CHATBOT (Simulated Intelligence Engine)
   =================================================================== */
function initPortfolioChat() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesBox = document.getElementById('chat-messages');
  const chips = document.querySelectorAll('.suggestion-chip');
  const clearBtn = document.getElementById('chat-clear-btn');

  if (!form || !input || !messagesBox) return;

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      input.value = prompt;
      form.dispatchEvent(new Event('submit'));
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesBox.innerHTML = `
        <div class="chat-message bot">
          <div class="chat-msg-avatar">HS</div>
          <div class="chat-bubble">
            Chat cleared! Ask me anything about Hasini's skills, college, projects, certifications, or career goals.
          </div>
        </div>
      `;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    // Append user message
    appendMessage(query, 'user');
    input.value = '';

    // Show typing state
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-message bot';
    typingMsg.id = 'chat-typing-indicator';
    typingMsg.innerHTML = `
      <div class="chat-msg-avatar">HS</div>
      <div class="chat-bubble" style="font-style:italic; color:var(--text-muted);">
        Thinking...
      </div>
    `;
    messagesBox.appendChild(typingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById('chat-typing-indicator');
      if (indicator) indicator.remove();

      const answer = generateBotResponse(query);
      appendMessage(answer, 'bot');
    }, 600);
  });

  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = `
      <div class="chat-msg-avatar">${sender === 'user' ? 'YOU' : 'HS'}</div>
      <div class="chat-bubble">${text}</div>
    `;
    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function generateBotResponse(q) {
    const lower = q.toLowerCase();

    if (lower.includes('skill') || lower.includes('programming') || lower.includes('technology') || lower.includes('language')) {
      return `Hasini's technical skills include:
      <br>• <strong>Programming:</strong> Python (Simplilearn Certified), C Programming (Core academic logic), and Java Basics (Infosys Certified).
      <br>• <strong>Web Development:</strong> Semantic HTML5, CSS3 (Flexbox/Grid/Glassmorphism), and JavaScript basics.
      <br>• <strong>Data Science & AI:</strong> Data Analysis, Data Visualization, foundational Statistics, and Google Cloud Certified Generative AI basics.
      <br>• <strong>Tools:</strong> Git, GitHub, VS Code, Antigravity IDE, and Unix/Linux command-line.`;
    }

    if (lower.includes('education') || lower.includes('college') || lower.includes('cgpa') || lower.includes('school') || lower.includes('degree') || lower.includes('marks')) {
      return `Hasini's academic credentials:
      <br>• <strong>Bachelor of Engineering:</strong> B.E. in Computer Science and Engineering (Data Science) at Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru (2025–2029) with a current CGPA of <strong>7.8 / 10.0</strong>.
      <br>• <strong>12th Grade (PUC):</strong> Narayana PU College, Bengaluru — <strong>86%</strong> (Science: PCMB).
      <br>• <strong>10th Standard:</strong> Holy Child English High School, Bengaluru — <strong>80%</strong>.`;
    }

    if (lower.includes('project') || lower.includes('irrigation') || lower.includes('tourism') || lower.includes('trip') || lower.includes('hardware')) {
      return `Hasini has worked on two key engineering project concepts:
      <br>1. <strong>Smart Irrigation Monitoring System:</strong> A sensor-driven automated hardware model using Arduino UNO, HC-SR04 ultrasonic distance telemetry, and L298N motor drivers.
      <br>2. <strong>Next Trip Tourism Platform:</strong> An omnichannel tourism promotion initiative combining responsive web design, scannable QR codes, and physical marketing collateral.`;
    }

    if (lower.includes('certif') || lower.includes('course') || lower.includes('google') || lower.includes('infosys') || lower.includes('simplilearn')) {
      return `Hasini has earned 5 verified certifications:
      <br>1. <strong>Introduction to Generative AI:</strong> Google Cloud / Simplilearn SkillUp (Oct 11, 2026 | Code: 10870700)
      <br>2. <strong>Introduction to Artificial Intelligence:</strong> Simplilearn SkillUp (Oct 11, 2026 | Code: 10872889)
      <br>3. <strong>Python for Beginners:</strong> Simplilearn SkillUp (Oct 10, 2026 | Code: 10866224)
      <br>4. <strong>Java Programming Fundamentals:</strong> Infosys Springboard (Nov 6, 2026)
      <br>5. <strong>Introduction to Unix:</strong> Infosys Springboard (Sep 30, 2026)
      <br><br>You can click "View in Document" on her site to inspect the originals in certificates.pdf.`;
    }

    if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('internship') || lower.includes('reach')) {
      return `You can reach Hasini directly through:
      <br>• <strong>Email:</strong> <a href="mailto:hasinisuresh2979@gmail.com" style="color:var(--accent-cyan);">hasinisuresh2979@gmail.com</a>
      <br>• <strong>Phone:</strong> <a href="tel:9036138340" style="color:var(--accent-cyan);">+91 9036138340</a>
      <br>• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/hasini-suresh-9b97a1380/" target="_blank" style="color:var(--accent-cyan);">linkedin.com/in/hasini-suresh</a>
      <br>• <strong>GitHub:</strong> <a href="https://github.com/hasinisuresh29" target="_blank" style="color:var(--accent-cyan);">github.com/hasinisuresh29</a>
      <br><br>She is actively open for software engineering and data science internships!`;
    }

    if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
      return `You can download Hasini's official resume by clicking the <strong>Download Resume</strong> button in the hero section or directly <a href="Resume_Hasini_Suresh.pdf" download="Resume_Hasini_Suresh.pdf" style="color:var(--accent-cyan); text-decoration:underline;">clicking here to download Resume_Hasini_Suresh.pdf</a>.`;
    }

    if (lower.includes('goal') || lower.includes('career') || lower.includes('interest')) {
      return `Hasini's career goal is to build a strong career in technology and contribute to meaningful, data-driven solutions. Her interests include programming, Data Science, emerging technology, reading, and continuous self-improvement.`;
    }

    // Default response
    return `Thank you for asking! Hasini is an aspiring software developer and CSE (Data Science) student at AIT Chikkamagaluru (CGPA 7.8). You can explore her projects, inspect her 5 verified certifications, download her resume, or email her directly at <a href="mailto:hasinisuresh2979@gmail.com" style="color:var(--accent-cyan);">hasinisuresh2979@gmail.com</a>.`;
  }
}

/* ===================================================================
   CONTACT FORM VALIDATION & MAILTO FALLBACK
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Reset feedback
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    // Validation checks
    if (!name || !email || !subject || !message) {
      feedback.textContent = 'Please fill in all required fields before sending.';
      feedback.classList.add('error');
      feedback.style.display = 'block';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Please provide a valid email address.';
      feedback.classList.add('error');
      feedback.style.display = 'block';
      return;
    }

    // Construct Mailto fallback URL
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${subject} (from ${name})`);
    const mailtoBody = encodeURIComponent(
      `Hello Hasini,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSent via Portfolio Contact Form`
    );
    const mailtoUrl = `mailto:hasinisuresh2979@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Prompt user & open email client safely
    feedback.innerHTML = `
      <strong>Message Prepared!</strong><br>
      Your default mail app is opening to send this message directly to <strong>hasinisuresh2979@gmail.com</strong>.<br>
      If your mail client didn't open automatically, <a href="${mailtoUrl}" style="color:#6ee7b7; text-decoration:underline;">click here to send email now</a>.
    `;
    feedback.classList.add('success');
    feedback.style.display = 'block';

    // Trigger mail client
    window.location.href = mailtoUrl;

    // Reset form after short delay
    setTimeout(() => {
      form.reset();
    }, 2000);
  });
}

/* ===================================================================
   BACK TO TOP
   =================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

