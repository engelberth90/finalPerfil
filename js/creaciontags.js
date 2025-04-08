// INICIO
let txth1 = document.querySelector("#txth1");
let habilidadesInicio = document.querySelector("#habilidadesInicio");
let txtDescripcion = document.querySelector("#txtDescripcion");
let btncv = document.querySelector("#btncv");

// SOBRE MI NIVEL ACADEMICO
let tituloSobre = document.querySelector("#tituloSobre");
let subtituloSobre = document.querySelector("#subtituloSobre");
let descripcionSobre = document.querySelector("#descripcionSobre");
let txtcrearMenu = document.querySelector("#txtcrearMenu");


const cambiar = document.querySelector("#cambiar");
let colorChange = "#7f1d1d";

//CURSOS   Y    CERTIFICACIONES
const titulocert = document.querySelector("#titulocert");
const subtitulocert = document.querySelector("#subtitulocert");
const subtitulocursos = document.querySelector("#subtitulocursos");

let idiomaglobal = "0";

const textsoy = document.querySelector("#textsoy");



//componentes extras



async function cargarData() {
    let nombre = "js/dataPersona.json";
    const idioma = cambiar.value;
    if (idioma === "0") {
        nombre = "js/dataPersona.json";
    } else {
        nombre = "js/dataPersonain.json";
    }

    const inicio = await leerArchivojson(nombre);
    await crearMenu(inicio.menu);
    await SaludoUsuario(inicio, inicio.perfilPersona[0].nombre);
    await HabilidadesInicio(inicio.habilidadesinicio);
    await mostrarDescripcion(inicio.perfilPersona);
    await sobreMi(inicio.sobreMi[0].titulo, inicio.sobreMi[0].subtitulo, inicio.sobreMi[0].parrafo1, inicio.sobreMi[0].parrafo2);
    await ModuloCertificaciones(inicio.certificaciones);
    await ModuloHabilidades(inicio.Habilidades);
    await ModuloProyectos(inicio.Trabajo);
    await ModuloContacto(inicio.Contacto);

}


function cambiarIdioma() {
    cargarData();

    cambiar.addEventListener("click", (e) => {
        cambiar.value = cambiar.value == "0" ? "1" : "0";
        idiomaglobal = idiomaglobal == "0" ? "1" : "0";
        cambiar.innerHTML = cambiar.value == "0" ? `<img
              class="containerImagenlogo"
              src="img/translate.webp"
            />
            Inglish` : `<img
              class="containerImagenlogo"
              src="img/translate.webp"
            />
            Español`;
        cargarData();

    });
}

function cambiarComponentesboton() {
    const btnTargetcambiar = document.querySelectorAll("#btnTarget1");
    const btnTargetcambia2 = document.querySelectorAll("#btnTarget2");
    textsoy.innerHTML = idiomaglobal === "0" ? "Yo Soy" : "I am";

    btnTargetcambiar.forEach((element) => {
        element.innerHTML = idiomaglobal === "0" ? "Ver" : "Watch";
    }
    );

    btnTargetcambia2.forEach((element) => {
        element.innerHTML = idiomaglobal === "0" ? "Ver" : "Watch";
    }
    );



}


async function leerArchivojson(nombreArchivo) {
    try {
        const response = await fetch(nombreArchivo);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al leer el JSON:', error);
    }
}

