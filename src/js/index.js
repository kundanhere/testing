(function () {
  // do not mess global space
  'use strict';

  console.clear();

  // helpers
  const select = (e) => document.querySelector(e);
  const selectAll = (e) => document.querySelectorAll(e);

  // @desc initialize Isotope
  const initIsotope = () => {
    const collection = select('.grid');
    const filterItems = selectAll('.menu__item');
    const options = {
      itemSelector: '.grid__item',
      masonry: {
        columnWidth: 1,
        rowWidth: 1,
        isFitWidth: true,
      },
    };

    // init Isotope
    let iso = new Isotope(collection, options);

    // filter isotope elements
    const filterFns = (e) => {
      filterItems.forEach((el) => el.classList.remove('active'));
      e.target.classList.add('active');

      let filterValue = e.target.dataset.filter;

      return iso.arrange({ filter: filterValue }), !1;
    };

    // hookup click event for each "filter-item"
    filterItems.forEach((el) => el.addEventListener('click', filterFns));
  };

  // @desc initialize accordion
  const initAccordion = () => {
    const accordions = selectAll('.accordion');
    const acActive = select('.accordion.active');

    if (acActive) {
      // set default "active accordion" height
      let acPanel = acActive.nextElementSibling;
      acPanel.style.maxHeight = acPanel.scrollHeight + 'px';
    }

    accordions.forEach((accordion) => {
      // hookup click event for each "accordion"
      accordion.addEventListener('click', (evt) => {
        // toggle "active" class
        evt.target.classList.toggle('active');
        // Get and set panel max-height
        let panel = evt.target.nextElementSibling;
        panel.style.maxHeight = !panel.style.maxHeight
          ? panel.scrollHeight + 'px'
          : null;
      });
    });
  };

  // @desc init smooth scroll on Extra large devices (large laptops and desktops, 1200px and up)
  const initSmoothScroll = () => {
    let winSize = window.innerWidth;
    let vsSection = select('#vs-section');

    if (winSize > 768) {
      vsSection.classList.add('vs-section');

      let scroll = new Smooth({
        native: false,
        preload: true,
      });
      scroll.init();
    } else {
      vsSection.classList.remove('vs-section');
    }
  };

  // @desc invoke methods
  const init = () => {
    initSmoothScroll();
    initIsotope();
    initAccordion();
  };

  // init App
  window.onload = (e) => init();
})();
