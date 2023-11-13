package com.project.tin.security.user;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;

@Data
@Entity
@Transactional
@Table(name = "Role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;
    private String name;
}
