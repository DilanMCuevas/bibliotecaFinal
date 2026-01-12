export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password?: string; // Opcional al listar, requerido al crear (lo manejaremos en el form)
    rol: string;
    estado: string;
}
