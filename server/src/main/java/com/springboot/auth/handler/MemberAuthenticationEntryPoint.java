package com.springboot.auth.handler;

import com.springboot.auth.utils.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        ErrorResponse.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "login first");

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException,
                                     Exception e) {
        String message = e != null ? e.getMessage() : authException.getMessage();
        log.warn("Unauthorized error : {}", message);
    }
}