async function HabilidadesInicio(habilidades) {
    let cadena = "";
    habilidades.forEach((element) => {
        cadena += `<span class="word">${element.titulo}</span>`;
    });
    habilidadesInicio.innerHTML = cadena;

    animacionHabilidades();

}
function animacionHabilidades() {
    let words = document.querySelectorAll(".word");

    const createLetterSpans = (wordElement) => {
        const letters = wordElement.textContent.split("");
        wordElement.textContent = "";
        letters.forEach((letter) => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            wordElement.append(span);
        });
    };

    words.forEach(createLetterSpans);

    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    const changeText = () => {
        const currentWord = words[currentWordIndex];
        const nextWord = words[(currentWordIndex + 1) > maxWordIndex ? 0 : currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = letter.textContent === " " ? "letter out espacio" : "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";

        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = letter.textContent === " " ? "letter behind espacio" : "letter behind";
            setTimeout(() => {
                letter.className = letter.textContent === " " ? "letter in espacio" : "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = (currentWordIndex + 1) > maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);

}




async function crearMenu(menu) {
    let cadena = "";
    txtcrearMenu.innerHTML = "";
    let opcionesAdiconales = `<li>
          <div class="toggle-container">
            <div id="toggle-switch" class="toggle-switch"> 
              <div class="toggle-icons">
                <span><i class="bx bxs-sun bx-spin"></i></span>
                <span><i class="bx bxs-moon bx-tada"></i></span>
                
              </div>
              <div class="toggle-handle"></div>
            </div> 
          </div>
        </li>
         `;
    menu.forEach((element) => {
        cadena += element.nombre;
    });
    cadena += opcionesAdiconales;

    txtcrearMenu.insertAdjacentHTML('afterbegin', cadena);
    temaPagina();
    ActivarOpcionMenu();

}

async function mostrarDescripcion(modulouno) {
    txtDescripcion.innerHTML = modulouno[0].descripcion;
    btncv.href = modulouno[0].linkcv;
    btncv.innerHTML = modulouno[0].tituloBoton;
}
const body = document.body;

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.setAttribute("data-theme", "dark");
}

function temaPagina() {
    const modeToggle = body.querySelector("#toggle-switch");


    modeToggle.addEventListener("click", (e) => {
        modeToggle.classList.toggle("active");

        if (body.getAttribute("data-theme") === "dark") {
            body.removeAttribute("data-theme");
            localStorage.setItem("mode", "light");
        } else {
            body.setAttribute("data-theme", "dark");
            localStorage.setItem("mode", "dark");
        }
    });

}

function ActivarOpcionMenu() {
    const menuli = document.querySelectorAll('header ul li a');
    let section = document.querySelectorAll(".sec");



    function activeMenu() {
        let len = section.length;
        while (--len && window.scrollY + 96 < section[len].offsetTop) {
            menuli.forEach(sec => {
                sec.classList.remove("active");


            });

        }
        menuli[len].classList.add("active")
    }

    window.addEventListener("scroll", activeMenu);
}

async function SaludoUsuario(saludar, nombre) {
    let hora = obtenerHoraActual();
    let cadena = "";
    if (hora < 12) {
        cadena = saludar.saludo[0].nombre;
    }
    if (hora >= 12 && hora <= 18) {
        cadena = saludar.saludo[1].nombre;
    }

    if (hora > 18 && hora < 24) {
        cadena = saludar.saludo[2].nombre;
    }

    txth1.innerHTML = `<span id="txtSaludo">${cadena}</span> ${nombre}`;
}

async function sobreMi(titulo, subtitulo, parrafo1, parrafo2) {
    tituloSobre.innerHTML = titulo;
    subtituloSobre.innerHTML = subtitulo;
    descripcionSobre.innerHTML = `${parrafo1} <br><br> ${parrafo2}`;
}


/// SECCION 3  ---CERTIFICACIONES

async function ModuloCertificaciones(modulo) {
    titulocert.innerHTML = modulo[0].titulo;
    subtitulocert.innerHTML = modulo[0].subtitulo;
    subtitulocursos.innerHTML = modulo[0].cursostitulo;
    pintadoCertificaciones(modulo[0].certificaciones);
    pintandoCursos(modulo[0].cursos);
    cambiarComponentesboton();

    swiperCargando();
}



function pintadoCertificaciones(certificaciones) {
    let cadena = "";

    certificaciones.forEach(element => {
        cadena += `
        
        <div class="swiper-slide"> 
        <div class="animacioncard box">
    
     <div class="icons">
        <span>${element.fecha}</span>
      
     </div>
     <div class="image">
       <img src="${element.ruta}" alt="" />
     </div>
     <div class="content">
       <div class="">
         <h4>${element.nombre}</h4>
       </div>
       <div class="btn-box btncard service-btn">
       <button id="btnTarget1" value="${element.id}" class="btncuatro">Ver</button>
       </div>
     </div>
     </div>
     
   </div>`
    });
    document.querySelector("#Pintando1").innerHTML = cadena;
    AmpliarImagen(certificaciones, "btnTarget1");
}

function pintandoCursos(cursos) {
    let cadena = "";

    cursos.forEach(element => {
        cadena += `<div class="swiper-slide  ">
        <div class="animacioncard box">
     <div class="icons">
        <span>${element.fecha}</span>
      
     </div>
     <div class="image">
       <img src="${element.ruta}" alt="" />
     </div>
     <div class="content">
       <div class="">
         <h4>${element.nombre}</h4>
       </div>
       <div class="btn-box btncard service-btn">
       <button id="btnTarget2" value="${element.id}" class="btncuatro">Ver</button>
       </div>
     </div>
     </div>
     
   </div>`
    });
    document.querySelector("#Pintando2").innerHTML = cadena;
    AmpliarImagen(cursos, "btnTarget2");
}
function swiperCargando() {
    let swiper = new Swiper(".card-slider", {
        spaceBetween: 36,
        loop: true,
        pagination: true,
        centeredSlides: false,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        keyboard: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,  
            },
            768: {
                slidesPerView: 2,  
            },
            1024: {
                slidesPerView: 3,  
            },
            1200: {
                slidesPerView: 3,  
            },
        },

    });
}


