package com.devhs.elibrary.service;

import com.devhs.elibrary.model.Book;
import com.devhs.elibrary.model.dto.BookDto;
import com.devhs.elibrary.model.enumerations.BookCategory;

import java.util.List;
import java.util.Optional;

public interface BookService {

    List<Book> getAll();

    Optional<Book> findById(Long id);

    Optional<Book> findByName(String name);

    Optional<Book> save(BookDto bookDto);

    Optional<Book> save(Long id,BookDto bookDto);

    void deleteById(Long id);

    Optional<Book> rentCopy(Long id);
}
