package com.project.tin.service;

import com.project.tin.dto.AddAuthorDTO;
import com.project.tin.dto.AuthorDTO;

import java.util.List;

public interface AuthorService {
    /**
     * Add new author
     * @param authorDTO - contains author data
     * @return response with message
     */
    Object addAuthor(AddAuthorDTO authorDTO);
    /**
     * Get all authors
     * @return list of all authors
     */
    List<AuthorDTO> getAll();
}
