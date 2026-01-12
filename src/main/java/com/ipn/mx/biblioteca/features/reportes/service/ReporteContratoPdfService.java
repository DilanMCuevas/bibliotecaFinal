package com.ipn.mx.biblioteca.features.reportes.service;

import com.ipn.mx.biblioteca.core.domain.Usuario;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

@Service
public class ReporteContratoPdfService {

    public byte[] generarPdfContrato(Usuario usuario) {
        try {
            Document document = new Document(PageSize.A4);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();

            // Título
            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("CONTRATO DE SERVICIOS - BIBLIOTECA ESCOM", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(40);
            document.add(title);

            // Fecha
            Font dateFont = new Font(Font.HELVETICA, 12, Font.NORMAL);
            Paragraph date = new Paragraph("Ciudad de México, a " + LocalDate.now(), dateFont);
            date.setAlignment(Element.ALIGN_RIGHT);
            date.setSpacingAfter(20);
            document.add(date);

            // Declaraciones
            Font bodyFont = new Font(Font.HELVETICA, 12, Font.NORMAL);
            String textoDeclaracion = "Por medio del presente documento, la Biblioteca de la ESCOM hace constar que el usuario:\n\n" +
                    "Nombre: " + usuario.getNombre() + "\n" +
                    "Correo Electrónico: " + usuario.getEmail() + "\n\n" +
                    "Ha sido registrado satisfactoriamente en nuestra plataforma de servicios bibliotecarios digitales. " +
                    "Al registrarse, el usuario se compromete a cumplir con el reglamento interno de la biblioteca, " +
                    "cuidar el material prestado y devolverlo en las fechas establecidas.\n\n" +
                    "Este documento sirve como comprobante de registro y aceptación de términos y condiciones.";

            Paragraph body = new Paragraph(textoDeclaracion, bodyFont);
            body.setAlignment(Element.ALIGN_JUSTIFIED);
            body.setSpacingAfter(60);
            document.add(body);

            // Firmas
            Paragraph firmaUser = new Paragraph("__________________________\nFirma del Usuario", bodyFont);
            firmaUser.setAlignment(Element.ALIGN_CENTER);
            document.add(firmaUser);

            Paragraph footer = new Paragraph(
                    "\n\n\nBiblioteca ESCOM - IPN",
                    new Font(Font.HELVETICA, 10, Font.ITALIC)
            );
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el contrato PDF", e);
        }
    }
}
