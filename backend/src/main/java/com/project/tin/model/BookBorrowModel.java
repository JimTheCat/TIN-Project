package com.project.tin.model;

import com.project.tin.security.user.UserModel;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Book_Borrow")
public class BookBorrowModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrow_id")
    private long borrowId;

    @Column(name = "borrow_date")
    private String borrowDate;

    @Column(name = "due_date")
    private String dueDate;

    @Column(name = "returned")
    private Boolean isReturned;

    @Column(name = "rating")
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel userModel;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookModel bookModel;

}
