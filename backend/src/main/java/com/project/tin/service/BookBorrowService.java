package com.project.tin.service;

import com.project.tin.dto.BookBorrowDTO;
import com.project.tin.model.BookBorrowModel;

import java.util.List;

public interface BookBorrowService {
    List<BookBorrowDTO> getBorrowedBooksByUserId(String username);
}
