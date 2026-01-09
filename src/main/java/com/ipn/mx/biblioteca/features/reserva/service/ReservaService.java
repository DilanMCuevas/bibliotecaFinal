package com.ipn.mx.biblioteca.features.reserva.service;

import com.ipn.mx.biblioteca.core.domain.Reserva;
import com.ipn.mx.biblioteca.features.reserva.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Reserva findById(Integer id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Reserva con id " + id + " no encontrada"
                ));
    }

    public List<Reserva> findByUsuario(Integer usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    public List<Reserva> findByLibro(Integer libroId) {
        return reservaRepository.findByLibroId(libroId);
    }

    public Reserva create(Reserva reserva) {
        reserva.setId(null);

        if (reserva.getFechaReserva() == null) {
            reserva.setFechaReserva(LocalDateTime.now());
        }
        if (reserva.getEstado() == null) {
            reserva.setEstado("en_cola");
        }

        return reservaRepository.save(reserva);
    }

    public Reserva update(Integer id, Reserva datos) {
        Reserva existente = findById(id);

        existente.setLibroId(datos.getLibroId());
        existente.setUsuarioId(datos.getUsuarioId());
        existente.setFechaReserva(datos.getFechaReserva());
        existente.setEstado(datos.getEstado());
        existente.setExpiraEl(datos.getExpiraEl());

        return reservaRepository.save(existente);
    }

    public void delete(Integer id) {
        Reserva existente = findById(id);
        reservaRepository.delete(existente);
    }
}
