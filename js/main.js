/* Main site JS: moved from inline export to external file for clarity. */
(function (o, c) {
    var n = c.documentElement, t = ' w-mod-';
    n.className += t + 'js';
    try {
        if ('ontouchstart' in o || (o.DocumentTouch && c instanceof DocumentTouch)) {
            n.className += t + 'touch';
        }
    } catch (e) {
        // ignore errors while feature-detecting
    }
    // Add a minimal IX flag to match Webflow's original runtime class so
    // styles that rely on `html.w-mod-ix` don't leave elements hidden.
    // This is safe: it only mirrors Webflow's class naming and does not
    // reintroduce the original runtime script.
    try {
        if (!n.className.includes(t + 'ix')) n.className += t + 'ix';
    } catch (e) {
        // ignore
    }
})(window, document);

/* Hamburger Menu Toggle */
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }

    function initMenu() {
        const menuButton = document.querySelector('.menu-button.w-nav-button');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.querySelector('.navbar.w-nav');
        
        if (!menuButton || !navMenu) return;

        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle w--open class on nav-menu
            navMenu.classList.toggle('w--open');
            
            // Toggle w--open class on navbar
            if (navbar) {
                navbar.classList.toggle('w--open');
            }
            
            // Toggle menu icons
            const menuIcon = menuButton.querySelector('.menu-icon:not(.is--close)');
            const closeIcon = menuButton.querySelector('.menu-icon.is--close');
            
            if (menuIcon && closeIcon) {
                if (navMenu.classList.contains('w--open')) {
                    menuIcon.style.display = 'none';
                    closeIcon.style.display = 'block';
                } else {
                    menuIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            }
        });

        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navMenu.classList.remove('w--open');
                    if (navbar) {
                        navbar.classList.remove('w--open');
                    }
                    const menuIcon = menuButton.querySelector('.menu-icon:not(.is--close)');
                    const closeIcon = menuButton.querySelector('.menu-icon.is--close');
                    if (menuIcon && closeIcon) {
                        menuIcon.style.display = 'block';
                        closeIcon.style.display = 'none';
                    }
                }
            });
        });
    }
})();

/* Force 100% width on Services dropdown in mobile hamburger menu */
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileDropdownWidth);
    } else {
        initMobileDropdownWidth();
    }

    function initMobileDropdownWidth() {
        function forceDropdownWidth() {
            if (window.innerWidth >= 992) return; // Only mobile/tablet

            // The dropdown wrapper itself
            var dropdown = document.querySelector('.nav-link.is--dropdown.w-dropdown');
            if (dropdown) {
                dropdown.style.width = '100%';
                dropdown.style.maxWidth = '100%';
                dropdown.style.display = 'block';
            }

            // The dropdown toggle
            var toggle = document.querySelector('.dropdown-toggle.w-dropdown-toggle');
            if (toggle) {
                toggle.style.width = '100%';
            }

            // The dropdown menu (nav element)
            var menu = document.querySelector('.dropdown-menu.w-dropdown-list');
            if (menu) {
                menu.style.width = '100%';
                menu.style.maxWidth = '100%';
                menu.style.left = '0';
                menu.style.right = '0';
                menu.style.position = 'relative';
                menu.style.boxSizing = 'border-box';
            }

            // Container inside dropdown
            var containers = document.querySelectorAll('.dropdown-menu .container-large');
            containers.forEach(function(c) {
                c.style.width = '100%';
                c.style.maxWidth = '100%';
                c.style.padding = '0';
                c.style.margin = '0';
                c.style.boxSizing = 'border-box';
            });

            // The grid
            var grid = document.querySelector('.dropdown-grid');
            if (grid) {
                grid.style.width = '100%';
                grid.style.maxWidth = '100%';
                grid.style.display = 'flex';
                grid.style.flexDirection = 'column';
                grid.style.boxSizing = 'border-box';
            }

            // All grid items
            var items = document.querySelectorAll('.dropdown-grid-item');
            items.forEach(function(item) {
                item.style.width = '100%';
                item.style.maxWidth = '100%';
                item.style.boxSizing = 'border-box';
            });

            // All text wraps (category headers)
            var textWraps = document.querySelectorAll('.dropdown-text-wrap');
            textWraps.forEach(function(tw) {
                tw.style.width = '100%';
                tw.style.maxWidth = '100%';
                tw.style.display = 'flex';
                tw.style.justifyContent = 'space-between';
                tw.style.boxSizing = 'border-box';
            });

            // All link wraps
            var linkWraps = document.querySelectorAll('.dropdown-link-wrap');
            linkWraps.forEach(function(lw) {
                lw.style.width = '100%';
                lw.style.maxWidth = '100%';
                lw.style.boxSizing = 'border-box';
            });

            // All links
            var links = document.querySelectorAll('.dropdown-link.w-inline-block');
            links.forEach(function(link) {
                link.style.width = '100%';
                link.style.maxWidth = '100%';
                link.style.boxSizing = 'border-box';
            });

            // Nav menu itself
            var navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.style.width = '100%';
                navMenu.style.maxWidth = '100%';
            }
        }

        // Run immediately
        forceDropdownWidth();

        // Run on dropdown open (MutationObserver)
        var menu = document.querySelector('.dropdown-menu.w-dropdown-list');
        if (menu) {
            new MutationObserver(function() {
                if (menu.classList.contains('w--open')) {
                    setTimeout(forceDropdownWidth, 10);
                }
            }).observe(menu, { attributes: true, attributeFilter: ['class'] });
        }

        // Run on hamburger menu open
        var navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            new MutationObserver(function() {
                if (navMenu.classList.contains('w--open')) {
                    setTimeout(forceDropdownWidth, 10);
                }
            }).observe(navMenu, { attributes: true, attributeFilter: ['class'] });
        }

        // Run on resize
        window.addEventListener('resize', function() {
            forceDropdownWidth();
        });
    }
})();

