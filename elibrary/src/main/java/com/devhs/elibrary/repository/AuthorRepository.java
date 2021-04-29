package com.devhs.elibrary.repository;

import com.devhs.elibrary.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("SELECT a from Author a " +
            "WHERE a.name like %:name% and a.surname like %:surname% or " +
            "a.name like %:surname% and a.surname like %:name%")
    List<Author> searchAuthors(@Param("name") String name,@Param("surname") String surname);

    Optional<Author> findByName(String name);
}
