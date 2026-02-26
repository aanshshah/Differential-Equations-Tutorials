# Differential Equations Tutorials

A comprehensive series of interactive tutorials for learning differential equations through Python programming. Spans foundations through AI-driven methods, with an agent-based perspective on solving, controlling, and discovering dynamical systems.

## Overview

This repository contains web-based tutorials that teach differential equations concepts using Python (NumPy, SciPy, SymPy, Matplotlib). The tutorials run directly in your browser via Pyodide for interactive code execution. The curriculum covers five levels, from prerequisite review through capstone research projects.

**Live site:** [https://aanshshah.github.io/Differential-Equations-Tutorials](https://aanshshah.github.io/Differential-Equations-Tutorials)

## Curriculum

### Level 0 — Foundations
- **Module 0.1:** Review of Calculus and Linear Algebra
- **Module 0.2:** Introduction to Differential Equations

### Level 1 — Ordinary Differential Equations (ODEs)
- **Module 1.1:** First-Order ODEs and Modeling
- **Module 1.2:** Second-Order Linear ODEs
- **Module 1.3:** Systems of Linear ODEs
- **Module 1.4:** Numerical ODE Solvers

*Plus 6 legacy chapters covering plotting, first-order equations, higher-order equations, linear systems, Laplace methods, and series solutions.*

### Level 2 — Partial Differential Equations (PDEs)
- **Module 2.1:** Scalar PDEs and Classification
- **Module 2.2:** Numerical PDE Methods
- **Module 2.3:** Stochastic and Complex Models

*Plus 7 legacy chapters covering linear algebra, systems of ODEs, Fourier series, PDEs, numerical methods, and projects.*

### Level 3 — Computational & AI-Driven Differential Equations
- **Module 3.1:** Neural Differential Equations
- **Module 3.2:** Physics-Informed Neural Networks (PINNs)
- **Module 3.3:** Neural Operators and Function Space Learning
- **Module 3.4:** Agent-Based Control and Reinforcement Learning for Dynamical Systems
- **Module 3.5:** Data-Driven Discovery of Unknown Equations

### Level 4 — Projects, Applications & Research Pathways
- **Project 4.1:** Agent-Based Simulation of Physical Systems
- **Project 4.2:** Neural Solver vs Classical Solver Benchmark
- **Project 4.3:** Scientific Machine Learning for Real Data

## Features

- **Interactive Python Code**: Run and modify code examples directly in your browser using Pyodide
- **Agent-Based Perspective**: Every module includes an "Agent Lens" section framing the topic through state-action-reward-learning
- **Step-by-Step Solutions**: Detailed walkthroughs of solving differential equations analytically and numerically
- **Visual Learning**: Interactive plots, phase portraits, and animations
- **Practical Applications**: Real-world examples from physics, engineering, biology, and finance
- **Assessment**: Quizzes, exercises (analytical + computational + agentic), and mini-projects with rubrics
- **AI/ML Integration**: Neural ODEs, PINNs, neural operators, and reinforcement learning for dynamical systems
- **Full Notebooks**: PyTorch notebooks in `/notebooks` for AI-heavy modules (3.1–3.3, 3.5)

## Repository Structure

```
├── index.html              # Main landing page
├── level0/                 # Level 0: Foundations
│   ├── index.html          # Level landing page
│   ├── module0-1.html      # Calculus & Linear Algebra Review
│   └── module0-2.html      # Introduction to DEs
├── level1/                 # Level 1: ODEs
│   ├── index.html          # Level landing page
│   ├── module1-1.html      # First-Order ODEs
│   ├── module1-2.html      # Second-Order Linear ODEs
│   ├── module1-3.html      # Systems of Linear ODEs
│   ├── module1-4.html      # Numerical ODE Solvers
│   └── part1-6.html        # Legacy chapters
├── level2/                 # Level 2: PDEs
│   ├── index.html          # Level landing page
│   ├── module2-1.html      # Scalar PDEs & Classification
│   ├── module2-2.html      # Numerical PDE Methods
│   ├── module2-3.html      # Stochastic & Complex Models
│   └── part1-6.html, ...   # Legacy chapters
├── level3/                 # Level 3: AI-Driven DEs
│   ├── index.html          # Level landing page
│   ├── module3-1.html      # Neural ODEs
│   ├── module3-2.html      # PINNs
│   ├── module3-3.html      # Neural Operators
│   ├── module3-4.html      # RL Control (flagship module)
│   └── module3-5.html      # Equation Discovery
├── level4/                 # Level 4: Projects
│   ├── index.html          # Level landing page
│   ├── project4-1.html     # Agent-Based Simulation
│   ├── project4-2.html     # Neural vs Classical Benchmark
│   └── project4-3.html     # SciML for Real Data
├── notebooks/              # Full PyTorch notebooks
│   ├── neural_ode_full.ipynb
│   ├── pinn_full.ipynb
│   ├── neural_operator_full.ipynb
│   ├── equation_discovery_full.ipynb
│   └── requirements.txt
├── css/                    # Stylesheets
├── js/                     # JavaScript
└── fonts/                  # Web fonts
```

## Usage

Visit the GitHub Pages site or clone the repository and open `index.html` in a modern web browser.

For AI-heavy notebooks (Level 3):
```bash
cd notebooks
pip install -r requirements.txt
jupyter notebook
```

## Prerequisites

For using the tutorials:
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required for Levels 0–2 and browser-based code labs

For understanding the content:
- **Level 0:** High school algebra and trigonometry
- **Level 1:** Calculus I & II
- **Level 2:** Multivariable calculus, linear algebra
- **Level 3:** Probability, basic machine learning concepts
- **Level 4:** All previous levels

## Technologies

- **Frontend**: HTML5, Bootstrap CSS, jQuery
- **Interactive Computing**: Pyodide (Python in browser), KaTeX (math rendering)
- **Python Libraries (browser)**: NumPy, SciPy, Matplotlib, SymPy
- **Python Libraries (notebooks)**: PyTorch, torchdiffeq, PySINDy, scikit-learn

## Contributing

Contributions welcome. Please open issues or submit pull requests for bug fixes, additional examples, improved explanations, or new topics.

## License

Educational material provided for academic use under the MIT License.
