package com.devhs.elibrary.repository;

import com.devhs.elibrary.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findAllByNameLike(String name);

    Optional<Author> findByName(String name);
}
