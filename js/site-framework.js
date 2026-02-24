// Differential Equations Tutorials - extensible page framework core
(function (global) {
    const plugins = [];

    function getContext() {
        const path = global.location ? global.location.pathname : '';
        const page = path.split('/').pop() || 'index.html';
        const levelMatch = path.match(/\/(level1|level2)\//);
        return {
            path,
            page,
            level: levelMatch ? levelMatch[1] : null,
            hasStaticHeader: !!document.querySelector('.lesson-static-header'),
            hasSiteHeader: !!document.querySelector('.site-header')
        };
    }

    function register(name, handler) {
        plugins.push({ name, handler });
    }

    function run() {
        const context = getContext();
        plugins.forEach((plugin) => {
            try {
                plugin.handler(context);
            } catch (error) {
                // Keep the page functional even if one plugin fails.
                console.error(`[DETFramework:${plugin.name}]`, error);
            }
        });
    }

    global.DETFramework = {
        register,
        run,
        getContext
    };
})(window);
