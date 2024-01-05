package com.project.tin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthorDTO {
    private long AuthorId;
    private String Name;
    private String BirthYear;
    private String Nationality;
}
