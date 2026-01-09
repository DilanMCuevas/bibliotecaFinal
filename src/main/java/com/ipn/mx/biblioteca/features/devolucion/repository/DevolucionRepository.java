package com.ipn.mx.biblioteca.features.devolucion.repository;

import com.ipn.mx.biblioteca.core.domain.Devolucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DevolucionRepository extends JpaRepository<Devolucion, Integer> {

    List<Devolucion> findByPrestamoId(Integer prestamoId);
}
