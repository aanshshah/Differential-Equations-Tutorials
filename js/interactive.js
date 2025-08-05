// Interactive Python Code Runner using Pyodide
let pyodideReadyPromise = null;

// Initialize Pyodide
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        }).then(async (pyodide) => {
            // Load commonly used packages
            await pyodide.loadPackage(["numpy", "scipy", "matplotlib", "sympy"]);
            return pyodide;
        });
    }
    return pyodideReadyPromise;
}

// Create interactive code editor
function createCodeEditor(codeBlock) {
    const container = document.createElement('div');
    container.className = 'code-editor-container';
    
    const editor = document.createElement('textarea');
    editor.className = 'code-editor';
    editor.value = codeBlock.textContent.trim();
    editor.spellcheck = false;
    
    const runButton = document.createElement('button');
    runButton.className = 'btn btn-success btn-sm run-code';
    runButton.innerHTML = '<span class="glyphicon glyphicon-play"></span> Run';
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-default btn-sm reset-code';
    resetButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span> Reset';
    
    const output = document.createElement('div');
    output.className = 'code-output';
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'code-buttons';
    buttonGroup.appendChild(runButton);
    buttonGroup.appendChild(resetButton);
    
    container.appendChild(editor);
    container.appendChild(buttonGroup);
    container.appendChild(output);
    
    // Store original code
    const originalCode = codeBlock.textContent.trim();
    
    // Run code handler
    runButton.addEventListener('click', async () => {
        output.innerHTML = '<div class="loading">Loading Python packages...</div>';
        try {
            const pyodide = await initPyodide();
            output.innerHTML = '<div class="loading">Running code...</div>';
            
            // Redirect stdout to capture print statements
            pyodide.runPython(`
                import sys
                from io import StringIO
                sys.stdout = StringIO()
            `);
            
            // Setup matplotlib for browser display
            await pyodide.runPythonAsync(`
                import matplotlib
                matplotlib.use('Agg')
                import matplotlib.pyplot as plt
                import io
                import base64
                
                # Store the original show function
                _original_show = plt.show
                
                # Custom show function that captures the plot
                def custom_show():
                    buf = io.BytesIO()
                    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
                    buf.seek(0)
                    img_str = base64.b64encode(buf.read()).decode()
                    buf.close()
                    print(f"PLOT_IMAGE:{img_str}")
                    plt.close()
                
                # Replace plt.show with our custom function
                plt.show = custom_show
            `);
            
            // Run user code
            await pyodide.runPythonAsync(editor.value);
            
            // Get output
            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            
            // Check for plot images
            let outputHtml = '';
            if (stdout) {
                // Check if output contains a plot
                if (stdout.includes('PLOT_IMAGE:')) {
                    const parts = stdout.split('PLOT_IMAGE:');
                    // Display any text before the plot
                    if (parts[0].trim()) {
                        outputHtml += `<pre class="output-success">${parts[0]}</pre>`;
                    }
                    // Display the plot
                    for (let i = 1; i < parts.length; i++) {
                        const imgData = parts[i].trim();
                        outputHtml += `<img src="data:image/png;base64,${imgData}" style="max-width: 100%; height: auto; display: block; margin: 10px 0;">`;
                    }
                } else {
                    outputHtml = `<pre class="output-success">${stdout}</pre>`;
                }
            } else {
                outputHtml = '<div class="output-info">Code executed successfully (no output)</div>';
            }
            
            // Display output
            output.innerHTML = outputHtml;
            
        } catch (error) {
            output.innerHTML = `<pre class="output-error">${error.message}</pre>`;
        }
    });
    
    // Reset code handler
    resetButton.addEventListener('click', () => {
        editor.value = originalCode;
        output.innerHTML = '';
    });
    
    return container;
}

// Enhanced navigation with smooth scrolling
function enhanceNavigation() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add active section highlighting
    const sections = document.querySelectorAll('span[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Progress tracking
function initProgressTracking() {
    const progressKey = 'diffEqProgress';
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Track visited sections
    const sections = document.querySelectorAll('span[id]');
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'section-complete';
        checkbox.checked = progress[sectionId] || false;
        
        checkbox.addEventListener('change', () => {
            progress[sectionId] = checkbox.checked;
            localStorage.setItem(progressKey, JSON.stringify(progress));
            updateProgressBar();
        });
        
        const heading = section.querySelector('h3');
        if (heading) {
            heading.insertBefore(checkbox, heading.firstChild);
        }
    });
    
    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-container';
    progressBar.innerHTML = `
        <div class="progress">
            <div class="progress-bar progress-bar-success" role="progressbar" 
                 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <span class="sr-only">0% Complete</span>
            </div>
        </div>
        <div class="progress-text">Progress: <span class="progress-percent">0%</span></div>
    `;
    
    const pageContent = document.getElementById('page-content-wrapper');
    if (pageContent) {
        pageContent.insertBefore(progressBar, pageContent.firstChild);
    }
    
    function updateProgressBar() {
        const total = sections.length;
        const completed = Object.values(progress).filter(v => v).length;
        const percent = Math.round((completed / total) * 100);
        
        const bar = progressBar.querySelector('.progress-bar');
        bar.style.width = percent + '%';
        bar.setAttribute('aria-valuenow', percent);
        
        progressBar.querySelector('.progress-percent').textContent = percent + '%';
    }
    
    updateProgressBar();
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Convert static code blocks to interactive editors
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Only convert Python code blocks
        if (block.textContent.includes('import') || 
            block.textContent.includes('print') || 
            block.textContent.includes('def')) {
            const container = createCodeEditor(block);
            block.parentElement.replaceWith(container);
        }
    });
    
    // Enhance navigation
    enhanceNavigation();
    
    // Initialize progress tracking
    initProgressTracking();
    
    // Pre-load Pyodide in background
    initPyodide();
});