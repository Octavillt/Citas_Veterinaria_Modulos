import Citas from './classes/Citas.js'
import UI from './classes/UI.js'
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

// Instanciamos nuestras clases para su uso.
const ui = new UI();
const administrarCitas = new Citas();

// Esto es un objeto que almacenará temporalmente los datos de la cita a medida que el usuario los introduce.
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

let editando; // Esta variable de control se utilizará para comprobar si el usuario está editando una cita existente.


// Función que agrega datos al objeto de cita
export function datosCita(e) {
    /*
    El evento "e" es el objeto del evento que contiene información
    sobre el evento que fue disparado, en este caso, un evento "input"
    "e.target" se refiere al elemento del DOM que disparó el evento, es decir,
    el campo de input que está siendo llenado en el formulario
    "e.target.name" nos da el nombre del elemento que disparó el evento
    es decir, el nombre del campo del input, este nombre coincide con la
    clave correspondiente en el objeto "citaObj"
    "e.target.value" es el valor actual del campo de input
    así que aquí estamos estableciendo el valor de la clave correspondiente
    en el objeto "citaObj" al valor actual del campo de input
    */
    citaObj[e.target.name] = e.target.value;
    /*
    De esta manera, mientras el usuario llena los campos de input en el formulario,
    los valores se están guardando en tiempo real en el objeto "citaObj"
    */
}

export function nuevaCita(e) {
    // Aquí se detiene la recarga de la página debido a la presentación del formulario, se extraen los datos de la cita del objeto 'citaObj',
    e.preventDefault();

    // Extraer la Información del Objeto de Cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Se validan los campos del formulario para asegurar que no estén vacíos.
    if (mascota === '' || propietario === '' ||
        fecha === '' || hora === '' || sintomas === '') {
        // console.log('Campos Obligatorios');
        ui.imprimirAlerta('Todos los Campos son Obligatorios', 'error');
        return;
    }
    /*
    Luego, dependiendo de si el usuario está editando una cita existente o creando una nueva, 
    se llama a la función correspondiente para editar o agregar la cita y se muestra un mensaje de éxito.
    */
    if (editando) {
        // Pasar el Objeto de Cita a Edición
        administrarCitas.editarCita({ ...citaObj });

        ui.imprimirAlerta('Editado Correctamente...!');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar Modo Edición
        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();

        // Añade la nueva cita
        administrarCitas.agregarCita({ ...citaObj });

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se Agregó Correctamente...!')
    }

    // Generar un ID Unico
    citaObj.id = Date.now();

    // Creando una Nueva Cita
    // console.log(citaObj);
    // administrarCitas.agregarCita({ ...citaObj });

    // Finalmente, se reinicia el objeto de cita y el formulario, y se imprime la lista actualizada de citas.

    // Reinicia el Objeto para la Validación
    reiniciarObjeto();

    // Reinicia el Formulario
    formulario.reset();

    // Mostrar el HTML de las Citas
    ui.imprimirCitas(administrarCitas);
}


// Este método simplemente reinicia el objeto de cita a sus valores predeterminados.
export function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

// Este método se llama cuando se hace clic en el botón 'eliminar' de una cita. Elimina la cita y muestra un mensaje de éxito.
export function eliminarCita(id) {
    // Eliminar Cita
    administrarCitas.eliminarCita(id);

    // Mostrar Mensaje
    ui.imprimirAlerta('Cita Eliminada Correctamente...');

    // Refresacar las Citas
    ui.imprimirCitas(administrarCitas);
}


/* 
Este método se llama cuando se hace clic en el botón 'editar' de una cita. 
Rellena el formulario con los datos de la cita y cambia el formulario al modo de edición.
*/
export function cargarEdicion(cita) {
    console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Cambiar el Texto del Botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}
