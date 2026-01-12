export interface Resena {
    id: number;
    usuarioId: number;
    libroId: number;
    rating: number; // 1-5, was calificacion
    comentario: string;
}
