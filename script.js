document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================
     CURRICULUM TABS
     ========================================== */
  const tabButtons = document.querySelectorAll('.curriculum-tab-btn');
  const panes = document.querySelectorAll('.curriculum-pane');
  const placeholder = document.getElementById('curriculum-placeholder');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const level = btn.getAttribute('data-level');

      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      panes.forEach(function (p) { p.classList.remove('active'); });
      if (placeholder) placeholder.classList.add('hidden');

      const targetPane = document.getElementById('pane-' + level);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  /* ==========================================
     FAQ ACCORDION
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================
     LIVE PURCHASE NOTIFICATION TOAST
     ========================================== */
  const toast = document.getElementById('purchase-notification');
  const toastClose = document.getElementById('toast-close');
  const toastName = document.getElementById('toast-name');
  const toastTime = document.getElementById('toast-time');

  const names = ['Renata G.', 'Diego M.', 'Valentina P.', 'André T.', 'Sofia R.', 'Carlos N.', 'Camila O.', 'Mateus L.'];
  let toastTimeout = null;
  let toastInterval = null;

  function showToast() {
    if (!toast) return;
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMinutes = Math.floor(Math.random() * 12) + 1;
    if (toastName) toastName.textContent = randomName;
    if (toastTime) toastTime.textContent = 'há ' + randomMinutes + ' minutos';

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }

  if (toastClose) {
    toastClose.addEventListener('click', function () {
      toast.classList.remove('show');
      clearTimeout(toastTimeout);
    });
  }

  if (toast) {
    setTimeout(showToast, 4000);
    toastInterval = setInterval(showToast, 18000);
  }

  /* ==========================================
     DRAG-TO-SCROLL FOR CAROUSELS (optional UX nicety)
     ========================================== */
  function enableDrag(el) {
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', function (e) {
      isDown = true;
      el.classList.add('grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', function () {
      isDown = false;
      el.classList.remove('grabbing');
    });
    el.addEventListener('mouseup', function () {
      isDown = false;
      el.classList.remove('grabbing');
    });
    el.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    });
  }

  enableDrag(document.querySelector('.preview-carousel'));
  enableDrag(document.querySelector('.testimonials-carousel'));

});
