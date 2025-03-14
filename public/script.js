
let dataGlobal = []; // Almacena los datos obtenidos de la API
let contador = 0; // Para rastrear cuantos elementos hemos mostrado
const cantidadPorPagina = 12; // Cantidad de paises a mostrar por clic


document.addEventListener("DOMContentLoaded", () => {
    const endpoint = "https://restcountries.com/v3.1/all/";

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            return response.json(); // Convertimos la respuesta en JSON
        })
        .then(data => {
            dataGlobal = data;
            mostrarDatos(data); // Llamamos a la funcion para mostrar los datos
            console.log(data);
        })
        .catch(error => console.error("Hubo un problema con la petición", error));
});

// Componente CARD PAIS
function cardPais(pais) {
    // Acceder a los datos del país
    const cca3 = pais.cca3 || "Nombre desconocido";
    const nombre = pais.name.common || "Nombre desconocido";
    const capital = pais.capital ? pais.capital[0] : "Sin capital";
    //const languages = pais.languages ? Object.values(pais.languages).join(", ") : "No especificado";
    const languages = pais.languages 
    ? Object.values(pais.languages).length > 2 
        ? Object.values(pais.languages).slice(0, 2).join(", ") + "..." 
        : Object.values(pais.languages).join(", ") 
    : "No especificado";
    const currenciesName = pais.currencies ? Object.values(pais.currencies)[0].name || "No disponible" : "No disponible";
    const currenciesSymbol = pais.currencies ? Object.values(pais.currencies)[0].symbol || "No disponible" : "No disponible";

    // Crear el div del card
    const elemento = document.createElement("div");
    elemento.classList.add("card");

    // Agregar el contenido del card
    elemento.innerHTML = `
        <div class="head">
            <img src="${pais.flags.svg}" alt="Bandera de ${nombre}">
            <h3>${nombre}</h3>
            <span class="label">${cca3}</span>
        </div>
        <div class="body">
            <div>
                <span>
                    <i class="capital"></i>
                    Capital
                </span>
                <p>${capital}</p>
            </div>
            <div>
                <span>
                    <i class="lenguaje"></i>
                    Lenguaje
                </span>
                <p>${languages}</p>
            </div>
        </div>
        <div class="footer">
            <div>
                <span>
                    <i class="moneda"></i>
                    Moneda
                </span>
                <div class="flex">${currenciesName} <div class="label"> ${currenciesSymbol}</div></div>
            </div>
            <button class="btn1" onclick="mostrarModal(${JSON.stringify(pais).replace(/"/g, "&quot;")})">
                <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9V7L1 7L1 9Z" fill="white"/>
                </svg>
            </button>
        </div>  
    `;

    return elemento; // Retornamos el card
}

function mostrarDatos() {
    const contenedor = document.getElementById("resultado");
    const datosAMostrar = dataGlobal.slice(contador, contador + cantidadPorPagina);

    datosAMostrar.forEach(item => {
        const card = cardPais(item); // Usamos el componente cardPais
        contenedor.appendChild(card);
    });

    contador += cantidadPorPagina;

    if (contador >= dataGlobal.length) {
        document.getElementById("cargarMas").style.display = "none";
    }
}

//Datos del modal
function mostrarModal(pais) {

    // Acceder a los datos del pais
    const cca3 = pais.cca3 || "Nombre desconocido";
    const nombre = pais.name.common || "Nombre desconocido";
    const capital = pais.capital ? pais.capital[0] : "Sin capital";
    const languages = pais.languages ? Object.values(pais.languages).join(", ") : "No especificado";
    const currenciesName = pais.currencies ? Object.values(pais.currencies)[0].name || "No disponible" : "No disponible";
    const currenciesSymbol = pais.currencies ? Object.values(pais.currencies)[0].symbol || "No disponible" : "No disponible";

    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
    <div class="card-modal">
        <div class="head">
            <img src="${pais.flags.svg}" alt="Bandera de ${nombre}">
            <h3>${nombre}</h3>
            <span class="label">${cca3}</span>
        </div>
        <hr>
        <p><strong>Capital:</strong> ${capital}</p>
        <hr>
        <p><strong>Idiomas:</strong> ${languages}</p>
        <hr>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
        <hr>
        <p><strong>Región:</strong> ${pais.region}</p>
        <hr>
        <p><strong>Moneda:</strong> <div class="flex">${currenciesName} <div class="label">${currenciesSymbol}</div></div></p>
    </div>
    `;
    modal.classList.add("active");
}

// Cerrar el modal
function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("active"); 
}

// Evento para cargar mas paises
document.getElementById("cargarMas").addEventListener("click", mostrarDatos);