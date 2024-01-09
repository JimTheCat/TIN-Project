package com.project.tin.service.impl;

import com.project.tin.dto.AuthorDTO;
import com.project.tin.dto.BookDTO;
import com.project.tin.dto.CategoryDTO;
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
            List<AuthorDTO> authorDTOList = new ArrayList<>();
            BookDTO bookDTO = new BookDTO();

            bookDTO.setBookId(bookModel.getBookId());
            bookDTO.setName(bookModel.getName());
            bookDTO.setDescription(bookModel.getDescription());
            bookDTO.setPublisher(bookModel.getPublisher());
            bookDTO.setPublicationDate(LocalDate.parse(bookModel.getPublicationDate(), formatter));
            bookDTO.setNumberOfPages(bookModel.getNumberOfPages());

            bookModel.getAuthorModel().forEach(authorModel -> {
                AuthorDTO authorDTO = new AuthorDTO();
                authorDTO.setAuthorId(authorModel.getAuthorId());
                authorDTO.setName(authorModel.getName());
                authorDTO.setBirthYear(authorModel.getBirthYear());
                authorDTO.setNationality(authorModel.getNationality());

                authorDTOList.add(authorDTO);
            });
            bookDTO.setAuthors(authorDTOList);

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setCategoryId(bookModel.getCategoryModel().getCategoryId());
            categoryDTO.setName(bookModel.getCategoryModel().getName());
            bookDTO.setCategory(categoryDTO);

            bookDTOList.add(bookDTO);
        });

        return bookDTOList;
    }

    @Override
    public BookDTO getBookById(Long id) {
        BookModel bookModel = bookRepository.findById(id).orElse(null);
        if (bookModel == null) return null;

        List<AuthorDTO> authorDTOList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // convert BookModel to BookDTO
        BookDTO bookDTO = new BookDTO();
        bookDTO.setBookId(bookModel.getBookId());
        bookDTO.setName(bookModel.getName());
        bookDTO.setDescription(bookModel.getDescription());
        bookDTO.setPublisher(bookModel.getPublisher());
        bookDTO.setPublicationDate(LocalDate.parse(bookModel.getPublicationDate(), formatter));
        bookDTO.setNumberOfPages(bookModel.getNumberOfPages());

        bookModel.getAuthorModel().forEach(authorModel -> {
            AuthorDTO authorDTO = new AuthorDTO();
            authorDTO.setAuthorId(authorModel.getAuthorId());
            authorDTO.setName(authorModel.getName());
            authorDTO.setBirthYear(authorModel.getBirthYear());
            authorDTO.setNationality(authorModel.getNationality());

            authorDTOList.add(authorDTO);
        });
        bookDTO.setAuthors(authorDTOList);

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(bookModel.getCategoryModel().getCategoryId());
        categoryDTO.setName(bookModel.getCategoryModel().getName());
        bookDTO.setCategory(categoryDTO);

        return bookDTO;
    }
}
