document.addEventListener("DOMContentLoaded", function () {
  // === Burger Menu Toggle ===
  var burgerMenu = document.getElementById("burger-menu");
  var overlay = document.getElementById("menu");
  var body = document.body;

  if (burgerMenu && overlay) {
    burgerMenu.addEventListener("click", function () {
      this.classList.toggle("close");
      overlay.classList.toggle("overlay");
      body.classList.toggle("no-scroll");
    });

    const menuLinks = overlay.querySelectorAll("a[href^='#']");
    menuLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default jump

        const targetId = this.getAttribute("href").substring(1);
        const targetElem = document.getElementById(targetId);

        if (targetElem) {
          targetElem.scrollIntoView({ behavior: "smooth" });
        }

        setTimeout(() => {
          burgerMenu.classList.remove("close");
          overlay.classList.remove("overlay");
          body.classList.remove("no-scroll");
        }, 300);
      });
    });
  }

  // === Pricing Toggle with Animation ===
  const toggle = document.getElementById("toggle");
  const price1 = document.getElementById("price1");
  const price2 = document.getElementById("price2");

  function animatePrice(element, start, end, duration = 500) {
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(start + range * progress);
        element.textContent = current.toLocaleString("ru-RU") + " ₽";
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
  }

  function parsePrice(text) {
    return parseInt(text.replace(/[^\d]/g, ""), 10) || 0;
  }

  const initPrice1 = toggle.checked ? 500 : 50;
  const initPrice2 = toggle.checked ? 1000 : 100;
  animatePrice(price1, 0, initPrice1);
  animatePrice(price2, 0, initPrice2);

  toggle.addEventListener("change", () => {
    const isYear = toggle.checked;
    const newPrice1 = isYear ? 500 : 50;
    const newPrice2 = isYear ? 1000 : 100;

    animatePrice(price1, parsePrice(price1.textContent), newPrice1);
    animatePrice(price2, parsePrice(price2.textContent), newPrice2);
  });

  // === Popup Form & Thanks Popup ===
  window.togglePopup = function() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
  };

  window.submitForm = function(event) {
    event.preventDefault();
    document.getElementById('popupOverlay').classList.remove('show');
    document.getElementById('thankYouOverlay').classList.add('show');
  };

  window.closePopup = function() {
    document.getElementById('thankYouOverlay').classList.remove('show');
  };

  document.getElementById('popupOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
      this.classList.remove('show');
    }
  });

  document.getElementById('thankYouOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
      closePopup();
    }
  });
});