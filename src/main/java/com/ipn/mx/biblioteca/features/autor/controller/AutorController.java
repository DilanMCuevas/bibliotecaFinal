package com.ipn.mx.biblioteca.features.autor.controller;

import com.ipn.mx.biblioteca.core.domain.Autor;
import com.ipn.mx.biblioteca.features.autor.service.AutorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
@RequiredArgsConstructor
@Tag(name = "Autores", description = "Operaciones para gestionar los autores de la biblioteca")
public class AutorController {

    private final AutorService autorService;

    @GetMapping
    @Operation(summary = "Listar todos los autores")
    public ResponseEntity<List<Autor>> getAll() {
        return ResponseEntity.ok(autorService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un autor por id")
    public ResponseEntity<Autor> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(autorService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo autor")
    public ResponseEntity<Autor> create(@RequestBody Autor autor) {
        Autor creado = autorService.create(autor);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un autor existente")
    public ResponseEntity<Autor> update(@PathVariable Integer id,
                                        @RequestBody Autor autor) {
        Autor actualizado = autorService.update(id, autor);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un autor por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        autorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
