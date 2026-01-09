package com.ipn.mx.biblioteca.features.libro.service;

import com.ipn.mx.biblioteca.core.domain.Libro;
import com.ipn.mx.biblioteca.features.libro.repository.LibroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LibroService {

    private final LibroRepository libroRepository;

    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    public Libro findById(Integer id) {
        return libroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Libro con id " + id + " no encontrado"
                ));
    }

    public Libro create(Libro libro) {
        // por si las flys
        libro.setId(null);
        return libroRepository.save(libro);
    }

    public Libro update(Integer id, Libro datos) {
        Libro existente = findById(id); // reutilizamos y ya lanza 404 si no existe

        existente.setTitulo(datos.getTitulo());
        existente.setIsbn(datos.getIsbn());
        existente.setEditorial(datos.getEditorial());
        existente.setAnio(datos.getAnio());
        existente.setEdicion(datos.getEdicion());
        existente.setSinopsis(datos.getSinopsis());

        return libroRepository.save(existente);
    }

    public void delete(Integer id) {
        Libro existente = findById(id); //404 si no existe
        libroRepository.delete(existente);
    }
}
