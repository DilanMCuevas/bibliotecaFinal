package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "libro_autores",
        uniqueConstraints = @UniqueConstraint(columnNames = {"libro_id", "autor_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibroAutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "libro_id", nullable = false)
    private Integer libroId;

    @Column(name = "autor_id", nullable = false)
    private Integer autorId;
}
