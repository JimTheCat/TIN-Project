package com.project.tin.service.impl;

import com.project.tin.dto.AuthorDTO;
import com.project.tin.dto.BookDTO;
import com.project.tin.dto.CategoryDTO;
import com.project.tin.exception.BookNotFoundException;
import com.project.tin.model.AuthorModel;
import com.project.tin.model.BookModel;
import com.project.tin.repository.BookRepository;
import com.project.tin.repository.CategoryRepository;
import com.project.tin.service.BookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;


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
        BookModel bookModel = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        ModelMapper modelMapper = new ModelMapper();

        BookDTO bookDTO = modelMapper.map(bookModel, BookDTO.class);
        bookDTO.setPublicationDate(LocalDate.parse(bookModel.getPublicationDate(), formatter));
        bookDTO.setAuthors(bookModel.getAuthorModel().stream().map(authorModel -> modelMapper.map(authorModel, AuthorDTO.class)).toList());
        bookDTO.setCategory(modelMapper.map(bookModel.getCategoryModel(), CategoryDTO.class));

        return bookDTO;
    }

    @Override
    public List<BookDTO> getAllBooksNotBorrowed() {
        List<BookModel> bookRepositoryAll = bookRepository.findAll();
        ModelMapper modelMapper = new ModelMapper();

        bookRepositoryAll
            .removeIf(bookModel -> bookModel.getBookBorrowModel().stream().anyMatch(bookBorrowModel -> !bookBorrowModel.getIsReturned()));

        return bookRepositoryAll.stream().map(post -> modelMapper.map(post, BookDTO.class)).toList();
    }

    @Override
    public Object addBook(BookDTO bookDTO) {
        ModelMapper modelMapper = new ModelMapper();
        List<AuthorModel> authorModelList = new ArrayList<>(bookDTO.getAuthors().stream().map(authorDTO -> modelMapper.map(authorDTO, AuthorModel.class)).toList());
        BookModel bookModel = modelMapper.map(bookDTO, BookModel.class);

        bookModel.setCategoryModel(categoryRepository.findById(bookDTO.getCategory().getCategoryId()).orElse(null));
        bookModel.setAuthorModel(authorModelList);

        bookRepository.save(bookModel);

        return "Book added successfully";
    }

    @Override
    public Object removeBookById(long bookId) {
        if (!bookRepository.existsById(bookId)) throw new BookNotFoundException("Book not found");

        bookRepository.deleteById(bookId);
        return "Book removed successfully";
    }

    @Override
    public Object updateBook(BookDTO bookDTO) {
        ModelMapper modelMapper = new ModelMapper();
        BookModel bookModel = modelMapper.map(bookDTO, BookModel.class);

        bookModel.setCategoryModel(categoryRepository.findById(bookDTO.getCategory().getCategoryId()).orElse(null));
        bookModel.setAuthorModel(bookDTO.getAuthors().stream().map(authorDTO -> modelMapper.map(authorDTO, AuthorModel.class)).toList());

        bookRepository.save(bookModel);

        return "Book updated successfully";
    }
}
