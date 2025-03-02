var sections = $("section");

$(window).on("scroll", function() {

    sections.each(function() {

        let top = $(window).scrollTop();
        let offset = $(this).offset().top - 200;
        let id = $(this).attr("id");
        let height = $(this).height();

        if (top >= offset && top < offset + height) {
            $(".navbar a").removeClass("active");
            $(".navbar").find(`[href="#${id}"]`).addClass("active");
        }
    })
});

$(document).ready(function() {

    $(".scroll-top").hide();

    /*--------------- Navbar Toggler ---------------*/
    $("#menu-btn").click(function() {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("active");
    });

    /*--------------- Scroll-Top ---------------*/
    $(window).on("scroll", function() {

        $("#menu-btn").removeClass("fa-times");
        $(".navbar").removeClass("active");

        // STICKY HEADER
        if ($(window).scrollTop() > 0) {
            $(".header").addClass("sticky");
        } else {
            $(".header").removeClass("sticky");
        }

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $(".scroll-top").fadeIn();
            } else {
                $(".scroll-top").fadeOut();
            }
        });

    });

});

/*--------------- Typing-Text ---------------*/
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