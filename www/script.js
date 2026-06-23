/* 
================================================================
  DEVOPS & CLOUD ENGINEER PORTFOLIO INTERACTIVE LOGIC
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT & ACTIVE LINKS ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        // Sticky class toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active link highlighting on scroll
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 2. MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinksContainer.style.display === 'flex';
        navLinksContainer.style.display = isOpen ? 'none' : 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '76px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'rgba(10, 13, 22, 0.95)';
        navLinksContainer.style.padding = '20px';
        navLinksContainer.style.borderBottom = '1px solid var(--color-border)';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksContainer.style.display = 'none';
            }
        });
    });


    // --- 3. AUTO-TYPING TEXT IN HERO ---
    const typingText = document.getElementById('typing-text');
    const roles = [
        'Kubernetes Orchestrator',
        'AWS Cloud Architect',
        'CI/CD Pipeline Specialist',
        'Infrastructure as Code Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    if (typingText) {
        setTimeout(type, 1000);
    }


    // --- 4. CI/CD PIPELINE SIMULATOR ---
    const triggerBtn = document.getElementById('trigger-pipeline-btn');
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    const consoleLogs = document.getElementById('pipeline-logs');

    const pipelineLogData = [
        {
            stepId: 'step-1',
            logs: [
                '[PIPELINE] [09:42:01] Triggered by commit main-9c2b47 (alex-carter/portfolio)',
                '[PIPELINE] [09:42:02] Fetching project source code...',
                '[PIPELINE] [09:42:03] Repository cloned. Commit details: "Update cluster load balancers"',
                '[SUCCESS] Stage "Code Commit" finished successfully in 2.1s.'
            ]
        },
        {
            stepId: 'step-2',
            logs: [
                '[PIPELINE] [09:42:04] Starting Security Lint and Vulnerability Audit...',
                '[PIPELINE] [09:42:05] Running Trivy vulnerability scan on Dockerfile base...',
                '[INFO] Trivy Results: 0 High, 0 Medium, 2 Low vulnerabilities detected.',
                '[PIPELINE] [09:42:06] Quality Gate check via SonarQube analyzer initialized...',
                '[INFO] Analysis results: Reliability (A), Security (A), Maintainability (A).',
                '[SUCCESS] Quality Gate check: PASSED.',
                '[SUCCESS] Stage "Security Scan" completed successfully in 3.4s.'
            ]
        },
        {
            stepId: 'step-3',
            logs: [
                '[PIPELINE] [09:42:08] Running Go & Python unit tests suites...',
                '[PIPELINE] [09:42:09] testing suite: 42 test scenarios run. all passed.',
                '[INFO] Coverage analysis: 92.4% lines of code covered.',
                '[SUCCESS] Test execution reports exported to build artifacts directory.',
                '[SUCCESS] Stage "Unit Tests" completed successfully.'
            ]
        },
        {
            stepId: 'step-4',
            logs: [
                '[PIPELINE] [09:42:11] Building Docker container image...',
                '[PIPELINE] [09:42:12] STEP 1/6: FROM alpine:3.18 -> Cached',
                '[PIPELINE] [09:42:12] STEP 2/6: WORKDIR /app -> Cached',
                '[PIPELINE] [09:42:13] STEP 3/6: COPY binary files... -> Done',
                '[PIPELINE] [09:42:14] STEP 4/6: RUN apk add --no-cache ca-certificates -> Done',
                '[PIPELINE] [09:42:15] Building image tag: alex-carter/portfolio-app:v2.4.1',
                '[PIPELINE] [09:42:16] Docker image push to AWS ECR repository...',
                '[INFO] ECR push registry response: digest sha256:7f48b9... size 42.1MB',
                '[SUCCESS] Containerized image pushed successfully.'
            ]
        },
        {
            stepId: 'step-5',
            logs: [
                '[PIPELINE] [09:42:18] Starting deployment orchestration on AWS EKS Cluster...',
                '[PIPELINE] [09:42:19] Applying Kubernetes YAML manifests (kubectl apply -f k8s/)...',
                '[INFO] deployment.apps/portfolio-app configured.',
                '[INFO] service/portfolio-service configured.',
                '[INFO] ingress.networking.k8s.io/portfolio-ingress configured.',
                '[PIPELINE] [09:42:20] Rolling update: Waiting for new pods status running...',
                '[INFO] Pod: portfolio-app-85fc78df-a92c1 status: RUNNING (Ready 1/1)',
                '[INFO] Pod: portfolio-app-85fc78df-b42e7 status: RUNNING (Ready 1/1)',
                '[PIPELINE] [09:42:21] Route53 DNS target propagation checks...',
                '[SUCCESS] DNS response resolved (10.0.8.42). Connection check green.',
                '[SUCCESS] Deployment release v2.4.1 completed successfully! Systems healthy.'
            ]
        }
    ];

    let isPipelineRunning = false;

    function addLogLine(text, type = 'text-muted') {
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.textContent = text;
        consoleLogs.appendChild(line);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    async function runPipeline() {
        if (isPipelineRunning) return;
        isPipelineRunning = true;
        
        triggerBtn.disabled = true;
        triggerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Execution Running...';

        // Clear logs and status
        consoleLogs.innerHTML = '';
        pipelineSteps.forEach(step => {
            step.classList.remove('active', 'success', 'failed');
            step.querySelector('.step-status').textContent = 'Pending';
        });

        addLogLine('[SYSTEM] Initializing build run sequence...', 'text-cyan');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Iterate through steps
        for (let i = 0; i < pipelineSteps.length; i++) {
            const stepElement = pipelineSteps[i];
            const stepId = stepElement.id;
            const stepData = pipelineLogData.find(d => d.stepId === stepId);

            stepElement.classList.add('active');
            stepElement.querySelector('.step-status').textContent = 'Running';
            addLogLine(`[STAGE] Starting: ${stepElement.querySelector('.step-name').textContent}`, 'text-purple');

            // Print step logs
            if (stepData) {
                for (const log of stepData.logs) {
                    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
                    let type = 'text-muted';
                    if (log.startsWith('[SUCCESS]')) type = 'text-success';
                    if (log.startsWith('[PIPELINE]')) type = 'text-cyan';
                    if (log.startsWith('[INFO]')) type = 'text-purple';
                    addLogLine(log, type);
                }
            }

            await new Promise(resolve => setTimeout(resolve, 400));
            stepElement.classList.remove('active');
            stepElement.classList.add('success');
            stepElement.querySelector('.step-status').textContent = 'Passed';
        }

        addLogLine('[SUCCESS] Full deployment pipeline execution complete.', 'text-success');
        addLogLine('[SYSTEM] All checks passed. Build tag: release-v2.4.1 STATUS: OPERATIONAL', 'text-success');
        
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Run Pipeline Again';
        isPipelineRunning = false;
    }

    if (triggerBtn) {
        triggerBtn.addEventListener('click', runPipeline);
    }


    // --- 5. INTERACTIVE CLI TERMINAL ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    const terminalPing = document.getElementById('terminal-ping');
    const sessionTimeSpan = document.getElementById('session-time');

    // Set dynamic session start time
    if (sessionTimeSpan) {
        const now = new Date();
        sessionTimeSpan.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }

    // Dynamic latency ping simulator
    setInterval(() => {
        if (terminalPing) {
            const ping = Math.floor(12 + Math.random() * 25);
            terminalPing.textContent = `${ping}ms`;
        }
    }, 4000);

    const commands = {
        help: () => `Available commands:
  <span class="cmd-highlight">about</span>      Display biography & background info
  <span class="cmd-highlight">skills</span>     List core technical skillset & expertise
  <span class="cmd-highlight">projects</span>   Showcase featured cloud implementations
  <span class="cmd-highlight">contact</span>    Output professional networking channels
  <span class="cmd-highlight">neofetch</span>   Print system architecture details
  <span class="cmd-highlight">ping</span>       Check infrastructure latency response
  <span class="cmd-highlight">clear</span>      Empty terminal command history`,
        
        about: () => `Bio: Alex Carter
Role: Senior DevOps & Cloud Infrastructure Engineer
Location: Austin, Texas, USA
Experience: 7+ Years in Cloud Architecture & Orchestration

Specializing in High-Availability Infrastructure, Kubernetes clusters,
GitOps workflows, cost optimization, and secure CI/CD build channels.
Committed to automation, reliability, and maintaining 99.99% uptime.`,

        skills: () => `Technical Expertise Database:
  - Cloud Platforms: AWS, Google Cloud, Azure [████████████████░░] 88%
  - Orchestration: Kubernetes, Helm, Istio  [██████████████████░] 92%
  - Infra as Code: Terraform, Ansible       [██████████████████░] 92%
  - CI/CD Engines: GH Actions, ArgoCD, Gitlab [██████████████████░] 90%
  - Scripting/Languages: Go, Python, Bash   [████████████████░░] 85%
  - Observability: Prometheus, Grafana, ELK  [████████████████░░] 85%`,

        projects: () => `Featured Implementations:
  1. <span class="text-cyan">Multi-Region Kubernetes (AWS)</span>
     - Multi-region EKS mesh, Terraform IaC, Istio Service routing.
     - SLA: 99.99% Uptime.

  2. <span class="text-cyan">Automated GitOps Pipeline (ArgoCD)</span>
     - GitHub Actions build + ArgoCD cluster synchronization engine.
     - Deploy Time: &lt; 3 minutes.

  3. <span class="text-cyan">Serverless Log Analyzer</span>
     - High-throughput logging using SQS, Firehose, Lambda and Elasticsearch.
     - Logs: 15GB/Day processed.`,

        contact: () => `Secure Connections Available:
  - Email: <a href="mailto:alex@carter.cloud" style="color:var(--color-cyan)">alex@carter.cloud</a>
  - LinkedIn: <a href="https://linkedin.com" target="_blank" style="color:var(--color-cyan)">linkedin.com/in/alex-carter-devops</a>
  - GitHub: <a href="https://github.com" target="_blank" style="color:var(--color-cyan)">github.com/alex-carter</a>
  - Location: Austin, Texas, USA`,

        neofetch: () => `  <span class="text-cyan">alex@devops-node-01</span>
  -------------------
  <span class="text-purple">OS:</span> CloudOS Enterprise Linux v3.4.1
  <span class="text-purple">Kernel:</span> 5.15.0-88-generic-EKS
  <span class="text-purple">Uptime:</span> 126 days, 4 hours, 12 mins
  <span class="text-purple">Shell:</span> bash 5.1.16
  <span class="text-purple">CPU:</span> AMD EPYC 7R13 (4 Cores) @ AWS
  <span class="text-purple">Memory:</span> 7.82 GiB / 15.65 GiB (50%)
  <span class="text-purple">Disk:</span> 42 GiB / 100 GiB (42%)
  <span class="text-purple">Cluster IP:</span> 10.0.8.42`,

        ping: () => `64 bytes from 10.0.8.42: icmp_seq=1 ttl=64 time=${Math.floor(10 + Math.random() * 20)}ms
64 bytes from 10.0.8.42: icmp_seq=2 ttl=64 time=${Math.floor(10 + Math.random() * 20)}ms
64 bytes from 10.0.8.42: icmp_seq=3 ttl=64 time=${Math.floor(10 + Math.random() * 20)}ms
--- 10.0.8.42 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max = 10/15/30 ms`,

        sudo: () => `<span class="text-danger">Permission denied. Visitor user role does not possess root cluster authorization.
This security alert has been reported to AWS GuardDuty.</span>`
    };

    function executeCommand(cmdStr) {
        const trimmed = cmdStr.trim().toLowerCase();
        
        // Echo command
        const cmdEcho = document.createElement('div');
        cmdEcho.className = 'terminal-cmd-echo';
        cmdEcho.innerHTML = `<span class="terminal-prompt">visitor@alex-carter:~$</span> <span>${cmdStr}</span>`;
        terminalOutput.appendChild(cmdEcho);

        if (trimmed === '') {
            return;
        }

        const resultEl = document.createElement('div');
        resultEl.className = 'terminal-result';

        if (trimmed === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        if (commands[trimmed]) {
            resultEl.innerHTML = commands[trimmed]();
        } else {
            resultEl.innerHTML = `<span class="text-danger">Command not found: "${cmdStr}".</span> Type <span class="cmd-highlight">help</span> to view valid commands.`;
        }

        terminalOutput.appendChild(resultEl);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                executeCommand(cmd);
                terminalInput.value = '';
            }
        });

        // Click terminal body to focus input
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }


    // --- 6. CONTACT FORM SUBMIT (DEPLOY ANIMATION) ---
    const contactForm = document.getElementById('contact-form');
    const deployOverlay = document.getElementById('form-deploy-overlay');
    const deployProgressBar = document.getElementById('deploy-progress-bar');
    const deployLogs = document.getElementById('deploy-logs');
    const closeOverlayBtn = document.getElementById('close-overlay-btn');

    const formDeployLogs = [
        'Parsing contact-form-submission.yaml payload...',
        'Validating sender IP and email syntax...',
        'Initializing secure transport socket (TLS 1.3)...',
        'Encrypting message using AWS KMS Key Management...',
        'Pushing encrypted payload to SQS Queue: us-east-1-msg-queue...',
        'Triggering AWS Lambda alerting function...',
        'Publishing alert topic to SNS topic: SMS-Manager...',
        'Syncing logs with DynamoDB database...',
        'Deployment complete. Response code: 202 ACCEPTED.',
        'Connection stabilized successfully!'
    ];

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Show deploy loader overlay
        deployOverlay.classList.add('active');
        deployProgressBar.style.width = '0%';
        deployLogs.innerHTML = '';
        closeOverlayBtn.classList.add('hidden');

        // Execute step-by-step logs and progress
        for (let i = 0; i < formDeployLogs.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 350 + Math.random() * 300));
            
            // Update progress bar
            const pct = Math.floor(((i + 1) / formDeployLogs.length) * 100);
            deployProgressBar.style.width = `${pct}%`;

            // Append log line
            const line = document.createElement('div');
            line.className = 'log-line';
            if (i === formDeployLogs.length - 1) {
                line.className = 'log-line text-success';
                line.style.fontWeight = 'bold';
            } else if (i === formDeployLogs.length - 2) {
                line.className = 'log-line text-purple';
            }
            line.innerHTML = `[DEPLOY] [${new Date().toLocaleTimeString()}] ${formDeployLogs[i]}`;
            deployLogs.appendChild(line);
            deployLogs.scrollTop = deployLogs.scrollHeight;
        }

        // Show close btn
        closeOverlayBtn.classList.remove('hidden');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    if (closeOverlayBtn) {
        closeOverlayBtn.addEventListener('click', () => {
            // Close overlay and reset form
            deployOverlay.classList.remove('active');
            contactForm.reset();
        });
    }
});
