package com.ipn.mx.biblioteca.features.reportes.service;

import com.ipn.mx.biblioteca.core.domain.Prestamo;
import com.ipn.mx.biblioteca.core.domain.Usuario;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class ReportePrestamoPdfService {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public byte[] generarPdfPrestamo(Prestamo prestamo, Usuario usuario) {
        try {
            Document document = new Document(PageSize.A4);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();

            // Título
            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Comprobante de préstamo", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Info del usuario
            Font subTitleFont = new Font(Font.HELVETICA, 12, Font.BOLD);
            Paragraph usuarioInfo = new Paragraph("Datos del usuario", subTitleFont);
            usuarioInfo.setSpacingAfter(10);
            document.add(usuarioInfo);

            Paragraph usuarioData = new Paragraph(
                    "ID usuario: " + usuario.getId() + "\n" +
                            "Nombre: " + usuario.getNombre() + "\n" +
                            "Correo: " + usuario.getEmail()
            );
            usuarioData.setSpacingAfter(15);
            document.add(usuarioData);

            // Info del préstamo
            Paragraph prestamoInfo = new Paragraph("Datos del préstamo", subTitleFont);
            prestamoInfo.setSpacingAfter(10);
            document.add(prestamoInfo);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(5);

            table.addCell("ID préstamo");
            table.addCell(String.valueOf(prestamo.getId()));

            table.addCell("ID ejemplar");
            table.addCell(String.valueOf(prestamo.getEjemplarId()));

            table.addCell("Fecha préstamo");
            table.addCell(prestamo.getFechaPrestamo() != null
                    ? prestamo.getFechaPrestamo().format(FORMATTER) : "");

            table.addCell("Fecha vencimiento");
            table.addCell(prestamo.getFechaVencimiento() != null
                    ? prestamo.getFechaVencimiento().format(FORMATTER) : "");

            table.addCell("Estado");
            table.addCell(prestamo.getEstado());

            table.addCell("Renovaciones");
            table.addCell(prestamo.getRenovaciones() != null
                    ? prestamo.getRenovaciones().toString() : "0");

            document.add(table);

            Paragraph footer = new Paragraph(
                    "\n\nPor favor conserva este comprobante como referencia.\n" +
                            "Biblioteca ESCOM",
                    new Font(Font.HELVETICA, 10)
            );
            footer.setAlignment(Element.ALIGN_RIGHT);
            document.add(footer);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF del préstamo", e);
        }
    }
}
