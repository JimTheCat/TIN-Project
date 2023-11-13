package com.project.tin.controller;

import com.project.tin.dto.BookDTO;
import com.project.tin.service.impl.BookServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {
    private final BookServiceImpl bookService;

    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        System.out.println("getAllBooks");
        return ResponseEntity.ok(bookService.getAllBooks());
    }
}
