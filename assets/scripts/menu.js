export function initMenu() {
	/* Menu burger */
	const menuBtn = document.querySelector('.header__btn-menu');
	const menuBody = document.querySelector('.menu__body');
	const menuList = document.querySelector('.menu__list');
	const menuLinks = menuList.querySelectorAll('.menu__link');
	const socialLinks = menuBody.querySelectorAll('.social__link');
	let menuScrollPosition = 0;
	const mediaMobile = window.matchMedia('(max-width: 47.9988rem)');
	let menuLinkClicked = false;

	if (menuBtn) {
		menuBtn.addEventListener('click', () => {
			toggleMenu();
		});
	}

	function syncMenuInert() {
		const isOpen = menuBody.classList.contains('open');
		const hidden = mediaMobile.matches && !isOpen;
		menuBody.inert = hidden;
		menuBody.setAttribute('aria-hidden', hidden);
	}

	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && menuBtn.classList.contains('open')) {
			toggleMenu();
		}
	});

	menuBody.addEventListener('keydown', trapFocus);
	menuBtn.addEventListener('keydown', trapFocus);

	function trapFocus(e) {
		if (!menuBody.classList.contains('open')) return;

		if (e.key === 'Tab') {
			// Also consider the menu button
			const allFocusables = [menuBtn, ...menuLinks, ...socialLinks];
			const firstFocusable = allFocusables[0];
			const lastFocusable = allFocusables[allFocusables.length - 1];

			if (e.shiftKey && document.activeElement === firstFocusable) {
				e.preventDefault();
				lastFocusable.focus();
			} else if (!e.shiftKey && document.activeElement === lastFocusable) {
				e.preventDefault();
				firstFocusable.focus();
			}
		}
	}

	function toggleMenu() {
		const isOpen = !menuBtn.classList.contains('open');
		menuBody.classList.toggle('open', isOpen);
		menuBtn.classList.toggle('open', isOpen);
		if (isOpen) {
			menuScrollPosition = window.scrollY;
			menuBtn.setAttribute('aria-expanded', true);
			menuBtn.setAttribute('aria-label', 'Close navigation menu');
			menuList.querySelector('.menu__link').focus();
		} else {
			menuBtn.setAttribute('aria-expanded', false);
			menuBtn.setAttribute('aria-label', 'Open navigation menu');
			menuBtn.focus();
			// if (!menuLinkClicked) {
			// 	window.scrollTo(0, menuScrollPosition);
			// }
			// menuLinkClicked = false;
		}
		document.body.classList.toggle('no-scroll', isOpen);
		document.body.style.top = isOpen ? -menuScrollPosition + 'px' : '';
		syncMenuInert();
		if (!isOpen && !menuLinkClicked) {
			requestAnimationFrame(() => window.scrollTo(0, menuScrollPosition));
		}
		menuLinkClicked = false;
	}

	// Close menu when clicking menu links
	menuLinks.forEach(link => {
		link.addEventListener('click', e => {
			// e.preventDefault();
			menuLinkClicked = true;
			if (menuBtn.classList.contains('open')) {
				toggleMenu();
			}
		});
	});

	// Keep state correct when the user resizes across the breakpoint
	mediaMobile.addEventListener('change', syncMenuInert);
	// Set the correct initial state on load (mobile = closed = inert)
	syncMenuInert();
}
