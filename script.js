document.addEventListener('DOMContentLoaded', () => {
    // --- DICTIONARY FOR I18N BILINGUAL SUPPORT ---
    const translations = {
        id: {
            nav_about: "Tentang",
            nav_experience: "Pengalaman",
            nav_projects: "Proyek",
            nav_skills: "Keahlian",
            nav_certifications: "Sertifikasi",
            nav_cta: "Hubungi Saya",
            hero_badge: "IT Engineer | SysAdmin | ERP Developer",
            hero_title_prefix: "Halo, Saya",
            hero_subtitle_prefix: "Saya seorang",
            hero_desc: "Sarjana Teknik Informatika dengan pengalaman profesional lebih dari 2 tahun di bidang Teknologi Informasi, meliputi pengembangan ERP, integrasi sistem, infrastruktur IT, dan dukungan teknis. Berpengalaman dalam digitalisasi proses bisnis, administrasi proyek EPC, serta pengadaan.",
            hero_btn_projects: "Lihat Proyek",
            hero_btn_contact: "Hubungi Saya",
            stat_exp: "Tahun Pengalaman",
            stat_projects: "Proyek IT",
            stat_certs: "Sertifikat Kompetensi",
            about_label: "Tentang Saya",
            about_title: "Latar Belakang & Profil Profesional",
            about_subtitle: "Ringkasan Profil",
            about_p1: "Sarjana Teknik Informatika dengan pengalaman profesional lebih dari 2 tahun di bidang Teknologi Informasi, meliputi pengembangan ERP, integrasi sistem, infrastruktur IT, dan dukungan teknis.",
            about_p2: "Berpengalaman dalam digitalisasi proses bisnis, administrasi proyek EPC, serta pengadaan (procurement), didukung kemampuan analisis kebutuhan, implementasi solusi teknologi, dan pemecahan masalah (problem solving).",
            about_b1_title: "Pengembangan ERP & Integrasi Sistem",
            about_b1_desc: "Arsitektur aplikasi berbasis web, integrasi API, modul HR, Keuangan, Logistik, & Biometrik",
            about_b2_title: "Infrastruktur IT & DevOps",
            about_b2_desc: "Proxmox, Docker, Nginx, CI/CD, Nextcloud, Grafana, Kuma Uptime, PABX, & CCTV",
            about_b3_title: "Digitalisasi Proses Bisnis & Pengadaan",
            about_b3_desc: "Otomatisasi aplikasi Python OCR, dokumentasi QC Test Package, & manajemen ERP Procurement",
            tab_it: "IT & Sistem",
            tab_logistics: "Logistik & Pengadaan",
            tab_admin: "Administrasi & QC",
            it_item1_title: "Infrastruktur Server & DevOps",
            it_item1_desc: "Pengelolaan Proxmox, Docker, Nginx, CI/CD pipeline, Nextcloud cloud storage, Grafana, dan Kuma Uptime.",
            it_item2_title: "Pengembangan ERP Berbasis Web",
            it_item2_desc: "Perancangan arsitektur aplikasi, integrasi API, dan pengembangan modul operasional sesuai kebutuhan bisnis.",
            it_item3_title: "Jaringan & Otomatisasi Python",
            it_item3_desc: "Infrastruktur LAN, pengkabelan, switching, aplikasi Python OCR untuk ekstraksi berkas, serta IoT.",
            log_item1_title: "Pengadaan & Administrasi Vendor",
            log_item1_desc: "Pengelolaan siklus pengadaan via ERP (PO hingga pembayaran), negosiasi harga, dan evaluasi supplier.",
            log_item2_title: "Manajemen Stok & Verifikasi QC",
            log_item2_desc: "Verifikasi Surat Jalan (DO), faktur, inspeksi fisik barang masuk/keluar sesuai standar QC dan kebutuhan klien.",
            adm_item1_title: "Dokumentasi Proyek EPC & QC",
            adm_item1_desc: "Pengelolaan berkas Test Package, Welding Report, Cleaning Inspection Report, serta gambar teknik di SharePoint.",
            adm_item2_title: "Dukungan Teknis & Aset IT",
            adm_item2_desc: "Dukungan teknis remote & on-site, manajemen aset IT, katalog produk, dan administrasi marketplace.",
            skills_label: "Keahlian",
            skills_title: "Teknologi & Tools Utama",
            skills_col1: "Pengembangan ERP & Software",
            skills_col2: "Infrastruktur IT & DevOps",
            skills_col3: "Pengadaan, QC & Sistem Bisnis",
            exp_label: "Pengalaman",
            exp_title: "Pengalaman Kerja Profesional",
            job1_date: "Januari 2026 – Sekarang",
            exp_job1_b1: "Menganalisis kebutuhan klien, merancang arsitektur solusi, dan mengoordinasikan implementasi sistem bersama klien dan principal.",
            exp_job1_b2: "Mengembangkan ERP berbasis web melalui perancangan arsitektur aplikasi, integrasi API, dan pengembangan modul sesuai kebutuhan bisnis.",
            exp_job1_b3: "Mengelola infrastruktur IT, DevOps, dan layanan sistem meliputi Proxmox, Docker, Nginx, database, jaringan, CI/CD pipeline deployment, email SMTP, Nextcloud private cloud storage, serta layanan PABX dan CCTV.",
            exp_job1_b4: "Memantau, mengoptimalkan, dan melakukan pemeliharaan (troubleshooting) server, jaringan, aplikasi, dan website menggunakan Grafana dan Kuma Uptime.",
            job2_date: "Agustus 2025 – Desember 2025",
            exp_job2_b1: "Mengelola dokumentasi QC proyek meliputi Test Package, Welding Report, dan Cleaning Inspection Report.",
            exp_job2_b2: "Mengelola kontrol dokumen, log sheet, dan dokumentasi proyek menggunakan Microsoft 365 SharePoint.",
            exp_job2_b3: "Mengutak-atik & memperbarui data inspeksi serta gambar teknik pada sistem dokumentasi proyek.",
            exp_job2_b4: "Mengembangkan aplikasi Python OCR untuk otomatisasi ekstraksi, pencarian, dan pengelolaan dokumen.",
            job3_date: "Mei 2023 – Juli 2025",
            exp_job3_b1: "Mengelola proses pengadaan melalui sistem ERP, mulai dari PO hingga pembayaran vendor.",
            exp_job3_b2: "Melakukan negosiasi harga, evaluasi supplier, dan administrasi pengadaan.",
            exp_job3_b3: "Memverifikasi Surat Jalan (DO), faktur/invoice, dan dokumen pengadaan.",
            exp_job3_b4: "Memeriksa barang masuk dan keluar sesuai standar QC dan kebutuhan klien.",
            job4_date: "Mei 2022 – Mei 2023",
            exp_job4_b1: "Instalasi, konfigurasi, pemeliharaan, dan troubleshooting perangkat IT, jaringan, dan sistem operasi.",
            exp_job4_b2: "Mengelola infrastruktur LAN, pengkabelan, switching, inventaris, dan aset IT.",
            exp_job4_b3: "Mengelola data stok, katalog produk, dan administrasi melalui sistem ERP serta marketplace.",
            exp_job4_b4: "Memberikan dukungan teknis kepada pengguna internal dan pengguna marketplace secara remote maupun on-site.",
            job5_date: "Februari 2022 – Mei 2022",
            job5_title: "IT Support (Magang)",
            exp_job5_b1: "Menginstal, memelihara, dan melakukan troubleshooting perangkat IT dan jaringan.",
            exp_job5_b2: "Troubleshooting jaringan fiber optik, pemantauan CCTV, dan inspeksi infrastruktur kabel.",
            exp_job5_b3: "Dukungan teknis pelanggan untuk penanganan gangguan dan perbaikan jaringan.",
            projects_label: "Portofolio",
            projects_title: "Proyek & Pengadaan",
            filter_all: "Semua Proyek",
            filter_software: "Pengembangan Software",
            filter_iot: "IoT & Sistem",
            filter_procurement: "Pengadaan",
            view_details: "Lihat Detail",
            cert_label: "Sertifikasi",
            cert_title: "Sertifikat Kompetensi",
            cert_cyberops: "Pemahaman operasional pusat keamanan siber (SOC), analisis ancaman, pemantauan log keamanan, dan analisis insiden siber.",
            cert_fortinet_f: "Pemahaman mengenai lanskap ancaman modern, metodologi pertahanan jaringan, arsitektur firewall, dan dasar keamanan data.",
            cert_fortinet_a: "Kompetensi teknis pengelolaan operasional keamanan jaringan, administrasi FortiOS, kebijakan firewall, dan analisis log.",
            cert_mtcna: "Pengelolaan MikroTik RouterOS, konfigurasi aturan firewall filter, routing statis/dinamis, pembatas bandwidth (queues), dan NAT.",
            cert_bnsp: "Sertifikasi kompetensi negara dalam administrasi database, optimasi skema database, tuning query SQL, dan pemulihan backup data.",
            cert_cisco_rs: "Arsitektur jaringan, pengalamatan IPv4/IPv6, subnetting, switching dasar, VLAN, Inter-VLAN routing, dan protokol STP.",
            cert_js: "Pemrograman tingkat lanjut JavaScript: OOP, penanganan asynchronous (Promises/Async-Await), DOM manipulation, dan integrasi API.",
            cert_python: "Pemrograman Python tingkat lanjut: Pemrograman Berorientasi Objek (OOP), manajemen modul, exception handling, dan pemrosesan file/OCR.",
            cert_ibm: "Prinsip dasar teknologi informasi, konsep komputasi awan (cloud computing), keamanan siber, dan pengelolaan sistem data.",
            cert_honeywell: "Instalasi, pemrograman panel alarm kebakaran addressable & konvensional Notifier, serta pemeliharaan proteksi kebakaran gedung.",
            view_cert: "Lihat Sertifikat",
            verify_cert: "Verifikasi",
            contact_label: "Kontak",
            contact_title: "Mari Terhubung",
            contact_desc: "Tertarik untuk berdiskusi mengenai peluang kerja, integrasi sistem, infrastruktur IT & DevOps, administrasi database, atau pengembangan perangkat lunak ERP custom? Mari terhubung!",
            contact_location: "Tangerang Selatan, Banten, Indonesia",
            footer_text: "© 2026 Arif Saputra | Portofolio. Hak cipta dilindungi.",
            modal_label_role: "Peran / Posisi",
            modal_label_date: "Waktu Pelaksanaan",
            modal_label_location: "Lokasi Proyek",
            modal_head_desc: "Deskripsi Proyek",
            modal_head_results: "Hasil & Dampak Utama",
            modal_head_stack: "Stack Teknologi"
        },
        en: {
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_certifications: "Certifications",
            nav_cta: "Hire Me",
            hero_badge: "IT Engineer | SysAdmin | ERP Developer",
            hero_title_prefix: "Hello, I'm",
            hero_subtitle_prefix: "I'm an",
            hero_desc: "Bachelor of Informatics Engineering with more than 2 years of professional experience in the field of Information Technology, including ERP development, system integration, IT infrastructure, and technical support. Experienced in business process digitization, EPC project administration, and procurement.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Contact Me",
            stat_exp: "Years Experience",
            stat_projects: "IT Projects",
            stat_certs: "Certificates of Competence",
            about_label: "About Me",
            about_title: "Background & Professional Profile",
            about_subtitle: "Profile Summary",
            about_p1: "Bachelor of Informatics Engineering with more than 2 years of professional experience in the field of Information Technology, including ERP development, system integration, IT infrastructure, and technical support.",
            about_p2: "Experienced in business process digitization, EPC project administration, and procurement, with needs analysis, technology solution implementation, and problem solving capabilities.",
            about_b1_title: "ERP & System Integration",
            about_b1_desc: "Web-based app architecture, API integration, HR, Finance, Logistics, & Biometrics modules",
            about_b2_title: "IT Infrastructure & DevOps",
            about_b2_desc: "Proxmox, Docker, Nginx, CI/CD, Nextcloud, Grafana, Kuma Uptime, PABX, & CCTV",
            about_b3_title: "Business Process Digitization & Procurement",
            about_b3_desc: "Python OCR app automation, QC Test Package documentation, & ERP Procurement management",
            tab_it: "IT & Systems",
            tab_logistics: "Logistics & Procurement",
            tab_admin: "Administration & QC",
            it_item1_title: "Server Infrastructure & DevOps",
            it_item1_desc: "Managing Proxmox, Docker, Nginx, CI/CD pipeline, Nextcloud cloud storage, Grafana, and Kuma Uptime.",
            it_item2_title: "Web-Based ERP Development",
            it_item2_desc: "Designing application architecture, API integration, and module development as per business needs.",
            it_item3_title: "Networking & Python Automation",
            it_item3_desc: "LAN infrastructure, cabling, switching, Python OCR document extraction apps, and IoT.",
            log_item1_title: "Procurement & Vendor Admin",
            log_item1_desc: "Managing procurement via ERP systems (from PO to vendor payment), price negotiations, and supplier evaluation.",
            log_item2_title: "Stock & Quality Control",
            log_item2_desc: "Verifying Delivery Orders (DOs), invoices, and inspecting incoming/outgoing goods according to QC standards.",
            adm_item1_title: "EPC & QC Project Docs",
            adm_item1_desc: "Managing Test Package, Welding Report, Cleaning Inspection Report, and engineering drawings on SharePoint.",
            adm_item2_title: "Technical Support & IT Assets",
            adm_item2_desc: "Remote & on-site technical support, IT asset management, product catalogs, and marketplace administration.",
            skills_label: "Skills",
            skills_title: "Tech Stack & Main Tools",
            skills_col1: "ERP & Software Development",
            skills_col2: "IT Infrastructure & DevOps",
            skills_col3: "Procurement, QC & Business Systems",
            exp_label: "Experience",
            exp_title: "Professional Work Experience",
            job1_date: "January 2026 – Present",
            exp_job1_b1: "Analyze client needs, design solution architecture, and coordinate system implementation with clients and principals.",
            exp_job1_b2: "Develop a web-based ERP through application architecture design, API integration, and module development as per business needs.",
            exp_job1_b3: "Managing IT infrastructure, DevOps, and system services including Proxmox, Docker, Nginx, database, network, CI/CD, pipeline deployment, SMTP email, Nextcloud as private cloud storage, as well as PABX and CCTV services.",
            exp_job1_b4: "Monitor, optimize, and troubleshoot servers, networks, applications, and websites using Grafana and Kuma Uptime.",
            job2_date: "August 2025 – December 2025",
            exp_job2_b1: "Manage project QC documentation including Test Package, Welding Report, and Cleaning Inspection Report.",
            exp_job2_b2: "Manage document control, log sheets, and project documentation using Microsoft 365 SharePoint.",
            exp_job2_b3: "Update inspection data and engineering drawings on the project documentation system.",
            exp_job2_b4: "Develop Python OCR applications for document extraction, search, and management automation.",
            job3_date: "May 2023 – July 2025",
            exp_job3_b1: "Manage procurement through an ERP system, from PO to vendor payment.",
            exp_job3_b2: "Conduct price negotiations, supplier evaluation, and procurement administration.",
            exp_job3_b3: "Verifying Delivery Orders (DOs), invoices, and procurement documents.",
            exp_job3_b4: "Inspect incoming and outgoing goods according to QC standards and client requirements.",
            job4_date: "May 2022 – May 2023",
            exp_job4_b1: "Installation, configuration, maintenance, and troubleshooting of IT devices, networks, and operating systems.",
            exp_job4_b2: "Manage LAN infrastructure, cabling, switching, inventory, and IT assets.",
            exp_job4_b3: "Manage stock data, product catalogs, and administration through ERP systems and marketplaces.",
            exp_job4_b4: "Technical support to internal users and marketplace users remotely and on-site.",
            job5_date: "February 2022 – May 2022",
            job5_title: "IT Support (Internship)",
            exp_job5_b1: "Install, maintain, and troubleshoot IT devices and networks.",
            exp_job5_b2: "Fiber optic network troubleshooting, CCTV monitoring, and cable infrastructure inspection.",
            exp_job5_b3: "Customer technical support for outage handling and network repair.",
            projects_label: "Portfolio",
            projects_title: "Projects & Procurements",
            filter_all: "All Projects",
            filter_software: "Software Dev",
            filter_iot: "IoT & Systems",
            filter_procurement: "Procurement",
            view_details: "View Details",
            cert_label: "Certifications",
            cert_title: "Certificates of Competence",
            cert_cyberops: "Security operations center (SOC) fundamentals, threat analysis, security log monitoring, and incident response.",
            cert_fortinet_f: "Understanding modern threat landscapes, network defense methodologies, firewall architectures, and data security.",
            cert_fortinet_a: "Competency in network security operations, FortiOS administration, firewall policy setups, and log analysis.",
            cert_mtcna: "Administering MikroTik RouterOS, firewall filters, static/dynamic routing, bandwidth queues, and NAT.",
            cert_bnsp: "State competency certification in database administration, schema optimization, SQL query tuning, and backup/restore.",
            cert_cisco_rs: "Network architecture, IPv4/IPv6 addressing, subnetting, basic switching, VLANs, Inter-VLAN routing, and STP.",
            cert_js: "Advanced JavaScript programming: OOP, async handling (Promises/Async-Await), DOM manipulation, and API integration.",
            cert_python: "Advanced Python programming: Object-Oriented Programming (OOP), module management, exception handling, and file/OCR processing.",
            cert_ibm: "Information technology fundamentals, cloud computing concepts, cybersecurity, and data system management.",
            cert_honeywell: "Installation, programming of addressable & conventional Notifier fire alarm panels, and building fire protection maintenance.",
            view_cert: "View Certificate",
            verify_cert: "Verify",
            contact_label: "Contact",
            contact_title: "Let's Connect",
            contact_desc: "Interested in discussing job opportunities, system integrations, IT infrastructure & DevOps, database administration, or custom web ERP software development? Let's connect!",
            contact_location: "South Tangerang, Banten, Indonesia",
            footer_text: "© 2026 Arif Saputra | Portfolio. All rights reserved.",
            modal_label_role: "Role / Position",
            modal_label_date: "Timeline",
            modal_label_location: "Project Location",
            modal_head_desc: "Project Description",
            modal_head_results: "Results & Impact",
            modal_head_stack: "Technology Stack"
        }
    };

    let currentLang = localStorage.getItem('user_lang') || 'en';

    // --- LANGUAGE SWITCHING LOGIC ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('user_lang', lang);
        document.documentElement.setAttribute('lang', lang);

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
                el.textContent = translations[lang][key];
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

    // --- STICKY NAVBAR & BACK TO TOP ---
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

    // --- DYNAMIC TYPING ANIMATION ---
    const wordsDict = {
        id: ["IT Engineer", "ERP Developer", "SysAdmin & DevOps", "System Integrator"],
        en: ["IT Engineer", "ERP Developer", "SysAdmin & DevOps", "System Integrator"]
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
        
        track.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
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
            particles = [];
            for (let p = 0; p < maxParticles; p++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 98, 255, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', initParticles);
    }

    // --- INITIALIZE LANGUAGE ---
    setLanguage(currentLang);
});
