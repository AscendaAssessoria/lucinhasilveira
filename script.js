document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .fade-in');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger initial animations for elements already in viewport on load
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // Modal Logic
    const modal = document.getElementById('modal-agendamento');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('form-agendamento');

    if (modal) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const tipo = document.getElementById('tipo_cliente').value;
            const manequim = document.getElementById('manequim').value;
            const cor = document.getElementById('cor').value;

            const mensagem = `Olá, quero agendar um horário.\n\nMinhas informações:\n- Nome: ${nome}\n- Whatsapp: ${whatsapp}\n- Você é: ${tipo}\n- Qual seu manequim? ${manequim}\n- Qual a cor escolhida? ${cor}`;
            
            const encodedMensagem = encodeURIComponent(mensagem);
            const numero = '5545999910865';
            
            window.open(`https://wa.me/${numero}?text=${encodedMensagem}`, '_blank');
            
            // Opcional: fechar modal após envio e resetar formulário
            modal.classList.remove('show');
            form.reset();
        });
    }
});
