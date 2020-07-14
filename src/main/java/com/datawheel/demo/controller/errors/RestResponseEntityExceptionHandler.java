package com.datawheel.demo.controller.errors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * This is global error handler config class.
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * This method teaches spring boot how to handle errors that implement/extends BaseException.
     * This provides us with a standard error response data for our controller.
     */
    @ExceptionHandler(value = {BadRequestException.class, NotFoundException.class})
    protected ResponseEntity<Object> handleBadRequest(BaseException ex, NativeWebRequest request) {
        ResponseError responseError = new ResponseError().detail(ex.getMessage()).status(ex.getStatus().value());
        return handleExceptionInternal(
            ex,
            responseError,
            new HttpHeaders(),
            ex.getStatus(),
            request
        );
    }
}
