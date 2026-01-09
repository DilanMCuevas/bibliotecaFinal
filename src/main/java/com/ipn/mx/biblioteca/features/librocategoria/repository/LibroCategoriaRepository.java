package com.ipn.mx.biblioteca.features.librocategoria.repository;

import com.ipn.mx.biblioteca.core.domain.LibroCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroCategoriaRepository extends JpaRepository<LibroCategoria, Integer> {

    List<LibroCategoria> findByLibroId(Integer libroId);

    List<LibroCategoria> findByCategoriaId(Integer categoriaId);

    Optional<LibroCategoria> findByLibroIdAndCategoriaId(Integer libroId, Integer categoriaId);
}
