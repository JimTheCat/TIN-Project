package com.project.tin.controller;

import com.project.tin.dto.AddAuthorDTO;
import com.project.tin.dto.AuthorDTO;
import com.project.tin.service.AuthorService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    /*
       Admin method
    */
    @PostMapping()
    public ResponseEntity<Object> addAuthor(@RequestBody AddAuthorDTO authorDTO) {
        return ResponseEntity.ok(authorService.addAuthor(authorDTO));
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<AuthorDTO>> getAll() {
        return ResponseEntity.ok(authorService.getAll());
    }
}
