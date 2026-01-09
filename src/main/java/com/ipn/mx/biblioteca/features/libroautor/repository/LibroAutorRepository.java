package com.ipn.mx.biblioteca.features.libroautor.repository;

import com.ipn.mx.biblioteca.core.domain.LibroAutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroAutorRepository extends JpaRepository<LibroAutor, Integer> {

    List<LibroAutor> findByLibroId(Integer libroId);

    List<LibroAutor> findByAutorId(Integer autorId);

    Optional<LibroAutor> findByLibroIdAndAutorId(Integer libroId, Integer autorId);
}
