package com.chamantej.automobiles.mapper;

import com.chamantej.automobiles.dto.InventoryDTO;
import com.chamantej.automobiles.entity.Inventory;

public class InventoryMapper {

    public static InventoryDTO toDTO(Inventory entity) {
        if (entity == null) return null;

        return InventoryDTO.builder()
                .partId(entity.getPartId())
                .name(entity.getName())
                .quantityAvailable(entity.getQuantityAvailable())
                .unitPrice(entity.getUnitPrice())
                .build();
    }

    public static Inventory toEntity(InventoryDTO dto) {
        if (dto == null) return null;

        return Inventory.builder()
                .partId(dto.getPartId())
                .name(dto.getName())
                .quantityAvailable(dto.getQuantityAvailable())
                .unitPrice(dto.getUnitPrice())
                .build();
    }
}
