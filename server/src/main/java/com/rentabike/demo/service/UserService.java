package com.rentabike.demo.service;

import com.rentabike.demo.exception.UserAlreadyExistsException;
import com.rentabike.demo.model.Role;
import com.rentabike.demo.model.User;
import com.rentabike.demo.repository.RoleRepository;
import com.rentabike.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    /*  @Override
      public User registerUser(User user) {
          if (userRepository.existsByEmail(user.getEmail())){
              throw new UserAlreadyExistsException(user.getEmail() + " already exists");
          }
          user.setPassword(passwordEncoder.encode(user.getPassword()));
          System.out.println("This is password: " + user.getPassword());
          *//*Role userRole = roleRepository.findByName("ROLE_USER").get();*//*
     *//* user.setRoles(Collections.singletonList(userRole));*//*

        return userRepository.save(user);
    }*/
    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("This is password: " + user.getPassword());

        // Find or create the "ROLE_USER" role
        Optional<Role> userRoleOptional = roleRepository.findByName("ROLE_USER");
        if (userRoleOptional.isPresent()) {
            user.setRoles(Collections.singletonList(userRoleOptional.get()));
        } else {
            // Handle missing role (Option 1: Throw Exception)
            // throw new RuntimeException("Required role 'ROLE_USER' not found!");

            // Handle missing role (Option 2: Create Default Role)
            Role defaultRole = new Role("ROLE_USER"); // Set name and other properties
            roleRepository.save(defaultRole);
            user.setRoles(Collections.singletonList(defaultRole));
        }

        return userRepository.save(user);
    }



    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getUserWithRoles(String email) {
        return userRepository.findByEmailWithRoles(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }
}
