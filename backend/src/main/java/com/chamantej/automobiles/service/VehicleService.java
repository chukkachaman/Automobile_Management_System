package com.chamantej.automobiles.service;

import com.chamantej.automobiles.dto.VehicleDTO;
import com.chamantej.automobiles.entity.Customer;
import com.chamantej.automobiles.entity.Vehicle;
import com.chamantej.automobiles.exception.ResourceNotFoundException;
import com.chamantej.automobiles.mapper.VehicleMapper;
import com.chamantej.automobiles.repository.CustomerRepository;
import com.chamantej.automobiles.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;

    public VehicleDTO addVehicle(VehicleDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + dto.getCustomerId()));

        Vehicle vehicle = VehicleMapper.toEntity(dto, customer);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return VehicleMapper.toDto(savedVehicle);
    }

    public VehicleDTO getVehicleById(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + vehicleId));
        return VehicleMapper.toDto(vehicle);
    }

    public List<VehicleDTO> getVehiclesByCustomer(Long customerId) {
        return vehicleRepository.findByCustomerCustomerId(customerId)
                .stream()
                .map(VehicleMapper::toDto)
                .toList();
    }

    public VehicleDTO updateVehicle(Long vehicleId, VehicleDTO dto) {
        Vehicle existingVehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + vehicleId));

        existingVehicle.setRegistrationNo(dto.getRegistrationNo());
        existingVehicle.setBrand(dto.getBrand());
        existingVehicle.setModel(dto.getModel());
        existingVehicle.setYear(dto.getYear());
        existingVehicle.setFuelType(dto.getFuelType());

        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return VehicleMapper.toDto(updatedVehicle);
    }

    public void deleteVehicle(Long vehicleId) {
        if (!vehicleRepository.existsById(vehicleId)) {
            throw new ResourceNotFoundException("Vehicle not found with id: " + vehicleId);
        }
        vehicleRepository.deleteById(vehicleId);
    }

    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(VehicleMapper::toDto) // or your manual mapper
                .toList();
    }

}