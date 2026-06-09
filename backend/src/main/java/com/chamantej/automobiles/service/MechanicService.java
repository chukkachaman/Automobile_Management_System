package com.chamantej.automobiles.service;

import com.chamantej.automobiles.dto.MechanicDTO;
import com.chamantej.automobiles.entity.Mechanic;
import com.chamantej.automobiles.exception.ResourceNotFoundException;
import com.chamantej.automobiles.mapper.MechanicMapper;
import com.chamantej.automobiles.repository.MechanicRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    public Mechanic createMechanic(MechanicDTO dto) {
        Mechanic mechanic = MechanicMapper.toEntity(dto);
        return mechanicRepository.save(mechanic);
    }

    public Mechanic updateMechanic(Long id, MechanicDTO dto) {
        Mechanic existing = mechanicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mechanic not found with id " + id));

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setHouseNo(dto.getHouseNo());
        existing.setStreet(dto.getStreet());
        existing.setLocality(dto.getLocality());
        existing.setCity(dto.getCity());
        existing.setPinCode(dto.getPinCode());

        return mechanicRepository.save(existing);
    }

    public void deleteMechanic(Long id) {
        if (!mechanicRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mechanic not found with id " + id);
        }
        mechanicRepository.deleteById(id);
    }

    public Mechanic getMechanicById(Long id) {
        return mechanicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic not found with id " + id));
    }

    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

    public List<Mechanic> getMechanicsByCity(String city) {
        return mechanicRepository.findByCity(city);
    }

    public List<Mechanic> getMechanicsByPinCode(String pinCode) {
        return mechanicRepository.findByPinCode(pinCode);
    }
}
