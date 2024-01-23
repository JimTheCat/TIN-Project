package com.project.tin.service.impl;

import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.exception.BookNotFoundException;
import com.project.tin.model.BookBorrowModel;
import com.project.tin.repository.BookBorrowRepository;
import com.project.tin.repository.BookRepository;
import com.project.tin.security.user.UserRepository;
import com.project.tin.service.BookBorrowService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookBorrowServiceImpl implements BookBorrowService {
    private final BookBorrowRepository bookBorrowRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<BookBorrowDTO> getBorrowedBooksByUserId(String username) {
        List<BookBorrowDTO> borrowDTOList = bookBorrowRepository
                .findByUserModelUsername(username)
                .stream()
                .map(post -> modelMapper.map(post, BookBorrowDTO.class))
                .toList();

        borrowDTOList.forEach(e -> e.setUserModel(null)); // hide user details

        return borrowDTOList;
    }

    @Override
    public Object returnBook(long borrowId) {
        bookBorrowRepository
            .findByBorrowId(borrowId)
            .setIsReturned(true);

        bookBorrowRepository.flush();

        return "Book returned successfully";
    }

    @Override
    public Object updateRating(long bookId, int rating) {
        bookBorrowRepository
            .findByBorrowId(bookId)
            .setRating((double) rating);

        bookBorrowRepository.flush();

        return "Rating updated successfully";
    }

    @Override
    public Object borrowBook(long bookId, String userId, int amountOfDays) {
        BookBorrowModel bookBorrowModel = new BookBorrowModel();
        bookBorrowModel.setBookModel(bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book not found")));
        bookBorrowModel.setUserModel(userRepository.findByUsername(userId).orElseThrow(() -> new UsernameNotFoundException("User not found")));
        bookBorrowModel.setBorrowDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now()));
        bookBorrowModel.setDueDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(LocalDate.now().plusDays(amountOfDays)));
        bookBorrowModel.setIsReturned(false);

        bookBorrowRepository.save(bookBorrowModel);

        return "Book borrowed successfully";
    }
}
