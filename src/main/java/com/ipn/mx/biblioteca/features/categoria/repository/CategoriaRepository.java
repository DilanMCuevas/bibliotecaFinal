package com.ipn.mx.biblioteca.features.categoria.repository;

import com.ipn.mx.biblioteca.core.domain.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}
