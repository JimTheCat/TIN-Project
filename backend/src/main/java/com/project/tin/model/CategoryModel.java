package com.project.tin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Category")
public class CategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long CategoryId;
    @Column(name = "name")
    private String Name;
    @OneToMany(mappedBy = "categoryModel")
    private List<BookModel> bookModel;
}
