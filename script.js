function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    checkFaqVisibility();
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
    }
}, 15);

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.area-card').forEach(card => {
        card.addEventListener('click', () => {
            const contentId = card.getAttribute('data-modal');
            openModal('modal-preguntas', contentId);
        });
    });

    document.querySelectorAll('.modal-back').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.closest('.modal').id;
            closeModal(modalId);
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMenuAndModals();
                closeClientFaqAnswers();
                scrollToSection(href);
            } else if (href.includes('#')) {
                e.preventDefault();
                closeMenuAndModals();
                closeClientFaqAnswers();
                const targetId = href.split('#')[1];
                window.location.href = href;
                setTimeout(() => scrollToSection('#' + targetId), 100);
            }
            if (window.innerWidth <= 767) {
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }, 100);
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            const href = logo.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMenuAndModals();
                scrollToSection(href);
            } else if (href.includes('#')) {
                e.preventDefault();
                closeMenuAndModals();
                const targetId = href.split('#')[1];
                window.location.href = href;
                setTimeout(() => scrollToSection('#' + targetId), 100);
            }
        });
    }

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        shuffleRecommendations();
    }

    setArticleVisibility();

    window.addEventListener('resize', debounce(setArticleVisibility, 100));

    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn && window.innerWidth > 767) verMasBtn.addEventListener('click', loadMoreArticles);
    if (verMenosBtn && window.innerWidth > 767) verMenosBtn.addEventListener('click', collapseArticles);

    const clientFaqItems = document.querySelectorAll('.faq-client-item h3');
    clientFaqItems.forEach(item => {
        item.addEventListener('click', () => toggleClientAnswer(item, clientFaqItems));
    });

    rotateTestimonials();

    // Agregar botón "Atrás" en páginas de artículos individuales
    if (window.location.pathname.includes('articulo-')) {
        addAtrasButton();
    }

    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash);
        }, 100);
    }

    window.addEventListener('popstate', (event) => {
        const state = event.state;
        if (state && state.modalId) {
            closeModal(state.modalId);
        }
    });
});

function closeMenuAndModals() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks) navLinks.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    closeModal('modal-preguntas');
}

function openModal(modalId, contentId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-body');
    const sourceContent = document.getElementById(contentId);
    if (sourceContent) {
        modalContent.innerHTML = sourceContent.innerHTML + '<a href="https://wa.me/5491126174075" class="modal-whatsapp-btn" target="_blank">WhatsApp</a>';
    } else {
        modalContent.innerHTML = '<p>Contenido no encontrado.</p>';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const nav = document.querySelector('nav');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (nav) nav.style.display = 'none';
    if (whatsappBtn) whatsappBtn.style.display = 'none';

    const faqItems = modal.querySelectorAll('.faq-item h3');
    faqItems.forEach(h3 => {
        h3.addEventListener('click', () => toggleAnswer(h3, faqItems));
    });

    requestAnimationFrame(() => {
        const modalContainer = modal.querySelector('.modal-content');
        const contentHeight = modalContent.scrollHeight + 180;
        if (contentHeight > window.innerHeight) {
            modalContainer.classList.add('scrollable');
            modalContainer.style.height = '100%';
        } else {
            modalContainer.classList.remove('scrollable');
            modalContainer.style.height = `${contentHeight}px`;
        }
    });

    history.pushState({ modalId, contentId }, '', `#modal-${modalId}-${contentId}`);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    const nav = document.querySelector('nav');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (nav) nav.style.display = 'flex';
    if (whatsappBtn) whatsappBtn.style.display = 'block';
}

function toggleAnswer(element, allItems) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    allItems.forEach(item => {
        const otherAnswer = item.nextElementSibling;
        if (otherAnswer !== answer) {
            otherAnswer.classList.remove('active');
        }
    });
    answer.classList.toggle('active');
    const modal = element.closest('.modal');
    if (modal) {
        requestAnimationFrame(() => {
            const modalContent = modal.querySelector('.modal-body');
            const modalContainer = modal.querySelector('.modal-content');
            const contentHeight = modalContent.scrollHeight + 180;
            if (contentHeight > window.innerHeight) {
                modalContainer.classList.add('scrollable');
                modalContainer.style.height = '100%';
            } else {
                modalContainer.classList.remove('scrollable');
                modalContainer.style.height = `${contentHeight}px`;
            }
        });
    }
}

