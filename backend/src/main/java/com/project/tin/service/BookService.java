package com.project.tin.service;

import com.project.tin.dto.AuthorDTO;
import com.project.tin.dto.BookDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    List<BookDTO> getAllBooks();

    BookDTO getBookById(Long id);
}