/* Prevent dropdown category headers from closing menu */
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCategoryToggles);
    } else {
        initCategoryToggles();
    }

    function initCategoryToggles() {
        // Add accordion functionality for mobile dropdown categories
        const categoryHeaders = document.querySelectorAll('.dropdown-text-wrap');
        
        categoryHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                // Only work on mobile/tablet
                if (window.innerWidth < 992) {
                    const parentItem = header.closest('.dropdown-grid-item');
                    const linkWrap = parentItem ? parentItem.querySelector('.dropdown-link-wrap') : null;
                    
                    if (linkWrap) {
                        // Close other open accordions
                        document.querySelectorAll('.dropdown-link-wrap.active').forEach(function(openWrap) {
                            if (openWrap !== linkWrap) {
                                openWrap.classList.remove('active');
                                var otherHeader = openWrap.closest('.dropdown-grid-item').querySelector('.dropdown-text-wrap');
                                if (otherHeader) otherHeader.classList.remove('is-open');
                            }
                        });
                        
                        // Toggle current
                        linkWrap.classList.toggle('active');
                        header.classList.toggle('is-open');
                    }
                }
            });
        });

        // Icons should bubble up to header, not block it
        const menuIcons = document.querySelectorAll('.dropdown-text-wrap .navbar-menu-icon');
        menuIcons.forEach(icon => {
            icon.style.pointerEvents = 'none';
        });
    }
})();

/* Services Dropdown Enhancement */
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdown);
    } else {
        initDropdown();
    }

    function initDropdown() {
        const dropdownWrapper = document.querySelector('.nav-link.is--dropdown');
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const navbar = document.querySelector('.navbar');
        
        if (!dropdownToggle || !dropdownMenu || !navbar) return;

        // Position dropdown below navbar on desktop
        function positionDropdown() {
            if (window.innerWidth >= 992) {
                // Calculate navbar height and position
                const navbarRect = navbar.getBoundingClientRect();
                const navbarBottom = navbarRect.bottom - 50; // Move up by 8px
                
                // Use fixed positioning with centering transform
                dropdownMenu.style.position = 'fixed';
                dropdownMenu.style.top = navbarBottom + 'px';
                dropdownMenu.style.left = '50%';
                dropdownMenu.style.transform = 'translateX(-50%)';
                dropdownMenu.style.right = 'auto';
            } else {
                // Reset for mobile/tablet
                dropdownMenu.style.position = '';
                dropdownMenu.style.top = '';
                dropdownMenu.style.left = '';
                dropdownMenu.style.right = '';
                dropdownMenu.style.transform = '';
            }
        }

        // Run on load and resize
        positionDropdown();
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(positionDropdown, 100);
        });

        // Update position on scroll (for fixed navbar)
        let scrollTimer;
        window.addEventListener('scroll', function() {
            if (dropdownMenu.classList.contains('w--open')) {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(positionDropdown, 10);
            }
        }, { passive: true });

        // Update position when dropdown opens
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (dropdownMenu.classList.contains('w--open')) {
                        setTimeout(positionDropdown, 10);
                    }
                }
            });
        });

        observer.observe(dropdownMenu, { attributes: true });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownWrapper.contains(e.target)) {
                if (dropdownMenu.classList.contains('w--open')) {
                    dropdownToggle.click(); // Trigger Webflow's close mechanism
                }
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownMenu.classList.contains('w--open')) {
                dropdownToggle.click();
            }
        });

        // Improve keyboard navigation
        const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextLink = dropdownLinks[index + 1];
                    if (nextLink) nextLink.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevLink = dropdownLinks[index - 1];
                    if (prevLink) prevLink.focus();
                    else dropdownToggle.focus();
                } else if (e.key === 'Tab' && e.shiftKey && index === 0) {
                    // First link + Shift+Tab should close dropdown
                    setTimeout(() => dropdownToggle.click(), 10);
                }
            });
        });

        // When dropdown opens, focus first link for keyboard users
        dropdownToggle.addEventListener('click', function() {
            setTimeout(function() {
                if (dropdownMenu.classList.contains('w--open')) {
                    positionDropdown();
                }
            }, 50);
        });
    }
})();

/* Load animations file (kept separate for GSAP/interaction logic). */
(function () {
    var s = document.createElement('script');
    s.src = 'js/animations.js';
    s.defer = true;
    document.head.appendChild(s);
})();
