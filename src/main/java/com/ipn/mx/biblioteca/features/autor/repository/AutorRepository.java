package com.ipn.mx.biblioteca.features.autor.repository;

import com.ipn.mx.biblioteca.core.domain.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Integer> {

}
