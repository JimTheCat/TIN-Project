package com.project.tin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Book")
public class BookModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long BookId;
    @Column(name = "name")
    private String Name;
    @Column(name = "description")
    private String Description;
    @Column(name = "publisher")
    private String Publisher;
    @Column(name = "publication_date")
    private String PublicationDate;
    @Column(name = "number_of_pages")
    private Integer NumberOfPages;
    @ManyToMany
    @JoinTable(
            name = "Book_Author",
            joinColumns = @JoinColumn(name = "book_id_fk"),
            inverseJoinColumns = @JoinColumn(name = "author_id_fk"))
    private List<AuthorModel> authorModel;

    @ManyToOne
    @JoinColumn(name = "category_category_id")
    private CategoryModel categoryModel;

    @OneToMany(mappedBy = "bookModel")
    private List<BookBorrowModel> bookBorrowModel;
}
