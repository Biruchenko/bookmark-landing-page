export function initTabs() {
	const tablists = document.querySelectorAll('[role="tablist"]');

	tablists.forEach(tablist => {
		const tabs = tablist.querySelectorAll('[role="tab"]');
		// const panels = tablist.querySelectorAll('[role="tabpanel"]');
		const panels = Array.from(tabs)
			.map(t => document.getElementById(t.getAttribute('aria-controls')))
			.filter(Boolean);

		if (tabs.length > 0) {
			tabs.forEach(tab => {
				tab.addEventListener('click', () => toggleTab(tab));
				tab.addEventListener('keydown', handleKeydown);
			});

			const initiallyActive = tablist.querySelector('[role="tab"][aria-selected="true"]');
			if (initiallyActive) {
				openTab(initiallyActive);
			}
		}

		function toggleTab(tab) {
			if (tab.classList.contains('open')) {
				closeTab(tab);
			} else {
				openTab(tab);
			}
		}

		function handleKeydown(event) {
			const currentIndex = Array.from(tabs).indexOf(event.currentTarget);

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					focusNextTab(currentIndex);
					break;
				case 'ArrowUp':
					event.preventDefault();
					focusPrevTab(currentIndex);
					break;
				case 'Home':
					event.preventDefault();
					tabs[0].focus();
					break;
				case 'End':
					event.preventDefault();
					tabs[tabs.length - 1].focus();
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					toggleTab(event.currentTarget);
					break;
			}
		}

		function focusNextTab(currentIndex) {
			const nextIndex = (currentIndex + 1) % tabs.length;
			tabs[nextIndex].focus();
		}

		function focusPrevTab(currentIndex) {
			const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
			tabs[prevIndex].focus();
		}

		function closeTab(tab) {
			tab.setAttribute('aria-selected', 'false');
			tab.classList.remove('open');
			const panel = document.getElementById(tab.getAttribute('aria-controls'));
			panel.setAttribute('aria-hidden', 'true');
			panel.classList.remove('open');
		}

		function openTab(tab) {
			tabs.forEach(tabItem => {
				tabItem.setAttribute('aria-selected', 'false');
				tabItem.classList.remove('open');
			});
			panels.forEach(panel => {
				panel.setAttribute('aria-hidden', 'true');
				panel.classList.remove('open');
			});
			tab.setAttribute('aria-selected', 'true');
			tab.classList.add('open');
			const associatedPanel = tab.getAttribute('aria-controls');
			const panel = document.getElementById(associatedPanel);
			panel.setAttribute('aria-hidden', 'false');
			panel.classList.add('open');
		}
	});
}
