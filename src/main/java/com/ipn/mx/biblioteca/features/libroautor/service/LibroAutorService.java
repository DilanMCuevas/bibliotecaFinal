package com.ipn.mx.biblioteca.features.libroautor.service;

import com.ipn.mx.biblioteca.core.domain.Autor;
import com.ipn.mx.biblioteca.core.domain.LibroAutor;
import com.ipn.mx.biblioteca.features.autor.repository.AutorRepository;
import com.ipn.mx.biblioteca.features.libroautor.repository.LibroAutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibroAutorService {

    private final LibroAutorRepository libroAutorRepository;
    private final AutorRepository autorRepository;

    public List<Autor> obtenerAutoresDeLibro(Integer libroId) {
        List<LibroAutor> relaciones = libroAutorRepository.findByLibroId(libroId);

        List<Integer> idsAutores = relaciones.stream()
                .map(LibroAutor::getAutorId)
                .collect(Collectors.toList());

        if (idsAutores.isEmpty()) {
            return List.of();
        }

        return autorRepository.findAllById(idsAutores);
    }

    public void agregarAutorALibro(Integer libroId, Integer autorId) {
        boolean yaExiste = libroAutorRepository
                .findByLibroIdAndAutorId(libroId, autorId)
                .isPresent();

        if (yaExiste) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El autor " + autorId + " ya está asociado al libro " + libroId
            );
        }

        LibroAutor relacion = LibroAutor.builder()
                .libroId(libroId)
                .autorId(autorId)
                .build();

        libroAutorRepository.save(relacion);
    }

    public void eliminarAutorDeLibro(Integer libroId, Integer autorId) {
        LibroAutor relacion = libroAutorRepository
                .findByLibroIdAndAutorId(libroId, autorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "La relación libro " + libroId + " con autor " + autorId + " no existe"
                ));

        libroAutorRepository.delete(relacion);
    }
}
