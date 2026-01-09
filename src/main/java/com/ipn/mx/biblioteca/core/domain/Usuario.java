package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 120)
    private String nombre;

    @Column(nullable = false, length = 160, unique = true)
    private String email;

    @Column(nullable = false, length = 50)
    private String rol;      // ej: "miembro", "admin", "bibliotecario"

    @Column(nullable = false, length = 50)
    private String estado;   // ej: "activo", "bloqueado"
}
