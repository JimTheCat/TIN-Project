package com.project.tin.service;

import com.project.tin.dto.AddAuthorDTO;
import com.project.tin.dto.AuthorDTO;

import java.util.List;

public interface AuthorService {
    Object addAuthor(AddAuthorDTO authorDTO);
    List<AuthorDTO> getAll();
}
