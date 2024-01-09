package com.project.tin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthorDTO {
    private long AuthorId;
    private String Name;
    private int BirthYear;
    private String Nationality;
}
