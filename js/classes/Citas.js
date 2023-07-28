// Definimos la clase 'Citas', que manejará la lista de citas.
class Citas {
    constructor() {
        this.citas = []; // Almacenará todas las citas.
    }

    // Método para agregar una cita a la lista de citas.
    agregarCita(cita) {
        this.citas = [...this.citas, cita]; // Añade la nueva cita al final de la lista de citas existente.
    }

    // Método para eliminar una cita de la lista por su ID.
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id); // Filtra todas las citas, manteniendo solo las que no coinciden con el ID proporcionado.
    }

    // Método para actualizar una cita existente con una versión nueva.
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita) // Reemplaza la cita con el mismo ID con la cita actualizada.
    }
}

export default Citas;

