document.addEventListener('DOMContentLoaded', () => {
    // --- CYBER TERMINAL PRELOADER CONTROLLER (SMOOTH & EXTENDED) ---
    const preloader = document.getElementById('cyber-preloader');
    if (preloader) {
        const line1 = document.getElementById('console-line-1');
        const line2 = document.getElementById('console-line-2');
        const line3 = document.getElementById('console-line-3');
        const line4 = document.getElementById('console-line-4');
        const statusLabel = document.getElementById('preloader-status-label');
        const percentEl = document.getElementById('preloader-percent');
        const barEl = document.getElementById('preloader-bar');

        let progress = 0;
        let isDone = false;

        const updatePreloader = (val) => {
            progress = Math.min(Math.max(val, 0), 100);
            if (barEl) barEl.style.width = `${progress.toFixed(2)}%`;
            if (percentEl) percentEl.textContent = `${Math.round(progress)}%`;

            if (progress >= 18 && line1) line1.classList.add('visible');
            if (progress >= 48 && line2) line2.classList.add('visible');
            if (progress >= 78 && line3) line3.classList.add('visible');
            if (progress >= 95 && line4) line4.classList.add('visible');

            if (progress < 35) {
                if (statusLabel) statusLabel.textContent = 'FETCHING ASSETS...';
            } else if (progress < 75) {
                if (statusLabel) statusLabel.textContent = 'LOADING CONTENT MODULES...';
            } else if (progress < 100) {
                if (statusLabel) statusLabel.textContent = 'FINALIZING PORTFOLIO...';
            } else {
                if (statusLabel) statusLabel.textContent = 'READY TO EXPLORE [OK]';
            }
        };

        // 5.5s on initial visit, ~1.5s on refresh / repeat session visits
        const hasVisitedSession = sessionStorage.getItem('portfolio_preloaded') === '1';
        const startTime = performance.now();
        const duration = hasVisitedSession ? 1500 : 5500;

        const finishPreloader = () => {
            if (isDone) return;
            isDone = true;
            sessionStorage.setItem('portfolio_preloaded', '1');
            updatePreloader(100);

            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Trigger event so counters and hero effects start right as the screen reveals
                window.dispatchEvent(new CustomEvent('portfolioReady'));

                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 450);
            }, 150);
        };

        // Ultra smooth ease-in-out cubic progression
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (now) => {
            const elapsed = now - startTime;
            const normTime = Math.min(elapsed / duration, 1);
            const currentProgress = easeInOutCubic(normTime) * 100;
            
            updatePreloader(currentProgress);

            if (normTime < 1) {
                requestAnimationFrame(step);
            } else {
                finishPreloader();
            }
        };

        requestAnimationFrame(step);

        // Fail-safe fallback timeout
        setTimeout(finishPreloader, hasVisitedSession ? 2200 : 6500);
    }

    // --- DICTIONARY FOR I18N BILINGUAL SUPPORT (loaded from translations.js) ---
    const translations = window.PORTFOLIO_TRANSLATIONS || { id: {}, en: {} };

    let currentLang = localStorage.getItem('user_lang') || 'en';

    // --- LANGUAGE SWITCHING LOGIC ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('user_lang', lang);
        document.documentElement.setAttribute('lang', lang);

        // Update data-active-lang for smooth sliding pill animation
        const langSwitchers = document.querySelectorAll('.lang-switcher');
        langSwitchers.forEach(sw => sw.setAttribute('data-active-lang', lang));

        // Update active class on switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'hero_badge') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update project cards text according to active language
        document.querySelectorAll('.project-card').forEach(card => {
            const tagEl = card.querySelector('.project-tag');
            const titleEl = card.querySelector('.project-title');
            const descEl = card.querySelector('.project-desc');

            const catLabel = card.getAttribute(`data-category-label-${lang}`) || card.getAttribute('data-category-label-id');
            const title = card.getAttribute(`data-title-${lang}`) || card.getAttribute('data-title-id');
            const desc = card.getAttribute(`data-desc-${lang}`) || card.getAttribute('data-desc-id');

            if (tagEl && catLabel) tagEl.textContent = catLabel;
            if (titleEl && title) titleEl.textContent = title;
            if (descEl && desc) descEl.textContent = desc;
        });

        // Update PDF modal download button tooltip without inserting text
        const certPdfDownloadBtnEl = document.getElementById('cert-pdf-download-btn');
        if (certPdfDownloadBtnEl) {
            const dlTitle = lang === 'en' ? 'Download PDF' : 'Unduh PDF';
            certPdfDownloadBtnEl.title = dlTitle;
            certPdfDownloadBtnEl.setAttribute('aria-label', dlTitle);
        }

        // Restart typing animation with updated language words
        restartTypingEffect();
    }

    // Language switcher click listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenLang = btn.getAttribute('data-lang');
            setLanguage(chosenLang);
        });
    });

    // --- STICKY NAVBAR, BACK TO TOP & HIGH-PERFORMANCE SCROLLSPY ---
    const navbar = document.querySelector('header.navbar');
    const backToTopBtn = document.querySelector('.back-to-top');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    // Cache section elements and corresponding nav links for layout reflow prevention
    const sectionNavMap = sections.map(sec => {
        const id = sec.getAttribute('id');
        return {
            sec,
            link: document.querySelector(`.nav-links a[href*="${id}"]`),
            top: 0,
            height: 0
        };
    });

    function updateSectionOffsets() {
        sectionNavMap.forEach(item => {
            if (item.sec) {
                item.top = item.sec.offsetTop - 120;
                item.height = item.sec.offsetHeight;
            }
        });
    }

    updateSectionOffsets();
    window.addEventListener('resize', updateSectionOffsets, { passive: true });

    let isScrollTicking = false;

    function handleScrollPerformance() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // 1. Sticky Navbar
        if (navbar) {
            if (scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }

        // 2. Back to Top Button
        if (backToTopBtn) {
            if (scrollY > 300) backToTopBtn.classList.add('active');
            else backToTopBtn.classList.remove('active');
        }

        // 3. ScrollSpy (Zero-reflow using cached offset values)
        sectionNavMap.forEach(item => {
            if (item.link) {
                if (scrollY > item.top && scrollY <= item.top + item.height) {
                    item.link.classList.add('active');
                } else {
                    item.link.classList.remove('active');
                }
            }
        });

        isScrollTicking = false;
    }

    // Passive listener + rAF throttle for 60/120Hz ultra-smooth scrolling
    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            requestAnimationFrame(handleScrollPerformance);
            isScrollTicking = true;
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navLinks) {
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
                if (menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').className = 'bx bx-menu';
                }
            });
        });
    }

    // --- FORCE DARK MODE ---
    document.documentElement.setAttribute('data-theme', 'dark');

    // --- DYNAMIC TYPING ANIMATION ---
    const wordsDict = {
        id: ["Software Developer", "IT System Engineer", "ERP Developer", "Infrastruktur & DevOps", "Integrasi Sistem", "IoT & Transformasi Digital"],
        en: ["Software Developer", "IT System Engineer", "ERP Developer", "DevOps & Infrastructure", "System Integration", "IoT & Digital Transformation"]
    };

    let typingTimeout;
    let wordIdx = 0;

    function restartTypingEffect() {
        if (typingTimeout) clearTimeout(typingTimeout);
        wordIdx = 0;
        const typingEl = document.getElementById('typing-text');
        if (typingEl) {
            typingEl.innerHTML = '';
            typeWord();
        }
    }

    function typeWord() {
        const words = wordsDict[currentLang] || wordsDict['id'];
        const currentWord = words[wordIdx % words.length];
        let charIdx = 0;
        const typingEl = document.getElementById('typing-text');
        if (!typingEl) return;

        function appendChar() {
            if (charIdx < currentWord.length) {
                typingEl.textContent += currentWord.charAt(charIdx);
                charIdx++;
                typingTimeout = setTimeout(appendChar, 90);
            } else {
                typingTimeout = setTimeout(deleteWord, 2200);
            }
        }

        function deleteWord() {
            if (typingEl.textContent.length > 0) {
                typingEl.textContent = typingEl.textContent.slice(0, -1);
                typingTimeout = setTimeout(deleteWord, 50);
            } else {
                wordIdx++;
                typingTimeout = setTimeout(typeWord, 400);
            }
        }

        appendChar();
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
            const panel = document.getElementById(target);
            if (panel) panel.classList.add('active');
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
                    wrapper.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        wrapper.style.display = 'none';
                    }, 250);
                }
            });

            // Smooth scroll timeline track back to start when category changes
            const track = document.querySelector('.projects-horizontal-track');
            if (track) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            }
        });
    });

    // --- CERTIFICATIONS FILTER ---
    const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-cert-filter');
            
            certFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            certCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const categories = category.split(/\s+/);
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // --- CERTIFICATION PDF MODAL VIEWER (OPTIMIZED FOR ZERO-LAG & FAST RESPONSE) ---
    const certPdfModal = document.getElementById('cert-pdf-modal');
    const certPdfClose = document.getElementById('cert-pdf-close');
    const certPdfCloseMobile = document.getElementById('cert-pdf-close-mobile');
    const certPdfIframe = document.getElementById('cert-pdf-iframe');
    const certPdfCanvasContainer = document.getElementById('cert-pdf-canvas-container');
    const certPdfLoading = document.getElementById('cert-pdf-loading');
    const certPdfFallback = document.getElementById('cert-pdf-fallback');
    const certFallbackTitle = document.getElementById('cert-fallback-title');
    const certFallbackOpenBtn = document.getElementById('cert-fallback-open-btn');
    const certFallbackDownloadBtn = document.getElementById('cert-fallback-download-btn');
    const certPdfTitle = document.getElementById('cert-modal-title');
    const certPdfIssuer = document.getElementById('cert-modal-issuer');
    const certPdfId = document.getElementById('cert-modal-id');
    const certPdfIdWrapper = document.getElementById('cert-modal-id-wrapper');
    const certPdfExternalBtn = document.getElementById('cert-pdf-external-btn');
    const certPdfDownloadBtn = document.getElementById('cert-pdf-download-btn');

    let certPdfRevealTimer = null;
    let certPdfIdleResetTimer = null;
    let pdfJsLoaderPromise = null;
    let activePdfRenderToken = 0;

    function loadPdfJs() {
        if (window.pdfjsLib) {
            return Promise.resolve(window.pdfjsLib);
        }
        if (pdfJsLoaderPromise) {
            return pdfJsLoaderPromise;
        }
        pdfJsLoaderPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true;
            script.onload = () => {
                if (window.pdfjsLib) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                    resolve(window.pdfjsLib);
                } else {
                    reject(new Error('PDF.js failed to initialize'));
                }
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js'));
            document.head.appendChild(script);
        });
        return pdfJsLoaderPromise;
    }

    async function renderPdfWithPdfJs(pdfUrl, renderToken) {
        if (!certPdfCanvasContainer) {
            if (certPdfLoading) certPdfLoading.classList.add('hidden');
            if (certPdfFallback) certPdfFallback.classList.remove('hidden');
            return;
        }

        if (certPdfIframe) certPdfIframe.classList.add('hidden');
        certPdfCanvasContainer.innerHTML = '';
        certPdfCanvasContainer.classList.remove('hidden');
        if (certPdfLoading) certPdfLoading.classList.remove('hidden');

        try {
            const pdfjsLib = await loadPdfJs();
            if (renderToken !== activePdfRenderToken) return;

            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
            if (renderToken !== activePdfRenderToken) return;

            const containerWidth = Math.max(certPdfCanvasContainer.clientWidth - 20, 280);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                if (renderToken !== activePdfRenderToken) return;
                const page = await pdf.getPage(pageNum);
                const unscaledViewport = page.getViewport({ scale: 1 });
                const cssScale = containerWidth / unscaledViewport.width;
                const viewport = page.getViewport({ scale: cssScale * dpr });

                const canvas = document.createElement('canvas');
                canvas.className = 'cert-pdf-page-canvas';
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                canvas.style.width = `${Math.floor(unscaledViewport.width * cssScale)}px`;

                const ctx = canvas.getContext('2d');
                certPdfCanvasContainer.appendChild(canvas);

                await page.render({ canvasContext: ctx, viewport }).promise;
            }

            if (renderToken === activePdfRenderToken && certPdfLoading) {
                certPdfLoading.classList.add('hidden');
            }
        } catch (err) {
            if (renderToken !== activePdfRenderToken) return;
            certPdfCanvasContainer.classList.add('hidden');
            certPdfCanvasContainer.innerHTML = '';
            if (certPdfLoading) certPdfLoading.classList.add('hidden');
            if (certPdfFallback) certPdfFallback.classList.remove('hidden');
        }
    }

    function openCertPdfModal(data) {
        if (!certPdfModal) return;

        // Cancel pending timers & invalidate any in-flight PDF.js render
        activePdfRenderToken++;
        const currentToken = activePdfRenderToken;
        if (certPdfRevealTimer) {
            clearTimeout(certPdfRevealTimer);
            certPdfRevealTimer = null;
        }
        if (certPdfIdleResetTimer) {
            clearTimeout(certPdfIdleResetTimer);
            certPdfIdleResetTimer = null;
        }

        // 1. Update text metadata
        if (certPdfTitle) certPdfTitle.textContent = data.title || 'Certificate Preview';
        if (certPdfIssuer) certPdfIssuer.textContent = data.issuer || 'Credential';
        if (certFallbackTitle) certFallbackTitle.textContent = data.title || 'Certificate Preview';
        
        if (data.credentialId && certPdfId) {
            certPdfId.textContent = data.credentialId;
            if (certPdfIdWrapper) certPdfIdWrapper.style.display = 'inline-flex';
        } else if (certPdfIdWrapper) {
            certPdfIdWrapper.style.display = 'none';
        }

        // 2. Prepare safe URL and actions
        const rawUrl = data.pdfUrl.split('#')[0];
        const cleanUrl = encodeURI(decodeURI(rawUrl));
        const filename = decodeURIComponent(data.pdfUrl.split('/').pop() || `${data.title}.pdf`);

        if (certPdfExternalBtn) certPdfExternalBtn.href = data.pdfUrl;
        if (certFallbackOpenBtn) certFallbackOpenBtn.href = data.pdfUrl;

        if (certPdfDownloadBtn) {
            certPdfDownloadBtn.href = data.pdfUrl;
            certPdfDownloadBtn.setAttribute('download', filename);
        }
        if (certFallbackDownloadBtn) {
            certFallbackDownloadBtn.href = data.pdfUrl;
            certFallbackDownloadBtn.setAttribute('download', filename);
        }

        // Reset fallback and canvas views
        if (certPdfFallback) certPdfFallback.classList.add('hidden');
        if (certPdfCanvasContainer) {
            certPdfCanvasContainer.classList.add('hidden');
            certPdfCanvasContainer.innerHTML = '';
        }
        if (certPdfIframe) certPdfIframe.classList.remove('hidden');

        // Check mobile/unsupported inline PDF environment (e.g. Android Chrome)
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const canInlinePdf = navigator.pdfViewerEnabled !== false;

        // 3. Immediately trigger modal display for instant 60fps response
        certPdfModal.classList.add('active');
        certPdfModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (isMobileDevice && !canInlinePdf) {
            // Render inline using PDF.js canvas viewer on mobile browsers without native inline PDF support
            renderPdfWithPdfJs(cleanUrl, currentToken);
            return;
        }

        // 4. Show loading indicator initially
        if (certPdfLoading) certPdfLoading.classList.remove('hidden');

        const isSmallScreen = window.innerWidth <= 768;
        // Desktop: Zoom 75% initially for full-view centering, with toolbar active for zoom in/out
        // Mobile: view=Fit so single page is centered in screen, scrollable for multi-page
        const pdfParam = isSmallScreen ? '#toolbar=0&navpanes=0&view=Fit' : '#toolbar=1&navpanes=0&zoom=75';
        const targetSrc = cleanUrl + pdfParam;

        const revealPdf = () => {
            if (certPdfRevealTimer) {
                clearTimeout(certPdfRevealTimer);
                certPdfRevealTimer = null;
            }
            if (certPdfLoading) certPdfLoading.classList.add('hidden');
            if (certPdfIframe) certPdfIframe.classList.add('loaded');
        };

        // 5. Decouple iframe load with requestAnimationFrame to prevent animation frame drops
        requestAnimationFrame(() => {
            if (certPdfIframe) {
                const activeSrc = certPdfIframe.getAttribute('data-active-src') || '';
                if (activeSrc === targetSrc) {
                    // Same document already in iframe - instant zero-latency display
                    revealPdf();
                } else {
                    certPdfIframe.setAttribute('data-active-src', targetSrc);
                    certPdfIframe.onload = revealPdf;
                    certPdfIframe.onerror = () => {
                        revealPdf();
                        renderPdfWithPdfJs(cleanUrl, currentToken);
                    };
                    certPdfIframe.src = targetSrc;

                    // Safety Reveal Timer (400ms):
                    // Bypasses Chromium PDFium dropped or delayed iframe.onload events.
                    // Guarantees user never gets stuck waiting on an opaque spinner!
                    certPdfRevealTimer = setTimeout(revealPdf, 400);
                }
            }
        });
    }

    function closeCertPdfModal() {
        if (!certPdfModal) return;
        activePdfRenderToken++;
        if (certPdfRevealTimer) {
            clearTimeout(certPdfRevealTimer);
            certPdfRevealTimer = null;
        }
        certPdfModal.classList.remove('active');
        certPdfModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (certPdfCanvasContainer) {
            certPdfCanvasContainer.classList.add('hidden');
            certPdfCanvasContainer.innerHTML = '';
        }
        if (certPdfIframe) certPdfIframe.classList.remove('hidden');
        
        // Keep the browser PDF plugin process warm for instant reopening.
        // Only release iframe src if the modal stays closed for more than 60 seconds.
        if (certPdfIdleResetTimer) clearTimeout(certPdfIdleResetTimer);
        certPdfIdleResetTimer = setTimeout(() => {
            if (certPdfIframe && !certPdfModal.classList.contains('active')) {
                certPdfIframe.removeAttribute('data-active-src');
                certPdfIframe.src = 'about:blank';
            }
        }, 60000);
    }

    if (certPdfClose) {
        certPdfClose.addEventListener('click', closeCertPdfModal);
    }

    if (certPdfCloseMobile) {
        certPdfCloseMobile.addEventListener('click', closeCertPdfModal);
    }

    if (certPdfModal) {
        certPdfModal.addEventListener('click', (e) => {
            if (e.target === certPdfModal) {
                closeCertPdfModal();
            }
        });
    }

    // Attach click handler to verify buttons only (card click performs no action)
    certCards.forEach(card => {
        const verifyBtn = card.querySelector('.btn-verify');
        if (!verifyBtn) return;

        const href = verifyBtn.getAttribute('href') || '';
        const isPdf = href.toLowerCase().includes('.pdf') || verifyBtn.getAttribute('data-pdf') === 'true';

        if (isPdf) {
            // Click on the verify button opens PDF modal
            verifyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.querySelector('.cert-title')?.textContent.trim() || '';
                const issuer = card.querySelector('.cert-issuer')?.textContent.trim() || '';
                const idEl = card.querySelector('.cert-id strong');
                const credentialId = idEl ? idEl.textContent.trim() : '';

                openCertPdfModal({
                    title: title,
                    issuer: issuer,
                    credentialId: credentialId,
                    pdfUrl: href
                });
            });
        }
        // Non-PDF certificates (e.g. HackerRank, Google Drive, e-ujian):
        // Verify button opens external link naturally (target="_blank"), card click performs no action
    });

    // Close modals on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (certPdfModal && certPdfModal.classList.contains('active')) {
                closeCertPdfModal();
            }
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // --- PROJECT DETAILS MODAL ---
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const lang = currentLang;
            
            const category = card.getAttribute(`data-category-label-${lang}`) || card.getAttribute('data-category-label-id');
            const title = card.getAttribute(`data-title-${lang}`) || card.getAttribute('data-title-id');
            const role = card.getAttribute(`data-role-${lang}`) || card.getAttribute('data-role-id');
            const date = card.getAttribute(`data-date-${lang}`) || card.getAttribute('data-date-id');
            const location = card.getAttribute(`data-location-${lang}`) || card.getAttribute('data-location-id');
            const desc = card.getAttribute(`data-desc-${lang}`) || card.getAttribute('data-desc-id');
            const results = card.getAttribute(`data-results-${lang}`) || card.getAttribute('data-results-id');
            const stack = card.getAttribute('data-stack') ? card.getAttribute('data-stack').split(',') : [];

            // Inject modal details
            document.getElementById('modal-tag').textContent = category;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-role').textContent = role;
            document.getElementById('modal-date').textContent = date;
            document.getElementById('modal-location').textContent = location;
            
            if (desc && desc.includes('\n')) {
                document.getElementById('modal-desc').innerHTML = desc.replace(/\n/g, '<br>');
            } else {
                document.getElementById('modal-desc').textContent = desc || '';
            }

            // Results text with automatic URL link conversion
            const resultsEl = document.getElementById('modal-results');
            if (results && results.includes('http')) {
                resultsEl.innerHTML = results.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: underline;">$1 <i class="bx bx-link-external" style="font-size: 0.85em;"></i></a>').replace(/\n/g, '<br>');
            } else if (results && results.includes('\n')) {
                resultsEl.innerHTML = results.replace(/\n/g, '<br>');
            } else {
                resultsEl.textContent = results || '';
            }

            // Direct URL Link Button Container
            const projectUrl = card.getAttribute('data-url');
            const urlContainer = document.getElementById('modal-url-container');
            const urlLink = document.getElementById('modal-url-link');
            if (projectUrl && urlContainer && urlLink) {
                urlContainer.style.display = 'block';
                urlLink.href = projectUrl;
            } else if (urlContainer) {
                urlContainer.style.display = 'none';
            }

            // Inject images gallery
            const imagesAttr = card.getAttribute('data-images');
            const modalGallery = document.getElementById('modal-gallery');
            const mainGalleryImg = document.getElementById('modal-gallery-img');
            const thumbsContainer = document.getElementById('modal-gallery-thumbs');
            
            if (imagesAttr) {
                const images = imagesAttr.split(',').map(img => img.trim()).filter(img => img.length > 0);
                
                if (images.length > 0) {
                    modalGallery.style.display = 'flex';
                    mainGalleryImg.src = encodeURI(images[0]);
                    mainGalleryImg.style.opacity = '1';
                    
                    thumbsContainer.innerHTML = '';
                    if (images.length > 1) {
                        thumbsContainer.style.display = 'flex';
                        images.forEach((imgSrc, idx) => {
                            const thumb = document.createElement('img');
                            thumb.src = encodeURI(imgSrc);
                            thumb.alt = `${title} Screenshot ${idx + 1}`;
                            thumb.className = idx === 0 ? 'thumb-item active' : 'thumb-item';
                            
                            thumb.addEventListener('click', () => {
                                mainGalleryImg.style.opacity = '0.3';
                                setTimeout(() => {
                                    mainGalleryImg.src = encodeURI(imgSrc);
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
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal Events
    if (modalClose && modal) {
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // --- PROJECTS CAROUSEL CONTROLS ---
    const track = document.querySelector('.projects-horizontal-track');
    const prevBtn = document.getElementById('project-prev-btn');
    const nextBtn = document.getElementById('project-next-btn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -400, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 400, behavior: 'smooth' });
        });
        
        const toggleButtons = () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            prevBtn.style.opacity = track.scrollLeft <= 5 ? '0.3' : '1';
            nextBtn.style.opacity = track.scrollLeft >= maxScrollLeft - 5 ? '0.3' : '1';
        };
        
        track.addEventListener('scroll', toggleButtons, { passive: true });
        window.addEventListener('resize', toggleButtons);
        setTimeout(toggleButtons, 300);
    }

    // --- GUARANTEED STEP-BY-STEP STATS COUNTER ANIMATION ---
    const statCounters = document.querySelectorAll('.stat-count');
    if (statCounters.length > 0) {
        let hasAnimated = false;

        const animateCount = (element) => {
            const target = parseInt(element.getAttribute('data-target'), 10) || 0;
            if (target <= 0) return;

            // Maximum 2.0s timing for gradual, smooth counting
            const stepDuration = target <= 5 ? 320 : target <= 10 ? 220 : 120;
            let current = 0;
            element.textContent = '0';

            const stepTimer = setInterval(() => {
                current += 1;
                element.textContent = current;

                if (current >= target) {
                    clearInterval(stepTimer);
                    element.textContent = target;
                }
            }, stepDuration);
        };

        const triggerStatsAnimation = () => {
            if (hasAnimated) return;
            hasAnimated = true;
            statCounters.forEach((counter, idx) => {
                setTimeout(() => animateCount(counter), idx * 120);
            });
        };

        const statsBanner = document.querySelector('.stats-banner');

        if (statsBanner && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        // Check if preloader is still visible; if so, wait until preloader finishes
                        const preloader = document.getElementById('cyber-preloader');
                        if (preloader && getComputedStyle(preloader).display !== 'none' && !preloader.classList.contains('fade-out')) {
                            window.addEventListener('portfolioReady', () => {
                                setTimeout(triggerStatsAnimation, 300);
                            }, { once: true });
                        } else {
                            triggerStatsAnimation();
                        }
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

            observer.observe(statsBanner);
        } else {
            triggerStatsAnimation();
        }
    }

    // --- CANVAS PARTICLES (60 FPS OPTIMIZED) ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let maxParticles = window.innerWidth < 768 ? 28 : 55;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.5 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(0, 230, 153, 0.4)' : 'rgba(0, 98, 255, 0.4)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            maxParticles = window.innerWidth < 768 ? 28 : 55;
            particles = [];
            for (let p = 0; p < maxParticles; p++) {
                particles.push(new Particle());
            }
        }

        let particleRafId = null;
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function animateParticles() {
            if (document.hidden || prefersReducedMotion) {
                particleRafId = null;
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 14400) { // 120 * 120
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 98, 255, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            particleRafId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        if (!prefersReducedMotion) {
            animateParticles();
        }

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !prefersReducedMotion && !particleRafId) {
                animateParticles();
            }
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initParticles, 150);
        });
    }

    // --- CYBER HANGING ID CARD PHYSICS & DYNAMIC LANYARD ROPE INTERACTION ---
    const idCardStage = document.getElementById('id-card-stage');
    const cyberIdCard = document.getElementById('cyber-id-card');
    const cardGlare = document.getElementById('card-glare');

    if (idCardStage && cyberIdCard) {
        const lanyardRig = idCardStage.querySelector('.lanyard-rig');
        const lanyardStrap = idCardStage.querySelector('.lanyard-strap');
        const lanyardClip = idCardStage.querySelector('.lanyard-metal-clip');

        // Trigger realistic drop-in pendulum animation
        const triggerCardDrop = () => {
            idCardStage.classList.remove('idle-swing');
            idCardStage.classList.add('drop-anim');
            setTimeout(() => {
                idCardStage.classList.remove('drop-anim');
                idCardStage.classList.add('idle-swing');
            }, 1800);
        };

        // Listen for preloader finish or fallback on load
        window.addEventListener('portfolioReady', () => {
            setTimeout(triggerCardDrop, 120);
        }, { once: true });

        if (!document.getElementById('cyber-preloader')) {
            triggerCardDrop();
        }

        // Interactive 3D Parallax Tilt & Synchronized Rope/Lanyard Physics
        let isInteracting = false;
        let rafId = null;

        const handleMove = (clientX, clientY) => {
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                const rect = cyberIdCard.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const deltaX = (clientX - cardCenterX) / (rect.width / 2);
                const deltaY = (clientY - cardCenterY) / (rect.height / 2);

                // Clamp values for natural range
                const clampedX = Math.max(-1.3, Math.min(1.3, deltaX));
                const clampedY = Math.max(-1.3, Math.min(1.3, deltaY));

                const rotateX = clampedY * -15; // deg card tilt X
                const rotateY = clampedX * 17;  // deg card tilt Y
                const swingZ = clampedX * 6;    // deg card swing Z

                idCardStage.classList.remove('idle-swing');
                idCardStage.classList.remove('drop-anim');

                // 1. Transform Card
                cyberIdCard.style.transform = `perspective(1000px) translate3d(0, ${clampedY * 5}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${swingZ}deg)`;

                // 2. Transform Lanyard Rope & Clip synchronously with card movement
                if (lanyardRig) {
                    const ropeSwingZ = clampedX * 8.5; // deg rope sway
                    const ropeRotateY = clampedX * 12; // deg 3d angle
                    const ropeShiftX = clampedX * 7;   // px lateral shift
                    const ropeShiftY = Math.abs(clampedX) * 2;
                    lanyardRig.style.transform = `perspective(1000px) rotateZ(${ropeSwingZ}deg) rotateY(${ropeRotateY}deg) translate3d(${ropeShiftX}px, ${ropeShiftY}px, 0)`;
                }

                if (lanyardStrap) {
                    const strapSkew = clampedX * -6; // dynamic fabric flex
                    lanyardStrap.style.transform = `skewX(${strapSkew}deg) scaleY(${1 + Math.abs(clampedY) * 0.04})`;
                }

                if (lanyardClip) {
                    lanyardClip.style.transform = `rotateZ(${clampedX * 6}deg) rotateX(${rotateX * 0.4}deg)`;
                }

                // 3. Holographic glare physics
                if (cardGlare) {
                    const glareX = 50 + clampedX * 35;
                    const glareY = 40 + clampedY * 35;
                    cardGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(0, 230, 153, 0.18) 40%, transparent 70%)`;
                    cardGlare.style.opacity = '1';
                }
            });
        };

        const resetCard = () => {
            isInteracting = false;
            if (rafId) cancelAnimationFrame(rafId);
            cyberIdCard.style.transform = 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
            if (lanyardRig) lanyardRig.style.transform = '';
            if (lanyardStrap) lanyardStrap.style.transform = '';
            if (lanyardClip) lanyardClip.style.transform = '';

            if (cardGlare) {
                cardGlare.style.opacity = '0.6';
            }
            setTimeout(() => {
                if (!isInteracting) {
                    idCardStage.classList.add('idle-swing');
                }
            }, 300);
        };

        // Desktop Mouse Events
        idCardStage.addEventListener('mouseenter', () => {
            isInteracting = true;
            idCardStage.classList.remove('idle-swing');
        });

        idCardStage.addEventListener('mousemove', (e) => {
            isInteracting = true;
            handleMove(e.clientX, e.clientY);
        });

        idCardStage.addEventListener('mouseleave', resetCard);

        // Mobile Touch Interaction
        idCardStage.addEventListener('touchstart', (e) => {
            isInteracting = true;
            idCardStage.classList.remove('idle-swing');
        }, { passive: true });

        idCardStage.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                isInteracting = true;
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        idCardStage.addEventListener('touchend', resetCard);
    }

    // --- EMAIL CLICK TO COPY ---
    const contactEmailBtn = document.getElementById('contact-email-btn');
    if (contactEmailBtn) {
        let copyTimeout = null;
        contactEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = contactEmailBtn.getAttribute('data-email') || 'arifsaputravt03@gmail.com';

            const executeCopy = async () => {
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(email);
                    } else {
                        const textArea = document.createElement('textarea');
                        textArea.value = email;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-999999px';
                        textArea.style.top = '-999999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        document.execCommand('copy');
                        textArea.remove();
                    }
                    triggerSuccessUI();
                } catch (err) {
                    console.error('Failed to copy email:', err);
                }
            };

            const triggerSuccessUI = () => {
                if (copyTimeout) clearTimeout(copyTimeout);

                contactEmailBtn.classList.add('copied');

                // Floating toast notification
                let toast = document.getElementById('copy-toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'copy-toast';
                    toast.className = 'toast-notification';
                    document.body.appendChild(toast);
                }

                const toastText = currentLang === 'id' ? 'Telah disalin' : 'Copied to clipboard';
                toast.innerHTML = `<i class="bx bx-check-circle"></i> <span>${toastText}</span>`;
                toast.classList.add('show');

                copyTimeout = setTimeout(() => {
                    contactEmailBtn.classList.remove('copied');
                    toast.classList.remove('show');
                }, 2000);
            };

            executeCopy();
        });
    }

    // --- INITIALIZE LANGUAGE ---
    setLanguage(currentLang);
});
