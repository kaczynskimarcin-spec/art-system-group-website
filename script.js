document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (menuButton && mobileMenu) {
        const desktop = window.matchMedia("(min-width: 761px)");
        const background = document.querySelectorAll("main, .site-footer, .site-header .brand");
        const menuLinks = [...mobileMenu.querySelectorAll("a")];
        let isOpen = false;

        const setMenuOpen = (open, returnFocus = false) => {
            isOpen = open;
            mobileMenu.hidden = !open;
            mobileMenu.classList.toggle("open", open);
            document.body.classList.toggle("menu-open", open);
            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
            background.forEach(element => { element.inert = open; });
            if (open) menuLinks[0]?.focus();
            else if (returnFocus) menuButton.focus();
        };

        menuButton.hidden = false;
        menuButton.addEventListener("click", () => setMenuOpen(!isOpen, isOpen));
        menuLinks.forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
        desktop.addEventListener("change", () => setMenuOpen(false));

        document.addEventListener("keydown", event => {
            if (!isOpen) return;
            if (event.key === "Escape") {
                event.preventDefault();
                setMenuOpen(false, true);
            } else if (event.key === "Tab") {
                const controls = [menuButton, ...menuLinks];
                const index = controls.indexOf(document.activeElement);
                const next = (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
                event.preventDefault();
                controls[next].focus();
            }
        });
    }

    const motionButton = document.querySelector(".motion-toggle");
    if (motionButton) {
        motionButton.hidden = false;
        motionButton.addEventListener("click", () => {
            const paused = document.documentElement.classList.toggle("motion-paused");
            motionButton.setAttribute("aria-pressed", String(paused));
            motionButton.textContent = paused ? "Wznów animacje" : "Wstrzymaj animacje";
        });
    }

    const revealElements = document.querySelectorAll(
        ".technology-card, .project, .process-step, .contact-card"
    );

    if ("IntersectionObserver" in window && !reducedMotion.matches) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.remove("reveal-pending");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.05 });

        revealElements.forEach(element => {
            element.classList.add("reveal-pending");
            observer.observe(element);
        });

        const showAll = () => {
            revealElements.forEach(element => element.classList.remove("reveal-pending"));
            observer.disconnect();
        };
        reducedMotion.addEventListener("change", showAll, { once: true });
        motionButton?.addEventListener("click", showAll, { once: true });
        document.addEventListener("focusin", event => {
            const card = event.target.closest(".reveal-pending");
            if (card) card.classList.remove("reveal-pending");
        });
    }
});
