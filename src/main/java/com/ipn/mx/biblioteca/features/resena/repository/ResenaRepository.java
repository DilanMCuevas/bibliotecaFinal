package com.ipn.mx.biblioteca.features.resena.repository;

import com.ipn.mx.biblioteca.core.domain.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Integer> {

    List<Resena> findByLibroId(Integer libroId);

    List<Resena> findByUsuarioId(Integer usuarioId);

    // por si luego quieres ver si ya reseñó ese libro:
    List<Resena> findByUsuarioIdAndLibroId(Integer usuarioId, Integer libroId);
}
