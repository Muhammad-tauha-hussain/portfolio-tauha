var timeout;
const projectInner = document.querySelector(".project-box-inner");
const originalBgColor = getComputedStyle(document.body).backgroundColor;

// // loading-animation
document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline();

  gsap.set(".panels .panel", { transformOrigin: "top left" });
  gsap.set(".container", { clipPath: "inset(0 50% 0 50%)" });

  // **Loading Animation**
  tl.to(".panels .panel", {
    x: "0%",
    skewX: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power4.out"
  })
    .to(".panels .panel", {
      x: "100%",
      skewX: 30,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.in",
      opacity: 0
    }, "+=0.3")
    .to(".panels", { duration: 0, display: "none" })
    .to(".container", {
      clipPath: "inset(0 0 0 0)",
      duration: 1.5,
      ease: "expo.out",
      onComplete: function () {
        gsap.set(".container", { clipPath: "inset(0 0 0 0)" });
        initializeOtherAnimations();
      }
    });
});

function initializeOtherAnimations() {
  // Mouse follower initialization
  mousefollower(1, 1);
  circleAnimation();

  // Initialize your ScrollReveal animations
  initializeScrollReveal();

  // Initialize your GSAP scrollTrigger animations for projects
  initializeProjectAnimations();
}

// nav-animation
function firstpageAnim() {
  var tl = gsap.timeline();

  // Animate the header and logo
  tl.from("#header, .nav-name", {
    y: -20,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
  })

  // Animate the navigation links with stagger effect
  .from(".nav_menu_list .nav_list", {  
    y: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "expo.out"
  }, "-=0.5") 

  // Animate the CV button
  .from(".nav-button", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "expo.out"
  }, "-=0.4")

  // Animate the menu button (bars icon)
  .from(".nav-menu-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "expo.out"
  }, "-=0.6");
}

// Mouse follower circle animation
function mousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        const minicircle = document.querySelector("#minicircle");
        if (minicircle) {
            minicircle.style.transform = `translate(${dets.pageX}px, ${dets.pageY}px) scale(${xscale}, ${yscale})`;
        }
    });
}

function circleAnimation() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.9, 1.2, Math.abs(dets.pageX - xprev) / 10);
        yscale = gsap.utils.clamp(0.8, 1.2, Math.abs(dets.pageY - yprev) / 10);

        xprev = dets.pageX;
        yprev = dets.pageY;

        mousefollower(xscale, yscale);

        timeout = setTimeout(function() {
            const minicircle = document.querySelector("#minicircle");
            if (minicircle) {
                minicircle.style.transform = `translate(${dets.pageX}px, ${dets.pageY}px) scale(1, 1)`;
            }
        }, 100);
    });
}

// Function to initialize ScrollReveal animations
function initializeScrollReveal() {
  /* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    /* -- HOME -- */
    sr.reveal('.featured-text-card', {});
    sr.reveal('.featured-name', { delay: 100 });
    sr.reveal('.featured-text-info', { delay: 200 });
    sr.reveal('.featured-text-btn', { delay: 200 });
    sr.reveal('.social_icons', { delay: 200 });
    sr.reveal('.featured-image', { delay: 300 });

    /* -- PROJECT BOX -- */
    sr.reveal('.project-box', { interval: 200 });

    /* -- HEADINGS -- */
    sr.reveal('.top-header', {});

    /* -- ABOUT INFO & CONTACT INFO -- */
    const srLeft = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srLeft.reveal('.about-info', { delay: 100 });
    srLeft.reveal('.contact-info', { delay: 100 });

    /* -- ABOUT SKILLS & FORM BOX -- */
    const srRight = ScrollReveal({
      origin: 'right',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srRight.reveal('.skills-box', { delay: 100 });
    srRight.reveal('.form-control', { delay: 100 });
  }
}

// Function to initialize project animations
function initializeProjectAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Project box animations
    gsap.fromTo(".project-box",
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".project-container",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

    // Project inner section background change
    if (projectInner) {
      ScrollTrigger.create({
        trigger: projectInner,
        start: "top 60%",
        end: "bottom 40%",
        markers: false,
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: "black",
            duration: 0.8,
            ease: "power3.out"
          });
        },
        onLeave: () => {
          gsap.to("body", {
            backgroundColor: originalBgColor,
            duration: 1,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to("body", {
            backgroundColor: "black",
            duration: 0.8,
            ease: "power3.out"
          });
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: originalBgColor,
            duration: 1,
            ease: "power2.inOut"
          });
        }
      });
    }

    // Project element hover effects
    const projectElem = document.querySelectorAll(".elem");
    const circle = document.querySelector("#minicircle");

    // Second page animation
    projectElem.forEach(function (elem) {
      var rotate = 0;
      var diffrot = 0;

      elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: "power3.out",
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot)
        });
      });

      elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: "power1.out",
        });
      });

      elem.addEventListener("mouseenter", function () {
        if (circle) {
          circle.innerHTML = "Explore Website";
          gsap.to(circle, {
            height: "100px",
            width: "100px",
            backgroundColor: "rgb(30, 30, 30)",
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.6)",
            duration: 0.5,
            ease: "expo.out",
          });
        }
      });

      elem.addEventListener("mouseleave", function () {
        if (circle) {
          circle.innerHTML = "";
          gsap.to(circle, {
            height: "20px",
            width: "20px",
            backgroundColor: "var(--text-color-second)",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
            duration: 0.5,
            ease: "expo.out",
          });
        }
      });
    });
  }
}

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () { headerShadow() };

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (navHeader) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
    } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
    }
  }
}

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
      const activeLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
      if (activeLink) {
        activeLink.classList.add('active-link');
      }
    } else {
      const activeLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
      if (activeLink) {
        activeLink.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

// Initialize typing effect using a direct approach on window load
window.addEventListener('load', function() {
  setTimeout(function() {
    const typedTextElement = document.querySelector(".typedText");
    if (typeof Typed !== 'undefined' && typedTextElement) {
      new Typed(typedTextElement, {
        strings: ["Frontend Developer", "MernStack Developer"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000
      });
    }
  }, 1000);
});

// Call firstpageAnim when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  if (typeof gsap !== 'undefined') {
    firstpageAnim();
  }
});


// Modify your DOMContentLoaded event listener to ensure GSAP is loaded
// document.addEventListener("DOMContentLoaded", function() {
//   // Check if GSAP is loaded
//   if (typeof gsap !== 'undefined') {
//     // Small delay to ensure everything is properly initialized
//     setTimeout(function() {
//       firstpageAnim();
//     }, 100);
//   } else {
//     console.error("GSAP library not loaded!");
//   }
// });


