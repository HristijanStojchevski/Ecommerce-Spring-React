package com.devhs.elibrary.web.rest;

import com.devhs.elibrary.model.Author;
import com.devhs.elibrary.model.dto.AuthorDto;
import com.devhs.elibrary.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/authors")
public class AuthorRestController {

    private final AuthorService authorService;

    public AuthorRestController(AuthorService authorService) {
        this.authorService = authorService;
    }
    @GetMapping
    public List<Author> getAll(@RequestParam String name){
        if( name == null || name.isEmpty()){
            return this.authorService.getAll();
        }
        else return this.authorService.findAllByName(name);
    }
    @GetMapping("/find/{name}")
    public ResponseEntity<Author> findByName(@PathVariable String name){
        return this.authorService.findByName(name)
                .map(author -> ResponseEntity.ok().body(author))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Author> findById(@PathVariable Long id){
        return this.authorService.findById(id)
                .map(author -> ResponseEntity.ok().body(author))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/add")
    public ResponseEntity<Author> save(@RequestBody AuthorDto authorDto){
        return this.authorService.save(authorDto)
                .map(author -> ResponseEntity.ok().body(author))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    // public Optional<Author> save(Author author)
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity delete(@PathVariable Long id){
//        this.authorService.deleteById(id);
//        if( this.authorService.findById(id).isEmpty()) return ResponseEntity.ok().build();
//        return ResponseEntity.badRequest().build();
//    }
}
