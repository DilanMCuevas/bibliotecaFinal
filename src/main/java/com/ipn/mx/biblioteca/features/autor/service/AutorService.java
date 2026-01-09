package com.ipn.mx.biblioteca.features.autor.service;

import com.ipn.mx.biblioteca.core.domain.Autor;
import com.ipn.mx.biblioteca.features.autor.repository.AutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutorService {

    private final AutorRepository autorRepository;

    public List<Autor> findAll() {
        return autorRepository.findAll();
    }

    public Autor findById(Integer id) {
        return autorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Autor con id " + id + " no encontrado"
                ));
    }

    public Autor create(Autor autor) {
        autor.setId(null);
        return autorRepository.save(autor);
    }

    public Autor update(Integer id, Autor datos) {
        Autor existente = findById(id);

        existente.setNombre(datos.getNombre());
        existente.setBio(datos.getBio());

        return autorRepository.save(existente);
    }

    public void delete(Integer id) {
        Autor existente = findById(id);
        autorRepository.delete(existente);
    }
}
