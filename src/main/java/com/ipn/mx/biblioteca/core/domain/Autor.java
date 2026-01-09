package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "autores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // por el SERIAL de Postgres
    private Integer id;

    @Column(nullable = false, length = 160)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String bio;
}
