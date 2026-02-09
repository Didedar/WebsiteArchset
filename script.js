/* ========================================
   ArchSet Landing Page - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            // You can add mobile menu logic here
        });
    }
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Scroll Animations with Intersection Observer
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to sections
    const animatedElements = document.querySelectorAll(
        '.challenge-card, .feature-card, .testimonial-card, .integration-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        fadeInObserver.observe(el);
    });
    
    // ========================================
    // Floating Elements Parallax Effect
    // ========================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (floatingCards.length > 0) {
        let ticking = false;
        
        function updateFloatingElements() {
            const scrollY = window.scrollY;
            
            floatingCards.forEach(card => {
                const speed = parseFloat(card.dataset.speed) || 0.05;
                const yPos = scrollY * speed;
                card.style.transform = `translateY(${-yPos}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateFloatingElements);
                ticking = true;
            }
        });
    }
    
    // ========================================
    // Header Background on Scroll
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ========================================
    // Animate Stats Numbers
    // ========================================
    function animateNumber(element, target, duration = 1500) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            
            if (element.textContent.includes('h')) {
                element.textContent = current.toFixed(1) + 'h';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Observe stat cards for animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseFloat(text);
                
                if (!isNaN(number) && !element.dataset.animated) {
                    element.dataset.animated = 'true';
                    animateNumber(element, number);
                }
                
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ========================================
    // Waveform Animation Randomization
    // ========================================
    const waveformSpans = document.querySelectorAll('.waveform span, .voice-waves span');
    
    function randomizeWaveform() {
        waveformSpans.forEach(span => {
            const randomHeight = 30 + Math.random() * 70;
            span.style.height = `${randomHeight}%`;
        });
    }
    
    // Initial randomization
    randomizeWaveform();
    
    // Continuous randomization for voice waves
    setInterval(() => {
        document.querySelectorAll('.voice-waves span').forEach(span => {
            const randomHeight = 30 + Math.random() * 70;
            span.style.height = `${randomHeight}%`;
        });
    }, 300);
    
    // ========================================
    // Add hover effects to integration cards
    // ========================================
    const integrationCards = document.querySelectorAll('.integration-card');
    
    integrationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========================================
    // Typing effect for chat preview
    // ========================================
    const chatBubbles = document.querySelectorAll('.chat-bubble p');
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bubble = entry.target.closest('.chat-bubble');
                bubble.style.animation = 'fadeSlideUp 0.5s ease forwards';
                chatObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    chatBubbles.forEach(bubble => chatObserver.observe(bubble));
    
    // ========================================
    // Add CSS for dynamic animations
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .chat-bubble {
            opacity: 0;
        }
        
        .chat-bubble:nth-child(1) {
            animation-delay: 0.2s;
        }
        
        .chat-bubble:nth-child(2) {
            animation-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
    
    console.log('ArchSet Landing Page initialized successfully!');
});
