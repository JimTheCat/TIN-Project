package com.project.tin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Author")
public class AuthorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long AuthorId;
    @Column(name = "Name")
    private String Name;
    @Column(name = "BirthYear")
    private String BirthYear;
    @Column(name = "Nationality")
    private String Nationality;
    @ManyToMany
    @JoinTable(
            name = "BookAuthors",
            joinColumns = @JoinColumn(name = "AuthorId"),
            inverseJoinColumns = @JoinColumn(name = "BookId"))
    private List<BookModel> Books;
}
