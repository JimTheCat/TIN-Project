package com.project.tin.service;

import com.project.tin.dto.AuthenticationRequest;
import com.project.tin.dto.AuthenticationResponse;
import com.project.tin.dto.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest registerRequest);

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
}
