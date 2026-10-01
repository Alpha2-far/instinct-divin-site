/* ==========================================================================
   INSTINCT DIVIN — interactions (vanilla JS, aucune dépendance)
   - liens WhatsApp contextualisés (messages pré-remplis)
   - navigation : état au scroll + menu mobile accessible
   - onglets de la carte (ARIA + clavier)
   - révélation au scroll (désactivée si prefers-reduced-motion)
   - année du pied de page
   ========================================================================== */
(function () {
  'use strict';

  var WA_BASE = 'https://wa.me/2290166487565';
  var MESSAGES = {
    order: 'Bonjour INSTINCT DIVIN 👋, je souhaite passer une commande.',
    event: "Bonjour INSTINCT DIVIN 👋, je prépare un événement et j'aimerais un devis pour un gâteau.",
    formation: 'Bonjour INSTINCT DIVIN 👋, je souhaite des informations sur vos formations en pâtisserie.'
  };

  /* --- Liens WhatsApp : message pré-rempli selon le contexte ----------------- */
  Array.prototype.forEach.call(document.querySelectorAll('a.wa'), function (a) {
    var msg = null;
    if (a.dataset.waProduct) {
      msg = 'Bonjour INSTINCT DIVIN 👋, je souhaite commander : ' +
        a.dataset.waProduct + (a.dataset.waPrice ? ' (' + a.dataset.waPrice + ')' : '') + '.';
    } else if (a.dataset.wa && MESSAGES[a.dataset.wa]) {
      msg = MESSAGES[a.dataset.wa];
    } else if (a.dataset.waText) {
      msg = a.dataset.waText;
    }
    if (msg) a.href = WA_BASE + '?text=' + encodeURIComponent(msg);
  });

  /* --- Navigation : fond au scroll + bouton flottant ------------------------- */
  var nav = document.getElementById('nav');
  var fab = document.getElementById('fab');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
    if (fab) fab.classList.toggle('is-visible', window.scrollY > 420);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menu mobile ----------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('navPanel');
  var closeBtn = document.getElementById('navClose');

  function setPanel(open) {
    if (!panel || !toggle) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && closeBtn) closeBtn.focus();
    else if (!open) toggle.focus();
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () { setPanel(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setPanel(false); });
    Array.prototype.forEach.call(panel.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setPanel(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setPanel(false);
    });
  }

  /* --- Onglets de la carte (ARIA + navigation clavier) ----------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[role="tablist"]'), function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) {
          p.classList.toggle('is-active', selected);
          if (selected) {
            Array.prototype.forEach.call(p.querySelectorAll('.reveal'), function (el) {
              el.classList.add('is-visible');
            });
          }
        }
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var target = null;
        if (e.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') target = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') target = tabs[0];
        else if (e.key === 'End') target = tabs[tabs.length - 1];
        if (target) { e.preventDefault(); target.focus(); select(target); }
      });
    });
  });

  /* --- Révélation au scroll --------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* --- Année du pied de page --------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
