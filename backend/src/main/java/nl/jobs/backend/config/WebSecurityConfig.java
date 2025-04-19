package nl.jobs.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Diable CSRF for simplicity.
                .formLogin(AbstractHttpConfigurer::disable) // Disable default login page.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("api/auth/login", "api/auth/register").permitAll() // Allow unauthenticated access to login/register.
                        .anyRequest().authenticated()) // Requires auth for other endpoints.
                .httpBasic(Customizer.withDefaults()); // JWT logic coming soon.

        return httpSecurity.build();
    }
}
