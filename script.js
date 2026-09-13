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

        // Smooth & luxurious progression curve (~2.4s total)
        const startTime = performance.now();
        const duration = 2400;

        const finishPreloader = () => {
            if (isDone) return;
            isDone = true;
            updatePreloader(100);

            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Trigger event so counters and hero effects start right as the screen reveals
                window.dispatchEvent(new CustomEvent('portfolioReady'));

                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 600);
            }, 300);
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
        setTimeout(finishPreloader, 3800);
    }

    // --- DICTIONARY FOR I18N BILINGUAL SUPPORT ---
    const translations = {
        id: {
            nav_about: "Tentang",
            nav_experience: "Pengalaman",
            nav_projects: "Proyek",
            nav_skills: "Keahlian",
            nav_certifications: "Sertifikasi",
            nav_cta: "Hubungi Saya",
            hero_badge: "Software Developer & IT System Engineer | Infrastruktur ERP & DevOps <br class=\"badge-br\"> Integrasi Sistem | IoT & Digital Transformation",
            hero_title_prefix: "Halo, Saya",
            hero_subtitle_prefix: "Saya seorang",
            hero_desc: "Seorang profesional IT berpengalaman dalam IT Support & Systems, Software dan ERP Development, hingga Cloud Infrastructure, DevOps, Network Infrastructure, dan System Integration, dengan pengalaman mendukung operasional office serta implementasi solusi IT pada proyek enterprise.",
            hero_btn_projects: "Lihat Proyek",
            hero_btn_contact: "Hubungi Saya",
            stat_exp: "Tahun Pengalaman Kerja",
            stat_projects: "Proyek IT & Sistem",
            stat_certs: "Sertifikat Kompetensi",
            about_label: "Tentang Saya",
            about_title: "Latar Belakang & Profil Profesional",
            about_subtitle: "Ringkasan Profil",
            about_p1: "Sarjana Teknik Informatika dengan pengalaman profesional 4+ tahun, mencakup 2+ tahun di bidang IT Systems, ERP Development, Cloud Infrastructure & DevOps, serta sekitar 2 tahun di Procurement dan administrasi proyek EPC.",
            about_p2: "Berfokus pada Software & ERP Development, Network & Cloud Infrastructure, System Integration, IT Support, serta solusi IoT dan otomasi untuk meningkatkan efisiensi dan mendukung transformasi digital perusahaan.",
            about_core_title: "Kompetensi Utama",
            core1: "System Analyst",
            core2: "System Integrator",
            core3: "Software Developer",
            core4: "Cybersecurity",
            core5: "Infrastruktur IT",
            core6: "IT Technical Support",
            core7: "Admin Proyek EPC & Pengadaan",
            about_soft_title: "Keahlian Interpersonal (Soft Skills)",
            soft1: "Pemecahan Masalah & Berpikir Analitis",
            soft2: "Komunikasi & Kolaborasi Tim",
            soft3: "Pembelajaran Cepat & Adaptabilitas",
            about_b1_title: "Pengembangan ERP & Integrasi Sistem",
            about_b1_desc: "Arsitektur aplikasi berbasis web, integrasi REST API, modul HR, Keuangan, Logistik, & Biometrik",
            about_b2_title: "Infrastruktur IT & DevOps",
            about_b2_desc: "Proxmox VE, Docker, Nginx, CI/CD, Nextcloud & NAS Storage, Email SMTP & Domain Kantor, WordPress Web Compro, Grafana, PABX, & CCTV",
            about_b3_title: "Digitalisasi Proses Bisnis & Pengadaan",
            about_b3_desc: "Otomatisasi aplikasi Python OCR, dokumentasi QC Test Package, & manajemen ERP Procurement",
            tab_it: "IT & Sistem",
            tab_logistics: "Logistik & Pengadaan",
            tab_admin: "Administrasi & QC",
            it_item1_title: "Pengembangan Software & Arsitektur ERP",
            it_item1_desc: "Pengembangan PWA ERP (React JS, Node JS, Express, MongoDB Replica Set) untuk modul Supply Chain, Finance, HR, Aset, Presales, & Proyek.",
            it_item2_title: "Integrasi Sistem, Deployment & DevOps",
            it_item2_desc: "Otomatisasi DevOps & deployment via REST API, Gitea CI/CD, Docker, Nginx, Mail Server, & integrasi biometrik ZKTeco.",
            it_item3_title: "Infrastruktur IT Kantor Pusat & Proyek",
            it_item3_desc: "Pengelolaan IT Infra & Proxmox, VLAN switching, Nextcloud, CCTV, Access Door, serta pemantauan Grafana & Uptime Kuma.",
            it_item4_title: "Dukungan Teknis IT & Keamanan Sistem",
            it_item4_desc: "Dukungan teknis IT (on-site/remote), backup/restore, serta pengamanan SMTP Email (SPF/DKIM/DMARC) & Cloudflare WAF.",
            it_item5_title: "Otomatisasi Solusi IoT & ICT",
            it_item5_desc: "Perancangan otomatisasi IoT & sensor (ESP32/Arduino, MQTT, Wiring) untuk kontrol dan telemetri real-time.",
            log_item1_title: "Pengadaan IT & Non-IT, Vendor & Kontrol Stok",
            log_item1_desc: "Pengadaan IT & Non-IT via ERP: pembuatan PO, manajemen vendor, verifikasi DO/invoice, & kontrol stok.",
            log_item2_title: "Digitalisasi Rantai Pasok & Manajemen Aset ERP",
            log_item2_desc: "Digitalisasi rantai pasok & manajemen aset perusahaan melalui pengembangan modul ERP terintegrasi.",
            adm_item1_title: "Kontrol Dokumen Proyek EPC & Pengarsipan Digital",
            adm_item1_desc: "Pengelolaan dokumen QC EPC (Test Package, Welding & Inspection Report) & pengarsipan digital MS 365 SharePoint.",
            adm_item2_title: "Validasi Data Excel & Pelaporan Kualitas",
            adm_item2_desc: "Validasi & pengolahan data QC via MS Excel (VLOOKUP, XLOOKUP, CONCATENATE, Pivot Table, & Math/Filter) untuk akurasi laporan.",
            adm_item3_title: "Otomatisasi & Ekstraksi Dokumen Python OCR",
            adm_item3_desc: "Otomatisasi ekstraksi dokumen berbasis Python OCR untuk konversi data terstruktur (JSON/Excel) & pencarian cepat.",
            tag_it_erp: "Sistem IT & ERP",
            tag_epc_admin: "Admin EPC & QC Doc Control",
            tag_procurement: "Pengadaan & Logistik",
            tag_it_admin: "Administrator IT & Aset",
            tag_telecom: "Telekomunikasi & Support IT",
            skills_label: "Keahlian",
            skills_title: "Teknologi & Tools Utama",
            skills_col1: "Software Development & Pemrograman",
            skills_col2: "Keamanan Sistem & Cybersecurity",
            skills_col3: "Infrastruktur Cloud & DevOps",
            skills_col4: "Infrastruktur Jaringan & IoT",
            skills_col5: "Analisis Sistem & Pengadaan IT / Admin QC",
            exp_label: "Pengalaman",
            exp_title: "Pengalaman Kerja Profesional",
            job1_date: "Januari 2026 – Sekarang",
            job1_subtitle: "PT Trigatra Sistem Integrasi – Tangerang Selatan, Banten",
            exp_job1_b1: "Analisis kebutuhan klien, perancangan arsitektur solusi, & pengembangan PWA ERP berbasis web (React JS, Node JS, Express, MongoDB Replica Set).",
            exp_job1_b2: "Administrasi IT Infra & DevOps: Proxmox VE, Docker, CI/CD, Nginx, Management VLAN, Server Mail SMTP, Nextcloud, PABX, CCTV, & Access Control.",
            exp_job1_b3: "Dukungan teknis IT (on-site & remote) & troubleshooting hardware, software, server, jaringan enterprise, PC/printer, & peripheral pengguna.",
            exp_job1_b4: "Monitoring sistem real-time via Grafana & Uptime Kuma, serta manajemen aset IT, inventarisasi, lisensi software, & dokumentasi teknis.",
            job2_date: "Agustus 2025 – Desember 2025",
            exp_job2_b1: "Pengelolaan dokumen QC proyek EPC: Test Package, Welding Report, & Cleaning Inspection Report.",
            exp_job2_b2: "Document control, transmittal, & pengarsipan digital proyek menggunakan MS 365 SharePoint.",
            exp_job2_b3: "Pembaruan data inspeksi & gambar teknik pada sistem dokumentasi proyek.",
            exp_job2_b4: "Pengembangan aplikasi Python OCR untuk otomatisasi ekstraksi data & konversi dokumen proyek.",
            job3_date: "Mei 2023 – Juli 2025",
            exp_job3_b1: "Mengelola pengadaan melalui sistem ERP, mulai dari penerbitan PO hingga pembayaran vendor.",
            exp_job3_b2: "Melakukan negosiasi harga, evaluasi performa supplier, dan administrasi kontrak pengadaan.",
            exp_job3_b3: "Memverifikasi Surat Jalan (Delivery Order/DO), tagihan (invoice), dan kelengkapan dokumen pengadaan.",
            exp_job3_b4: "Melakukan inspeksi penerimaan barang masuk dan keluar sesuai spesifikasi teknis dan standar QC.",
            job4_date: "Mei 2022 – Mei 2023",
            job4_title: "Administrator IT",
            exp_job4_b1: "Instalasi, konfigurasi, pemeliharaan rutin, dan troubleshooting perangkat IT, jaringan, serta sistem operasi.",
            exp_job4_b2: "Mengelola infrastruktur jaringan lokal (LAN), pengkabelan, switching, inventarisasi, dan aset IT perusahaan.",
            exp_job4_b3: "Memberikan dukungan teknis IT secara langsung (on-site) maupun remote kepada pengguna internal.",
            exp_job4_b4: "Mengelola data inventaris stok, katalog produk, dan administrasi melalui sistem ERP serta marketplace.",
            job5_date: "Februari 2022 – Mei 2022",
            job5_title: "IT Support (Magang)",
            exp_job5_b1: "Instalasi, pemeliharaan berkala, & troubleshooting perangkat IT dan jaringan perusahaan.",
            exp_job5_b2: "Troubleshooting jaringan Fiber Optic (FO), pemantauan CCTV, & inspeksi fisik jalur kabel jaringan.",
            exp_job5_b3: "Dukungan teknis pelanggan untuk penanganan gangguan jaringan dan perbaikan layanan konektivitas.",
            projects_label: "Portofolio",
            projects_title: "Proyek Utama",
            filter_all: "Semua Proyek",
            filter_software: "Pengembangan Software",
            filter_iot: "IoT & Sistem",
            filter_infra: "Infrastruktur IT & Integrasi Sistem",
            view_details: "Lihat Detail",
            cert_label: "Sertifikasi",
            cert_title: "Sertifikat Kompetensi",
            cert_cyberops: "Pengoperasian SOC perusahaan, analisis ancaman siber, keamanan OS Windows/Linux, deteksi intrusi jaringan, investigasi kerentanan endpoint, dan penerapan model incident response.",
            cert_nse1: "Memahami dasar cybersecurity, network security, cyber threats, malware, phishing, dan security awareness.",
            cert_nse2: "Memahami produk dan solusi Fortinet, termasuk konsep firewall, endpoint security, secure connectivity, dan network protection.",
            cert_nse3: "Memahami penerapan Fortinet Security Fabric, FortiGate, firewall policy, traffic filtering, network segmentation, secure connectivity, dan threat protection.",
            cert_lfc108: "Prinsip dasar keamanan siber, pengerasan sistem (system hardening), mitigasi risiko, dan praktik terbaik keamanan lingkungan komputasi.",
            cert_lfs101: "Dasar-dasar sistem operasi Linux, administrasi antarmuka baris perintah (CLI), pengoperasian sistem, dan pengelolaan lingkungan open-source.",
            cert_lfs158: "Arsitektur Kubernetes & kontainerisasi (Docker): Konfigurasi klaster, manajemen node, serta deployment & pengamanan aplikasi via Pods, Services, & Deployments.",
            cert_mtcna: "Pengelolaan MikroTik RouterOS, konfigurasi aturan firewall filter, routing statis/dinamis, pembatas bandwidth (queues), dan NAT.",
            cert_bnsp: "Sertifikasi kompetensi negara dalam administrasi database, optimasi skema database, tuning query SQL, dan pemulihan backup data.",
            cert_cisco_rs: "Penentuan forwarding lalu lintas router, pengoperasian switch Ethernet, konfigurasi VLAN, routing statis & RIPv2, implementasi DHCP, NAT, serta filtrasi lalu lintas dengan ACL.",
            cert_js: "Pemrograman tingkat lanjut JavaScript: OOP, penanganan asynchronous (Promises/Async-Await), DOM manipulation, dan integrasi API.",
            cert_python: "Pemrograman Python tingkat lanjut: Pemrograman Berorientasi Objek (OOP), manajemen modul, exception handling, dan pemrosesan file/OCR.",
            cert_ibm: "Prinsip dasar teknologi informasi, konsep komputasi awan (cloud computing), keamanan siber, dan pengelolaan sistem data.",
            cert_honeywell: "Instalasi, pemrograman panel alarm kebakaran addressable & konvensional Notifier, serta pemeliharaan proteksi kebakaran gedung.",
            cert_mongodb: "Operasi basis data dokumen MongoDB, manipulasi CRUD, strategi pengindeksan (indexing), aggregation pipeline, dan desain skema data.",
            cert_sql_basic: "Query SQL dasar, konsep basis data relasional, pernyataan SELECT, pemfilteran data dengan WHERE, penggabungan tabel (JOIN), agregasi (GROUP BY, HAVING), pengurutan, dan subquery.",
            cert_software_engineer: "Mencakup topik rekayasa perangkat lunak seperti Pemecahan Masalah (Problem Solving), Java, Go, SQL, dan pengembangan REST API.",
            cert_filter_all: "Semua Sertifikasi",
            cert_filter_cyber: "Keamanan Siber",
            cert_filter_devops: "DevOps",
            cert_filter_infra: "Infrastruktur & Jaringan",
            cert_filter_software: "Pengembangan Software",
            cert_filter_db: "Administrasi Database",
            cert_filter_industrial: "Sistem Industri",
            view_cert: "Lihat Sertifikat",
            verify_cert: "Verifikasi",
            contact_label: "Kontak",
            contact_title: "Mari Terhubung",
            contact_desc: "Tertarik untuk berdiskusi mengenai peluang kerja atau kolaborasi di bidang IT Support, System Integration, System Administration, Cloud DevOps, maupun Software Development? Mari terhubung!",
            contact_location: "Tangerang Selatan, Banten, Indonesia",
            footer_text: "© 2026 Arif Saputra | Portofolio. Hak cipta dilindungi.",
            modal_label_role: "Peran / Posisi",
            modal_label_date: "Periode Proyek",
            modal_label_location: "Lokasi Proyek",
            modal_head_desc: "Deskripsi Proyek",
            modal_head_results: "Hasil & Dampak Utama",
            modal_head_stack: "Technology Stack",
            visit_website: "Kunjungi Website (trigatra.co)"
        },
        en: {
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_certifications: "Certifications",
            nav_cta: "Contact Me",
            hero_badge: "Software Developer & IT System Engineer | ERP & DevOps Infrastructure <br class=\"badge-br\"> System Integration | IoT & Digital Transformation",
            hero_title_prefix: "Hello, I'm",
            hero_subtitle_prefix: "I'm an",
            hero_desc: "An experienced IT professional in IT Support & Systems, Software and ERP Development, Cloud Infrastructure, DevOps, Network Infrastructure, and System Integration, with proven experience supporting corporate office operations and implementing IT solutions for enterprise projects.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Contact Me",
            stat_exp: "Years of Professional Experience",
            stat_projects: "IT & System Projects",
            stat_certs: "Certificates of Competence",
            about_label: "About Me",
            about_title: "Background & Professional Profile",
            about_subtitle: "Profile Summary",
            about_p1: "Bachelor of Informatics Engineering with 4+ years of professional experience, encompassing 2+ years in IT Systems, ERP Development, Cloud Infrastructure & DevOps, and approximately 2 years in Procurement and EPC project administration.",
            about_p2: "Focused on Software & ERP Development, Network & Cloud Infrastructure, System Integration, IT Support, as well as IoT solutions and automation to enhance efficiency and drive corporate digital transformation.",
            about_core_title: "Core Competencies",
            core1: "System Analyst",
            core2: "System Integrator",
            core3: "Software Developer",
            core4: "Cybersecurity",
            core5: "IT Infrastructure",
            core6: "IT Technical Support",
            core7: "EPC Project Admin & Procurement",
            about_soft_title: "Soft Skills & Core Qualities",
            soft1: "Problem Solving & Analytical Thinking",
            soft2: "Communication & Teamwork",
            soft3: "Fast Learning & Adaptability",
            about_b1_title: "ERP Development & System Integration",
            about_b1_desc: "Web-based application architecture, REST API integration, HR, Finance, Logistics, & Biometrics modules",
            about_b2_title: "IT Infrastructure & DevOps",
            about_b2_desc: "Proxmox VE, Docker, Nginx, CI/CD, Nextcloud, NAS Storage, Corporate SMTP Mail & Domain, WordPress Compro Maintenance, Grafana, PABX, & CCTV",
            about_b3_title: "Business Process Digitization & Procurement",
            about_b3_desc: "Python OCR document automation, QC Test Package documentation, & ERP Procurement management",
            tab_it: "IT & Systems",
            tab_logistics: "Logistics & Procurement",
            tab_admin: "Administration & QC",
            it_item1_title: "Software Development & ERP Architecture",
            it_item1_desc: "PWA ERP development (React JS, Node JS, Express, & MongoDB Replica Set) covering Supply Chain, Finance, HR, Assets, Presales, & Project modules.",
            it_item2_title: "System Integration, Deployment & DevOps",
            it_item2_desc: "DevOps automation & deployment via REST API, Gitea CI/CD, Docker, Nginx, Mail Systems, & ZKTeco biometric integration.",
            it_item3_title: "Head Office & Project IT Infrastructure",
            it_item3_desc: "Management of IT Infra & Proxmox, VLAN switching, Nextcloud, CCTV, Access Control, and Grafana & Uptime Kuma monitoring.",
            it_item4_title: "IT Technical Support & System Security",
            it_item4_desc: "On-site & remote IT support, backup/recovery, corporate SMTP Email security (SPF/DKIM/DMARC), and Cloudflare WAF protection.",
            it_item5_title: "IoT & ICT Automation Solutions",
            it_item5_desc: "IoT & sensor automation design (ESP32/Arduino, MQTT, Wiring) for real-time telemetry and automated control.",
            log_item1_title: "IT & Non-IT Procurement & Stock Control",
            log_item1_desc: "IT & Non-IT ERP procurement: PO creation, vendor management, DO/invoice verification, & stock control.",
            log_item2_title: "Supply Chain & Asset Management Digitization",
            log_item2_desc: "Supply chain & corporate asset management digitization through customized integrated ERP modules.",
            adm_item1_title: "EPC Project Document Control & Archiving",
            adm_item1_desc: "EPC QC document management (Test Package, Welding & Inspection Reports) & MS 365 SharePoint digital archiving.",
            adm_item2_title: "Excel Data Validation & Quality Reporting",
            adm_item2_desc: "QC data validation via MS Excel (VLOOKUP, XLOOKUP, CONCATENATE, Pivot Tables, & Math/Filters) for report accuracy.",
            adm_item3_title: "Python OCR Automation & Document Extraction",
            adm_item3_desc: "Python OCR document processing automation for structured data conversion (JSON/Excel) & rapid retrieval.",
            tag_it_erp: "IT Systems & ERP",
            tag_epc_admin: "EPC Admin & QC Doc Control",
            tag_procurement: "Procurement & Logistics",
            tag_it_admin: "IT Administrator & Assets",
            tag_telecom: "Telecom & IT Support",
            skills_label: "Skills",
            skills_title: "Tech Stack & Main Tools",
            skills_col1: "Software Development & Programming",
            skills_col2: "System Security & Cybersecurity",
            skills_col3: "Cloud Infrastructure & DevOps",
            skills_col4: "Network Infrastructure & IoT",
            skills_col5: "System Analyst & IT Procurement / Admin QC",
            exp_label: "Experience",
            exp_title: "Professional Work Experience",
            job1_date: "January 2026 – Present",
            job1_subtitle: "PT Trigatra Sistem Integrasi – South Tangerang, Banten",
            exp_job1_b1: "Client requirements analysis, solution architecture design, and web-based PWA ERP development (React JS, Node JS, Express, MongoDB Replica Set).",
            exp_job1_b2: "IT Infrastructure & DevOps administration: Proxmox VE, Docker, Gitea CI/CD, Nginx Reverse Proxy, Management VLAN, Corporate SMTP Mail, Nextcloud, PABX, IP/Analog CCTV, & ZKTeco Access Control.",
            exp_job1_b3: "On-site and remote IT technical support & troubleshooting for enterprise hardware, software, servers, networks, PCs/printers, and user peripherals.",
            exp_job1_b4: "Real-time system health monitoring via Grafana & Uptime Kuma, alongside IT asset tracking, inventory control, software licensing, & technical documentation.",
            job2_date: "August 2025 – December 2025",
            exp_job2_b1: "Management of EPC project QC documentation: Test Package, Welding Report, and Cleaning Inspection Report.",
            exp_job2_b2: "Document control, transmittal issuing, and digital archiving using MS 365 SharePoint.",
            exp_job2_b3: "Processing inspection data and updating technical drawings within the project documentation system.",
            exp_job2_b4: "Development of Python OCR applications for automated data extraction and project document conversion.",
            job3_date: "May 2023 – July 2025",
            exp_job3_b1: "Managed end-to-end procurement workflows through the ERP system, from Purchase Order (PO) issuance to final vendor payments.",
            exp_job3_b2: "Conducted commercial negotiations, supplier performance evaluations, and procurement contract administration.",
            exp_job3_b3: "Verified Delivery Orders (DO), vendor invoices, and procurement compliance documentation.",
            exp_job3_b4: "Inspected incoming and outgoing materials against technical specifications and QC standards.",
            job4_date: "May 2022 – May 2023",
            job4_title: "IT Administrator",
            exp_job4_b1: "Installation, configuration, routine maintenance, and troubleshooting of IT hardware, network infrastructure, and operating systems.",
            exp_job4_b2: "Managed LAN network infrastructure, structured cabling, Ethernet switches, inventory control, and enterprise IT assets.",
            exp_job4_b3: "Provided responsive on-site and remote IT technical support to internal enterprise users.",
            exp_job4_b4: "Managed inventory stock data, product catalogs, and administrative workflows via ERP systems and online channels.",
            job5_date: "February 2022 – May 2022",
            job5_title: "IT Support (Internship)",
            exp_job5_b1: "Installation, periodic maintenance, and troubleshooting of enterprise IT devices and network infrastructure.",
            exp_job5_b2: "Fiber Optic (FO) network troubleshooting, CCTV surveillance monitoring, and physical cabling infrastructure inspections.",
            exp_job5_b3: "Delivered technical customer support for network incident resolution and connectivity repairs.",
            projects_label: "Portfolio",
            projects_title: "Featured Projects",
            filter_all: "All Projects",
            filter_software: "Software Development",
            filter_iot: "IoT & Systems",
            filter_infra: "IT Infra & System Integration",
            view_details: "View Details",
            cert_label: "Certifications",
            cert_title: "Certificates of Competence",
            cert_cyberops: "Enterprise SOC operations, cybersecurity threat analysis, Windows/Linux OS security, network intrusion detection, endpoint vulnerability investigation, and incident response models.",
            cert_nse1: "Understanding cybersecurity fundamentals, network security, cyber threats, malware, phishing, and security awareness.",
            cert_nse2: "Understanding Fortinet products and solutions, including firewall concepts, endpoint security, secure connectivity, and network protection.",
            cert_nse3: "Understanding the application of Fortinet Security Fabric, FortiGate, firewall policies, traffic filtering, network segmentation, secure connectivity, and threat protection.",
            cert_lfc108: "Fundamentals of cybersecurity principles, system hardening, risk mitigation, and security best practices for computing environments.",
            cert_lfs101: "Fundamentals of Linux OS, command-line interface (CLI) administration, system operations, and open-source environment management.",
            cert_mtcna: "Administering MikroTik RouterOS, firewall filters, static/dynamic routing, bandwidth queues, and NAT.",
            cert_bnsp: "State competency certification in database administration, schema optimization, SQL query tuning, and backup/restore.",
            cert_cisco_rs: "Router traffic forwarding operations, Ethernet switching, VLAN implementation, static routing & RIPv2, DHCP, NAT, ACL traffic filtering, and network troubleshooting.",
            cert_js: "Advanced JavaScript programming: OOP, async handling (Promises/Async-Await), DOM manipulation, and API integration.",
            cert_python: "Advanced Python programming: Object-Oriented Programming (OOP), module management, exception handling, and file/OCR processing.",
            cert_ibm: "Information technology fundamentals, cloud computing concepts, cybersecurity, and data system management.",
            cert_honeywell: "Installation, programming of addressable & conventional Notifier fire alarm panels, and building fire protection maintenance.",
            cert_mongodb: "MongoDB document database operations, CRUD manipulation, indexing strategies, aggregation pipeline, and schema design.",
            cert_sql_basic: "Basic SQL queries, relational database concepts, SELECT statements, filtering with WHERE, joins (INNER, LEFT, RIGHT), aggregations (GROUP BY, HAVING), sorting, and subqueries.",
            cert_software_engineer: "Core software engineering topics including Problem Solving, Java, Go, SQL, and REST API development.",
            cert_filter_all: "All Certifications",
            cert_filter_cyber: "Cybersecurity",
            cert_filter_devops: "DevOps",
            cert_filter_infra: "IT Infra & Networking",
            cert_filter_software: "Software Dev",
            cert_filter_db: "Database Admin",
            cert_filter_industrial: "Industrial Systems",
            view_cert: "View Certificate",
            verify_cert: "Verify",
            contact_label: "Contact",
            contact_title: "Let's Connect",
            contact_desc: "Interested in discussing career opportunities or technical collaboration in IT Support, System Integration, System Administration, Cloud DevOps, or Software Development? Let's connect!",
            contact_location: "South Tangerang, Banten, Indonesia",
            footer_text: "© 2026 Arif Saputra | Portfolio. All rights reserved.",
            modal_label_role: "Role / Position",
            modal_label_date: "Timeline",
            modal_label_location: "Project Location",
            modal_head_desc: "Project Description",
            modal_head_results: "Results & Key Impact",
            modal_head_stack: "Technology Stack",
            visit_website: "Visit Website (trigatra.co)"
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
        id: ["Software Developer", "IT System Engineer", "ERP Developer", "DevOps & Infrastructure", "System Integration", "IoT & Digital Transformation"],
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
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
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
        
        track.addEventListener('scroll', toggleButtons);
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

        function animateParticles() {
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

            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

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

    // --- INITIALIZE LANGUAGE ---
    setLanguage(currentLang);
});
