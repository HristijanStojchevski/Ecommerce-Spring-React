package com.devhs.elibrary.service.impl;

import com.devhs.elibrary.model.Country;
import com.devhs.elibrary.repository.CountryRepository;
import com.devhs.elibrary.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return this.countryRepository.findById(id);
    }

    @Override
    public Optional<Country> save(String name, String continent) {
        Country country = new Country(name, continent);
        return Optional.of(countryRepository.save(country));
    }

    @Override
    public Optional<Country> save(Country country) {
        return Optional.of(country);
    }
}
