package com.project.tin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookDTO {
    private long BookId;
    private String Name;
    private String Description;
    private String Publisher;
    private LocalDate PublicationDate;
    private int NumberOfPages;
}
