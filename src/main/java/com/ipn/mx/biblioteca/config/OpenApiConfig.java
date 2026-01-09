package com.ipn.mx.biblioteca.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Biblioteca API",
                version = "v1",
                description = "API para la gestión de una biblioteca"
        ),
        servers = {
                @Server(
                        url = "/",
                        description = "Servidor Default"
                )
        }
)
public class OpenApiConfig {
    // Configuración global de OpenAPI/Swagger
}
