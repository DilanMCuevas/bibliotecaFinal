package com.ipn.mx.biblioteca.features.multa.service;

import com.ipn.mx.biblioteca.core.domain.Multa;
import com.ipn.mx.biblioteca.features.multa.repository.MultaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MultaService {

    private final MultaRepository multaRepository;

    public List<Multa> findAll() {
        return multaRepository.findAll();
    }

    public Multa findById(Integer id) {
        return multaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Multa con id " + id + " no encontrada"
                ));
    }

    public List<Multa> findByUsuario(Integer usuarioId) {
        return multaRepository.findByUsuarioId(usuarioId);
    }

    public List<Multa> findByPrestamo(Integer prestamoId) {
        return multaRepository.findByPrestamoId(prestamoId);
    }

    public List<Multa> findByEstado(String estado) {
        return multaRepository.findByEstado(estado);
    }

    public Multa create(Multa multa) {
        multa.setId(null);
        // Podrías setear estado por defecto aquí si viene null
        if (multa.getEstado() == null) {
            multa.setEstado("pendiente");
        }
        return multaRepository.save(multa);
    }

    public Multa update(Integer id, Multa datos) {
        Multa existente = findById(id);

        existente.setPrestamoId(datos.getPrestamoId());
        existente.setUsuarioId(datos.getUsuarioId());
        existente.setMotivo(datos.getMotivo());
        existente.setMonto(datos.getMonto());
        existente.setEstado(datos.getEstado());

        return multaRepository.save(existente);
    }

    public void delete(Integer id) {
        Multa existente = findById(id);
        multaRepository.delete(existente);
    }

    // acción útil: marcar como pagada
    public Multa marcarComoPagada(Integer id) {
        Multa multa = findById(id);
        multa.setEstado("pagada");
        return multaRepository.save(multa);
    }
}
