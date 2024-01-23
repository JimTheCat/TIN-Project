package com.project.tin.controller;

import com.project.tin.dto.BookDTO;
import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.service.BookBorrowService;
import com.project.tin.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {
    private final BookService bookService;
    private final BookBorrowService bookBorrowService;

    public BookController(BookService bookService, BookBorrowService bookBorrowService) {
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

    @PutMapping(value = "/borrowBook", params = "borrowId")
    public ResponseEntity<Object> returnBook(long borrowId) {
        return ResponseEntity.ok(bookBorrowService.returnBook(borrowId));
    }

    @PutMapping(value = "/updateRating", params = {"borrowId", "rating"})
    public ResponseEntity<Object> updateRating(long borrowId, int rating) {
        return ResponseEntity.ok(bookBorrowService.updateRating(borrowId, rating));
    }

    @GetMapping(value = "/getAllBooksNotBorrowed")
    public ResponseEntity<List<BookDTO>> getAllBooksNotBorrowed() {
        return ResponseEntity.ok(bookService.getAllBooksNotBorrowed());
    }

    @PostMapping(value = "/borrowBook", params = {"bookId", "userId", "amountOfDays"})
    public ResponseEntity<Object> borrowBook(long bookId, String userId, int amountOfDays) {
        return ResponseEntity.ok(bookBorrowService.borrowBook(bookId, userId, amountOfDays));
    }

    /*
        Admin methods
    */
    @PostMapping(value = "/addBook")
    public ResponseEntity<Object> addBook(@RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.addBook(bookDTO));
    }

    @DeleteMapping(value = "/deleteBookById", params = "bookId")
    public ResponseEntity<Object> removeBookById(long bookId) {
        return ResponseEntity.ok(bookService.removeBookById(bookId));
    }

    @PutMapping(value = "/updateBook")
    public ResponseEntity<Object> updateBook(@RequestBody BookDTO bookDTO) {
        return ResponseEntity.ok(bookService.updateBook(bookDTO));
    }
}
