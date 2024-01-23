package com.project.tin.service;

import com.project.tin.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {
    /**
     * Get all categories
     * @return list of all categories
     */
    List<CategoryDTO> getAll();
}
