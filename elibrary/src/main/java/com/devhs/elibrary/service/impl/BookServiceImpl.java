package com.devhs.elibrary.service.impl;

import com.devhs.elibrary.model.Author;
import com.devhs.elibrary.model.Book;
import com.devhs.elibrary.model.dto.BookDto;
import com.devhs.elibrary.model.enumerations.BookCategory;
import com.devhs.elibrary.model.exceptions.AuthorNotFoundException;
import com.devhs.elibrary.model.exceptions.BookNotFoundException;
import com.devhs.elibrary.repository.AuthorRepository;
import com.devhs.elibrary.repository.BookRepository;
import com.devhs.elibrary.repository.CountryRepository;
import com.devhs.elibrary.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CountryRepository countryRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository, CountryRepository countryRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Optional<Book> findByName(String name) {
        return bookRepository.findByName(name);
    }

    @Override
    public Optional<Book> save(BookDto bookDto) {

        Author author = authorRepository.findById(bookDto.getAuthorId()).orElseThrow(() -> new AuthorNotFoundException(bookDto.getAuthorId()));
        BookCategory category = BookCategory.valueOf(bookDto.getCategory());
        Book book = new Book(bookDto.getName(), category, author, bookDto.getAvailableCopies());
        return Optional.of(bookRepository.save(book));
    }

    @Override
    public Optional<Book> save(Long id, BookDto bookDto) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
        Author author = authorRepository.findById(bookDto.getAuthorId()).orElseThrow(() -> new AuthorNotFoundException(bookDto.getAuthorId()));
        BookCategory category = BookCategory.valueOf(bookDto.getCategory());
        book.setAuthor(author);
        book.setAvailableCopies(bookDto.getAvailableCopies());
        book.setCategory(category);
        book.setName(bookDto.getName());
        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public void deleteById(Long id) {
        this.bookRepository.deleteById(id);
    }

    @Override
    public Optional<Book> rentCopy(Long id) {
        Book book = this.bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
        int availableCopies = book.getAvailableCopies();
        if (availableCopies > 0){
            book.setAvailableCopies(availableCopies - 1);
        }
        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return this.bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> addCopy(Long id) {
        Book book = this.bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
        int availableCopies = book.getAvailableCopies();
        book.setAvailableCopies(availableCopies + 1);
        return Optional.of(this.bookRepository.save(book));
    }
}
