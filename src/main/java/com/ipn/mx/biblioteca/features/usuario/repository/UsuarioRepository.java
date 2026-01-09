package com.ipn.mx.biblioteca.features.usuario.repository;

import com.ipn.mx.biblioteca.core.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    boolean existsByEmail(String email);
}
