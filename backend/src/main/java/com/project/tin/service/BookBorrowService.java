package com.project.tin.service;

import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.model.BookBorrowModel;

import java.util.List;

public interface BookBorrowService {
    List<BookBorrowDTO> getBorrowedBooksByUserId(String username);
    Object returnBook(long bookId);
    Object updateRating(long bookId, int rating);
    Object borrowBook(long bookId, String userId, int amountOfDays);
}
