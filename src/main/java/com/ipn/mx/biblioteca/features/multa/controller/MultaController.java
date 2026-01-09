package com.ipn.mx.biblioteca.features.multa.controller;

import com.ipn.mx.biblioteca.core.domain.Multa;
import com.ipn.mx.biblioteca.features.multa.service.MultaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/multas")
@RequiredArgsConstructor
@Tag(name = "Multas", description = "Operaciones para gestionar multas de usuarios")
public class MultaController {

    private final MultaService multaService;

    @GetMapping
    @Operation(summary = "Listar todas las multas")
    public ResponseEntity<List<Multa>> getAll() {
        return ResponseEntity.ok(multaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una multa por id")
    public ResponseEntity<Multa> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(multaService.findById(id));
    }

    @GetMapping("/por-usuario/{usuarioId}")
    @Operation(summary = "Listar multas de un usuario")
    public ResponseEntity<List<Multa>> getByUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(multaService.findByUsuario(usuarioId));
    }

    @GetMapping("/por-prestamo/{prestamoId}")
    @Operation(summary = "Listar multas de un préstamo")
    public ResponseEntity<List<Multa>> getByPrestamo(@PathVariable Integer prestamoId) {
        return ResponseEntity.ok(multaService.findByPrestamo(prestamoId));
    }

    @GetMapping("/por-estado/{estado}")
    @Operation(summary = "Listar multas por estado (pendiente, pagada, etc.)")
    public ResponseEntity<List<Multa>> getByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(multaService.findByEstado(estado));
    }

    @PostMapping
    @Operation(summary = "Crear una nueva multa")
    public ResponseEntity<Multa> create(@RequestBody Multa multa) {
        Multa creada = multaService.create(multa);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una multa existente")
    public ResponseEntity<Multa> update(@PathVariable Integer id,
                                        @RequestBody Multa multa) {
        Multa actualizada = multaService.update(id, multa);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una multa por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        multaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/pagar")
    @Operation(summary = "Marcar una multa como pagada")
    public ResponseEntity<Multa> marcarComoPagada(@PathVariable Integer id) {
        Multa pagada = multaService.marcarComoPagada(id);
        return ResponseEntity.ok(pagada);
    }
}
