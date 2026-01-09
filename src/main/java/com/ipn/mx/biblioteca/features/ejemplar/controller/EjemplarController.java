package com.ipn.mx.biblioteca.features.ejemplar.controller;

import com.ipn.mx.biblioteca.core.domain.Ejemplar;
import com.ipn.mx.biblioteca.features.ejemplar.service.EjemplarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ejemplares")
@RequiredArgsConstructor
@Tag(name = "Ejemplares", description = "Operaciones para gestionar ejemplares físicos de libros")
public class EjemplarController {

    private final EjemplarService ejemplarService;

    @GetMapping
    @Operation(summary = "Listar todos los ejemplares")
    public ResponseEntity<List<Ejemplar>> getAll() {
        return ResponseEntity.ok(ejemplarService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un ejemplar por id")
    public ResponseEntity<Ejemplar> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ejemplarService.findById(id));
    }

    @GetMapping("/por-libro/{libroId}")
    @Operation(summary = "Listar todos los ejemplares de un libro")
    public ResponseEntity<List<Ejemplar>> getByLibro(@PathVariable Integer libroId) {
        return ResponseEntity.ok(ejemplarService.findByLibro(libroId));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo ejemplar")
    public ResponseEntity<Ejemplar> create(@RequestBody Ejemplar ejemplar) {
        Ejemplar creado = ejemplarService.create(ejemplar);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un ejemplar existente")
    public ResponseEntity<Ejemplar> update(@PathVariable Integer id,
                                           @RequestBody Ejemplar ejemplar) {
        Ejemplar actualizado = ejemplarService.update(id, ejemplar);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un ejemplar por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        ejemplarService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
