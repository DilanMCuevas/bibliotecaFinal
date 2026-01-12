export interface Multa {
    id: number;
    prestamoId: number;
    usuarioId: number;
    monto: number;
    motivo: string;
    estado: string; // PENDIENTE, PAGADA
    fechaGeneracion: Date;
    fechaPago?: Date;
}
