package com.ipn.mx.biblioteca.features.usuario.controller;

import com.ipn.mx.biblioteca.core.domain.Usuario;
import com.ipn.mx.biblioteca.features.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String email = credenciales.get("email");
        String password = credenciales.get("password");

        // Buscar usuario
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Validar password (texto plano '12345')
            if (usuario.getPassword() != null && usuario.getPassword().equals(password)) {
                return ResponseEntity.ok(usuario);
            }
        }

        return ResponseEntity.status(401).body(Map.of("mensaje", "Credenciales incorrectas"));
    }
}