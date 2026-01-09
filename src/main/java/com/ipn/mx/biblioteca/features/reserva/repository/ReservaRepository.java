package com.ipn.mx.biblioteca.features.reserva.repository;

import com.ipn.mx.biblioteca.core.domain.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    List<Reserva> findByUsuarioId(Integer usuarioId);

    List<Reserva> findByLibroId(Integer libroId);
}
