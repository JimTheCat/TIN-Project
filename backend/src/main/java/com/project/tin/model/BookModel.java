package com.project.tin.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import org.springframework.context.annotation.Primary;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "Book")
public class BookModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookId")
    private long BookId;
    @Column(name = "Name")
    private String Name;
    @Column(name = "Description")
    private String Description;
    @Column(name = "Publisher")
    private String Publisher;
    @Column(name = "PublicationDate")
    private String PublicationDate;
    @Column(name = "NumberOfPages")
    private int NumberOfPages;
    @ManyToMany
    @JoinTable(
            name = "BookAuthors",
            joinColumns = @JoinColumn(name = "BookId"),
            inverseJoinColumns = @JoinColumn(name = "AuthorId"))
    private List<AuthorModel> Authors;
}
