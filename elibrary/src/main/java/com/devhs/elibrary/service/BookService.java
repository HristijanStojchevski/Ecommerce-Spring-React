package com.devhs.elibrary.service;

import com.devhs.elibrary.model.Book;
import com.devhs.elibrary.model.dto.BookDto;
import com.devhs.elibrary.model.enumerations.BookCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.stream.DoubleStream;

public interface BookService {

    List<Book> getAll();

    Optional<Book> findById(Long id);

    Optional<Book> findByName(String name);

    Optional<Book> save(BookDto bookDto);

    Optional<Book> save(Long id,BookDto bookDto);

    void deleteById(Long id);

    Optional<Book> rentCopy(Long id);

    Page<Book> findAll(Pageable pageable);

    Optional<Book> addCopy(Long id);
}
