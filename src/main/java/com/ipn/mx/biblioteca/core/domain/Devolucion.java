package com.ipn.mx.biblioteca.core.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "devoluciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Devolucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "prestamo_id", nullable = false)
    private Integer prestamoId;

    @Column(name = "fecha_devolucion", nullable = false)
    private LocalDateTime fechaDevolucion;

    @Column(name = "condicion_retorno", nullable = false, length = 50)
    private String condicionRetorno;   // ok, dañado, etc.

    @Column(columnDefinition = "TEXT")
    private String observaciones;
}
