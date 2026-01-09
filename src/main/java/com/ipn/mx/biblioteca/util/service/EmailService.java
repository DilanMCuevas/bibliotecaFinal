package com.ipn.mx.biblioteca.util.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void enviarCorreoSimple(String para, String asunto, String texto) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, false, "UTF-8");

            helper.setTo(para);
            helper.setSubject(asunto);
            helper.setText(texto, false);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar correo", e);
        }
    }

    public void enviarCorreoConAdjunto(String para,
                                       String asunto,
                                       String texto,
                                       byte[] adjunto,
                                       String nombreArchivo) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(para);
            helper.setSubject(asunto);
            helper.setText(texto, false);

            ByteArrayResource resource = new ByteArrayResource(adjunto);
            helper.addAttachment(nombreArchivo, resource);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar correo con adjunto", e);
        }
    }
}
