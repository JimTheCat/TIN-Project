package com.project.tin.service;

import com.project.tin.dto.AuthorDTO;
import com.project.tin.dto.BookDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    /**
     * Get all books from database
     * @return list of all books
     * @deprecated that was temporary method to get all books. For now user needs to see "available books"
     * instead of "all books". Please use {@link #getAllBooksNotBorrowed()} instead
     */
    List<BookDTO> getAllBooks();
    /**
     * Get book by id
     * @param id - unique book identifier
     * @return book with given id
     */
    BookDTO getBookById(Long id);

    /**
     * Get all books that are not borrowed at the moment
     * @return list of all books that are not borrowed
     */
    List<BookDTO> getAllBooksNotBorrowed();

    /**
     * Add new book to database
     * @param bookDTO - contains book data
     * @return response with message
     */
    Object addBook(BookDTO bookDTO);

    /**
     * Remove book from database
     * @param bookId - unique book identifier
     * @return response with message
     */
    Object removeBookById(long bookId);

    /**
     * Update book data
     * @param bookDTO - contains book data
     * @return response with message
     */
    Object updateBook(BookDTO bookDTO);
}
