package com.devhs.elibrary.web.rest;

import com.devhs.elibrary.model.Book;
import com.devhs.elibrary.model.dto.BookDto;
import com.devhs.elibrary.model.exceptions.BookNotFoundException;
import com.devhs.elibrary.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookRestController {

    private final BookService bookService;

    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping
    public List<Book> getAll(){
        return this.bookService.getAll();
    }

    @GetMapping("/pagination")
    public Page<Book> getAllPageable(Pageable pageable){ return this.bookService.findAll(pageable) ;}

    @GetMapping("/paginationList")
    public List<Book> getAllPageableList(Pageable pageable){ return this.bookService.findAll(pageable).getContent() ;}

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id){
        return this.bookService.findById(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<Book> findByName(@PathVariable String name){
        return this.bookService.findByName(name)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Book> save(@RequestBody BookDto bookDto){
        return this.bookService.save(bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Book> edit(@PathVariable Long id,@RequestBody BookDto bookDto){
        return this.bookService.save(id, bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/rent/{id}")
    public ResponseEntity<Book> markRented(@PathVariable Long id){
        return this.bookService.rentCopy(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/addCopy/{id}")
    public ResponseEntity<Book> addCopy(@PathVariable Long id){
        return this.bookService.addCopy(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        this.bookService.deleteById(id);
        if( this.bookService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
