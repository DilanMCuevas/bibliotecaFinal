package com.ipn.mx.biblioteca.features.reserva.controller;

import com.ipn.mx.biblioteca.core.domain.Reserva;
import com.ipn.mx.biblioteca.features.reserva.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
@Tag(name = "Reservas", description = "Operaciones para gestionar las reservas de libros")
public class ReservaController {

    private final ReservaService reservaService;

    @GetMapping
    @Operation(summary = "Listar todas las reservas")
    public ResponseEntity<List<Reserva>> getAll() {
        return ResponseEntity.ok(reservaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una reserva por id")
    public ResponseEntity<Reserva> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(reservaService.findById(id));
    }

    @GetMapping("/por-usuario/{usuarioId}")
    @Operation(summary = "Listar reservas de un usuario")
    public ResponseEntity<List<Reserva>> getByUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(reservaService.findByUsuario(usuarioId));
    }

    @GetMapping("/por-libro/{libroId}")
    @Operation(summary = "Listar reservas de un libro")
    public ResponseEntity<List<Reserva>> getByLibro(@PathVariable Integer libroId) {
        return ResponseEntity.ok(reservaService.findByLibro(libroId));
    }

    @PostMapping
    @Operation(summary = "Crear una nueva reserva")
    public ResponseEntity<Reserva> create(@RequestBody Reserva reserva) {
        Reserva creada = reservaService.create(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una reserva existente")
    public ResponseEntity<Reserva> update(@PathVariable Integer id,
                                          @RequestBody Reserva reserva) {
        Reserva actualizada = reservaService.update(id, reserva);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una reserva por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
