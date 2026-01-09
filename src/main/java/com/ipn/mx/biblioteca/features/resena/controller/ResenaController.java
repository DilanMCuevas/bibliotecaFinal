package com.ipn.mx.biblioteca.features.resena.controller;

import com.ipn.mx.biblioteca.core.domain.Resena;
import com.ipn.mx.biblioteca.features.resena.service.ResenaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resenas")
@RequiredArgsConstructor
@Tag(name = "Reseñas", description = "Operaciones para gestionar reseñas de libros")
public class ResenaController {

    private final ResenaService resenaService;

    @GetMapping
    @Operation(summary = "Listar todas las reseñas")
    public ResponseEntity<List<Resena>> getAll() {
        return ResponseEntity.ok(resenaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una reseña por id")
    public ResponseEntity<Resena> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(resenaService.findById(id));
    }

    @GetMapping("/por-libro/{libroId}")
    @Operation(summary = "Listar reseñas de un libro")
    public ResponseEntity<List<Resena>> getByLibro(@PathVariable Integer libroId) {
        return ResponseEntity.ok(resenaService.findByLibro(libroId));
    }

    @GetMapping("/por-usuario/{usuarioId}")
    @Operation(summary = "Listar reseñas hechas por un usuario")
    public ResponseEntity<List<Resena>> getByUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(resenaService.findByUsuario(usuarioId));
    }

    @PostMapping
    @Operation(summary = "Crear una nueva reseña")
    public ResponseEntity<Resena> create(@RequestBody Resena resena) {
        Resena creada = resenaService.create(resena);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una reseña existente")
    public ResponseEntity<Resena> update(@PathVariable Integer id,
                                         @RequestBody Resena resena) {
        Resena actualizada = resenaService.update(id, resena);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una reseña por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        resenaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
