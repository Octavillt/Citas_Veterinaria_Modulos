import { eliminarCita, cargarEdicion } from '../funciones.js';
import { contenedorCitas } from '../selectores.js';


// Definimos la clase 'UI', que manejará la interacción con la interfaz de usuario.
class UI {
     // Método para imprimir un mensaje de alerta en la interfaz de usuario.
     imprimirAlerta(mensaje, tipo) {
          // Crea un nuevo elemento 'div' para contener el mensaje.
          const divMensaje = document.createElement('div');
          // Agrega clases al div para estilizarlo.
          divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
          // Determina el tipo de alerta (éxito o error) y añade la clase correspondiente.
          if (tipo === 'error') {
               divMensaje.classList.add('alert-danger');
          } else {
               divMensaje.classList.add('alert-success');
          }
          // Asigna el mensaje de texto al contenido del div.
          divMensaje.textContent = mensaje;
          // Agrega el div al DOM, justo antes del elemento con la clase 'agregar-cita'.
          document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
          // Programa la eliminación del mensaje de alerta después de 3.5 segundos.
          setTimeout(() => {
               divMensaje.remove();
          }, 3500);
     }

     // Método para imprimir todas las citas en la interfaz de usuario.
     imprimirCitas({ citas }) {
          this.limpiarHTML(); // Primero, limpia cualquier cita que se esté mostrando.
          citas.forEach(cita => {
               // Por cada cita, crea una serie de elementos HTML para mostrar la información de la cita.
               const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

               const divCita = document.createElement('DIV');
               divCita.classList.add('cita', 'p-3');
               divCita.dataset.id = id;

               // Scripting de los Elementos de la Cita
               const mascotaParrafo = document.createElement('h2');
               mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
               mascotaParrafo.textContent = `${mascota}`;

               const propietarioParrafo = document.createElement('p');
               propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

               const telefonoParrafo = document.createElement('p');
               telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

               const fechaParrafo = document.createElement('p');
               fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

               const horaParrafo = document.createElement('p');
               horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

               const sintomasParrafo = document.createElement('p');
               sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;
               /*
               Se crean botones para eliminar y editar la cita.
               A cada botón se le asigna un controlador de eventos para manejar la acción correspondiente.
               */

               // Botón para Eliminar...
               const btnEliminar = document.createElement('button');
               btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
               btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
               btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

               // Añade un botón de editar...
               const btnEditar = document.createElement('button');
               btnEditar.onclick = () => cargarEdicion(cita);

               btnEditar.classList.add('btn', 'btn-info');
               btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

               // Todo se agrega a un contenedor 'div', que luego se agrega al contenedor de citas en la interfaz de usuario.

               // Agregar al HTML
               divCita.appendChild(mascotaParrafo);
               divCita.appendChild(propietarioParrafo);
               divCita.appendChild(telefonoParrafo);
               divCita.appendChild(fechaParrafo);
               divCita.appendChild(horaParrafo);
               divCita.appendChild(sintomasParrafo);
               divCita.appendChild(btnEliminar)
               divCita.appendChild(btnEditar)

               contenedorCitas.appendChild(divCita);
          });
     }

     // Método para eliminar todos los hijos del contenedor de citas, esencialmente limpiando la lista de citas mostrada.
     limpiarHTML() {
          while (contenedorCitas.firstChild) {
               contenedorCitas.removeChild(contenedorCitas.firstChild);
          }
     }
}

export default UI;