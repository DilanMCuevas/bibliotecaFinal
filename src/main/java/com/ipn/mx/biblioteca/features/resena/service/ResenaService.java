package com.ipn.mx.biblioteca.features.resena.service;

import com.ipn.mx.biblioteca.core.domain.Resena;
import com.ipn.mx.biblioteca.features.resena.repository.ResenaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResenaService {

    private final ResenaRepository resenaRepository;

    public List<Resena> findAll() {
        return resenaRepository.findAll();
    }

    public Resena findById(Integer id) {
        return resenaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Reseña con id " + id + " no encontrada"
                ));
    }

    public List<Resena> findByLibro(Integer libroId) {
        return resenaRepository.findByLibroId(libroId);
    }

    public List<Resena> findByUsuario(Integer usuarioId) {
        return resenaRepository.findByUsuarioId(usuarioId);
    }

    public Resena create(Resena resena) {
        resena.setId(null);
        // aquí podrías validar rating 1–5, etc.
        return resenaRepository.save(resena);
    }

    public Resena update(Integer id, Resena datos) {
        Resena existente = findById(id);

        existente.setUsuarioId(datos.getUsuarioId());
        existente.setLibroId(datos.getLibroId());
        existente.setRating(datos.getRating());
        existente.setComentario(datos.getComentario());

        return resenaRepository.save(existente);
    }

    public void delete(Integer id) {
        Resena existente = findById(id);
        resenaRepository.delete(existente);
    }
}
