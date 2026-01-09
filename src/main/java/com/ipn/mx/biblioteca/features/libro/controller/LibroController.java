package com.ipn.mx.biblioteca.features.libro.controller;

import com.ipn.mx.biblioteca.core.domain.Autor;
import com.ipn.mx.biblioteca.core.domain.Categoria;
import com.ipn.mx.biblioteca.core.domain.Libro;
import com.ipn.mx.biblioteca.features.libro.service.LibroService;
import com.ipn.mx.biblioteca.features.libroautor.service.LibroAutorService;
import com.ipn.mx.biblioteca.features.librocategoria.service.LibroCategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@RequiredArgsConstructor
@Tag(name = "Libros", description = "Operaciones para gestionar los libros de la biblioteca")
public class LibroController {

    private final LibroService libroService;
    private final LibroAutorService libroAutorService;
    private final LibroCategoriaService libroCategoriaService;

    // ===================== CRUD BÁSICO DE LIBROS =====================

    @GetMapping
    @Operation(summary = "Listar todos los libros")
    public ResponseEntity<List<Libro>> getAll() {
        return ResponseEntity.ok(libroService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un libro por id")
    public ResponseEntity<Libro> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(libroService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo libro")
    public ResponseEntity<Libro> create(@RequestBody Libro libro) {
        Libro creado = libroService.create(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un libro existente")
    public ResponseEntity<Libro> update(@PathVariable Integer id,
                                        @RequestBody Libro libro) {
        Libro actualizado = libroService.update(id, libro);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un libro por id")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        libroService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ===================== RELACIÓN LIBRO - AUTORES =====================

    @GetMapping("/{id}/autores")
    @Operation(summary = "Listar autores asociados a un libro")
    public ResponseEntity<List<Autor>> getAutoresDeLibro(@PathVariable Integer id) {
        return ResponseEntity.ok(libroAutorService.obtenerAutoresDeLibro(id));
    }

    @PostMapping("/{id}/autores/{autorId}")
    @Operation(summary = "Asociar un autor a un libro")
    public ResponseEntity<Void> agregarAutorALibro(@PathVariable Integer id,
                                                   @PathVariable Integer autorId) {
        libroAutorService.agregarAutorALibro(id, autorId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}/autores/{autorId}")
    @Operation(summary = "Eliminar la asociación de un autor con un libro")
    public ResponseEntity<Void> eliminarAutorDeLibro(@PathVariable Integer id,
                                                     @PathVariable Integer autorId) {
        libroAutorService.eliminarAutorDeLibro(id, autorId);
        return ResponseEntity.noContent().build();
    }

    // ===================== RELACIÓN LIBRO - CATEGORÍAS =====================

    @GetMapping("/{id}/categorias")
    @Operation(summary = "Listar categorías asociadas a un libro")
    public ResponseEntity<List<Categoria>> getCategoriasDeLibro(@PathVariable Integer id) {
        return ResponseEntity.ok(libroCategoriaService.obtenerCategoriasDeLibro(id));
    }

    @PostMapping("/{id}/categorias/{categoriaId}")
    @Operation(summary = "Asociar una categoría a un libro")
    public ResponseEntity<Void> agregarCategoriaALibro(@PathVariable Integer id,
                                                       @PathVariable Integer categoriaId) {
        libroCategoriaService.agregarCategoriaALibro(id, categoriaId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}/categorias/{categoriaId}")
    @Operation(summary = "Eliminar la asociación de una categoría con un libro")
    public ResponseEntity<Void> eliminarCategoriaDeLibro(@PathVariable Integer id,
                                                         @PathVariable Integer categoriaId) {
        libroCategoriaService.eliminarCategoriaDeLibro(id, categoriaId);
        return ResponseEntity.noContent().build();
    }
}
