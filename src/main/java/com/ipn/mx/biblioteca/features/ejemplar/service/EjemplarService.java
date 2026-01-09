package com.ipn.mx.biblioteca.features.ejemplar.service;

import com.ipn.mx.biblioteca.core.domain.Ejemplar;
import com.ipn.mx.biblioteca.features.ejemplar.repository.EjemplarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EjemplarService {

    private final EjemplarRepository ejemplarRepository;

    public List<Ejemplar> findAll() {
        return ejemplarRepository.findAll();
    }

    public Ejemplar findById(Integer id) {
        return ejemplarRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ejemplar con id " + id + " no encontrado"
                ));
    }

    public List<Ejemplar> findByLibro(Integer libroId) {
        return ejemplarRepository.findByLibroId(libroId);
    }

    public Ejemplar create(Ejemplar ejemplar) {
        ejemplar.setId(null);
        return ejemplarRepository.save(ejemplar);
    }

    public Ejemplar update(Integer id, Ejemplar datos) {
        Ejemplar existente = findById(id);

        existente.setLibroId(datos.getLibroId());
        existente.setEstado(datos.getEstado());
        existente.setUbicacion(datos.getUbicacion());

        return ejemplarRepository.save(existente);
    }

    public void delete(Integer id) {
        Ejemplar existente = findById(id);
        ejemplarRepository.delete(existente);
    }
}
