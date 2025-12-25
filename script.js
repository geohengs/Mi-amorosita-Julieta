/* ===============================
   🎵 MÚSICA
================================ */
const music1 = document.getElementById('music1');
const music2 = document.getElementById('music2');
const music3 = document.getElementById("music3");

music1.volume = 0.2;
music2.volume = 0.2;
music3.volume = 0.2;

let musicStarted = false;

/* Inicia la música 1 en la primera interacción */
function startMusicOnce() {
    if (!musicStarted) {
        music1.play().then(() => {
            fadeInMusic(music1);   // 🎵 aquí entra suave
            musicStarted = true;
            removeMusicListeners();
        }).catch(() => {});
    }
}

function removeMusicListeners() {
    document.removeEventListener('click', startMusicOnce);
    document.removeEventListener('scroll', startMusicOnce);
    document.removeEventListener('touchstart', startMusicOnce);
}

document.addEventListener('click', startMusicOnce);
document.addEventListener('scroll', startMusicOnce);
document.addEventListener('touchstart', startMusicOnce);


/* ===============================
   🎬 CAMBIO DE ESCENAS
================================ */
function goToScene2() {
    // Oculta escena 1
    document.getElementById('scene1').classList.add('hidden');

    // Muestra escena 2
    const scene2 = document.getElementById('scene2');
    scene2.classList.remove('hidden');

    // 🎵 Transición cálida de música 1 → música 2
    fadeOutMusic(music1, () => {
        music2.currentTime = 0;
        music2.play().then(() => fadeInMusic(music2, 0.2));
    });

    // Scroll automático a escena 2
    scene2.scrollIntoView({ behavior: "smooth" });
}

function goToScene3() {
    document.getElementById('scene2').classList.add('hidden');
    const scene3 = document.getElementById('scene3');
    scene3.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fadeInMusic(audio, target = 0.2) {
    audio.volume = 0;
    const interval = setInterval(() => {
        if (audio.volume < target) {
            audio.volume += 0.01;
        } else {
            audio.volume = target;
            clearInterval(interval);
        }
    }, 100);
}

function fadeOutMusic(audio, callback) {
    const interval = setInterval(() => {
        if (audio.volume > 0.01) {
            audio.volume -= 0.01;
        } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(interval);
            if (callback) callback();
        }
    }, 100);
}


/* ===============================
   💜 CORAZONES FLOTANDO
================================ */
function createHearts() {
    const container = document.getElementById('hearts-container');

    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '💜';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (18 + Math.random() * 22) + 'px';
        heart.style.opacity = 0.5;
        heart.style.animation = `floatUp ${4 + Math.random() * 3}s linear`;

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

createHearts();

/* Animación corazones */
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatUp {
    0% { transform: translateY(100vh); }
    100% { transform: translateY(-10vh); opacity: 0; }
}`;
document.head.appendChild(style);


/* ===============================
   ✨ REVEAL AL SCROLL
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // ejecuta al cargar
});

function showFinalQuestion() {
    // Oculta escena 2
    document.getElementById("scene2").classList.add("hidden");

    // Muestra escena 3
    const scene3 = document.getElementById("scene3");
    scene3.classList.remove("hidden");

    // Fuerza reflow para que la animación se active
    void scene3.offsetWidth;

    // Activa blur + fade
    scene3.classList.add("show");

    // Cambia la música
    fadeOutMusic(music2, () => {
        music3.currentTime = 0;
        music3.play().then(() => fadeInMusic(music3, 0.25));
    });

    // Scroll automático al centro
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".memory-photo").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
});

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
    }
});

