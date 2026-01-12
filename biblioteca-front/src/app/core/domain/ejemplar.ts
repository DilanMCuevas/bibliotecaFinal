export interface Ejemplar {
    id: number;
    libroId: number;
    estado: string;    // disponible, prestado, reservado
    ubicacion: string;
}
