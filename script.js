"use strict";

/* ======================================================
   ROOPIX
   Premium Website Script
   Part 1
====================================================== */


/* ===========================
   LOADER
=========================== */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.classList.add("hidden");

setTimeout(() => {
    loader.remove();
}, 600);

        }, 600);

    }, 800);

});


/* ===========================
   NAVBAR SCROLL
=========================== */

const navbar = document.getElementById("navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* ===========================
   BACK TO TOP
=========================== */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}

window.addEventListener("scroll", updateBackToTop);

updateBackToTop();

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/* ===========================
   SMOOTH SCROLL
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/* ======================================================
   ROOPIX
   Premium Website Script
   Part 2
====================================================== */


/* ===========================
   MOBILE MENU
=========================== */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open");

        const expanded = hamburger.classList.contains("open");

        hamburger.setAttribute("aria-expanded", expanded);

        document.body.classList.toggle("menu-open", expanded);

    });

}


/* ===========================
   CLOSE MENU AFTER CLICK
=========================== */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        hamburger?.classList.remove("open");
        mobileMenu?.classList.remove("open");

        hamburger?.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    });

});


/* ===========================
   SEARCH BAR
=========================== */

const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchClose = document.getElementById("searchClose");

function openSearch() {

    if (!searchBar) return;

    searchBar.classList.add("open");

    const input = searchBar.querySelector("input");

    if (input) {

        setTimeout(() => {

            input.focus();

        }, 200);

    }

}

function closeSearch() {

    if (!searchBar) return;

    searchBar.classList.remove("open");

}

searchToggle?.addEventListener("click", openSearch);

searchClose?.addEventListener("click", closeSearch);


/* ===========================
   ESC KEY
=========================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeSearch();

        hamburger?.classList.remove("open");
        mobileMenu?.classList.remove("open");

        hamburger?.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    }

});


/* ===========================
   CLICK OUTSIDE SEARCH
=========================== */

document.addEventListener("click", (e) => {

    if (!searchBar) return;

    if (
        searchBar.classList.contains("open") &&
        !searchBar.contains(e.target) &&
        !searchToggle.contains(e.target)
    ) {

        closeSearch();

    }

});


/* ===========================
   ACTIVE NAV LINK
=========================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ======================================================
   ROOPIX
   Premium Website Script
   Part 3
====================================================== */


/* ===========================
   REVEAL ANIMATION
=========================== */

const revealItems = document.querySelectorAll(
".reveal-up,.reveal-left,.reveal-right"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    revealItems.forEach(item=>observer.observe(item));

}else{

    revealItems.forEach(item=>item.classList.add("visible"));

}



/* ===========================
   TESTIMONIAL SLIDER
=========================== */

const track=document.getElementById("testimonialsTrack");
const prev=document.getElementById("testiPrev");
const next=document.getElementById("testiNext");
const dotsWrap=document.getElementById("testiDots");

if(track){

    const cards=[...track.children];

    let index=0;

    cards.forEach((_,i)=>{

        const dot=document.createElement("button");

        dot.className="testi-dot";

        if(i===0){

            dot.classList.add("active");

        }

        dot.addEventListener("click",()=>{

            index=i;

            updateSlider();

        });

        dotsWrap?.appendChild(dot);

    });

    const dots=dotsWrap
        ? [...dotsWrap.children]
        : [];

    function updateSlider(){

        track.style.transform=`translateX(-${index*100}%)`;

        dots.forEach(dot=>dot.classList.remove("active"));

        dots[index]?.classList.add("active");

    }

    next?.addEventListener("click",()=>{

        index++;

        if(index>=cards.length){

            index=0;

        }

        updateSlider();

    });

    prev?.addEventListener("click",()=>{

        index--;

        if(index<0){

            index=cards.length-1;

        }

        updateSlider();

    });

    setInterval(()=>{

        index++;

        if(index>=cards.length){

            index=0;

        }

        updateSlider();

    },6000);

}



/* ===========================
   PARTICLE BACKGROUND
=========================== */

const canvas=document.getElementById("particleCanvas");

if(canvas){

    const ctx=canvas.getContext("2d");

    let particles=[];

    function resize(){

        canvas.width=canvas.offsetWidth;

        canvas.height=canvas.offsetHeight;

    }

    window.addEventListener("resize",resize);

    resize();

    for(let i=0;i<55;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            r:Math.random()*2+1,

            dx:(Math.random()-.5)*0.35,

            dy:(Math.random()-.5)*0.35

        });

    }

    function animate(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        particles.forEach(p=>{

            p.x+=p.dx;

            p.y+=p.dy;

            if(p.x<0||p.x>canvas.width)p.dx*=-1;

            if(p.y<0||p.y>canvas.height)p.dy*=-1;

            ctx.beginPath();

            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

            ctx.fillStyle="rgba(233,30,99,.35)";

            ctx.fill();

        });

        requestAnimationFrame(animate);

    }

    animate();

}



/* ===========================
   IMAGE FADE-IN
=========================== */

document.querySelectorAll("img").forEach(img=>{

    img.addEventListener("load",()=>{

        img.classList.add("loaded");

    });

});



/* ===========================
   CONSOLE MESSAGE
=========================== */

console.log("%cROOPIX","font-size:28px;font-weight:bold;color:#E91E63;");
console.log("%cBeauty, Redefined","font-size:14px;color:#999;");
console.log("%cWebsite Developed for ROOPIX","color:#fff;background:#E91E63;padding:6px 12px;border-radius:6px;");
