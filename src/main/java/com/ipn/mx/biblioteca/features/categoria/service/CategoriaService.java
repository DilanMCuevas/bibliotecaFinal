package com.ipn.mx.biblioteca.features.categoria.service;

import com.ipn.mx.biblioteca.core.domain.Categoria;
import com.ipn.mx.biblioteca.features.categoria.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria findById(Integer id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Categoría con id " + id + " no encontrada"
                ));
    }

    public Categoria create(Categoria categoria) {
        categoria.setId(null);
        return categoriaRepository.save(categoria);
    }

    public Categoria update(Integer id, Categoria datos) {
        Categoria existente = findById(id);

        existente.setNombre(datos.getNombre());
        existente.setDescripcion(datos.getDescripcion());

        return categoriaRepository.save(existente);
    }

    public void delete(Integer id) {
        Categoria existente = findById(id);
        categoriaRepository.delete(existente);
    }
}
