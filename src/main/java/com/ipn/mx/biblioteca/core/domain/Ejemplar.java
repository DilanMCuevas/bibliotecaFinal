package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ejemplares")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ejemplar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // FK a la tabla libros, lo manejamos como int simple
    @Column(name = "libro_id", nullable = false)
    private Integer libroId;

    @Column(nullable = false, length = 50)
    private String estado;     // disponible, prestado, reservado, etc.

    @Column(length = 100)
    private String ubicacion;  // Estante A1, B3, etc.
}
