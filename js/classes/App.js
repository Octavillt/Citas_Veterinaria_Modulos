import { datosCita, nuevaCita } from '../funciones.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from '../selectores.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        // Eventos
        // Inicializamos todos los eventos de escucha para el formulario y sus campos.
        eventListeners();
        function eventListeners() {
            /*
            Aquí se añaden manejadores de eventos 'input' a cada campo del formulario, de modo que cada vez que
            el usuario escribe en el campo, se almacena la entrada en la propiedad correspondiente del objeto 'citaObj'.
            */
            mascotaInput.addEventListener('input', datosCita);
            propietarioInput.addEventListener('input', datosCita);
            telefonoInput.addEventListener('input', datosCita);
            fechaInput.addEventListener('input', datosCita);
            horaInput.addEventListener('input', datosCita);
            sintomasInput.addEventListener('input', datosCita);

            formulario.addEventListener('submit', nuevaCita);
        }

    }
}

export default App;

