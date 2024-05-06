package com.rentabike.demo.service;


import com.rentabike.demo.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
    User getUserWithRoles(String email);
}