function toggleClientAnswer(element, allItems) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    allItems.forEach(item => {
        const otherAnswer = item.nextElementSibling;
        if (otherAnswer !== answer) {
            otherAnswer.classList.remove('active');
        }
    });
    answer.classList.toggle('active');
}

function closeClientFaqAnswers() {
    const answers = document.querySelectorAll('.faq-client-answer');
    answers.forEach(answer => answer.classList.remove('active'));
}

function checkFaqVisibility() {
    const faqSection = document.querySelector('.client-faq');
    if (!faqSection) return;
    const rect = faqSection.getBoundingClientRect();
    const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);
    if (!isVisible) closeClientFaqAnswers();
}

function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;
    let currentIndex = 0;
    setInterval(() => {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }, 5000);
}

function shuffleRecommendations() {
    const recommendationsContainer = document.querySelector('.articulos-preview');
    if (!recommendationsContainer) return;
    const recommendations = Array.from(recommendationsContainer.children);
    for (let i = recommendations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        recommendationsContainer.insertBefore(recommendations[j], recommendations[i]);
    }
}

function setArticleVisibility() {
    const articles = document.querySelectorAll('.articulo-card');
    if (articles.length === 0) return;
    const screenWidth = window.innerWidth;
    let initialVisible;
    if (screenWidth <= 767) {
        initialVisible = 9;
    } else if (screenWidth <= 1024) {
        initialVisible = 6;
    } else {
        initialVisible = 6;
    }
    articles.forEach((article, index) => {
        if (index < initialVisible) {
            article.classList.remove('hidden');
        } else {
            article.classList.add('hidden');
        }
    });
    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (screenWidth > 767) {
        if (verMasBtn) verMasBtn.style.display = articles.length > initialVisible ? 'inline-block' : 'none';
        if (verMenosBtn) verMenosBtn.style.display = 'none';
    } else {
        if (verMasBtn) verMasBtn.style.display = 'none';
        if (verMenosBtn) verMenosBtn.style.display = 'none';
    }
}

function loadMoreArticles() {
    const articles = document.querySelectorAll('.articulo-card.hidden');
    const screenWidth = window.innerWidth;
    let increment;
    if (screenWidth <= 1024) {
        increment = 6;
    } else {
        increment = 6;
    }
    const articlesToShow = Array.from(articles).slice(0, increment);

    articlesToShow.forEach(article => article.classList.remove('hidden'));

    const remainingHidden = document.querySelectorAll('.articulo-card.hidden').length;
    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn) verMasBtn.style.display = remainingHidden > 0 ? 'inline-block' : 'none';
    if (verMenosBtn) verMenosBtn.style.display = remainingHidden < articles.length ? 'inline-block' : 'none';
}

function collapseArticles() {
    const articles = document.querySelectorAll('.articulo-card');
    if (articles.length === 0) return;
    const screenWidth = window.innerWidth;
    let initialVisible;
    if (screenWidth <= 1024) {
        initialVisible = 6;
    } else {
        initialVisible = 6;
    }

    const articlesSection = document.getElementById('articulos');
    let scrollPositionBeforeCollapse = window.scrollY;
    if (articlesSection) {
        scrollPositionBeforeCollapse = articlesSection.getBoundingClientRect().top + window.scrollY - 70;
    }

    articles.forEach((article, index) => {
        if (index < initialVisible) {
            article.classList.remove('hidden');
        } else {
            article.classList.add('hidden');
        }
    });

    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn) verMasBtn.style.display = articles.length > initialVisible ? 'inline-block' : 'none';
    if (verMenosBtn) verMenosBtn.style.display = 'none';

    if (screenWidth > 767) {
        window.scrollTo({
            top: scrollPositionBeforeCollapse,
            behavior: 'instant'
        });

        setTimeout(() => {
            scrollToSection('#articulos', 600);
        }, 50);
    }
}

function scrollToSection(targetId, duration = 300) {
    const target = document.querySelector(targetId);
    if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - 70;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const animDuration = duration;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / animDuration, 1);
            const ease = Math.sin(progress * (Math.PI / 2));
            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < animDuration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
}

function addAtrasButton() {
    const body = document.body;
    const button = document.createElement('a');
    button.href = 'index.html#articulos';
    button.className = 'atras-btn';
    button.textContent = 'Atrás';
    body.appendChild(button);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html#articulos';
        setTimeout(() => scrollToSection('#articulos'), 100);
    });
}