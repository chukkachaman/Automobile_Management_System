package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByLastName(String lastName);

    List<Customer> findByCity(String city);

    @Query("""
           SELECT c FROM Customer c
           JOIN CustomerEmail e ON c.customerId = e.id.customerId
           WHERE e.id.email = :email
           """)
    Optional<Customer> findByEmail(@Param("email") String email);
}
