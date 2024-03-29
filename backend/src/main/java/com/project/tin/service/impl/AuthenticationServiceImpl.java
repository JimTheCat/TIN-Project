package com.project.tin.service.impl;

import com.project.tin.dto.AuthenticationRequest;
import com.project.tin.dto.AuthenticationResponse;
import com.project.tin.dto.RegisterRequest;
import com.project.tin.exception.CustomAuthenticationException;
import com.project.tin.repository.RoleRepository;
import com.project.tin.security.user.UserModel;
import com.project.tin.security.user.UserRepository;
import com.project.tin.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest registerRequest) {
        //check if user exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new CustomAuthenticationException("User with that username already exists");
        }

        ModelMapper modelMapper = new ModelMapper();
        UserModel user = modelMapper.map(registerRequest, UserModel.class);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRoleId(roleRepository.getReferenceById(1));

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRoleId().getName())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        UserModel user = userRepository.findByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
                )
            );
        } catch (AuthenticationException e) {
            throw new CustomAuthenticationException("Password is incorrect", e);
        }

        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRoleId().getName())
                .build();
    }
}
