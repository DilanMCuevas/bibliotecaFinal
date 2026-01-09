package com.ipn.mx.biblioteca.features.librocategoria.service;

import com.ipn.mx.biblioteca.core.domain.Categoria;
import com.ipn.mx.biblioteca.core.domain.LibroCategoria;
import com.ipn.mx.biblioteca.features.categoria.repository.CategoriaRepository;
import com.ipn.mx.biblioteca.features.librocategoria.repository.LibroCategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibroCategoriaService {

    private final LibroCategoriaRepository libroCategoriaRepository;
    private final CategoriaRepository categoriaRepository;

    public List<Categoria> obtenerCategoriasDeLibro(Integer libroId) {
        List<LibroCategoria> relaciones = libroCategoriaRepository.findByLibroId(libroId);

        List<Integer> idsCategorias = relaciones.stream()
                .map(LibroCategoria::getCategoriaId)
                .collect(Collectors.toList());

        if (idsCategorias.isEmpty()) {
            return List.of();
        }

        return categoriaRepository.findAllById(idsCategorias);
    }

    public void agregarCategoriaALibro(Integer libroId, Integer categoriaId) {
        boolean yaExiste = libroCategoriaRepository
                .findByLibroIdAndCategoriaId(libroId, categoriaId)
                .isPresent();

        if (yaExiste) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "La categoría " + categoriaId + " ya está asociada al libro " + libroId
            );
        }

        LibroCategoria relacion = LibroCategoria.builder()
                .libroId(libroId)
                .categoriaId(categoriaId)
                .build();

        libroCategoriaRepository.save(relacion);
    }

    public void eliminarCategoriaDeLibro(Integer libroId, Integer categoriaId) {
        LibroCategoria relacion = libroCategoriaRepository
                .findByLibroIdAndCategoriaId(libroId, categoriaId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "La relación libro " + libroId + " con categoría " + categoriaId + " no existe"
                ));

        libroCategoriaRepository.delete(relacion);
    }
}
