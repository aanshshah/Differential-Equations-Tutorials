// Academic Content Enhancements for Differential Equations Tutorials
document.addEventListener('DOMContentLoaded', function() {
    
    // Academic context for different topics
    const academicContext = {
        'Euler': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Mathematical Foundation</h4>
                    <p><strong>Euler's Method</strong> is based on the Taylor series expansion:</p>
                    <div class="math-equation">
                        y(t + h) = y(t) + h·y'(t) + O(h²)
                    </div>
                    <p>Where the derivative y'(t) = f(t, y(t)) from the differential equation dy/dt = f(t, y).</p>
                    
                    <h5>Error Analysis:</h5>
                    <ul>
                        <li><strong>Local Truncation Error:</strong> O(h²) per step</li>
                        <li><strong>Global Error:</strong> O(h) over the interval [t₀, tₙ]</li>
                        <li><strong>Stability:</strong> Conditionally stable; requires h < 2/|λ| for dy/dt = λy</li>
                    </ul>
                    
                    <h5>Convergence Theorem:</h5>
                    <p>If f(t,y) is Lipschitz continuous in y and continuous in t, then as h → 0, the numerical solution converges to the exact solution.</p>
                </div>
            `
        },
        'Runge-Kutta': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Runge-Kutta Methods Theory</h4>
                    <p>The general s-stage Runge-Kutta method is defined by:</p>
                    <div class="math-equation">
                        y_{n+1} = y_n + h·Σᵢ₌₁ˢ bᵢ·kᵢ
                    </div>
                    <p>where kᵢ = f(tₙ + cᵢh, yₙ + h·Σⱼ₌₁ˢ aᵢⱼ·kⱼ)</p>
                    
                    <h5>Classical RK4 (Fourth-Order):</h5>
                    <ul>
                        <li><strong>Local Error:</strong> O(h⁵)</li>
                        <li><strong>Global Error:</strong> O(h⁴)</li>
                        <li><strong>Stability Region:</strong> Larger than Euler's method</li>
                    </ul>
                    
                    <h5>Butcher Tableau:</h5>
                    <p>RK methods are characterized by their Butcher tableau, which encodes the coefficients aᵢⱼ, bᵢ, and cᵢ.</p>
                </div>
            `
        },
        'Laplace': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Laplace Transform Theory</h4>
                    <p>The Laplace transform of a function f(t) is defined as:</p>
                    <div class="math-equation">
                        ℒ{f(t)} = F(s) = ∫₀^∞ e^(-st)·f(t) dt
                    </div>
                    
                    <h5>Key Properties:</h5>
                    <ul>
                        <li><strong>Linearity:</strong> ℒ{af(t) + bg(t)} = aF(s) + bG(s)</li>
                        <li><strong>Differentiation:</strong> ℒ{f'(t)} = sF(s) - f(0)</li>
                        <li><strong>Integration:</strong> ℒ{∫₀ᵗ f(τ)dτ} = F(s)/s</li>
                        <li><strong>Convolution:</strong> ℒ{f*g} = F(s)·G(s)</li>
                    </ul>
                    
                    <h5>Existence Theorem:</h5>
                    <p>If f(t) is piecewise continuous on [0,∞) and of exponential order, then ℒ{f(t)} exists for s > α for some α.</p>
                </div>
            `
        },
        'Fourier': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Fourier Series Theory</h4>
                    <p>A periodic function f(x) with period 2L can be represented as:</p>
                    <div class="math-equation">
                        f(x) = a₀/2 + Σₙ₌₁^∞ [aₙcos(nπx/L) + bₙsin(nπx/L)]
                    </div>
                    
                    <h5>Fourier Coefficients:</h5>
                    <ul>
                        <li>a₀ = (1/L)∫₋ₗᴸ f(x)dx</li>
                        <li>aₙ = (1/L)∫₋ₗᴸ f(x)cos(nπx/L)dx</li>
                        <li>bₙ = (1/L)∫₋ₗᴸ f(x)sin(nπx/L)dx</li>
                    </ul>
                    
                    <h5>Convergence (Dirichlet Conditions):</h5>
                    <p>The Fourier series converges to f(x) if:</p>
                    <ul>
                        <li>f(x) is periodic</li>
                        <li>f(x) has a finite number of discontinuities</li>
                        <li>f(x) has a finite number of extrema</li>
                        <li>∫|f(x)|dx converges over one period</li>
                    </ul>
                </div>
            `
        },
        'Stability': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Stability Analysis</h4>
                    <p>For the system dx/dt = f(x), equilibrium point x* where f(x*) = 0:</p>
                    
                    <h5>Lyapunov Stability:</h5>
                    <p>x* is stable if ∀ε > 0, ∃δ > 0 such that |x(0) - x*| < δ ⟹ |x(t) - x*| < ε for all t ≥ 0</p>
                    
                    <h5>Linear Stability Analysis:</h5>
                    <p>For ẋ = Ax near x* = 0, stability is determined by eigenvalues λᵢ of A:</p>
                    <ul>
                        <li><strong>Stable:</strong> Re(λᵢ) < 0 for all i</li>
                        <li><strong>Unstable:</strong> Re(λᵢ) > 0 for some i</li>
                        <li><strong>Center:</strong> Re(λᵢ) = 0, Im(λᵢ) ≠ 0</li>
                    </ul>
                    
                    <h5>Phase Portrait Classification (2D):</h5>
                    <ul>
                        <li><strong>Node:</strong> Real eigenvalues, same sign</li>
                        <li><strong>Saddle:</strong> Real eigenvalues, opposite signs</li>
                        <li><strong>Spiral:</strong> Complex eigenvalues, Re(λ) ≠ 0</li>
                        <li><strong>Center:</strong> Pure imaginary eigenvalues</li>
                    </ul>
                </div>
            `
        },
        'PDE': {
            theory: `
                <div class="academic-box">
                    <h4>📚 Partial Differential Equations</h4>
                    
                    <h5>Classification (Second-Order Linear PDEs):</h5>
                    <p>For Auₓₓ + Buₓᵧ + Cuᵧᵧ + ... = 0, discriminant Δ = B² - 4AC:</p>
                    <ul>
                        <li><strong>Elliptic (Δ < 0):</strong> Laplace equation ∇²u = 0</li>
                        <li><strong>Parabolic (Δ = 0):</strong> Heat equation uₜ = α²uₓₓ</li>
                        <li><strong>Hyperbolic (Δ > 0):</strong> Wave equation uₜₜ = c²uₓₓ</li>
                    </ul>
                    
                    <h5>Separation of Variables:</h5>
                    <p>Assume u(x,t) = X(x)T(t), then separate into ODEs:</p>
                    <div class="math-equation">
                        (1/X)X'' = (1/αT)T' = -λ (separation constant)
                    </div>
                    
                    <h5>Well-Posedness (Hadamard):</h5>
                    <ul>
                        <li>Solution exists</li>
                        <li>Solution is unique</li>
                        <li>Solution depends continuously on initial/boundary conditions</li>
                    </ul>
                </div>
            `
        }
    };
    
    // Add academic context based on content
    function enhanceAcademicContent() {
        // Find all code blocks and add relevant theory
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const codeText = block.textContent;
            let contextToAdd = null;
            
            // Determine which academic context to add
            if (codeText.includes('euler') || codeText.includes('Euler')) {
                contextToAdd = academicContext['Euler'];
            } else if (codeText.includes('runge') || codeText.includes('kutta') || codeText.includes('RK4')) {
                contextToAdd = academicContext['Runge-Kutta'];
            } else if (codeText.includes('laplace') || codeText.includes('Laplace')) {
                contextToAdd = academicContext['Laplace'];
            } else if (codeText.includes('fourier') || codeText.includes('Fourier')) {
                contextToAdd = academicContext['Fourier'];
            } else if (codeText.includes('eigenvalue') || codeText.includes('stability')) {
                contextToAdd = academicContext['Stability'];
            } else if (codeText.includes('heat') || codeText.includes('wave') || codeText.includes('laplacian')) {
                contextToAdd = academicContext['PDE'];
            }
            
            // Add context if not already present
            if (contextToAdd && !block.parentElement.previousElementSibling?.classList.contains('academic-box')) {
                const contextDiv = document.createElement('div');
                contextDiv.innerHTML = contextToAdd.theory;
                block.parentElement.parentNode.insertBefore(contextDiv.firstElementChild, block.parentElement);
            }
        });
    }
    
    // Add theorem boxes
    function addTheoremBoxes() {
        // Look for theorem-like content
        const paragraphs = document.querySelectorAll('p');
        
        paragraphs.forEach(p => {
            const text = p.textContent;
            
            // Check for theorem keywords
            if (text.includes('Theorem:') || text.includes('Proposition:') || text.includes('Lemma:')) {
                if (!p.classList.contains('theorem-box')) {
                    p.classList.add('theorem-box');
                    
                    // Add proof if next element contains "Proof:"
                    const nextElement = p.nextElementSibling;
                    if (nextElement && nextElement.textContent.includes('Proof:')) {
                        nextElement.classList.add('proof-box');
                    }
                }
            }
            
            // Check for definition keywords
            if (text.includes('Definition:') && !p.classList.contains('definition-box')) {
                p.classList.add('definition-box');
            }
        });
    }
    
    // Add references and citations
    function addReferences() {
        const referenceSections = document.querySelectorAll('h3, h4');
        
        referenceSections.forEach(heading => {
            if (heading.textContent.includes('References') || heading.textContent.includes('Further Reading')) {
                // Enhance reference formatting
                const nextElement = heading.nextElementSibling;
                if (nextElement && nextElement.tagName === 'UL') {
                    nextElement.classList.add('reference-list');
                    
                    // Add standard textbook references if not present
                    if (nextElement.children.length < 3) {
                        const standardRefs = [
                            'Boyce, W. E., & DiPrima, R. C. (2012). Elementary Differential Equations and Boundary Value Problems. John Wiley & Sons.',
                            'Strang, G. (2016). Introduction to Linear Algebra. Wellesley-Cambridge Press.',
                            'Burden, R. L., & Faires, J. D. (2010). Numerical Analysis. Brooks/Cole.',
                            'Kreyszig, E. (2011). Advanced Engineering Mathematics. John Wiley & Sons.',
                            'Trefethen, L. N., & Bau III, D. (1997). Numerical Linear Algebra. SIAM.'
                        ];
                        
                        // Add a note about additional references
                        const noteDiv = document.createElement('div');
                        noteDiv.className = 'note-box';
                        noteDiv.innerHTML = `
                            <h4>📖 Recommended Textbooks</h4>
                            <ul>
                                ${standardRefs.map(ref => `<li>${ref}</li>`).join('')}
                            </ul>
                        `;
                        heading.parentNode.insertBefore(noteDiv, nextElement.nextSibling);
                    }
                }
            }
        });
    }
    
    // Add complexity analysis for numerical methods
    function addComplexityAnalysis() {
        const methodSections = document.querySelectorAll('h4');
        
        methodSections.forEach(heading => {
            const headingText = heading.textContent.toLowerCase();
            
            if (headingText.includes('method') && !heading.nextElementSibling?.classList.contains('complexity-box')) {
                let complexity = null;
                
                if (headingText.includes('euler')) {
                    complexity = {
                        time: 'O(n)',
                        space: 'O(n)',
                        accuracy: 'First-order (O(h))'
                    };
                } else if (headingText.includes('runge-kutta')) {
                    complexity = {
                        time: 'O(n)',
                        space: 'O(n)',
                        accuracy: 'Fourth-order (O(h⁴))'
                    };
                } else if (headingText.includes('adams')) {
                    complexity = {
                        time: 'O(n)',
                        space: 'O(k) for k-step method',
                        accuracy: 'Variable order'
                    };
                }
                
                if (complexity) {
                    const complexityDiv = document.createElement('div');
                    complexityDiv.className = 'complexity-box';
                    complexityDiv.innerHTML = `
                        <h5>⚙️ Computational Complexity</h5>
                        <ul>
                            <li><strong>Time Complexity:</strong> ${complexity.time}</li>
                            <li><strong>Space Complexity:</strong> ${complexity.space}</li>
                            <li><strong>Accuracy Order:</strong> ${complexity.accuracy}</li>
                        </ul>
                    `;
                    heading.parentNode.insertBefore(complexityDiv, heading.nextSibling);
                }
            }
        });
    }
    
    // Initialize all enhancements
    enhanceAcademicContent();
    addTheoremBoxes();
    addReferences();
    addComplexityAnalysis();
});