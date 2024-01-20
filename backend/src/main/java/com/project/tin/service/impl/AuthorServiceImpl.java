package com.project.tin.service.impl;

import com.project.tin.dto.AddAuthorDTO;
import com.project.tin.dto.AuthorDTO;
import com.project.tin.model.AuthorModel;
import com.project.tin.repository.AuthorRepository;
import com.project.tin.service.AuthorService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Object addAuthor(AddAuthorDTO authorDTO) {
        AuthorModel authorModel = new AuthorModel();
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.map(authorDTO, authorModel);

        authorRepository.save(authorModel);

        return "Author added successfully!";
    }

    @Override
    public List<AuthorDTO> getAll() {
        ModelMapper modelMapper = new ModelMapper();

        return authorRepository.findAll().stream().map(author -> modelMapper.map(author, AuthorDTO.class)).toList();
    }
}
