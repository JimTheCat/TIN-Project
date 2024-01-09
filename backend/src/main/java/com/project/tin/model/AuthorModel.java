package com.project.tin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.awt.print.Book;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "Author")
public class AuthorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_id")
    private Long authorId;
    @Column(name = "name")
    private String name;
    @Column(name = "birth_year")
    private Integer birthYear;
    @Column(name = "nationality")
    private String nationality;

    @ManyToMany
    @JoinTable(
            name = "Book_Author",
            joinColumns = @JoinColumn(name = "author_id_fk"),
            inverseJoinColumns = @JoinColumn(name = "book_id_fk"))
    private List<BookModel> bookModel;

}
