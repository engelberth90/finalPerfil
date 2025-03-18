


const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 50);
})

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");


// toggle navbar

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

// PARALLAX OBSERVER
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    })
})

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));


// NUEVAS FUNCIONES

function obtenerHoraActual() {
    let fecha = new Date();
    let horas = fecha.getHours();
    return horas;
}








// SLIDER VIEWCARDS










// luisfer123
// fernando123
// Casa_123










// INICIOOO
window.onload = function () {

    horaTerminal();
    loadingweb();
    cambiarIdioma();


};


function loadingweb() {
    const loadingContainer = document.querySelector('.loading');
    const loadingText = document.getElementById('loading-text');
    const messages = [
        "Iniciando sistema...",
        "Conectando a la red...",
        "Analizando datos...",
        "Acceso concedido..."
    ];

    let index = 0;
    const textInterval = setInterval(() => {
        loadingText.textContent = messages[index];
        index = (index + 1) % messages.length;
    }, 800);

    setTimeout(() => {
        loadingContainer.classList.add('hidden');
        clearInterval(textInterval);

    }, 4200);

}



function obtenerFechaHoraActualConDia() {
    const fechaHoraActual = new Date();
    // Opciones para formatear la fecha
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return fechaHoraActual.toLocaleString('es-ES', opciones); // Devuelve la fecha y hora formateada en español
}

// Ejemplo de uso
function horaTerminal() {
    const horaactual = document.querySelector("#horaactual");
    horaactual.textContent = obtenerFechaHoraActualConDia();
}