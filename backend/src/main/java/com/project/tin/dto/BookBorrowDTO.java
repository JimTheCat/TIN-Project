package com.project.tin.dto;

import com.project.tin.model.BookModel;
import com.project.tin.security.user.UserModel;
import lombok.Data;

@Data
public class BookBorrowDTO {
    private Long borrowId;
    private String borrowDate;
    private String dueDate;
    private Boolean isReturned;
    private Double rating;
    private UserDTO userModel;
    private BookDTO bookModel;
}
