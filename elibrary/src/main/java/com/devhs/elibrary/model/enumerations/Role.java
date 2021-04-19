package com.devhs.elibrary.model.enumerations;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_USER, ROLE_LIB;  // ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
