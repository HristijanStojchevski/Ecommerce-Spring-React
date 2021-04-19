package com.devhs.elibrary.service;

import com.devhs.elibrary.model.User;
import com.devhs.elibrary.model.enumerations.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User register(String username, String password, String repeatPassword, String name, String surname, Role role);
}
