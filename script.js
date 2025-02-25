const preguntasContent = {
    "pregunta-1": `
        <h2>Preguntas Frecuentes - Divorcios</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `,
    "pregunta-2": `
        <h2>Preguntas Frecuentes - Alimentos</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `,
    "pregunta-3": `
        <h2>Preguntas Frecuentes - Régimen de Comunicación</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `,
    "pregunta-4": `
        <h2>Preguntas Frecuentes - Sucesiones</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `,
    "pregunta-5": `
        <h2>Preguntas Frecuentes - Derecho del Consumidor</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `,
    "pregunta-6": `
        <h2>Preguntas Frecuentes - Amparos de Salud</h2>
        <div class="faq-item">
            <h3>¿Pregunta 1?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 2?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 3?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 4?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
        <div class="faq-item">
            <h3>¿Pregunta 5?</h3>
            <div class="faq-answer">[TEXTO ACA - Respuesta]</div>
        </div>
    `
};

// Optimización del evento scroll con debounce (solo para nav)
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
    nav.classList.toggle('scrolled', window.scrollY > 50);
    checkFaqVisibility();
}, 30);

window.addEventListener('scroll', handleScroll);

document.querySelector('.menu-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.nav-links').classList.toggle('active');
});

function closeMenuAndModals() {
    document.querySelector('.nav-links').classList.remove('active');
    closeModal('modal-preguntas');
    closeModal('modal-articulos');
}

document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
        closeMenuAndModals();
    }
});

function openModal(modalId, contentId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-body');
    if (contentId.startsWith('pregunta')) {
        modalContent.innerHTML = preguntasContent[contentId] + '<a href="https://wa.me/5491126174075" class="modal-whatsapp-btn" target="_blank">WhatsApp</a>';
    } else {
        const article = document.getElementById(contentId).innerHTML;
        modalContent.innerHTML = article + '<a href="https://wa.me/5491126174075" class="modal-whatsapp-btn" target="_blank">WhatsApp</a>';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('.whatsapp-btn').style.display = 'none';

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
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('nav').style.display = 'flex';
    document.querySelector('.whatsapp-btn').style.display = 'block';
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
    answers.forEach(answer => {
        answer.classList.remove('active');
    });
}

function checkFaqVisibility() {
    const faqSection = document.querySelector('.client-faq');
    const rect = faqSection.getBoundingClientRect();
    const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);
    if (!isVisible) {
        closeClientFaqAnswers();
    }
}

function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    setInterval(() => {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }, 5000);
}

function setArticleVisibility() {
    const articles = document.querySelectorAll('.articulo-card');
    const isMobile = window.innerWidth <= 1024;
    const initialVisible = isMobile ? 4 : 6;
    articles.forEach((article, index) => {
        if (index < initialVisible) {
            article.classList.remove('hidden');
        } else {
            article.classList.add('hidden');
        }
    });
    const verMasBtn = document.getElementById('ver-mas-btn');
    const verMenosBtn = document.getElementById('ver-menos-btn');
    verMasBtn.style.display = articles.length > initialVisible ? 'inline-block' : 'none';
    verMenosBtn.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.area-card').forEach(card => {
        card.addEventListener('click', () => {
            const contentId = card.getAttribute('data-modal');
            openModal('modal-preguntas', contentId);
        });
    });

    document.querySelectorAll('.articulo-card').forEach(card => {
        card.addEventListener('click', () => {
            const contentId = card.getAttribute('data-modal');
            openModal('modal-articulos', contentId);
        });
    });

    document.querySelectorAll('.modal-back').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.closest('.modal').id;
            closeModal(modalId);
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenuAndModals();
            closeClientFaqAnswers();
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-link')) {
            e.preventDefault();
            closeModal('modal-articulos');
            window.location.hash = e.target.getAttribute('href');
        }
    });

    setArticleVisibility();

    window.addEventListener('resize', debounce(setArticleVisibility, 100));

    document.getElementById('ver-mas-btn').addEventListener('click', () => {
        document.querySelectorAll('.articulo-card').forEach(article => article.classList.remove('hidden'));
        document.getElementById('ver-mas-btn').style.display = 'none';
        document.getElementById('ver-menos-btn').style.display = 'inline-block';
    });

    document.getElementById('ver-menos-btn').addEventListener('click', () => {
        setArticleVisibility();
        document.getElementById('articulos').scrollIntoView({ behavior: 'smooth' });
    });

    const clientFaqItems = document.querySelectorAll('.faq-client-item h3');
    clientFaqItems.forEach(item => {
        item.addEventListener('click', () => toggleClientAnswer(item, clientFaqItems));
    });

    rotateTestimonials();

    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('articulo-')) {
        openModal('modal-articulos', hash);
    }
});