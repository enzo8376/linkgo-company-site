(() => {
  'use strict';

  const config = window.LINKGO_SITE_CONFIG || {};

  const setLink = (selector, url) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (url) el.setAttribute('href', url);
    });
  };

  setLink('.js-form-link', config.formUrl);
  setLink('.js-line-link', config.lineUrl);
  setLink('.js-email-link', config.contactEmail ? `mailto:${config.contactEmail}` : '');

  document.querySelectorAll('.js-line-id').forEach((el) => {
    if (config.lineId) el.textContent = config.lineId;
  });
  document.querySelectorAll('.js-email-text').forEach((el) => {
    if (config.contactEmail) el.textContent = config.contactEmail;
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '開啟導覽選單');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? '開啟導覽選單' : '關閉導覽選單');
      nav.classList.toggle('is-open', !open);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach((item) => {
    const delay = item.getAttribute('data-delay');
    if (delay) item.style.setProperty('--delay', `${delay}ms`);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('p');
    const close = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.js-photo').forEach((button) => {
      button.addEventListener('click', () => {
        image.src = button.dataset.image || '';
        image.alt = button.dataset.caption || '圖片預覽';
        caption.textContent = button.dataset.caption || '';
        if (typeof lightbox.showModal === 'function') lightbox.showModal();
      });
    });

    close.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      const rect = lightbox.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) lightbox.close();
    });
  }


  // 手機版進入正式報名或公司資訊區時，暫時收起浮動按鈕，避免遮住文字與主要按鈕。
  const floatingCta = document.querySelector('.floating-cta');
  const mobileMedia = window.matchMedia('(max-width: 720px)');
  const floatHideTargets = document.querySelectorAll('#apply, .company, .site-footer');
  if (floatingCta && floatHideTargets.length && 'IntersectionObserver' in window) {
    const visibleTargets = new Set();
    const updateFloatingCta = () => {
      floatingCta.classList.toggle('is-hidden-mobile', mobileMedia.matches && visibleTargets.size > 0);
    };
    const floatObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      });
      updateFloatingCta();
    }, { threshold: 0.08 });
    floatHideTargets.forEach((target) => floatObserver.observe(target));
    mobileMedia.addEventListener?.('change', updateFloatingCta);
  }

})();
