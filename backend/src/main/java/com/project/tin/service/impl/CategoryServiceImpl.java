package com.project.tin.service.impl;

import com.project.tin.dto.CategoryDTO;
import com.project.tin.model.CategoryModel;
import com.project.tin.repository.CategoryRepository;
import com.project.tin.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryDTO> getAll() {
        List<CategoryModel> modelList = categoryRepository.findAll();
        List<CategoryDTO> dtoList = new ArrayList<>();

        for (CategoryModel model : modelList) {
            dtoList.add(modelMapper.map(model, CategoryDTO.class));
        }

        return dtoList;
    }
}
