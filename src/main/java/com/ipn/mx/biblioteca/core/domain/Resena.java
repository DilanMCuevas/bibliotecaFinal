package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resenas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "usuario_id", nullable = false)
    private Integer usuarioId;

    @Column(name = "libro_id", nullable = false)
    private Integer libroId;

    @Column(nullable = false)
    private Integer rating;   // 1–5

    @Column(columnDefinition = "TEXT")
    private String comentario;
}
