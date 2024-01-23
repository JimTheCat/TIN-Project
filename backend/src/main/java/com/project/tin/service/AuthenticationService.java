package com.project.tin.service;

import com.project.tin.dto.AuthenticationRequest;
import com.project.tin.dto.AuthenticationResponse;
import com.project.tin.dto.RegisterRequest;

public interface AuthenticationService {
    /**
     * Register new user
     * @param registerRequest - contains user data
     * @return response with message token and role
     */
    AuthenticationResponse register(RegisterRequest registerRequest);
    /**
     * Authenticate user
     * @param authenticationRequest - contains username and password
     * @return response with message token and role
     */
    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
}
