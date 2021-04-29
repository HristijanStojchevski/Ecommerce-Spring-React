package com.devhs.elibrary.service;

import com.devhs.elibrary.model.Author;
import com.devhs.elibrary.model.Book;
import com.devhs.elibrary.model.dto.AuthorDto;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> getAll();

    List<Author> findAllByName(String name, String surname);

    Optional<Author> findByName(String name);

    Optional<Author> findById(Long id);

    Optional<Author> save(AuthorDto authorDto);

    Optional<Author> save(Long id, AuthorDto authorDto);

    void deleteById(Long id);
}
