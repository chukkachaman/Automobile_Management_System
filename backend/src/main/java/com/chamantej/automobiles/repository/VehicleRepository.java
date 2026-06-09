package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByCustomerCustomerId(Long customerId);
    Vehicle findByRegistrationNo(String registrationNo);
}