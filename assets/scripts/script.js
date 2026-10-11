import { initMenu } from './menu.js';
import { initTabs } from './tabs.js';
import { initForm } from './form.js';

initMenu();
initTabs();
initForm();

/* Header on scroll */
window.addEventListener('scroll', () => {
	document.querySelector('.header').classList.toggle('window-scroll', window.scrollY > 0);
});
