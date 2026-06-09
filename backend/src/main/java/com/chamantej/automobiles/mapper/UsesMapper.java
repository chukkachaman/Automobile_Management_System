package com.chamantej.automobiles.mapper;

import com.chamantej.automobiles.dto.UsesDTO;
import com.chamantej.automobiles.entity.Inventory;
import com.chamantej.automobiles.entity.Invoice;
import com.chamantej.automobiles.entity.Uses;
import com.chamantej.automobiles.entity.id.UsesId;

public class UsesMapper {

    public static UsesDTO toDTO(Uses uses) {
        if (uses == null) return null;
        Double price = (uses.getPart() != null) ? uses.getPart().getUnitPrice() : null;
        Integer count = uses.getCount() != null ? uses.getCount() : 0;
        return UsesDTO.builder()
                .invoiceId(uses.getInvoice() != null ? uses.getInvoice().getInvoiceId() : null)
                .partId(uses.getPart() != null ? uses.getPart().getPartId() : null)
                .partName(uses.getPart() != null ? uses.getPart().getName() : null)
                .count(count)
                .unitPrice(price)
                .lineTotal(price != null ? price * count : null)
                .build();
    }

    public static Uses toEntity(UsesDTO dto, Invoice invoice, Inventory part) {
        if (dto == null) return null;
        UsesId id = new UsesId(invoice.getInvoiceId(), part.getPartId());
        return Uses.builder()
                .id(id)
                .invoice(invoice)
                .part(part)
                .count(dto.getCount())
                .build();
    }
}
