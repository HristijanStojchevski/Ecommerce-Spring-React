package com.devhs.elibrary.service.impl;

import com.devhs.elibrary.model.Author;
import com.devhs.elibrary.model.Country;
import com.devhs.elibrary.model.dto.AuthorDto;
import com.devhs.elibrary.model.exceptions.AuthorNotFoundException;
import com.devhs.elibrary.model.exceptions.CountryNotFoundException;
import com.devhs.elibrary.repository.AuthorRepository;
import com.devhs.elibrary.repository.CountryRepository;
import com.devhs.elibrary.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final CountryRepository countryRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, CountryRepository countryRepository) {
        this.authorRepository = authorRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Author> getAll() {
        return authorRepository.findAll();
    }

    @Override
    public List<Author> findAllByName(String name){
        return authorRepository.findAllByNameLike(name);
    }
    @Override
    public Optional<Author> findByName(String name) {
        return authorRepository.findByName(name);
    }

    @Override
    public Optional<Author> findById(Long id) {
        return authorRepository.findById(id);
    }


    @Override
    public Optional<Author> save(AuthorDto authorDto) {
        Country country = countryRepository.findById(authorDto.getCountryId()).orElseThrow(() -> new CountryNotFoundException(authorDto.getCountryId()));
        Author author = new Author(authorDto.getName(), authorDto.getSurname(), country);
        return Optional.of(authorRepository.save(author));
    }

    @Override
    public Optional<Author> save(Long id, AuthorDto authorDto) {
        Author author = this.authorRepository.findById(id).orElseThrow(() -> new AuthorNotFoundException(id));
        Country country = countryRepository.findById(authorDto.getCountryId()).orElseThrow(() -> new CountryNotFoundException(authorDto.getCountryId()));
        author.setCountry(country);
        author.setName(authorDto.getName());
        author.setSurname(author.getSurname());
        return Optional.of(authorRepository.save(author));
    }

    @Override
    public void deleteById(Long id) {
        this.authorRepository.deleteById(id);
    }
}