let modalImage = document.querySelector("#dialogImage");
const boximage = document.querySelector("#boximage");

function AmpliarImagen(modulo, boton) {
    let btnTarget = document.querySelectorAll("#" + boton);
    for (btn of btnTarget) {
        btn.addEventListener("click", function (e) {
            let valor = this.value;
            const buscar = modulo.find((ima) => ima.id == valor);
            let pintarTarjeta = "";

            pintarTarjeta = `<div class="header">
              <h5>${buscar.nombre}</h5>
            </div>
            <div class="bodyTarget">
              <img src="${buscar.ruta}" alt="" />
            </div>`;
            boximage.innerHTML = pintarTarjeta;
            modalImage.showModal();
        });
    }
}

function cerrarModal() {
    modalImage.close();
}

document.querySelector(".cerrardialog").addEventListener("click", (e) => {
    cerrarModal();
})


// MODULO HABILIDADES --- INGRESANDO 
const tituloskill = document.querySelector("#tituloskill");
const subtituloskill = document.querySelector("#subtituloskill");
const tituloParteuno = document.querySelector("#tituloParteuno");
const parteunohabilidades = document.querySelector("#parteunohabilidades");


async function ModuloHabilidades(modulo) {

    tituloskill.innerHTML = modulo[0].titulo;
    subtituloskill.innerHTML = modulo[0].subtitulo;
    mostrarHabilidades(modulo[0].habilidades);
    // mostrarCompetencias(modulo[0].Competencias);

}

function mostrarHabilidades(hab) {
    let cadena = "";
    hab.forEach(element => {
        cadena += ` <div class="skill-bar">
              <div class="info">
                <p>${element.nombre}</p>
                
              </div>
              <div class="descripcion">
                <p>${element.porcentaje}</p>
              </div>
            </div>`;
    });
    parteunohabilidades.innerHTML = cadena;
}

function mostrarCompetencias(comp) {

    let cadena = "";
    comp.forEach(element => {
        cadena += `<div class="box">
        <div class="circle" data-dots="50" data-percent="${element.porcentaje}"></div>
              <div class="text">
                <big>${element.porcentaje}%</big>
                <small>${element.nombre}</small>
              </div>
              
            </div>`;
    });


    animacionCompetencia();

}


function animacionCompetencia() {
    const circles = document.querySelectorAll(".circle");

    circles.forEach(elem => {
        let dots = elem.getAttribute("data-dots");
        let marked = elem.getAttribute("data-percent");
        let percent = Math.floor(dots * marked / 100);
        let points = "";
        let rotate = 360 / dots;
        for (let i = 0; i < dots; i++) {

            points += `<div class="points" style="--i: ${i}; --rot:${rotate}deg"></div>`;
        }

        elem.innerHTML = points;
        const pointsMarkerd = elem.querySelectorAll(".points");
        for (let i = 0; i < percent; i++) {
            pointsMarkerd[i].classList.add("marked");
        }
    })
}


// INICIANDO PINTADO DATA PROYECTOS GIT

const titulojobs = document.querySelector("#titulojobs");
const subtitulojobs = document.querySelector("#subtitulojobs");
const verJobs = document.querySelector("#verJobs");


async function ModuloProyectos(modulo) {
    titulojobs.innerHTML = modulo[0].titulo;
    subtitulojobs.innerHTML = modulo[0].subtitulo;
    pintandoProyectos(modulo[0].Proyectos);
    botonProyectos();
}

function pintandoProyectos(data) {
    let cadena = "";
    data.forEach(element => {
        cadena += `
        <div class="second port-box web">
            <img
              src="${element.pathImagen}"
              alt=""
              class="imagedos"
            />
            <div class="text_container"></div>
            <div class="logoimagen">
              <i class="bx bx-cloud-download bx-tada"></i>
            </div>
            <div class="main_text">
              <p>
                ${element.nombre}
              </p>
            </div>
            <div class="date">
              <p>${element.fecha}</p>
            </div>
            <a value="${element.id}" href="${element.link}" id="btnproyectos" target="_blank" class="card_btn">Detalles</a>
          </div>
            `;
    });

    verJobs.innerHTML = cadena;
}

