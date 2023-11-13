package com.project.tin.service.impl;

import com.project.tin.dto.BookDTO;
import com.project.tin.model.BookModel;
import com.project.tin.repository.BookRepository;
import com.project.tin.service.BookService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<BookDTO> getAllBooks() {
        List<BookDTO> bookDTOList = new ArrayList<>();
        List<BookModel> bookRepositoryAll = bookRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // convert BookModel to BookDTO
        bookRepositoryAll.forEach(bookModel -> {
            BookDTO bookDTO = new BookDTO();
            bookDTO.setBookId(bookModel.getBookId());
            bookDTO.setName(bookModel.getName());
            bookDTO.setDescription(bookModel.getDescription());
            bookDTO.setPublisher(bookModel.getPublisher());
            bookDTO.setPublicationDate(LocalDate.parse(bookModel.getPublicationDate(), formatter));
            bookDTO.setNumberOfPages(bookModel.getNumberOfPages());
            bookDTOList.add(bookDTO);
        });

        return bookDTOList;
    }
}
