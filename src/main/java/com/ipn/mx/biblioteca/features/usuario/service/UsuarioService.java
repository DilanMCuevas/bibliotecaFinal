package com.ipn.mx.biblioteca.features.usuario.service;

import com.ipn.mx.biblioteca.core.domain.Usuario;
import com.ipn.mx.biblioteca.features.usuario.repository.UsuarioRepository;
import com.ipn.mx.biblioteca.util.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario con id " + id + " no encontrado"));
    }

    public Usuario create(Usuario usuario) {
        usuario.setId(null);

        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El correo electrónico es obligatorio");
        }

        boolean emailYaUsado = usuarioRepository.existsByEmail(usuario.getEmail());
        if (emailYaUsado) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ya existe un usuario registrado con el correo " + usuario.getEmail());
        }

        if (usuario.getEstado() == null) {
            usuario.setEstado("activo");
        }

        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        try {
            emailService.enviarCorreoSimple(
                    nuevoUsuario.getEmail(),
                    "Bienvenido a la Biblioteca ESCOM",
                    "Hola " + nuevoUsuario.getNombre() + ",\n\n" +
                            "Tu cuenta ha sido creada exitosamente.\n\n" +
                            "Tus credenciales son:\n" +
                            "Email: " + nuevoUsuario.getEmail() + "\n" +
                            "Password: " + nuevoUsuario.getPassword() + "\n\n" +
                            "Saludos,\n" +
                            "El equipo de Biblioteca ESCOM");
        } catch (Exception e) {
            // Logear error pero no fallar la creacion del usuario
            System.err.println("Error enviando correo de bienvenida: " + e.getMessage());
        }

        return nuevoUsuario;
    }

    public Usuario update(Integer id, Usuario datos) {
        Usuario existente = findById(id);

        // Si cambia el correo, validamos unicidad
        if (datos.getEmail() != null &&
                !datos.getEmail().equalsIgnoreCase(existente.getEmail())) {

            boolean emailYaUsado = usuarioRepository.existsByEmail(datos.getEmail());
            if (emailYaUsado) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Ya existe un usuario registrado con el correo " + datos.getEmail());
            }

            existente.setEmail(datos.getEmail());
        }

        existente.setNombre(datos.getNombre());
        existente.setRol(datos.getRol());
        existente.setEstado(datos.getEstado());

        return usuarioRepository.save(existente);
    }

    public void delete(Integer id) {
        Usuario existente = findById(id);
        usuarioRepository.delete(existente);
    }
}
