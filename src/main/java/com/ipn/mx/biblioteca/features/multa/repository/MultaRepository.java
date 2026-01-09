package com.ipn.mx.biblioteca.features.multa.repository;

import com.ipn.mx.biblioteca.core.domain.Multa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultaRepository extends JpaRepository<Multa, Integer> {

    List<Multa> findByUsuarioId(Integer usuarioId);

    List<Multa> findByPrestamoId(Integer prestamoId);

    List<Multa> findByEstado(String estado);

    boolean existsByUsuarioIdAndEstado(Integer usuarioId, String estado);
}
