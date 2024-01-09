package com.project.tin.controller;

import com.project.tin.dto.BookDTO;
import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.service.BookBorrowService;
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
    private final BookBorrowService bookBorrowService;

    public BookController(BookServiceImpl bookService, BookBorrowService bookBorrowService) {
        this.bookService = bookService;
        this.bookBorrowService = bookBorrowService;
    }

    @GetMapping("/getAllBooks")
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        System.out.println("getAllBooks");
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping(value = "/getBookById", params = "bookId")
    public ResponseEntity<BookDTO> getBookById(Long bookId) {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @GetMapping(value = "/getBorrowedBooksByUserId", params = "userId")
    public ResponseEntity<List<BookBorrowDTO>> getBorrowedBooksByUserId(String userId) {
        return ResponseEntity.ok(bookBorrowService.getBorrowedBooksByUserId(userId));
    }
}
