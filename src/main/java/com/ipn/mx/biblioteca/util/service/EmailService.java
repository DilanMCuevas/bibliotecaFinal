package com.ipn.mx.biblioteca.util.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.Multipart;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${GMAIL_CLIENT_ID:}")
    private String clientId;

    @Value("${GMAIL_CLIENT_SECRET:}")
    private String clientSecret;

    @Value("${GMAIL_REFRESH_TOKEN:}")
    private String refreshToken;

    @Value("${GMAIL_FROM:}")
    private String from;

    private Gmail buildGmail() {
        if (clientId.isBlank() || clientSecret.isBlank() || refreshToken.isBlank() || from.isBlank()) {
            throw new IllegalStateException(
                    "Faltan variables de entorno: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_FROM"
            );
        }
        try {
            var httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            var jsonFactory = JacksonFactory.getDefaultInstance();

            GoogleCredential credential = new GoogleCredential.Builder()
                    .setTransport(httpTransport)
                    .setJsonFactory(jsonFactory)
                    .setClientSecrets(clientId, clientSecret)
                    .build()
                    .setRefreshToken(refreshToken);

            // Fuerza refresh para asegurar que tenga access token válido
            credential.refreshToken();

            return new Gmail.Builder(httpTransport, jsonFactory, credential)
                    .setApplicationName("Biblioteca ESCOM")
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Error creando cliente Gmail API", e);
        }
    }

    public void enviarCorreoSimple(String para, String asunto, String texto) {
        try {
            MimeMessage mimeMessage = crearMensajeTexto(para, asunto, texto);
            enviarMimeMessage(mimeMessage);
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
            MimeMessage mimeMessage = crearMensajeConAdjunto(para, asunto, texto, adjunto, nombreArchivo);
            enviarMimeMessage(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar correo con adjunto", e);
        }
    }

    private void enviarMimeMessage(MimeMessage mimeMessage) throws Exception {
        System.out.println(">>> ENVIANDO CON GMAIL API (NO SMTP)");

        Gmail gmail = buildGmail();

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        mimeMessage.writeTo(buffer);

        String raw = Base64.getUrlEncoder().encodeToString(buffer.toByteArray());

        Message message = new Message();
        message.setRaw(raw);

        gmail.users().messages().send("me", message).execute();
    }

    private MimeMessage crearMensajeTexto(String para, String asunto, String texto) throws Exception {
        Properties props = new Properties();
        Session session = Session.getInstance(props);

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from, "Biblioteca ESCOM", StandardCharsets.UTF_8.name()));
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(para));
        message.setSubject(asunto, StandardCharsets.UTF_8.name());
        message.setText(texto, StandardCharsets.UTF_8.name());

        return message;
    }

    private MimeMessage crearMensajeConAdjunto(String para, String asunto, String texto,
                                               byte[] adjunto, String nombreArchivo) throws Exception {

        Properties props = new Properties();
        Session session = Session.getInstance(props);

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from, "Biblioteca ESCOM", StandardCharsets.UTF_8.name()));
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(para));
        message.setSubject(asunto, StandardCharsets.UTF_8.name());

        MimeBodyPart textPart = new MimeBodyPart();
        textPart.setText(texto, StandardCharsets.UTF_8.name());

        MimeBodyPart attachmentPart = new MimeBodyPart();
        DataSource ds = new ByteArrayDataSource(adjunto, "application/pdf");
        attachmentPart.setDataHandler(new DataHandler(ds));
        attachmentPart.setFileName(nombreArchivo);

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(textPart);
        multipart.addBodyPart(attachmentPart);

        message.setContent(multipart);
        return message;
    }
}
