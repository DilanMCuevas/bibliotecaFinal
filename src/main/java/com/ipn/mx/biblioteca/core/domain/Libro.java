package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "libros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // por el SERIAL
    private Integer id;

    @Column(nullable = false, length = 220)
    private String titulo;

    @Column(length = 32, unique = true)
    private String isbn;

    @Column(length = 160)
    private String editorial;

    private Integer anio;

    @Column(length = 60)
    private String edicion;

    @Column(columnDefinition = "TEXT")
    private String sinopsis;
}
