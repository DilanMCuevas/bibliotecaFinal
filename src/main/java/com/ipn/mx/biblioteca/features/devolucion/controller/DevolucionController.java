package com.ipn.mx.biblioteca.features.devolucion.controller;

import com.ipn.mx.biblioteca.core.domain.Devolucion;
import com.ipn.mx.biblioteca.features.devolucion.service.DevolucionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devoluciones")
@RequiredArgsConstructor
@Tag(name = "Devoluciones", description = "Operaciones para registrar devoluciones de préstamos")
public class DevolucionController {

    private final DevolucionService devolucionService;

    @GetMapping
    @Operation(summary = "Listar todas las devoluciones")
    public ResponseEntity<List<Devolucion>> getAll() {
        return ResponseEntity.ok(devolucionService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una devolución por id")
    public ResponseEntity<Devolucion> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(devolucionService.findById(id));
    }

    @GetMapping("/por-prestamo/{prestamoId}")
    @Operation(summary = "Listar devoluciones de un préstamo")
    public ResponseEntity<List<Devolucion>> getByPrestamo(@PathVariable Integer prestamoId) {
        return ResponseEntity.ok(devolucionService.findByPrestamo(prestamoId));
    }

    @PostMapping
    @Operation(summary = "Registrar una nueva devolución")
    public ResponseEntity<Devolucion> create(@RequestBody Devolucion devolucion) {
        Devolucion creada = devolucionService.create(devolucion);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una devolución existente")
    public ResponseEntity<Devolucion> update(@PathVariable Integer id,
                                             @RequestBody Devolucion devolucion) {
        Devolucion actualizada = devolucionService.update(id, devolucion);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una devolución por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        devolucionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
