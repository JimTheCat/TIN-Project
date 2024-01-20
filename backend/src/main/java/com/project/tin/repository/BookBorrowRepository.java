package com.project.tin.repository;

import com.project.tin.model.BookBorrowModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookBorrowRepository extends JpaRepository<BookBorrowModel, Long> {
    List<BookBorrowModel> findByUserModelUsername(String username);
    BookBorrowModel findByBorrowId(Long borrowId);
}
