const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      requestAnimationFrame(() => {
        // light DOM changes only
      });
    }
  });
});




/* TESTIMONIAL ROTATOR */
const items = document.querySelectorAll('.testimonial');
const dotsWrap = document.querySelector('.dots');
let index = 0;

/* create dots */
items.forEach((_, i) => {
  const d = document.createElement('span');
  if (i === 0) d.classList.add('active');
  dotsWrap.appendChild(d);
});

const dots = dotsWrap.querySelectorAll('span');

function rotateTestimonials() {
  items.forEach(i => i.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  items[index].classList.add('active');
  dots[index].classList.add('active');

  index = (index + 1) % items.length;
}

setInterval(rotateTestimonials, 3000);




const workers = [
  { name: "John Smith", role: "Plumber", price: "$25/hr" },
  { name: "Mike Daniel", role: "Electrician", price: "$30/hr" },
  { name: "Peter Kenny", role: "Carpenter", price: "$28/hr" },
  { name: "Faisal Ibrahim", role: "Home Cleaner", price: "$20/hr" },
  { name: "Alex Moore", role: "Painter", price: "$22/hr" },
  { name: "Chris Nolan", role: "Mechanic", price: "$35/hr" }
];

const slider = document.getElementById("slider");

workers.forEach((w, i) => {
  const card = document.createElement("div");
  card.className = "worker-card";
  card.innerHTML = `
    <img src="https://i.pravatar.cc/80?img=${i+5}">
    <h4>${w.name}</h4>
    <p>${w.role}</p>
    <strong>${w.price}</strong>
  `;
  slider.appendChild(card);
});

/* SLIDER CONTROLS */
let offset = 0;

document.getElementById("next").onclick = () => {
  offset -= 240;
  slider.style.transform = `translateX(${offset}px)`;
};

document.getElementById("prev").onclick = () => {
  offset += 240;
  slider.style.transform = `translateX(${offset}px)`;
};

/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  toggle.textContent =
    document.body.classList.contains("dark") ? "🌙" : "☀️";
};



/* MENU TOGGLE 
    - CLICK TO OPEN/CLOSE
    - SWIPE RIGHT TO CLOSE
*/

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backdrop = document.getElementById("navBackdrop");

let startX = 0;
let currentX = 0;
let isSwiping = false;

/* OPEN / CLOSE */
menuToggle.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  navMenu.classList.toggle("active");
});

backdrop.addEventListener("click", closeMenu);

function closeMenu() {
  document.body.classList.remove("menu-open");
  navMenu.classList.remove("active");
}

/* SWIPE TO CLOSE */
navMenu.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

navMenu.addEventListener("touchmove", e => {
  if (!isSwiping) return;
  currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

  if (deltaX > 0) {
    navMenu.style.transform = `translateX(${deltaX}px)`;
  }
});

navMenu.addEventListener("touchend", () => {
  isSwiping = false;
  navMenu.style.transform = "";

  if (currentX - startX > 80) {
    closeMenu();
  }

  startX = currentX = 0;
});



/* ABOUT SECTION */
/* STEPS (RIGHT SIDE ICONS) */
(() => {

const proSteps = document.querySelectorAll('.pro-step');

/* TIP TEXT */
const proTip = document.getElementById('proTip');

/* IMAGE STRIP (TWO IMAGES INSIDE) */
const proImageStrip = document.getElementById('proImageTrack');

/* DATA: 3 ICONS = 3 IMAGES = 3 TIPS */
const proFlowData = [
  {
    img: 'site2.jpg',
    tip: 'Clear planning defines direction, controls cost, and sets realistic timelines. A well-scoped project eliminates surprises before construction begins'
  },
  {
    img: 'site4.jpg',
    tip: 'Precision engineering turns ideas into build-ready solutions.Every detail is calculated for strength, safety, and long-term performance'
  },
  {
    img: 'site5.jpg',
    tip: 'Execution brings plans to life with discipline and craftsmanship.\nWe deliver on time, on standard, and with lasting quality you can trust'
  }
];

/* CURRENT STEP INDEX */
let proIndex = 0;

/* INITIAL STATE (IMPORTANT) */
proImageStrip.children[0].src = proFlowData[0].img;
proImageStrip.children[1].src = proFlowData[0].img;
proTip.textContent = proFlowData[0].tip;
proTip.style.opacity = 1;

/* MAIN CYCLE FUNCTION */
function cycleUX() {
  /* highlight current icon */
  proSteps.forEach(step => step.classList.remove('pro-step-on'));
  proSteps[proIndex].classList.add('pro-step-on');

  /* calculate next index */
  const nextIndex = (proIndex + 1) % proFlowData.length;

  /* preload next image (OFF-SCREEN) */
  proImageStrip.children[1].src = proFlowData[nextIndex].img;

  /* fade tip out */
  proTip.style.opacity = 0;

  /* slide image inward */
  proImageStrip.style.transition = 'transform 1.2s ease';
  proImageStrip.style.transform = 'translateX(-50%)';

  setTimeout(() => {
    /* reset position invisibly */
    proImageStrip.style.transition = 'none';
    proImageStrip.style.transform = 'translateX(0)';

    /* lock new image as current */
    proImageStrip.children[0].src = proFlowData[nextIndex].img;
    proImageStrip.children[1].src = proFlowData[nextIndex].img;

    /* update tip */
    proTip.textContent = proFlowData[nextIndex].tip;
    proTip.style.opacity = 1;

    /* move index forward */
    proIndex = nextIndex;
  }, 1200);
}

/* START LOOP — 1 SCROLL PER ICON */
setInterval(cycleUX, 4800);
})();

