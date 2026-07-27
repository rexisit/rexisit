/**
 * REXIS IT - CENTRAL APPLICATION JAVASCRIPT
 * Modern Enterprise Web Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Page Loader
  initLoader();
  
  // Initialize Header & Mobile Navigation
  initNavigation();
  
  // Initialize Scroll Reveal Animations
  initScrollReveal();
  
  // Initialize Animated Counters
  initCounters();
  
  // Initialize Ripple Button Effect
  initRippleButtons();
  
  // Initialize Back To Top Button
  initBackToTop();
  
  // Initialize Portfolio Category Filter (if present)
  initPortfolioFilter();
  
  // Initialize Accordion (if present)
  initAccordion();
  
  // Initialize Typing Effect (if present)
  initTypingEffect();
  
  // Initialize EmailJS Contact Form (if present)
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. PAGE LOADER
   -------------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 300);
    });
    // Fallback hide
    setTimeout(() => {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
      }
    }, 1500);
  }
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER & MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside or on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Highlight current page in navbar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATION OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. ANIMATED COUNTERS FOR STATS
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const targetStr = counter.getAttribute('data-target') || '0';
    const isFloat = targetStr.includes('.');
    const target = parseFloat(targetStr);
    const duration = 2000;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = isFloat ? target.toFixed(1) : Math.ceil(target).toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = isFloat ? current.toFixed(1) : Math.ceil(current).toLocaleString();
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   5. BUTTON RIPPLE EFFECT
   -------------------------------------------------------------------------- */
function initRippleButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const ripple = this.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }

      this.appendChild(circle);
    });
  });
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. PORTFOLIO CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. ACCORDION SYSTEM (FAQ)
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close siblings if inside accordion group
      const parentGroup = item.closest('.accordion-group') || item.parentElement;
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
          const siblingContent = sibling.querySelector('.accordion-content');
          if (siblingContent) siblingContent.style.maxHeight = null;
        });
      }

      if (!isActive) {
        item.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  // Search FAQ filter
  const faqSearch = document.getElementById('faqSearch');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.accordion-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. HERO TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = ['Digital Engineering', 'AI Solutions', 'Cloud Architectures', 'Mobile Applications', 'Web Engineering'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  };

  type();
}

/* --------------------------------------------------------------------------
   10. EMAILJS CONTACT FORM INTEGRATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('rexisContactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('formStatus');

  // Configure EmailJS Public Key
  const PUBLIC_KEY = 'stGslbvIjyBOUV9U7';
  const SERVICE_ID = 'service_pepl427';
  const TEMPLATE_ID = 'template_rov9qkn';

  if (window.emailjs) {
    try {
      emailjs.init(PUBLIC_KEY);
    } catch (err) {
      console.warn('EmailJS initialization note:', err);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status box
    if (statusDiv) {
      statusDiv.className = 'form-status';
      statusDiv.style.display = 'none';
      statusDiv.textContent = '';
    }

    // Extract form values
    const nameInput = form.querySelector('[name="user_name"]');
    const emailInput = form.querySelector('[name="user_email"]');
    const phoneInput = form.querySelector('[name="user_phone"]');
    const companyInput = form.querySelector('[name="user_company"]');
    const serviceInput = form.querySelector('[name="user_service"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Field Validations
    if (!name) {
      showFormStatus('error', 'Please enter your full name.');
      nameInput?.focus();
      return;
    }

    if (!email) {
      showFormStatus('error', 'Please enter your email address.');
      emailInput?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('error', 'Please enter a valid email address (e.g. name@company.com).');
      emailInput?.focus();
      return;
    }

    if (!phone) {
      showFormStatus('error', 'Please enter your phone number.');
      phoneInput?.focus();
      return;
    }

    // Phone validation (digits, plus, spaces, dashes)
    const phoneRegex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;
    if (!phoneRegex.test(phone)) {
      showFormStatus('error', 'Please enter a valid phone number format.');
      phoneInput?.focus();
      return;
    }

    if (!service) {
      showFormStatus('error', 'Please select a required service.');
      serviceInput?.focus();
      return;
    }

    if (!subject) {
      showFormStatus('error', 'Please enter a subject.');
      subjectInput?.focus();
      return;
    }

    if (!message) {
      showFormStatus('error', 'Please enter your project message.');
      messageInput?.focus();
      return;
    }

    // Set Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner" style="display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.8s linear infinite; margin-right:8px; vertical-align:middle;"></span> Sending Message...`;

    // EmailJS Parameters
    const templateParams = {
      user_name: name,
      user_email: email,
      user_phone: phone,
      user_company: company || 'Not Provided',
      user_service: service,
      subject: subject,
      message: message,
      to_email: 'rexisit.tech@gmail.com'
    };

    try {
      let sentSuccess = false;

      // Method 1: EmailJS SDK
      if (window.emailjs) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        sentSuccess = true;
      } else {
        // Method 2: Direct REST API Fallback
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: PUBLIC_KEY,
            template_params: templateParams
          })
        });

        if (response.ok || response.status === 200) {
          sentSuccess = true;
        } else {
          const errText = await response.text();
          throw new Error(errText || 'API dispatch failed');
        }
      }

      if (sentSuccess) {
        showFormStatus('success', 'Thank you! Your message has been successfully sent to REXIS IT (rexisit.tech@gmail.com). Our team will reach out to you shortly.');
        form.reset();
      }
    } catch (error) {
      console.error('EmailJS Submission Error:', error);
      showFormStatus('error', 'Unable to send message automatically. Please email us directly at rexisit.tech@gmail.com.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFormStatus(type, msg) {
    if (!statusDiv) return;
    statusDiv.style.display = 'block';
    statusDiv.textContent = msg;
    statusDiv.className = `form-status ${type}`;
    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
