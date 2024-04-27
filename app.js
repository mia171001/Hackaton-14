const btnBuscar = document.getElementById('btnBuscar');
const userInfo = document.getElementById('userInfo');
const loader = document.getElementById('loader');
const userError = document.getElementById('userError');
const txtCiudad = document.getElementById('txtCiudad');
btnBuscar.addEventListener('click', search);

async function search() {
    clear();
    loader.classList.remove('hidden');
    try {
        const request = await fetch(`https://weather-api-t17v.onrender.com/weather/${txtCiudad.value}`);
        const data = await request.json();
        loader.classList.add('hidden');
        printHTML(data);
    } catch (error) {
        loader.classList.add('hidden');
        printError(error);
    }
}

function printHTML(data) {
    clear();
    userInfo.style.display = 'block';
    const userElement = document.createElement('div');
    const fechaActual = new Date();
    const dia = fechaActual.toLocaleDateString('es-ES', { weekday: 'long' });
    const diaM = dia.charAt(0).toUpperCase() + dia.slice(1);
    userElement.innerHTML = `
    📅Dia de la semana:
    <br/>
     ${diaM} 
    <br/>
    <br/>
    🌤Temperatura: 
    <br/>
    ${data.temperature}  
    <br/>
    <br/>
    🌆Ciudad:
    <br/>
    ${txtCiudad.value}
    <br/>
    <br/>
    🌫Viento:
    <br/>
    ${data.wind}`;
    userInfo.appendChild(userElement);

}
function printError() {
    clear();
    userError.style.display = 'block';
    const error2 = document.createElement('p');
    error2.textContent = 'Error al cargar datos!!';
    userError.appendChild(error2);
}

function clear() {
    userInfo.innerHTML = '';
    userError.innerHTML = '';
    userError.style.display = 'none';
}
