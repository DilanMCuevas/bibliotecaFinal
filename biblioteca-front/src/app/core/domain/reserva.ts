export interface Reserva {
    id: number;
    usuarioId: number;
    libroId: number;
    fechaReserva: Date;
    estado: string; // PENDIENTE, COMPLETADA, CANCELADA
}