function botonProyectos() {
    let btnproyectos = document.querySelectorAll("#btnproyectos");

    btnproyectos.forEach((element) => {
        element.innerHTML = idiomaglobal === "0" ? "Detalles" : "Detail";
    }
    );

}


// MODULO CONTACTO --- INGRESANDO
const titulocontacto = document.querySelector("#titulocontacto");
const subtitulocontacto = document.querySelector("#subtitulocontacto");
const nombrePersona = document.querySelector("#nombrePersona");
const correoPersona = document.querySelector("#correoPersona");
const mensajePersona = document.querySelector("#mensajePersona");

// LABELS
let labelNombre = document.querySelector("#nombrePersonalabel");
let labelCorreo = document.querySelector("#labelCorreo");
let labelMensaje = document.querySelector("#labelMensaje")
const btnEnviarcorreo = document.querySelector("#btnEnviarcorreo");


async function ModuloContacto(modulo) {
    titulocontacto.innerHTML = modulo[0].titulo;
    subtitulocontacto.innerHTML = modulo[0].subtitulo;
    labelNombre.textContent = modulo[0].tag1;
    labelCorreo.innerHTML = modulo[0].tag2;
    labelMensaje.textContent = modulo[0].tag3;
    nombrePersona.placeholder = modulo[0].tag1;
    correoPersona.placeholder = modulo[0].tag2;
    mensajePersona.placeholder = modulo[0].tag3;

    btnEnviarcorreo.innerHTML = idiomaglobal === "0" ? "Enviar" : "Send";
}


if (btnEnviarcorreo) {
    btnEnviarcorreo.addEventListener("click", (e) => {
        emailjs.init("Kwb-SAn9qrNsn5X9I"); // Reemplaza con tu user_id
        // enviarCorreo(nombrePersona, correoPersona, mensajePersona);
        let retorno1 = validateCamposVacios(nombrePersona, labelNombre, "Nombres")
        let retorno2 = validarGmail();
        let retorno3 = validateCamposVacios(mensajePersona, labelMensaje, "Mensaje");
        if (retorno1 && retorno2 && retorno3 == 1) {
            enviarCorreo(nombrePersona.value, correoPersona.value, mensajePersona.value);
        }

    });
}

function validarGmail() {
    const fieldValue = correoPersona.value;
    const regex = new RegExp("^(.*)@(gmail|googlemail|(.*.)google).com");
    let retorno = 0;

    if (fieldValue.trim().length === 0) {
        labelCorreo.innerHTML = "*Por favor llenar el campo";
        labelCorreo.style.color = "red";
        retorno = 0;

    } else if (!regex.test(fieldValue)) {
        labelCorreo.innerHTML = "*No cumple como un correo válido.";
        labelCorreo.style.color = "red";
        retorno = 0;

    } else {
        labelCorreo.style.color = "var(--text-color)";
        labelCorreo.innerText = "Correo";
        retorno = 1;
    }
    return retorno;
}

function validateCamposVacios(campo, label, nombre) {
    const valor = campo.value;
    let retorno = 0;

    if (valor.trim().length === 0) {
        label.innerHTML = "*Por favor llenar el campo";
        label.style.color = "red";
        retorno = 0;
    } else {
        label.style.color = "var(--text-color)";
        label.innerText = nombre;
        retorno = 1;
    }
    return retorno;

}





function enviarCorreo(nombre, email, mensaje) {
    const templateParams = {
        nombrePersona: nombre,
        correoPersona: email,
        mensajePersona: mensaje
    };

    // emailjs.send('service_r6cul01', 'template_7ipfi4q', templateParams)
    emailjs.send('service_7mf13wm', 'template_hqx5ril', templateParams)
        .then((response) => {
            console.log('Correo enviado con éxito!', response.status, response.text);
            alertaCorreo("Correo", "Correo enviado correctamente!!", "success");
            nombrePersona.value = "";
            correoPersona.value = "";
            mensajePersona.value = "";

        }, (error) => {
            console.error('Error al enviar correo:', error);
            alertaCorreo("Correo", "Error al enviar el mensaje", "error");
        });
}

// Ejemplo de uso

function alertaCorreo(titulo, texto, icono) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono
    });
}
