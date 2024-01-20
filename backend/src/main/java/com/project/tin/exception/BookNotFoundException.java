package com.project.tin.exception;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String bookNotFound) {
        super(bookNotFound);
    }
}
