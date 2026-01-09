package com.ipn.mx.biblioteca.features.ejemplar.repository;

import com.ipn.mx.biblioteca.core.domain.Ejemplar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjemplarRepository extends JpaRepository<Ejemplar, Integer> {

    List<Ejemplar> findByLibroId(Integer libroId);
    List<Ejemplar> findByLibroIdAndEstado(Integer libroId, String estado);
}
