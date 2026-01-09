package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "libro_categorias",
        uniqueConstraints = @UniqueConstraint(columnNames = {"libro_id", "categoria_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibroCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "libro_id", nullable = false)
    private Integer libroId;

    @Column(name = "categoria_id", nullable = false)
    private Integer categoriaId;
}
