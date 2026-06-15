document.addEventListener('DOMContentLoaded', () => {
    // --- STICKY NAVBAR ---
    const navbar = document.querySelector('header.navbar');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'bx bx-x';
        } else {
            icon.className = 'bx bx-menu';
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'bx bx-menu';
        });
    });

    // --- FORCE DARK MODE ---
    document.documentElement.setAttribute('data-theme', 'dark');

    // --- SCROLLSPY ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.nav-links a.active')?.classList.remove('active');
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // --- TYPING ANIMATION ---
    const words = ["IT Engineer", "System Administrator", "Fullstack Developer", "ERP Developer"];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typing-text').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typing-text').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 60);
        };
        loopDeleting();
    }

    if (document.getElementById('typing-text')) {
        typingEffect();
    }

    // --- ABOUT TABS ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // --- PROJECTS FILTER ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                const wrapper = card.closest('.project-timeline-item') || card;
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    wrapper.style.display = 'flex';
                    setTimeout(() => {
                        wrapper.style.opacity = '1';
                        wrapper.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        wrapper.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- PROJECT DETAILS MODAL ---
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const category = card.getAttribute('data-category-label');
            const role = card.getAttribute('data-role');
            const date = card.getAttribute('data-date');
            const location = card.getAttribute('data-location');
            const desc = card.getAttribute('data-desc');
            const results = card.getAttribute('data-results');
            const stack = card.getAttribute('data-stack').split(',');

            // Inject modal details
            document.getElementById('modal-tag').textContent = category;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-role').textContent = role;
            document.getElementById('modal-date').textContent = date;
            document.getElementById('modal-location').textContent = location;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-results').textContent = results;

            // Inject images gallery
            const imagesAttr = card.getAttribute('data-images');
            const modalGallery = document.getElementById('modal-gallery');
            const mainGalleryImg = document.getElementById('modal-gallery-img');
            const thumbsContainer = document.getElementById('modal-gallery-thumbs');
            
            if (imagesAttr) {
                const images = imagesAttr.split(',').map(img => img.trim()).filter(img => img.length > 0);
                
                if (images.length > 0) {
                    modalGallery.style.display = 'flex';
                    mainGalleryImg.src = images[0];
                    mainGalleryImg.style.opacity = '1';
                    
                    thumbsContainer.innerHTML = '';
                    if (images.length > 1) {
                        thumbsContainer.style.display = 'flex';
                        images.forEach((imgSrc, idx) => {
                            const thumb = document.createElement('img');
                            thumb.src = imgSrc;
                            thumb.alt = `${title} Screenshot ${idx + 1}`;
                            thumb.className = idx === 0 ? 'thumb-item active' : 'thumb-item';
                            
                            thumb.addEventListener('click', () => {
                                mainGalleryImg.style.opacity = '0.3';
                                setTimeout(() => {
                                    mainGalleryImg.src = imgSrc;
                                    mainGalleryImg.style.opacity = '1';
                                }, 150);
                                
                                thumbsContainer.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
                                thumb.classList.add('active');
                            });
                            thumbsContainer.appendChild(thumb);
                        });
                    } else {
                        thumbsContainer.style.display = 'none';
                    }
                } else {
                    modalGallery.style.display = 'none';
                }
            } else {
                modalGallery.style.display = 'none';
            }

            // Render stack tags
            const stackContainer = document.getElementById('modal-stack');
            stackContainer.innerHTML = '';
            stack.forEach(tech => {
                if (tech.trim()) {
                    const tag = document.createElement('span');
                    tag.className = 'stack-tag';
                    tag.textContent = tech.trim();
                    stackContainer.appendChild(tag);
                }
            });

            // Open modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal Events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- PROJECTS CAROUSEL CONTROLS ---
    const track = document.querySelector('.projects-horizontal-track');
    const prevBtn = document.getElementById('project-prev-btn');
    const nextBtn = document.getElementById('project-next-btn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -400, behavior: 'smooth' }); // card width (360) + gap (40) = 400
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 400, behavior: 'smooth' });
        });
        
        const toggleButtons = () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            prevBtn.style.opacity = track.scrollLeft <= 5 ? '0.3' : '1';
            nextBtn.style.opacity = track.scrollLeft >= maxScrollLeft - 5 ? '0.3' : '1';
        };
        
        track.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
        // Initial check after loading cards
        setTimeout(toggleButtons, 300);
    }

    // --- CANVAS PARTICLES ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 65;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.15;
                this.isGreen = Math.random() > 0.5;
            }

            draw() {
                let theme = document.documentElement.getAttribute('data-theme');
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                if (theme === 'light') {
                    ctx.fillStyle = this.isGreen ? `rgba(0, 179, 119, ${this.alpha * 0.7})` : `rgba(0, 82, 217, ${this.alpha * 0.7})`;
                } else {
                    ctx.fillStyle = this.isGreen ? `rgba(0, 230, 153, ${this.alpha})` : `rgba(0, 98, 255, ${this.alpha})`;
                }
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function connectParticles() {
            let theme = document.documentElement.getAttribute('data-theme');
            let maxDistance = 110;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.beginPath();
                        let alpha = (1 - dist / maxDistance) * 0.08;
                        if (theme === 'light') {
                            ctx.strokeStyle = `rgba(0, 82, 217, ${alpha})`;
                        } else {
                            if (particles[i].isGreen && particles[j].isGreen) {
                                ctx.strokeStyle = `rgba(0, 230, 153, ${alpha * 1.2})`;
                            } else if (!particles[i].isGreen && !particles[j].isGreen) {
                                ctx.strokeStyle = `rgba(0, 98, 255, ${alpha * 1.2})`;
                            } else {
                                ctx.strokeStyle = `rgba(0, 164, 255, ${alpha})`;
                            }
                        }
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();
    }
});
