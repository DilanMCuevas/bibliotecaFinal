package com.ipn.mx.biblioteca.features.libro.repository;

import com.ipn.mx.biblioteca.core.domain.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {
}
