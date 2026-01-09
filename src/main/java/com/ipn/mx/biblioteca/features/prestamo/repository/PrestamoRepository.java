package com.ipn.mx.biblioteca.features.prestamo.repository;

import com.ipn.mx.biblioteca.core.domain.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {

    List<Prestamo> findByUsuarioId(Integer usuarioId);

    List<Prestamo> findByEjemplarId(Integer ejemplarId);

    long countByUsuarioIdAndEstado(Integer usuarioId, String estado);
}