// Optional UX enhancement: click to activate card
(() => {
  const cards = document.querySelectorAll(".service-card");

// Custom animation order (0-based index)
const animationOrder = [0, 3, 5, 1, 4, 2];

let currentIndex = 0;
let interval = null;
let isManuallySelected = false;

/* ===== ACTIVATE CARD ===== */
function activateCard(index) {
  cards.forEach(card => card.classList.remove("active"));
  cards[index].classList.add("active");
}

/* ===== START AUTO ANIMATION ===== */
function startAutoAnimation() {
  if (interval) return;

  interval = setInterval(() => {
    if (isManuallySelected) return;

    activateCard(animationOrder[currentIndex]);
    currentIndex = (currentIndex + 1) % animationOrder.length;
  }, 2500);
}

/* ===== STOP AUTO ANIMATION ===== */
function stopAutoAnimation() {
  clearInterval(interval);
  interval = null;
}

/* ===== CLICK HANDLER ===== */
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    stopAutoAnimation();
    isManuallySelected = true;

    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

/* ===== SERVICES SECTION OBSERVER (RENAMED) ===== */
const servicesSection = document.querySelector(".services");

const servicesObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        isManuallySelected = false;
        startAutoAnimation();
      }
    });
  },
  { threshold: 0.3 }
);

servicesObserver.observe(servicesSection);

/* ===== INITIAL START ===== */
startAutoAnimation();

})();



/* === PARALLAX + INTERSECTION OBSERVER === */
(() => {
const projectsSection = document.getElementById('projects-hero');
const bigNumber = projectsSection.querySelector('.big-number');
const grid = projectsSection.querySelector('.projects-grid-parallax');

window.addEventListener('scroll', () => {
  const rect = projectsSection.getBoundingClientRect();
  const offset = rect.top * -0.15;
  bigNumber.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
  grid.style.transform = `translateY(${offset * 0.4}px)`;
});

const Projectobserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
},{threshold:0.35});

projectsSection.querySelectorAll('[data-projects-observe]').forEach(el => Projectobserver.observe(el));

})();



/* ANIMATED COUNTERS WITH PAUSE/RESUME ON VISIBILITY */

(() => {
const counters = document.querySelectorAll('.count');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

counters.forEach(counter => {
  counter.current = 0;
  counter.animating = false;
});

const animateCounter = (counter) => {
  const symbol = counter.dataset.symbol || '';

  if (prefersReducedMotion) {
    counter.textContent = counter.dataset.target + symbol;
    return;
  }

  counter.animating = true;

  const target = +counter.dataset.target;
  const step = Math.max(1, Math.floor(target / 60));

  const update = () => {
    if (!counter.animating) return;

    counter.current += step;

    if (counter.current >= target) {
      counter.textContent = target + symbol;
      counter.animating = false;
    } else {
      counter.textContent = counter.current + symbol;
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

// IntersectionObserver for in-view detection
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const counter = entry.target;

    if (entry.isIntersecting) {
      // Reset to 0 each time it enters view
      if (!counter.animating) {
        counter.current = 0;
        animateCounter(counter);
      }
    } else {
      // Stop/pause counting when out of view
      counter.animating = false;
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => observer.observe(counter));

const duration = 2000; // 2 seconds
const step = target / (duration / 16); // 16ms per frame ~60fps

})();


