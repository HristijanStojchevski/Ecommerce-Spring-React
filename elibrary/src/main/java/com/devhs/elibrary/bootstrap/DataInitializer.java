package com.devhs.elibrary.bootstrap;

import com.devhs.elibrary.model.Author;
import com.devhs.elibrary.model.Country;
import com.devhs.elibrary.model.User;
import com.devhs.elibrary.model.enumerations.Role;
import com.devhs.elibrary.repository.AuthorRepository;
import com.devhs.elibrary.repository.CountryRepository;
import com.devhs.elibrary.repository.UserRepository;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Getter
public class DataInitializer {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CountryRepository countryRepository;
    private final AuthorRepository authorRepository;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, CountryRepository countryRepository, AuthorRepository authorRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.countryRepository = countryRepository;
        this.authorRepository = authorRepository;
    }

    @PostConstruct
    public void initialize(){
//        Country country = new Country("Macedonia", "Europe");
//        Author author = new Author("Rajko","Zinzifov",country);
//        User user = new User("user",passwordEncoder.encode("user"),"Hs","S", Role.ROLE_USER);
//        User lib = new User("Librarian", passwordEncoder.encode("lib"),"Zivko","Trajkovski", Role.ROLE_LIB);
//        this.countryRepository.save(country);
//        this.userRepository.save(user);
//        this.userRepository.save(lib);
//        this.authorRepository.save(author);
    }
}
