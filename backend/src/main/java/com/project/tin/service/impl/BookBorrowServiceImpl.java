package com.project.tin.service.impl;

import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.model.BookBorrowModel;
import com.project.tin.repository.BookBorrowRepository;
import com.project.tin.service.BookBorrowService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookBorrowServiceImpl implements BookBorrowService {
    private final BookBorrowRepository bookBorrowRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public BookBorrowServiceImpl(BookBorrowRepository bookBorrowRepository) {
        this.bookBorrowRepository = bookBorrowRepository;
    }

    @Override
    public List<BookBorrowDTO> getBorrowedBooksByUserId(String username) {
        List<BookBorrowDTO> borrowDTOList = bookBorrowRepository
                .findByUserModelUsername(username)
                .stream()
                .map(post -> modelMapper.map(post, BookBorrowDTO.class))
                .toList();

        borrowDTOList.forEach(e -> e.setUserModel(null));

        return borrowDTOList;
    }
}
