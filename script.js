document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navbarLinks = document.querySelectorAll(".navbar a");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const menuBtn = document.getElementById("menu-btn");
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");

  // Hide scroll-top button initially
  scrollTopBtn.style.display = "none";

  // Scroll active section
  window.addEventListener("scroll", function () {
    const top = window.scrollY;

    sections.forEach((section) => {
      const offset = section.offsetTop - 200;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navbarLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });

    // Sticky header
    if (top > 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    // Scroll top button visibility
    if (top > 100) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }

    // Close menu on scroll
    menuBtn.classList.remove("menu-times");
    navbar.classList.remove("active");
  });

  // Menu toggle
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("menu-times");
    navbar.classList.toggle("active");
  });
});

// Typing text
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}<span class="cursor"></span></span>`;

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        this.el.querySelector(".cursor").classList.add("blink");
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        this.el.querySelector(".cursor").classList.remove("blink");
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName("typing-text");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = `
        .typing-text > .wrap { border-right: none; }
        .cursor { border-right: 0.08em solid var(--purple); }
        .blink { animation: blink-animation 0.8s infinite; }
        @keyframes blink-animation {
            50% { opacity: 0; }
        }
    `;
    document.body.appendChild(css);
};