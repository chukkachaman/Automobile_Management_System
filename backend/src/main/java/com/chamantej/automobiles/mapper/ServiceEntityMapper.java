package com.chamantej.automobiles.mapper;

import com.chamantej.automobiles.dto.ServiceEntityDTO;
import com.chamantej.automobiles.entity.ServiceEntity;

public class ServiceEntityMapper {

    public static ServiceEntityDTO toDTO(ServiceEntity entity) {
        if (entity == null) {
            return null;
        }
        return ServiceEntityDTO.builder()
                .serviceId(entity.getServiceId())
                .serviceName(entity.getServiceName())
                .description(entity.getDescription())
                .build();
    }

    public static ServiceEntity toEntity(ServiceEntityDTO dto) {
        if (dto == null) {
            return null;
        }
        return ServiceEntity.builder()
                .serviceId(dto.getServiceId())
                .serviceName(dto.getServiceName())
                .description(dto.getDescription())
                .build();
    }
}
