package com.ipn.mx.biblioteca.features.prestamo.service;

import com.ipn.mx.biblioteca.core.domain.Ejemplar;
import com.ipn.mx.biblioteca.core.domain.Multa;
import com.ipn.mx.biblioteca.core.domain.Prestamo;
import com.ipn.mx.biblioteca.core.domain.Usuario;
import com.ipn.mx.biblioteca.features.ejemplar.repository.EjemplarRepository;
import com.ipn.mx.biblioteca.features.multa.repository.MultaRepository;
import com.ipn.mx.biblioteca.features.prestamo.repository.PrestamoRepository;
import com.ipn.mx.biblioteca.features.reportes.service.ReportePrestamoPdfService;
import com.ipn.mx.biblioteca.features.usuario.repository.UsuarioRepository;
import com.ipn.mx.biblioteca.util.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrestamoService {

    private static final int MAX_PRESTAMOS_ACTIVOS = 3;
    private static final int DIAS_PRESTAMO = 14;

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final EjemplarRepository ejemplarRepository;
    private final MultaRepository multaRepository;
    private final EmailService emailService;
    private final ReportePrestamoPdfService reportePrestamoPdfService;

    public List<Prestamo> findAll() {
        return prestamoRepository.findAll();
    }

    public Prestamo findById(Integer id) {
        return prestamoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Préstamo con id " + id + " no encontrado"
                ));
    }

    public List<Prestamo> findByUsuario(Integer usuarioId) {
        return prestamoRepository.findByUsuarioId(usuarioId);
    }

    public List<Prestamo> findByEjemplar(Integer ejemplarId) {
        return prestamoRepository.findByEjemplarId(ejemplarId);
    }

    public Prestamo create(Prestamo prestamo) {
        prestamo.setId(null);

        // 1) Validar que el ejemplar exista y esté disponible
        Ejemplar ejemplar = ejemplarRepository.findById(prestamo.getEjemplarId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Ejemplar con id " + prestamo.getEjemplarId() + " no existe"
                ));

        if (!"disponible".equalsIgnoreCase(ejemplar.getEstado())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El ejemplar " + ejemplar.getId() + " no está disponible para préstamo"
            );
        }

        // 2) Validar que el usuario exista
        Usuario usuario = usuarioRepository.findById(prestamo.getUsuarioId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Usuario con id " + prestamo.getUsuarioId() + " no existe"
                ));

        // 3) No prestar usuario con multas pendientes
        boolean tieneMultasPendientes =
                multaRepository.existsByUsuarioIdAndEstado(usuario.getId(), "pendiente");

        if (tieneMultasPendientes) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El usuario tiene multas pendientes y no puede realizar préstamos"
            );
        }

        // 4) No prestar si usuario sobrepasa límite
        long prestamosActivos = prestamoRepository
                .countByUsuarioIdAndEstado(usuario.getId(), "activo");

        if (prestamosActivos >= MAX_PRESTAMOS_ACTIVOS) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El usuario ya tiene el máximo de préstamos activos (" +
                            MAX_PRESTAMOS_ACTIVOS + ")"
            );
        }

        // 5) Calcular fecha de préstamo y vencimiento automáticamente
        LocalDateTime ahora = LocalDateTime.now();

        if (prestamo.getFechaPrestamo() == null) {
            prestamo.setFechaPrestamo(ahora.truncatedTo(ChronoUnit.MINUTES));
        }

        if (prestamo.getFechaVencimiento() == null) {
            prestamo.setFechaVencimiento(
                    prestamo.getFechaPrestamo().plusDays(DIAS_PRESTAMO)
            );
        }

        if (prestamo.getRenovaciones() == null) {
            prestamo.setRenovaciones(0);
        }
        if (prestamo.getEstado() == null) {
            prestamo.setEstado("activo");
        }

        // Guardamos préstamo
        Prestamo creado = prestamoRepository.save(prestamo);

        // 6) Cambiar estado del ejemplar a "prestado"
        ejemplar.setEstado("prestado");
        ejemplarRepository.save(ejemplar);

        // 7) Generar PDF y enviar correo (regla 8)
        String correo = usuario.getEmail();
        String asunto = "Comprobante de préstamo #" + creado.getId();
        String cuerpo = "Hola " + usuario.getNombre() + ",\n\n" +
                "Se ha registrado tu préstamo en la Biblioteca.\n" +
                "Adjuntamos el comprobante en formato PDF con los detalles.\n\n" +
                "Saludos,\nBiblioteca";

        byte[] pdf = reportePrestamoPdfService.generarPdfPrestamo(creado, usuario);
        String nombreArchivo = "prestamo_" + creado.getId() + ".pdf";

        emailService.enviarCorreoConAdjunto(correo, asunto, cuerpo, pdf, nombreArchivo);

        return creado;
    }

    public Prestamo update(Integer id, Prestamo datos) {
        Prestamo existente = findById(id);

        existente.setEjemplarId(datos.getEjemplarId());
        existente.setUsuarioId(datos.getUsuarioId());
        existente.setFechaPrestamo(datos.getFechaPrestamo());
        existente.setFechaVencimiento(datos.getFechaVencimiento());
        existente.setEstado(datos.getEstado());
        existente.setRenovaciones(datos.getRenovaciones());

        return prestamoRepository.save(existente);
    }

    public void delete(Integer id) {
        Prestamo existente = findById(id);
        prestamoRepository.delete(existente);
    }
}
