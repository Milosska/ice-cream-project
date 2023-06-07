const modalButtons = document.querySelectorAll('.js-open-modal');
const overlay = document.querySelector('.js-overlay-modal');
const closeButtons = document.querySelectorAll('.js-modal-close');

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY; //щоб не підскакувало вверх при закритті модалки
    // забороняємо скрол
    document.body.style.cssText = `
      overflow: hidden;
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },

  enabledScroll() {
    document.body.style.cssText = ''; //----Дозволяємо скрол
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  },
};

modalButtons.forEach(btn => {
  btn.addEventListener('click', onModalOpen);
});

closeButtons.forEach(btn => btn.addEventListener('click', hideAll));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideAll();
    document.removeEventListener('keydown', onModalOpen);
  }
});

overlay.addEventListener('click', e => {
  if (e.target === overlay) {
    hideAll();
  }
});

function onModalOpen(e) {
  e.preventDefault();
  scrollController.disabledScroll();
  const modalId = this.getAttribute('data-modal');
  const modalWindow = document.querySelector(
    '.modal[data-modal="' + modalId + '"]'
  );
  modalWindow.classList.add('active');
  overlay.classList.add('active');
}

function hideAll() {
  scrollController.enabledScroll();
  document.querySelector('.modal.active').classList.remove('active');
  overlay.classList.remove('active');
}
