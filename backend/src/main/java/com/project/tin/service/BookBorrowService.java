package com.project.tin.service;

import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.model.BookBorrowModel;

import java.util.List;

public interface BookBorrowService {
    /**
     * Get all borrowed books
     * @param username - unique user identifier
     * @return list of all borrowed books by user
     */
    List<BookBorrowDTO> getBorrowedBooksByUserId(String username);
    /**
     * Change book status to returned
     * @param bookId - unique book identifier
     * @return response with message
     */
    Object returnBook(long bookId);

    /**
     * Update book rating
     * @param bookId - unique book identifier
     * @param rating - rating value
     * @return response with message
     */
    Object updateRating(long bookId, int rating);

    /**
     * Borrow book
     * @param bookId - unique book identifier
     * @param userId - unique user identifier
     * @param amountOfDays - amount of days to borrow book
     * @return response with message
     */
    Object borrowBook(long bookId, String userId, int amountOfDays);
}
