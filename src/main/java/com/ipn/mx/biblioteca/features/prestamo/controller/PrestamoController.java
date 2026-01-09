package com.ipn.mx.biblioteca.features.prestamo.controller;

import com.ipn.mx.biblioteca.core.domain.Prestamo;
import com.ipn.mx.biblioteca.features.prestamo.service.PrestamoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
@RequiredArgsConstructor
@Tag(name = "Préstamos", description = "Operaciones para gestionar préstamos de ejemplares")
public class PrestamoController {

    private final PrestamoService prestamoService;

    @GetMapping
    @Operation(summary = "Listar todos los préstamos")
    public ResponseEntity<List<Prestamo>> getAll() {
        return ResponseEntity.ok(prestamoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un préstamo por id")
    public ResponseEntity<Prestamo> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(prestamoService.findById(id));
    }

    @GetMapping("/por-usuario/{usuarioId}")
    @Operation(summary = "Listar préstamos de un usuario")
    public ResponseEntity<List<Prestamo>> getByUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(prestamoService.findByUsuario(usuarioId));
    }

    @GetMapping("/por-ejemplar/{ejemplarId}")
    @Operation(summary = "Listar préstamos de un ejemplar")
    public ResponseEntity<List<Prestamo>> getByEjemplar(@PathVariable Integer ejemplarId) {
        return ResponseEntity.ok(prestamoService.findByEjemplar(ejemplarId));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo préstamo")
    public ResponseEntity<Prestamo> create(@RequestBody Prestamo prestamo) {
        Prestamo creado = prestamoService.create(prestamo);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un préstamo existente")
    public ResponseEntity<Prestamo> update(@PathVariable Integer id,
                                           @RequestBody Prestamo prestamo) {
        Prestamo actualizado = prestamoService.update(id, prestamo);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un préstamo por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        prestamoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
