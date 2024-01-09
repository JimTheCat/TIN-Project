package com.project.tin.dto;

import com.project.tin.model.BookBorrowModel;
import com.project.tin.security.user.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long userId;
    private String username;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private Role role_id;
    private List<BookBorrowDTO> bookBorrowModel;
}
