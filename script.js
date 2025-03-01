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

// Variables para el throttling del scroll
let lastScrollPosition = 0;
let ticking = false;

// Función optimizada para manejar el scroll
const handleScroll = () => {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Efecto de la barra de navegación
            const nav = document.querySelector('nav');
            if (nav) nav.classList.toggle('scrolled', lastScrollPosition > 50);
            
            // Verificar visibilidad de FAQs (mantenemos tu función original)
            checkFaqVisibility();
            
            ticking = false;
        });
        
        ticking = true;
    }
    
    // Cerrar menú móvil al hacer scroll
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
};

// Event listener optimizado
window.addEventListener('scroll', handleScroll, { passive: true });
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
        shuffleArticles();
    }

    setArticleVisibility();

    window.addEventListener('resize', debounce(setArticleVisibility, 100));

    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn) verMasBtn.addEventListener('click', () => {
        const modalId = verMasBtn.getAttribute('data-modal');
        openArticlesModal(modalId);
    });
    if (verMenosBtn) verMenosBtn.addEventListener('click', collapseArticles);

    const clientFaqItems = document.querySelectorAll('.faq-client-item h3');
    clientFaqItems.forEach(item => {
        item.addEventListener('click', () => toggleClientAnswer(item, clientFaqItems));
    });

    rotateTestimonials();

    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash);
        }, 100);
    }
});

function closeMenuAndModals() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks) navLinks.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    closeModal('modal-preguntas');
    closeModal('modal-articulos');
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

function shuffleArticles() {
    const articlesContainer = document.querySelector('.articulos-content #articulos-list');
    if (!articlesContainer) return;
    const articles = Array.from(articlesContainer.children);
    for (let i = articles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        articlesContainer.insertBefore(articles[j], articles[i]);
    }
}

function setArticleVisibility() {
    const articles = document.querySelectorAll('#articulos-list .articulo-card');
    const previewContainer = document.querySelector('.articulos-preview');
    if (articles.length === 0 || !previewContainer) return;
    const screenWidth = window.innerWidth;
    let initialVisible;
    if (screenWidth <= 767) {
        initialVisible = 4;
    } else if (screenWidth <= 1024) {
        initialVisible = 6;
    } else {
        initialVisible = 6;
    }
    previewContainer.innerHTML = '';
    articles.forEach((article, index) => {
        const clonedArticle = article.cloneNode(true);
        if (index < initialVisible) {
            clonedArticle.classList.remove('hidden');
            previewContainer.appendChild(clonedArticle);
        } else {
            clonedArticle.classList.add('hidden');
        }
    });
    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn) verMasBtn.style.display = articles.length > initialVisible ? 'inline-block' : 'none';
    if (verMenosBtn) verMenosBtn.style.display = 'none';
}

function openArticlesModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const modalPreview = modal.querySelector('.articulos-modal-preview');
    const sourceArticles = document.querySelectorAll('#articulos-list .articulo-card');
    const initialVisible = getInitialVisibleCount();
    const lastVisibleIndex = initialVisible - 1;

    modalPreview.innerHTML = '';
    sourceArticles.forEach(article => {
        const clonedArticle = article.cloneNode(true);
        clonedArticle.classList.remove('hidden');
        modalPreview.appendChild(clonedArticle);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    const nav = document.querySelector('nav');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (nav) nav.style.display = 'none';
    if (whatsappBtn) whatsappBtn.style.display = 'none';

    requestAnimationFrame(() => {
        const modalContainer = modal.querySelector('.modal-content');
        modalContainer.classList.add('scrollable');
        modalContainer.style.height = '100%';
        setTimeout(() => {
            const lastVisibleArticle = modalPreview.children[lastVisibleIndex];
            if (lastVisibleArticle) {
                lastVisibleArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
}

function getInitialVisibleCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) return 4;
    else if (screenWidth <= 1024) return 6;
    else return 6;
}

function collapseArticles() {
    const articles = document.querySelectorAll('#articulos-list .articulo-card');
    const previewContainer = document.querySelector('.articulos-preview');
    if (articles.length === 0 || !previewContainer) return;
    const initialVisible = getInitialVisibleCount();
    
    previewContainer.innerHTML = '';
    articles.forEach((article, index) => {
        const clonedArticle = article.cloneNode(true);
        if (index < initialVisible) {
            clonedArticle.classList.remove('hidden');
            previewContainer.appendChild(clonedArticle);
        } else {
            clonedArticle.classList.add('hidden');
        }
    });
    
    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    if (verMasBtn) verMasBtn.style.display = articles.length > initialVisible ? 'inline-block' : 'none';
    if (verMenosBtn) verMenosBtn.style.display = 'none';

    const articlesSection = document.getElementById('articulos');
    if (articlesSection) {
        const sectionTop = articlesSection.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
}

function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition - 70;
    const distance = targetPosition - startPosition;
    const duration = 200;

    let startTime = null;

    function scrollAnimation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scrollAnimation);
}