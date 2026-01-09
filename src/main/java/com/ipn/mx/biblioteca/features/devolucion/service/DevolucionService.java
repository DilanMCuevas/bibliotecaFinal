package com.ipn.mx.biblioteca.features.devolucion.service;

import com.ipn.mx.biblioteca.core.domain.Devolucion;
import com.ipn.mx.biblioteca.core.domain.Ejemplar;
import com.ipn.mx.biblioteca.core.domain.Multa;
import com.ipn.mx.biblioteca.core.domain.Prestamo;
import com.ipn.mx.biblioteca.features.devolucion.repository.DevolucionRepository;
import com.ipn.mx.biblioteca.features.ejemplar.repository.EjemplarRepository;
import com.ipn.mx.biblioteca.features.multa.repository.MultaRepository;
import com.ipn.mx.biblioteca.features.prestamo.repository.PrestamoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DevolucionService {

    // 🔢 Ajusta la tarifa por día de atraso a lo que quieras
    private static final double TARIFA_DIA_ATRASO = 5.0;

    private final DevolucionRepository devolucionRepository;

    // 👇 nuevas dependencias para aplicar la regla 5
    private final PrestamoRepository prestamoRepository;
    private final EjemplarRepository ejemplarRepository;
    private final MultaRepository multaRepository;

    public List<Devolucion> findAll() {
        return devolucionRepository.findAll();
    }

    public Devolucion findById(Integer id) {
        return devolucionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Devolución con id " + id + " no encontrada"
                ));
    }

    public List<Devolucion> findByPrestamo(Integer prestamoId) {
        return devolucionRepository.findByPrestamoId(prestamoId);
    }

    public Devolucion create(Devolucion devolucion) {
        devolucion.setId(null);

        if (devolucion.getFechaDevolucion() == null) {
            devolucion.setFechaDevolucion(LocalDateTime.now());
        }
        if (devolucion.getCondicionRetorno() == null) {
            devolucion.setCondicionRetorno("ok");
        }

        // 🔥 REGLA 5: ligar con el préstamo, generar multa y actualizar estados

        // 1) Buscar el préstamo
        Prestamo prestamo = prestamoRepository.findById(devolucion.getPrestamoId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Préstamo con id " + devolucion.getPrestamoId() + " no existe"
                ));

        // 2) Validar que el préstamo no esté ya devuelto
        if ("devuelto".equalsIgnoreCase(prestamo.getEstado())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El préstamo ya fue devuelto previamente"
            );
        }

        // 3) Guardar la devolución
        Devolucion creada = devolucionRepository.save(devolucion);

        // 4) Si la devolución es tardía, generar multa
        if (prestamo.getFechaVencimiento() != null &&
                creada.getFechaDevolucion().isAfter(prestamo.getFechaVencimiento())) {

            long diasAtraso = ChronoUnit.DAYS.between(
                    prestamo.getFechaVencimiento().toLocalDate(),
                    creada.getFechaDevolucion().toLocalDate()
            );

            if (diasAtraso < 1) {
                diasAtraso = 1; // mínimo 1 día de multa si se pasó
            }

            double monto = diasAtraso * TARIFA_DIA_ATRASO;

            Multa multa = new Multa();
            multa.setPrestamoId(prestamo.getId());
            multa.setUsuarioId(prestamo.getUsuarioId());
            multa.setMonto(BigDecimal.valueOf(monto));
            multa.setMotivo("Devolución tardía (" + diasAtraso + " días de atraso)");
            multa.setEstado("pendiente");

            multaRepository.save(multa);
        }

        // 5) Marcar préstamo como devuelto
        prestamo.setEstado("devuelto");
        prestamoRepository.save(prestamo);

        // 6) Liberar el ejemplar (ponerlo disponible)
        Ejemplar ejemplar = ejemplarRepository.findById(prestamo.getEjemplarId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Ejemplar asociado al préstamo no encontrado"
                ));
        ejemplar.setEstado("disponible");
        ejemplarRepository.save(ejemplar);

        // 7) Regresar la devolución creada
        return creada;
    }

    public Devolucion update(Integer id, Devolucion datos) {
        Devolucion existente = findById(id);

        existente.setPrestamoId(datos.getPrestamoId());
        existente.setFechaDevolucion(datos.getFechaDevolucion());
        existente.setCondicionRetorno(datos.getCondicionRetorno());
        existente.setObservaciones(datos.getObservaciones());

        return devolucionRepository.save(existente);
    }

    public void delete(Integer id) {
        Devolucion existente = findById(id);
        devolucionRepository.delete(existente);
    }
}
