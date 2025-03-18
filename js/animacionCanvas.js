// Obtener el elemento partiqleCanvas
var partiqleCanvas = document.getElementById("systemsCanvas");
var ctx = partiqleCanvas.getContext("2d");

// Establecer el tamaño del partiqleCanvas
partiqleCanvas.width = window.innerWidth;
partiqleCanvas.height = window.innerHeight;

// Definir las propiedades de la animación
let particleCount = 0;
let particleSize = 2;
let particleSpeed = 2;
let particleColor = colorChange;

if (window.innerWidth < 600) {
    particleCount = 18;
} else {
    particleCount = 50;
}


// Crear un array para almacenar las partículas
var particles = [];

// Función para generar una partícula aleatoria
function generateParticle() {
    var particle = {
        x: Math.random() * partiqleCanvas.width,
        y: Math.random() * partiqleCanvas.height,
        angle: Math.random() * 2 * Math.PI,
        speed: particleSpeed * (Math.random() * 0.5 + 0.2),
    };
    return particle;
}

// Función para dibujar las partículas
function drawParticles() {
    ctx.clearRect(0, 0, partiqleCanvas.width, partiqleCanvas.height);

    // Dibujar las partículas y las conexiones
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        // Dibujar la partícula
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, 2 * Math.PI);
        ctx.fill();

        // Dibujar las conexiones
        for (var j = i + 1; j < particles.length; j++) {
            var otherParticle = particles[j];
            var distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            colorChange2 = getDynamicColor(colorChange);
            if (distance < 200) {
                // ctx.strokeStyle =
                //     "rgba(0, 255, 255, " + (1 - distance / 200) + ")";
                const alpha = 1 - distance / 200;
                ctx.strokeStyle = getDynamicColor(colorChange, alpha);
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();

            }
        }

        // Actualizar la posición de la partícula
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Si la partícula sale de la pantalla, regenerarla
        if (
            particle.x < -particleSize ||
            particle.x > partiqleCanvas.width + particleSize ||
            particle.y < -particleSize ||
            particle.y > partiqleCanvas.height + particleSize
        ) {
            particles[i] = generateParticle();
        }
    }

    requestAnimationFrame(drawParticles);
}

function getDynamicColor(baseColor, alpha) {
    // Convierte el color hexadecimal a RGB
    const [r, g, b] = hexToRgb(baseColor);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hex) {
    // Elimina el símbolo '#' si está presente
    hex = hex.replace(/^#/, '');
    // Convierte el hex a RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

// Generar las partículas iniciales
for (var i = 0; i < particleCount; i++) {
    particles.push(generateParticle());
}


// Iniciar la animación
drawParticles();
hackerBinari();


function hackerBinari() {
    initMatrix('matrix');

}

function initMatrix(containerId, options = {}) {
    const {
        columnWidth = 46,
        animationSpeed = 500,
        changeCharProbability = 0.1,
        minLength = 15,
        maxLength = 30,
        minSpeed = 0.2,
        maxSpeed = 0.5
    } = options;

    const container = document.getElementById(containerId);
    let columns = [];

    // Función para crear o actualizar las columnas
    function createOrUpdateColumns() {
        const width = container.offsetWidth;
        const newColumnsCount = Math.floor(width / columnWidth);

        // Si el número de columnas no ha cambiado, no hacemos nada
        if (newColumnsCount === columns.length) return;

        // Limpiamos el contenedor
        container.innerHTML = '';

        // Creamos las nuevas columnas
        columns = [];
        for (let i = 0; i < newColumnsCount; i++) {
            const column = document.createElement('div');
            column.className = 'matrix';
            column.style.width = columnWidth + 'px';
            column.style.left = (i * columnWidth) + 'px';
            column.style.position = 'absolute';
            container.appendChild(column);

            let delay = Math.random() * 2;
            animateColumn(column, delay, {
                animationSpeed,
                changeCharProbability,
                minLength,
                maxLength,
                minSpeed,
                maxSpeed
            });

            columns.push(column);
        }
    }

    // Crear columnas iniciales
    createOrUpdateColumns();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', createOrUpdateColumns);
}

function animateColumn(column, delay, options) {
    const {
        animationSpeed,
        changeCharProbability,
        minLength,
        maxLength,
        minSpeed,
        maxSpeed
    } = options;

    let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let chars = [];
    let speeds = [];

    for (let i = 0; i < length; i++) {
        chars.push(Math.random() < 0.5 ? '0' : '1');
        speeds.push(Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }

    setTimeout(() => {
        setInterval(() => {
            let html = '';
            for (let i = 0; i < length; i++) {
                const char = chars[i];
                const opacity = Math.max(0, 1 - (i / length));
                html = `<span style="opacity: ${opacity}; color: ${colorChange};">${char}</span><br>` + html;

                if (Math.random() < changeCharProbability) {
                    chars[i] = Math.random() < 0.5 ? '0' : '1';
                }
            }
            column.innerHTML = html;
        }, animationSpeed);
    }, delay * 1000);
}