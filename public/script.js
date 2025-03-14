
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
            mostrarDatos(data); // Llamamos a la función para mostrar los datos
            
            console.log(data);
        })
        .catch(error => console.error("Hubo un problema con la petición", error));
});

// Componente CARD PAIS
function cardPais(pais) {
    const elemento = document.createElement("div");
    elemento.classList.add("card");
    elemento.innerHTML = `
        <div>
            <h3>${pais.cca3}</h3>
            
        </div>
            <p>${pais.name.common}</p>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
            <button class="btn" onclick="mostrarModal(${JSON.stringify(pais).replace(/"/g, "&quot;")})">Ver más</button>
        
    `;
    return elemento; // Retornamos el elemento en lugar de insertarlo directamente
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

function mostrarModal(pais) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <h2>${pais.name.common}</h2>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="150">
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No tiene"}</p>
        <p><strong>Región:</strong> ${pais.region}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
        <p><strong>Idiomas:</strong> ${pais.languages ? Object.values(pais.languages).join(", ") : "No especificado"}</p>
    `;
    modal.style.display = "flex";
}

// Cerrar el modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Evento para cargar más elementos
document.getElementById("cargarMas").addEventListener("click", mostrarDatos);