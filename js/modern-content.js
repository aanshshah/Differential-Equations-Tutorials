// Modern Content Page Enhancements
document.addEventListener('DOMContentLoaded', function() {
    
    // Add intro box to each section
    function enhanceSections() {
        const sections = document.querySelectorAll('span[id]');
        
        sections.forEach((section, index) => {
            const heading = section.querySelector('h3');
            if (heading && index === 0) {
                // Add intro box for first section
                const introBox = document.createElement('div');
                introBox.className = 'intro-box';
                introBox.innerHTML = `
                    <h2>Welcome to ${document.title.split('-')[0].trim()}</h2>
                    <p>This interactive tutorial will guide you through essential concepts with hands-on Python examples. 
                    Each code block is fully executable - click "Run" to see results instantly in your browser.</p>
                `;
                section.insertBefore(introBox, heading);
            }
            
            // Add learning objectives for major sections
            if (heading && heading.textContent.includes('1.')) {
                const objectivesBox = document.createElement('div');
                objectivesBox.className = 'learning-objectives';
                objectivesBox.innerHTML = `
                    <h4>📚 In this section, you will:</h4>
                    <ul>
                        <li>Understand the fundamental concepts</li>
                        <li>Implement solutions using Python</li>
                        <li>Visualize results with interactive plots</li>
                        <li>Practice with hands-on examples</li>
                    </ul>
                `;
                heading.insertAdjacentElement('afterend', objectivesBox);
            }
        });
    }
    
    // Enhance code blocks with context
    function enhanceCodeBlocks() {
        const codeContainers = document.querySelectorAll('.code-editor-container');
        
        codeContainers.forEach((container, index) => {
            // Check if code contains specific patterns
            const codeText = container.querySelector('.code-editor').value;
            
            if (codeText.includes('import matplotlib') || codeText.includes('plt.')) {
                // Add plotting context
                const contextBox = document.createElement('div');
                contextBox.className = 'note-box';
                contextBox.innerHTML = `
                    <h4>📊 Visualization Example</h4>
                    <p>This code creates an interactive plot. Modify the parameters to see how the visualization changes!</p>
                `;
                container.parentNode.insertBefore(contextBox, container);
            } else if (codeText.includes('odeint') || codeText.includes('solve_ivp')) {
                // Add ODE solving context
                const contextBox = document.createElement('div');
                contextBox.className = 'example-box';
                contextBox.innerHTML = `
                    <h4>🔄 Differential Equation Solver</h4>
                    <p>This example demonstrates numerical solution of differential equations. Try changing initial conditions or parameters.</p>
                `;
                container.parentNode.insertBefore(contextBox, container);
            } else if (codeText.includes('def ') && index === 0) {
                // Add function definition context
                const contextBox = document.createElement('div');
                contextBox.className = 'interactive-highlight';
                contextBox.innerHTML = `
                    <h4>💡 Interactive Code</h4>
                    <p>All code examples are editable and runnable. Feel free to experiment with different values and see the results immediately!</p>
                `;
                container.parentNode.insertBefore(contextBox, container);
            }
        });
    }
    
    // Add section navigation
    function addSectionNavigation() {
        const sections = document.querySelectorAll('span[id]');
        const container = document.querySelector('.container-fluid');
        
        if (sections.length > 1 && container) {
            // Create progress indicator
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'section-progress';
            
            sections.forEach((section, index) => {
                const indicator = document.createElement('span');
                indicator.className = 'section-progress-item';
                indicator.title = section.querySelector('h3')?.textContent || `Section ${index + 1}`;
                indicator.onclick = () => section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                progressIndicator.appendChild(indicator);
            });
            
            document.body.appendChild(progressIndicator);
            
            // Update active indicator on scroll
            window.addEventListener('scroll', () => {
                let current = 0;
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2) {
                        current = index;
                    }
                });
                
                document.querySelectorAll('.section-progress-item').forEach((item, index) => {
                    item.classList.toggle('active', index === current);
                });
            });
            
            // Add next/previous navigation at the bottom
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const navDiv = document.createElement('div');
                navDiv.className = 'section-nav';
                
                // Get current part number and create navigation
                const currentPath = window.location.pathname;
                const currentPart = currentPath.match(/part(\d+)\.html/);
                
                if (currentPart) {
                    const partNum = parseInt(currentPart[1]);
                    
                    if (partNum > 1) {
                        navDiv.innerHTML += `
                            <a href="part${partNum - 1}.html">
                                ← Previous Module
                            </a>
                        `;
                    } else {
                        navDiv.innerHTML += `
                            <a href="index.html">
                                ← Back to Overview
                            </a>
                        `;
                    }
                    
                    if (partNum < 6) {
                        navDiv.innerHTML += `
                            <a href="part${partNum + 1}.html">
                                Next Module →
                            </a>
                        `;
                    } else {
                        navDiv.innerHTML += `
                            <a href="index.html">
                                Complete! Return to Overview →
                            </a>
                        `;
                    }
                    
                    container.appendChild(navDiv);
                }
            }
        }
    }
    
    // Enhance tables
    function enhanceTables() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            // Add responsive wrapper
            const wrapper = document.createElement('div');
            wrapper.style.overflowX = 'auto';
            wrapper.style.marginBottom = '2rem';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Add Bootstrap classes
            table.classList.add('table', 'table-hover');
        });
    }
    
    // Add topic overview cards
    function addTopicOverview() {
        const firstSection = document.querySelector('span[id]');
        if (firstSection && document.title.includes('Part')) {
            const topics = [];
            document.querySelectorAll('span[id] h3').forEach(heading => {
                const text = heading.textContent;
                if (text && !text.includes('References')) {
                    topics.push({
                        title: text.replace(/^\d+\.?\s*/, ''),
                        id: heading.parentElement.id
                    });
                }
            });
            
            if (topics.length > 3) {
                const overviewGrid = document.createElement('div');
                overviewGrid.className = 'topic-grid';
                overviewGrid.innerHTML = `
                    ${topics.slice(0, 6).map(topic => `
                        <div class="topic-card" onclick="document.getElementById('${topic.id}').scrollIntoView({behavior: 'smooth'})">
                            <h4>${topic.title}</h4>
                            <p>Click to jump to this section</p>
                        </div>
                    `).join('')}
                `;
                
                const heading = firstSection.querySelector('h3');
                if (heading) {
                    heading.insertAdjacentElement('beforebegin', overviewGrid);
                }
            }
        }
    }
    
    // Wrap content sections
    function wrapContentSections() {
        const sections = document.querySelectorAll('span[id]');
        sections.forEach(section => {
            if (!section.classList.contains('content-section')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'content-section';
                
                // Move all content until next section into wrapper
                const elements = [];
                let sibling = section.nextElementSibling;
                
                while (sibling && !sibling.querySelector('span[id]')) {
                    elements.push(sibling);
                    sibling = sibling.nextElementSibling;
                }
                
                section.parentNode.insertBefore(wrapper, section);
                wrapper.appendChild(section);
                elements.forEach(el => wrapper.appendChild(el));
            }
        });
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.navbar-toggle');
        const sidebar = document.getElementById('sidebar-wrapper');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        }
    }
    
    // Initialize all enhancements
    function init() {
        wrapContentSections();
        enhanceSections();
        enhanceCodeBlocks();
        addSectionNavigation();
        enhanceTables();
        addTopicOverview();
        setupMobileMenu();
        
        // Update page title in navbar
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            const pageTitle = document.title.replace(' - Python Tutorial', '');
            navbarBrand.textContent = pageTitle;
        }
        
        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Track section completion
        const checkboxes = document.querySelectorAll('.section-complete');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const progress = JSON.parse(localStorage.getItem('diffEqProgress') || '{}');
                const sectionId = this.parentElement.parentElement.id;
                progress[sectionId] = this.checked;
                localStorage.setItem('diffEqProgress', JSON.stringify(progress));
                
                // Update progress bar if exists
                if (typeof updateProgressBar === 'function') {
                    updateProgressBar();
                }
            });
        });
    }
    
    // Run initialization
    init();
});