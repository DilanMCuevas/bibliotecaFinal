export interface Prestamo {
    id?: number;
    ejemplarId: number;
    usuarioId: number;
    fechaPrestamo: string;    // Usaremos ISO string (LocalDateTime)
    fechaVencimiento: string; // Usaremos ISO string (LocalDateTime)
    estado: string;           // activo, devuelto, vencido
    renovaciones: number;
}
